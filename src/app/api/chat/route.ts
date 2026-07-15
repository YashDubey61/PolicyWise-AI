import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { CHAT_SYSTEM_PROMPT } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { messages, policyId } = await request.json();

  const supabase = createServerSupabaseClient();

  // Fetch policy text for context
  let policyContext = '';
  if (policyId) {
    const { data: analysis } = await supabase
      .from('analyses')
      .select('raw_text, sections, summary')
      .eq('policy_id', policyId)
      .single();

    if (analysis) {
      policyContext = `
POLICY DOCUMENT TEXT:
${(analysis.raw_text as string || '').slice(0, 20000)}

ANALYSIS SUMMARY:
${analysis.summary || ''}

KEY SECTIONS:
${JSON.stringify(analysis.sections, null, 2)}
`;
    }
  }

  const systemPrompt = policyContext
    ? `${CHAT_SYSTEM_PROMPT}\n\n---\n${policyContext}`
    : CHAT_SYSTEM_PROMPT;

  // Map client-side UIMessage structure to server-side CoreMessage structure
  const coreMessages = messages.map((m: { role: string; content?: string; parts?: Array<{ type: string; text?: string }> }) => {
    let content = m.content || '';
    if (!content && m.parts) {
      content = m.parts
        .filter((p) => p.type === 'text')
        .map((p) => p.text || '')
        .join('\n');
    }
    return {
      role: m.role,
      content,
    };
  });

  const result = streamText({
    model: google('gemini-3.1-flash-lite'),
    system: systemPrompt,
    messages: coreMessages,
  });

  // Use the built-in UI message stream response method
  return result.toUIMessageStreamResponse();
}
