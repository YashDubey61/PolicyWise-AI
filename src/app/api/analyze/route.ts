import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { extractTextFromPDF, truncatePdfText } from '@/lib/ai/parse-pdf';
import { ANALYSIS_SYSTEM_PROMPT } from '@/lib/ai/prompts';

const AnalysisSchema = z.object({
  summary: z.string(),
  coverageScore: z.number().min(0).max(100),
  transparencyScore: z.number().min(0).max(100),
  complexityScore: z.number().min(0).max(100),
  riskScore: z.number().min(0).max(100),
  waitingPeriodScore: z.number().min(0).max(100),
  claimFriendlinessScore: z.number().min(0).max(100),
  sections: z.object({
    summary: z.string(),
    coverage: z.object({
      medical: z.string(),
      accidental: z.string(),
      criticalIllness: z.string(),
      hospitalization: z.string(),
    }),
    exclusions: z.array(z.object({
      item: z.string(),
      explanation: z.string(),
      severity: z.enum(['low', 'medium', 'high']),
    })),
    waitingPeriods: z.array(z.object({
      condition: z.string(),
      period: z.string(),
      details: z.string(),
    })),
    claimLimits: z.array(z.object({
      type: z.string(),
      limit: z.string(),
      details: z.string(),
    })),
    copay: z.string(),
    deductibles: z.string(),
    networkHospitals: z.string(),
    hiddenClauses: z.array(z.object({
      clause: z.string(),
      clauseNumber: z.string(),
      risk: z.enum(['low', 'medium', 'high']),
      explanation: z.string(),
    })),
  }),
});

export async function POST(request: NextRequest) {
  let policyId: string | null = null;
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    policyId = body.policyId;
    if (!policyId) {
      return NextResponse.json({ error: 'policyId is required' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // Fetch the policy
    const { data: policy, error: policyError } = await supabase
      .from('policies')
      .select('*')
      .eq('id', policyId)
      .eq('user_id', userId)
      .single();

    if (policyError || !policy) {
      return NextResponse.json({ error: 'Policy not found' }, { status: 404 });
    }

    // Download the PDF from storage
    const filePath = policy.file_url.split('/storage/v1/object/public/policies/')[1];
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('policies')
      .download(filePath);

    if (downloadError || !fileData) {
      return NextResponse.json({ error: 'Failed to download policy file' }, { status: 500 });
    }

    // Extract text from PDF
    const buffer = Buffer.from(await fileData.arrayBuffer());
    const { text } = await extractTextFromPDF(buffer);
    const policyText = truncatePdfText(text);

    // AI Analysis
    const { object: analysis } = await generateObject({
      model: google('gemini-3.1-flash-lite'),
      schema: AnalysisSchema,
      system: ANALYSIS_SYSTEM_PROMPT,
      prompt: `Please analyze this insurance policy document:\n\n${policyText}`,
    });

    // Store analysis in DB
    const { data: savedAnalysis, error: analysisError } = await supabase
      .from('analyses')
      .insert({
        policy_id: policyId,
        summary: analysis.summary,
        coverage_score: analysis.coverageScore,
        transparency_score: analysis.transparencyScore,
        complexity_score: analysis.complexityScore,
        risk_score: analysis.riskScore,
        waiting_period_score: analysis.waitingPeriodScore,
        claim_friendliness_score: analysis.claimFriendlinessScore,
        sections: analysis.sections,
        raw_text: policyText.slice(0, 50000), // Store first 50k chars for chat
      })
      .select()
      .single();

    if (analysisError) {
      console.error('Analysis DB error:', analysisError);
      return NextResponse.json({ error: 'Failed to save analysis' }, { status: 500 });
    }

    // Update policy status
    await supabase
      .from('policies')
      .update({ status: 'analyzed' })
      .eq('id', policyId);

    return NextResponse.json({ analysisId: savedAnalysis.id, analysis });
  } catch (error) {
    console.error('Analysis error:', error);

    // Update policy status to error
    if (policyId) {
      try {
        const supabase = createServerSupabaseClient();
        await supabase.from('policies').update({ status: 'error' }).eq('id', policyId);
      } catch (dbError) {
        console.error('Failed to set policy status to error:', dbError);
      }
    }

    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 });
  }
}
