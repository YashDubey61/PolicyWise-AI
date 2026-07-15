import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { CLAIM_SYSTEM_PROMPT } from '@/lib/ai/prompts';

const ClaimResultSchema = z.object({
  coverageLikelihood: z.number().min(0).max(100),
  estimatedReimbursement: z.number(),
  rejectionReasons: z.array(z.string()),
  confidenceScore: z.number().min(0).max(100),
  requiredDocuments: z.array(z.string()),
  explanation: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { policyId, disease, hospitalBill, hospitalType, admissionDate } = body;

    if (!policyId) {
      return NextResponse.json({ error: 'policyId is required' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // Fetch analysis for context
    const { data: analysis } = await supabase
      .from('analyses')
      .select('sections, summary, coverage_score, risk_score')
      .eq('policy_id', policyId)
      .single();

    const policyContext = analysis
      ? `Policy Analysis:\n${JSON.stringify(analysis, null, 2)}`
      : 'No policy analysis available';

    const claimScenario = `
Claim Scenario:
- Condition/Disease: ${disease}
- Hospital Bill: ₹${hospitalBill}
- Hospital Type: ${hospitalType}
- Admission Date: ${admissionDate}

${policyContext}
`;

    const { object: result } = await generateObject({
      model: google('gemini-3.1-flash-lite'),
      schema: ClaimResultSchema,
      system: CLAIM_SYSTEM_PROMPT,
      prompt: claimScenario,
    });

    // Store simulation
    await supabase.from('claim_simulations').insert({
      user_id: userId,
      policy_id: policyId,
      input: { disease, hospitalBill, hospitalType, admissionDate },
      result,
    });

    return NextResponse.json({ ...result, policyId });
  } catch (error) {
    console.error('Claim check error:', error);
    return NextResponse.json({ error: 'Claim check failed' }, { status: 500 });
  }
}
