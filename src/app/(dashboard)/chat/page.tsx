import type { Metadata } from 'next';
import { ChatInterface } from '@/components/chat/chat-interface';

export const metadata: Metadata = {
  title: 'AI Chat',
};

interface ChatPageProps {
  searchParams: Promise<{ policyId?: string }>;
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const { policyId } = await searchParams;
  return <ChatInterface policyId={policyId} />;
}
