import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { ScoreOverview } from '@/components/analysis/score-overview';
import { SectionTabs } from '@/components/analysis/section-tabs';
import { PageHeader } from '@/components/shared/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare, Calculator } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { DeletePolicyButton } from '@/components/policies/delete-policy-button';

interface PolicyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Policy Analysis — ${id}`,
  };
}

export default async function PolicyAnalysisPage({ params }: PolicyPageProps) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) notFound();

  const supabase = createServerSupabaseClient();

  const { data: policy } = await supabase
    .from('policies')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (!policy) notFound();

  const { data: analysis } = await supabase
    .from('analyses')
    .select('*')
    .eq('policy_id', id)
    .single();

  return (
    <div className="space-y-8 max-w-7xl">
      <PageHeader
        title={policy.name}
        description={`Analyzed on ${formatDate(policy.created_at)} · ${policy.file_name}`}
        action={
          <div className="flex items-center gap-3">
            <Badge
              className={`rounded-full text-xs ${
                policy.status === 'analyzed'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                  : 'bg-primary/15 text-primary border-primary/20'
              }`}
            >
              {policy.status}
            </Badge>
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link href={`/chat?policyId=${id}`}>
                <MessageSquare className="mr-1.5 w-4 h-4" />
                Ask AI
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link href={`/claim-checker?policyId=${id}`}>
                <Calculator className="mr-1.5 w-4 h-4" />
                Check Claim
              </Link>
            </Button>
            <DeletePolicyButton policyId={id} />
          </div>
        }
      />

      {analysis ? (
        <>
          <ScoreOverview analysis={analysis} />
          <SectionTabs sections={analysis.sections} />
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[300px] text-muted-foreground">
          <p>Analysis is being processed. Please refresh in a moment.</p>
        </div>
      )}
    </div>
  );
}
