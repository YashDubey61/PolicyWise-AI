'use client';

import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import {
  Upload,
  FileText,
  MessageSquare,
  Calculator,
  GitCompare,
  TrendingUp,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getGreeting, formatDate } from '@/lib/utils';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { UploadZone } from '@/components/upload/upload-zone';
import { EmptyState } from '@/components/shared/empty-state';
import { usePolicies } from '@/hooks/use-policies';

const QUICK_ACTIONS = [
  {
    icon: Upload,
    title: 'Analyze Policy',
    description: 'Upload a new insurance policy PDF',
    href: '#upload',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat',
    description: 'Ask questions about your policy',
    href: '/chat',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
  },
  {
    icon: GitCompare,
    title: 'Compare Policies',
    description: 'Compare two policies side by side',
    href: '/compare',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Calculator,
    title: 'Check Claim',
    description: 'Estimate your claim outcome',
    href: '/claim-checker',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
];

const STATS = [
  { label: 'Policies Analyzed', value: 0, suffix: '', icon: FileText },
  { label: 'AI Conversations', value: 0, suffix: '', icon: MessageSquare },
  { label: 'Claims Checked', value: 0, suffix: '', icon: Calculator },
  { label: 'Avg Coverage Score', value: 0, suffix: '/100', icon: BarChart3 },
];

export function DashboardContent() {
  const { user } = useUser();
  const { policies, isLoading } = usePolicies();

  const greeting = getGreeting();
  const firstName = user?.firstName || 'there';

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {greeting}, {firstName}! 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          {policies.length > 0
            ? `You have ${policies.length} polic${policies.length === 1 ? 'y' : 'ies'} analyzed. Here's your overview.`
            : "Upload your first insurance policy to get started."}
        </p>
      </motion.div>

      {/* Upload card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        id="upload"
        className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Upload a New Policy
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Drag and drop your PDF or click to browse. Analysis takes under 2 minutes.
              </p>
            </div>
          </div>
          <UploadZone compact />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              <TrendingUp className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
            </div>
            <div className="text-2xl font-bold text-foreground">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Recent Policies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Policies</h2>
          {policies.length > 0 && (
            <Button asChild variant="ghost" size="sm" className="rounded-xl text-sm">
              <Link href="/policies">View all</Link>
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-36 bg-card rounded-2xl border border-border animate-pulse" />
            ))}
          </div>
        ) : policies.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No policies yet"
            description="Upload your first insurance policy to start getting AI-powered insights."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {policies.slice(0, 6).map((policy) => (
              <Link key={policy.id} href={`/policies/${policy.id}`}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <Badge
                      variant={policy.status === 'analyzed' ? 'default' : 'secondary'}
                      className={`text-xs rounded-full ${policy.status === 'analyzed' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' : policy.status === 'error' ? 'bg-destructive/15 text-destructive border-destructive/20' : 'bg-primary/15 text-primary border-primary/20'}`}
                    >
                      {policy.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1 truncate">
                    {policy.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(policy.createdAt)}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link href={action.href}>
                <div className={`bg-card rounded-2xl border ${action.border} p-5 hover:bg-card/80 transition-all duration-200 cursor-pointer h-full`}>
                  <div className={`w-10 h-10 rounded-xl ${action.bg} border ${action.border} flex items-center justify-center mb-4`}>
                    <action.icon className={`w-5 h-5 ${action.color}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {action.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
