import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { COMPARE_SYSTEM_PROMPT } from '@/lib/ai/prompts';

const ComparisonSchema = z.object({
  summary: z.string(),
  winner: z.enum(['A', 'B', 'tie']),
  recommendation: z.string(),
  categories: z.array(z.object({
    name: z.string(),
    policyA: z.string(),
    policyB: z.string(),
    winner: z.enum(['A', 'B', 'tie']),
  })),
  scores: z.object({
    policyA: z.object({
      coverage: z.number(),
      transparency: z.number(),
      claimFriendliness: z.number(),
      risk: z.number(),
      waitingPeriod: z.number(),
      complexity: z.number(),
    }),
    policyB: z.object({
      coverage: z.number(),
      transparency: z.number(),
      claimFriendliness: z.number(),
      risk: z.number(),
      waitingPeriod: z.number(),
      complexity: z.number(),
    }),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { policyAId, policyBId } = await request.json();
    if (!policyAId || !policyBId) {
      return NextResponse.json({ error: 'Both policyAId and policyBId are required' }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();

    // Fetch both analyses
    const [{ data: analysisA }, { data: analysisB }] = await Promise.all([
      supabase.from('analyses').select('*').eq('policy_id', policyAId).single(),
      supabase.from('analyses').select('*').eq('policy_id', policyBId).single(),
    ]);

    if (!analysisA || !analysisB) {
      return NextResponse.json({ error: 'One or both policies have not been analyzed' }, { status: 400 });
    }

    const prompt = `Compare these two insurance policies:

POLICY A:
${JSON.stringify(analysisA, null, 2)}

POLICY B:
${JSON.stringify(analysisB, null, 2)}`;

    const { object: result } = await generateObject({
      model: google('gemini-3.1-flash-lite'),
      schema: ComparisonSchema,
      system: COMPARE_SYSTEM_PROMPT,
      prompt,
    });

    // Store comparison
    const { data: comparison } = await supabase
      .from('comparisons')
      .insert({
        user_id: userId,
        policy_a_id: policyAId,
        policy_b_id: policyBId,
        result,
      })
      .select()
      .single();

    return NextResponse.json({ comparisonId: comparison?.id, result });
  } catch (error) {
    console.error('Compare error:', error);
    return NextResponse.json({ error: 'Comparison failed' }, { status: 500 });
  }
}
