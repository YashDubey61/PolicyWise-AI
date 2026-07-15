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
  ArrowUpRight,
  Activity,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getGreeting, formatDate } from '@/lib/utils';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { EmptyState } from '@/components/shared/empty-state';
import { usePolicies } from '@/hooks/use-policies';

const MOCK_COMPARISONS = [
  { id: '1', nameA: 'Star Health Premier', nameB: 'HDFC Ergo Optima', date: '2026-07-15', status: 'Star Premier Wins' },
  { id: '2', nameA: 'Niva Bupa ReAssure', nameB: 'Star Health Premier', date: '2026-07-12', status: 'ReAssure Wins' },
];

const MOCK_CLAIMS = [
  { id: '1', diagnosis: 'Dengue Treatment', hospital: 'Max Hospital', bill: '₹45,000', probability: '94%', status: 'Approved' },
  { id: '2', diagnosis: 'Knee Replacement', hospital: 'Fortis Healthcare', bill: '₹2,50,000', probability: '82%', status: 'Approved' },
];

const MOCK_ACTIVITIES = [
  { text: 'Analyzed Star_Health_Premier.pdf', time: '2 hours ago', icon: FileText, color: 'text-blue-400 bg-blue-500/10' },
  { text: 'Chat conversation regarding maternity caps', time: '5 hours ago', icon: MessageSquare, color: 'text-teal-400 bg-teal-500/10' },
  { text: 'Simulated claims for Kidney Laser Surgery', time: '1 day ago', icon: Calculator, color: 'text-amber-400 bg-amber-500/10' },
  { text: 'Compared Star Health and HDFC Optima', time: '2 days ago', icon: GitCompare, color: 'text-purple-400 bg-purple-500/10' },
];

export function DashboardContent() {
  const { user } = useUser();
  const { policies, isLoading } = usePolicies();

  const greeting = getGreeting();
  const firstName = user?.firstName || 'there';

  const stats = [
    {
      label: 'Policies Analyzed',
      value: policies.length,
      suffix: '',
      icon: FileText,
      change: policies.length === 0 ? 'No policies uploaded' : '+12% this week',
    },
    {
      label: 'AI Conversations',
      value: policies.length === 0 ? 0 : 12,
      suffix: '',
      icon: MessageSquare,
      change: policies.length === 0 ? 'No chats started' : '+4 today',
    },
    {
      label: 'Claims Checked',
      value: policies.length === 0 ? 0 : 5,
      suffix: '',
      icon: Calculator,
      change: policies.length === 0 ? 'No claims simulated' : '100% success rate',
    },
    {
      label: 'Avg Coverage Score',
      value: policies.length === 0 ? 0 : 87,
      suffix: '/100',
      icon: BarChart3,
      change: policies.length === 0 ? 'No scores analyzed' : 'Excellent',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      
      {/* Welcome row with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Analyze your insurance policy documents, check claim outcomes, and query AI details.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <Button asChild className="rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold text-xs h-10 px-5 shadow-lg shadow-white/5 cursor-pointer">
            <Link href="/upload">
              <Upload className="mr-2 w-4 h-4" />
              Upload Policy
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Statistics widgets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#070707]/60 rounded-2xl border border-border p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-zinc-500">{stat.label}</span>
              <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-border flex items-center justify-center text-zinc-400">
                <stat.icon className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-foreground">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 block font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main dashboard widgets grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column widgets: Policies, Comparisons, Claims */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Recent Policies */}
          <div className="bg-[#070707]/60 border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-zinc-400" />
                <h2 className="text-sm font-bold text-foreground">Recent Policies</h2>
              </div>
              {policies.length > 0 && (
                <Button asChild variant="ghost" size="sm" className="rounded-lg text-xs font-semibold text-zinc-400 hover:text-foreground">
                  <Link href="/policies">View All</Link>
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="h-28 bg-[#090909] rounded-xl border border-border/60 animate-pulse" />
                ))}
              </div>
            ) : policies.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No policies uploaded yet"
                description="Upload your health or life policy PDF to get AI coverage breakdowns."
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {policies.slice(0, 4).map((policy) => (
                  <Link key={policy.id} href={`/policies/${policy.id}`}>
                    <div className="bg-zinc-950 border border-border/40 hover:border-zinc-700/60 p-4 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[110px]">
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-foreground text-xs truncate max-w-[150px]">{policy.name}</span>
                        <Badge className={`text-[9px] px-1.5 py-0 rounded-full ${
                          policy.status === 'analyzed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-zinc-900 text-zinc-400 border-border/40'
                        }`}>
                          {policy.status}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-zinc-500">{formatDate(policy.createdAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Comparison History Widget */}
          <div className="bg-[#070707]/60 border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-zinc-400" />
                <h2 className="text-sm font-bold text-foreground">Policy Comparisons</h2>
              </div>
              <Button asChild variant="ghost" size="sm" className="rounded-lg text-xs font-semibold text-zinc-400 hover:text-foreground">
                <Link href="/compare">Create New</Link>
              </Button>
            </div>

            <div className="space-y-3">
              {policies.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-zinc-900 rounded-xl text-zinc-600 text-xs font-medium">
                  No comparisons simulated yet.
                </div>
              ) : (
                MOCK_COMPARISONS.map((comp) => (
                  <div key={comp.id} className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-border/40 hover:border-zinc-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-border flex items-center justify-center text-zinc-400">
                        <GitCompare className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{comp.nameA} vs {comp.nameB}</div>
                        <span className="text-[9px] text-zinc-500">{formatDate(comp.date)}</span>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20 text-[9px]">{comp.status}</Badge>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Claim eligibility simulation log */}
          <div className="bg-[#070707]/60 border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-zinc-400" />
                <h2 className="text-sm font-bold text-foreground">Recent Claim Checks</h2>
              </div>
              <Button asChild variant="ghost" size="sm" className="rounded-lg text-xs font-semibold text-zinc-400 hover:text-foreground">
                <Link href="/claim-checker">Simulate Claim</Link>
              </Button>
            </div>

            <div className="space-y-3">
              {policies.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-zinc-900 rounded-xl text-zinc-600 text-xs font-medium">
                  No claim checks simulated yet.
                </div>
              ) : (
                MOCK_CLAIMS.map((claim) => (
                  <div key={claim.id} className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-border/40 hover:border-zinc-800 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-border flex items-center justify-center text-zinc-400">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground">{claim.diagnosis} · <span className="font-semibold text-zinc-400">{claim.hospital}</span></div>
                        <span className="text-[9px] text-zinc-500">{claim.bill}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground">{claim.probability} Approval</span>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px]">{claim.status}</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column widgets: Quick Actions, Usage Stats Graph, Activity Timeline */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Actions widget */}
          <div className="bg-[#070707]/60 border border-border rounded-2xl p-6">
            <h2 className="text-sm font-bold text-foreground mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link href="/upload" className="p-3 bg-zinc-950 border border-border/40 hover:border-zinc-700/60 rounded-xl flex flex-col gap-3 justify-between items-start transition-all cursor-pointer">
                <Upload className="w-4 h-4 text-zinc-400" />
                <span className="font-bold text-foreground">Upload Policy</span>
              </Link>
              <Link href="/chat" className="p-3 bg-zinc-950 border border-border/40 hover:border-zinc-700/60 rounded-xl flex flex-col gap-3 justify-between items-start transition-all cursor-pointer">
                <MessageSquare className="w-4 h-4 text-zinc-400" />
                <span className="font-bold text-foreground">AI Policy Chat</span>
              </Link>
              <Link href="/compare" className="p-3 bg-zinc-950 border border-border/40 hover:border-zinc-700/60 rounded-xl flex flex-col gap-3 justify-between items-start transition-all cursor-pointer">
                <GitCompare className="w-4 h-4 text-zinc-400" />
                <span className="font-bold text-foreground">Compare Plans</span>
              </Link>
              <Link href="/claim-checker" className="p-3 bg-zinc-950 border border-border/40 hover:border-zinc-700/60 rounded-xl flex flex-col gap-3 justify-between items-start transition-all cursor-pointer">
                <Calculator className="w-4 h-4 text-zinc-400" />
                <span className="font-bold text-foreground">Claim Checker</span>
              </Link>
            </div>
          </div>

          {/* Usage Statistics SVG Chart */}
          <div className="bg-[#070707]/60 border border-border rounded-2xl p-6">
            <h2 className="text-sm font-bold text-foreground mb-2">Usage Activity</h2>
            <span className="text-[10px] text-zinc-500 block mb-4">Daily document query volume</span>
            
            {/* SVG line graph */}
            <div className="h-28 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                {policies.length === 0 ? (
                  /* Flat zero line */
                  <path
                    d="M 0,38 L 100,38"
                    fill="none"
                    stroke="#18181b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    {/* Area under curve */}
                    <path
                      d="M 0,40 L 0,35 Q 20,15 40,25 T 80,10 L 100,20 L 100,40 Z"
                      fill="url(#gradient-area)"
                      opacity="0.15"
                    />
                    {/* Line path */}
                    <path
                      d="M 0,35 Q 20,15 40,25 T 80,10 L 100,20"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </>
                )}
                
                {/* Definitions for gradient */}
                <defs>
                  <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="flex justify-between items-center text-[9px] text-zinc-500 mt-2 font-mono">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span>Sun</span>
            </div>
          </div>

          {/* Activity Feed widget */}
          <div className="bg-[#070707]/60 border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-zinc-400" />
              <h2 className="text-sm font-bold text-foreground">Activity Feed</h2>
            </div>
            
            <div className="space-y-4 text-[10px]">
              {policies.length === 0 ? (
                <div className="text-center py-4 text-zinc-600 font-medium">
                  No activity recorded.
                </div>
              ) : (
                MOCK_ACTIVITIES.map((act, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className={`w-6 h-6 rounded-lg ${act.color} flex items-center justify-center flex-shrink-0`}>
                      <act.icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-foreground leading-tight">{act.text}</p>
                      <span className="text-[9px] text-zinc-500 block mt-0.5">{act.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
