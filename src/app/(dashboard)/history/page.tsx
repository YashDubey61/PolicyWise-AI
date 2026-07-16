'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { usePolicies } from '@/hooks/use-policies';
import { FileText, GitCompare, Calculator, Search, ArrowRight, ExternalLink, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MOCK_COMPARISONS = [
  { id: '1', nameA: 'Star Health Premier', nameB: 'HDFC Ergo Optima', date: '2026-07-15', outcome: 'Star Health Wins (4/5 categories)' },
  { id: '2', nameA: 'Niva Bupa ReAssure', nameB: 'Star Health Premier', date: '2026-07-12', outcome: 'Niva Bupa Wins (3/5 categories)' },
];

const MOCK_CLAIMS = [
  { id: '1', diagnosis: 'Dengue Treatment', hospital: 'Max Hospital', bill: '₹45,000', probability: '94%', outcome: 'Approved', date: '2026-07-16' },
  { id: '2', diagnosis: 'Knee Replacement', hospital: 'Fortis Healthcare', bill: '₹2,50,000', probability: '82%', outcome: 'Approved', date: '2026-07-14' },
];

export default function HistoryPage() {
  const { policies, isLoading } = usePolicies();
  const [searchQuery, setSearchQuery] = useState('');
  const [comparisons, setComparisons] = useState(MOCK_COMPARISONS);
  const [claims, setClaims] = useState(MOCK_CLAIMS);
  const [deletingPolicyId, setDeletingPolicyId] = useState<string | null>(null);

  const filteredPolicies = policies.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your comparisons and claims check logs?')) {
      setComparisons([]);
      setClaims([]);
    }
  };

  const deletePolicy = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this policy and all its data?')) return;
    try {
      setDeletingPolicyId(id);
      const res = await fetch('/api/policies', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Delete failed');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to delete policy.');
    } finally {
      setDeletingPolicyId(null);
    }
  };

  const deleteComparison = (id: string) => {
    setComparisons((prev) => prev.filter((c) => c.id !== id));
  };

  const deleteClaim = (id: string) => {
    setClaims((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <PageHeader
        title="History Log"
        description="Browse all your past analyzed policies, side-by-side comparisons, and simulated claims."
        action={
          (comparisons.length > 0 || claims.length > 0) && (
            <Button
              onClick={handleClearHistory}
              variant="outline"
              size="sm"
              className="rounded-xl border-zinc-850 bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              Clear History
            </Button>
          )
        }
      />

      {/* Search Input bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search by policy name or details..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-zinc-950/80 border border-border rounded-xl text-xs text-foreground placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
        />
      </div>

      <Tabs defaultValue="policies" className="space-y-6">
        <TabsList className="bg-zinc-950 border border-border p-1 rounded-xl">
          <TabsTrigger value="policies" className="rounded-lg text-xs font-medium cursor-pointer">
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            Policies ({filteredPolicies.length})
          </TabsTrigger>
          <TabsTrigger value="comparisons" className="rounded-lg text-xs font-medium cursor-pointer">
            <GitCompare className="w-3.5 h-3.5 mr-1.5" />
            Comparisons ({comparisons.length})
          </TabsTrigger>
          <TabsTrigger value="claims" className="rounded-lg text-xs font-medium cursor-pointer">
            <Calculator className="w-3.5 h-3.5 mr-1.5" />
            Claims Checked ({claims.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Policies list */}
        <TabsContent value="policies" className="space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="h-16 bg-[#070707] rounded-xl border border-border animate-pulse" />
              ))}
            </div>
          ) : filteredPolicies.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">No matching policy records found.</div>
          ) : (
            filteredPolicies.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-[#070707]/60 border border-border rounded-2xl hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">{p.name}</h3>
                    <span className="text-[10px] text-zinc-500">{formatDate(p.createdAt)} · {p.fileName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px]">{p.status}</Badge>
                  <Button asChild size="sm" variant="ghost" className="rounded-lg text-xs font-semibold cursor-pointer">
                    <Link href={`/policies/${p.id}`}>
                      View details
                      <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => deletePolicy(p.id)}
                    disabled={deletingPolicyId === p.id}
                    size="sm" 
                    variant="ghost" 
                    className="rounded-lg text-xs font-semibold cursor-pointer text-red-500 hover:text-red-400 hover:bg-red-950/20 h-8 w-8 p-0"
                  >
                    {deletingPolicyId === p.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        {/* Tab 2: Comparisons list */}
        <TabsContent value="comparisons" className="space-y-3">
          {comparisons.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">No comparison history found.</div>
          ) : (
            comparisons.map((comp) => (
              <div key={comp.id} className="flex items-center justify-between p-4 bg-[#070707]/60 border border-border rounded-2xl hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-400">
                    <GitCompare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">{comp.nameA} vs {comp.nameB}</h3>
                    <span className="text-[10px] text-zinc-500">{formatDate(comp.date)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className="bg-zinc-900 text-zinc-400 border-border/40 text-[9px]">{comp.outcome}</Badge>
                  <Button asChild size="sm" variant="ghost" className="rounded-lg text-xs font-semibold cursor-pointer">
                    <Link href="/compare">
                      View
                      <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => deleteComparison(comp.id)}
                    size="sm" 
                    variant="ghost" 
                    className="rounded-lg text-xs font-semibold cursor-pointer text-red-500 hover:text-red-400 hover:bg-red-950/20 h-8 w-8 p-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        {/* Tab 3: Claim simulations list */}
        <TabsContent value="claims" className="space-y-3">
          {claims.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">No claims check history found.</div>
          ) : (
            claims.map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-4 bg-[#070707]/60 border border-border rounded-2xl hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-border flex items-center justify-center text-zinc-400">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">{claim.diagnosis}</h3>
                    <span className="text-[10px] text-zinc-500">{claim.hospital} · {claim.bill} · {formatDate(claim.date)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{claim.probability} Approval</span>
                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px]">{claim.outcome}</Badge>
                  </div>
                  <Button asChild size="sm" variant="ghost" className="rounded-lg text-xs font-semibold cursor-pointer">
                    <Link href="/claim-checker">
                      Check
                      <ExternalLink className="ml-1.5 w-3.5 h-3.5" />
                    </Link>
                  </Button>
                  <Button 
                    onClick={() => deleteClaim(claim.id)}
                    size="sm" 
                    variant="ghost" 
                    className="rounded-lg text-xs font-semibold cursor-pointer text-red-500 hover:text-red-400 hover:bg-red-950/20 h-8 w-8 p-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
