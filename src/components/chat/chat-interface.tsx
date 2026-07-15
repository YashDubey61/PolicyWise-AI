'use client';

import { useRef, useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { motion } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  Sparkles,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { usePolicies } from '@/hooks/use-policies';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const SUGGESTED_QUESTIONS = [
  'What is covered in this policy?',
  'What are the major exclusions?',
  'How do I file a claim?',
  'What is the waiting period for pre-existing conditions?',
  'What is the room rent limit?',
  'Is maternity covered?',
];

interface ChatInterfaceProps {
  policyId?: string;
}

export function ChatInterface({ policyId: initialPolicyId }: ChatInterfaceProps) {
  const { policies } = usePolicies();
  const [selectedPolicyId, setSelectedPolicyId] = useState(initialPolicyId || '');
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: { policyId: selectedPolicyId },
    }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';

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

  const handleSuggestedQuestion = (question: string) => {
    if (!selectedPolicyId || isLoading) return;
    sendMessage({ text: question });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">AI Policy Chat</h1>
            <p className="text-xs text-muted-foreground">Ask anything about your insurance policy</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedPolicyId} onValueChange={(v) => setSelectedPolicyId(v ?? '')}>
            <SelectTrigger className="w-48 rounded-xl text-sm border-border bg-card">
              <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Select policy..." />
            </SelectTrigger>
            <SelectContent>
              {policies.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setMessages([])}
            title="Clear chat"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full text-center py-12"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              {selectedPolicyId ? "I've loaded your policy. Ask me anything!" : 'Select a policy to get started'}
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-sm">
              {selectedPolicyId
                ? 'I can answer questions about coverage, exclusions, claims, waiting periods, and more.'
                : 'Choose an insurance policy from the dropdown above to enable AI analysis.'}
            </p>

            {selectedPolicyId && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="text-left text-sm px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 text-muted-foreground hover:text-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          <>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1',
                    message.role === 'assistant'
                      ? 'bg-gradient-to-br from-primary to-accent'
                      : 'bg-muted border border-border'
                  )}
                >
                  {message.role === 'assistant' ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                    message.role === 'assistant'
                      ? 'bg-card border border-border text-foreground rounded-tl-sm'
                      : 'bg-primary text-white rounded-tr-sm'
                  )}
                >
                  <p className="whitespace-pre-wrap">
                    {message.parts
                      ?.filter((p: { type: string }) => p.type === 'text')
                      .map((p: { type: string; text?: string }, pi: number) => (
                        <span key={pi}>{(p as { type: 'text'; text: string }).text}</span>
                      )) ?? null}
                  </p>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-card rounded-2xl border border-border p-3 flex items-end gap-3">
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
          className="flex-1 resize-none bg-transparent border-none shadow-none focus-visible:ring-0 text-sm p-0 min-h-[24px] max-h-32"
        />
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim() || !selectedPolicyId || isLoading}
          size="icon"
          className="rounded-xl w-10 h-10 bg-gradient-to-r from-primary to-accent hover:opacity-90 flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
