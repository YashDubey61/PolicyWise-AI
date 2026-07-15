'use client';

import { useRef, useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  Sparkles,
  FileText,
  RotateCcw,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { usePolicies } from '@/hooks/use-policies';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const SUGGESTED_PROMPTS = [
  { label: 'Coverage Summary', text: 'Give me a brief summary of what this policy covers in plain English.' },
  { label: 'Exclusions Scan', text: 'What are the major exclusions or things NOT covered under this plan?' },
  { label: 'Room Rent Limits', text: 'Is there a room rent sub-limit or cap under this policy?' },
  { label: 'Claim Guide', text: 'What is the step-by-step process to file a claim under this policy?' },
];

interface ChatInterfaceProps {
  policyId?: string;
}

export function ChatInterface({ policyId: initialPolicyId }: ChatInterfaceProps) {
  const { policies } = usePolicies();
  const [selectedPolicyId, setSelectedPolicyId] = useState(initialPolicyId || '');
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activePolicy = policies.find((p) => p.id === selectedPolicyId);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: { policyId: selectedPolicyId },
    }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Set default policy when policies load
  useEffect(() => {
    if (!selectedPolicyId && policies.length > 0) {
      const selectTimeout = setTimeout(() => {
        setSelectedPolicyId(policies[0].id);
      }, 0);
      return () => clearTimeout(selectTimeout);
    }
  }, [policies, selectedPolicyId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || !selectedPolicyId || isLoading) return;
    sendMessage({ text: inputValue.trim() });
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptCard = (text: string) => {
    if (!selectedPolicyId || isLoading) return;
    sendMessage({ text });
  };

  // Simple Markdown Parser to format bold texts, bullet points, and highlight sections
  const formatMessageText = (text: string) => {
    if (!text) return '';
    let formatted = text;

    // Bold text (**bold**)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
    
    // Bullet points (- point)
    formatted = formatted.replace(/^\s*-\s+(.*?)$/gm, '<li class="ml-4 list-disc pl-1 my-1">$1</li>');

    // Section references ([Section X.X] or [Clause X])
    formatted = formatted.replace(
      /\[(Section\s+\d+\.?\d*|Clause\s+\d+\w?)\]/gi,
      '<span class="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-white font-mono text-[10px] cursor-help inline-block font-semibold">$1</span>'
    );

    return <div dangerouslySetInnerHTML={{ __html: formatted }} className="text-xs text-zinc-300 leading-relaxed space-y-1.5" />;
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 items-stretch max-w-6xl mx-auto">
      
      {/* Left Sidebar: Policies Selection */}
      <div className="w-64 bg-[#070707]/60 border border-border rounded-2xl flex flex-col justify-between p-4 flex-shrink-0 hidden md:flex">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-foreground">
            <span>YOUR POLICIES</span>
            <Button asChild size="icon" variant="ghost" className="w-5 h-5 rounded-md hover:bg-zinc-800">
              <Link href="/upload">
                <Plus className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-1.5 overflow-y-auto max-h-[400px]">
            {policies.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPolicyId(p.id);
                  setMessages([]);
                }}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors',
                  p.id === selectedPolicyId
                    ? 'bg-zinc-900 border border-border text-foreground font-semibold'
                    : 'text-zinc-500 hover:text-foreground hover:bg-zinc-950 border border-transparent'
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{p.name}</span>
                </div>
                <ChevronRight className="w-3 h-3 text-zinc-600 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Clear logs */}
        <Button
          onClick={() => setMessages([])}
          variant="outline"
          size="sm"
          className="rounded-xl border-border text-xs text-zinc-400 font-medium cursor-pointer"
        >
          <RotateCcw className="mr-2 w-3.5 h-3.5" />
          Clear Conversation
        </Button>
      </div>

      {/* Right Area: Chat Logs */}
      <div className="flex-1 bg-[#070707]/60 border border-border rounded-2xl flex flex-col justify-between overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-border flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-foreground">AI Policy Assistant</h2>
              <p className="text-[10px] text-zinc-500 mt-0.5">
                {activePolicy ? `Querying ${activePolicy.name}` : 'Select a policy to analyze'}
              </p>
            </div>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto py-10"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-border flex items-center justify-center mb-5 text-zinc-400">
                  <Bot className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">
                  {activePolicy ? `Analyze ${activePolicy.name}` : 'Start an AI Analysis'}
                </h3>
                <p className="text-xs text-zinc-500 mb-8 leading-relaxed">
                  Ask me questions regarding pre-existing ailment wait-times, daily hospital room limits, exclusions, or claim steps.
                </p>

                {activePolicy && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt.label}
                        onClick={() => handlePromptCard(prompt.text)}
                        className="p-3.5 bg-zinc-950 border border-border/40 hover:border-zinc-700 rounded-xl text-left text-xs transition-colors flex flex-col justify-between gap-1.5 cursor-pointer group"
                      >
                        <span className="font-bold text-foreground group-hover:underline">{prompt.label}</span>
                        <span className="text-[10px] text-zinc-500 leading-normal">{prompt.text}</span>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      'flex gap-3 max-w-2xl',
                      message.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                    )}
                  >
                    {/* Avatar */}
                    <div className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border text-xs',
                      message.role === 'assistant'
                        ? 'bg-white text-black border-white/10'
                        : 'bg-zinc-900 text-zinc-300 border-border/60'
                    )}>
                      {message.role === 'assistant' ? <Bot className="w-4 h-4 text-black" /> : 'U'}
                    </div>

                    {/* Content bubble */}
                    <div className={cn(
                      'rounded-2xl px-4 py-3 border text-xs leading-relaxed shadow-lg',
                      message.role === 'assistant'
                        ? 'bg-zinc-950 border-border text-zinc-300'
                        : 'bg-zinc-900 border-zinc-800 text-white'
                    )}>
                      {message.parts
                        ?.filter((p) => p.type === 'text')
                        .map((p, idx) => (
                          <div key={idx}>
                            {formatMessageText((p as { text: string }).text)}
                          </div>
                        )) ?? null}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 max-w-2xl">
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10">
                      <Bot className="w-4 h-4 text-black" />
                    </div>
                    <div className="bg-zinc-950 border border-border rounded-2xl px-4 py-3 flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-zinc-500"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-border flex-shrink-0 bg-zinc-950/40">
          <div className="flex items-end gap-3 max-w-3xl mx-auto bg-zinc-950 border border-border/80 rounded-2xl p-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                selectedPolicyId
                  ? 'Ask anything about your policy... (Enter to send)'
                  : 'Select a policy first...'
              }
              disabled={!selectedPolicyId || isLoading}
              rows={1}
              className="flex-1 resize-none bg-transparent border-none shadow-none focus-visible:ring-0 text-xs p-1.5 min-h-[28px] max-h-32 text-foreground"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || !selectedPolicyId || isLoading}
              size="icon"
              className="rounded-xl w-9 h-9 bg-foreground text-background hover:bg-foreground/90 flex-shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
}
