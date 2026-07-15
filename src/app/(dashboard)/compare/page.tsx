'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitCompare,
  FileText,
  Trophy,
  Minus,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScoreRing } from '@/components/shared/score-ring';
import { usePolicies } from '@/hooks/use-policies';
import { cn } from '@/lib/utils';
import type { ComparisonResult } from '@/types';
import { PageHeader } from '@/components/shared/page-header';

export default function ComparePage() {
  const { policies } = usePolicies();
  const [policyAId, setPolicyAId] = useState('');
  const [policyBId, setPolicyBId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!policyAId || !policyBId || policyAId === policyBId) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ policyAId, policyBId }),
      });

      if (!res.ok) throw new Error('Comparison failed');
      const data = await res.json();
      setResult(data.result);
    } catch {
      setError('Failed to compare policies. Make sure both policies have been analyzed.');
    } finally {
      setIsLoading(false);
    }
  };

  const policyA = policies.find((p) => p.id === policyAId);
  const policyB = policies.find((p) => p.id === policyBId);

  return (
    <div className="max-w-5xl space-y-8">
      <PageHeader
        title="Compare Policies"
        description="Compare two insurance policies side by side to find the best one for you."
      />

      {/* Policy selectors */}
      <div className="rounded-2xl bg-card border border-border p-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Policy A</p>
            <Select value={policyAId} onValueChange={(v) => setPolicyAId(v ?? '')}>
              <SelectTrigger className="rounded-xl border-border">
                <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select first policy..." />
              </SelectTrigger>
              <SelectContent>
                {policies.filter((p) => p.id !== policyBId).map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center">
              <GitCompare className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Policy B</p>
            <Select value={policyBId} onValueChange={(v) => setPolicyBId(v ?? '')}>
              <SelectTrigger className="rounded-xl border-border">
                <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select second policy..." />
              </SelectTrigger>
              <SelectContent>
                {policies.filter((p) => p.id !== policyAId).map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleCompare}
            disabled={!policyAId || !policyBId || policyAId === policyBId || isLoading}
            className="rounded-xl px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                AI Comparing...
              </>
            ) : (
              <>
                <GitCompare className="mr-2 w-4 h-4" />
                Compare Policies
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Winner banner */}
            <div className={cn(
              'rounded-2xl border p-6 text-center',
              result.winner === 'tie'
                ? 'bg-muted/30 border-border'
                : 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30'
            )}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Trophy className="w-6 h-6 text-amber-400" />
                <h2 className="text-lg font-bold text-foreground">
                  {result.winner === 'tie'
                    ? "It's a Tie!"
                    : `Policy ${result.winner} Wins!`}
                  {result.winner === 'A' && policyA && ` — ${policyA.name}`}
                  {result.winner === 'B' && policyB && ` — ${policyB.name}`}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">{result.recommendation}</p>
            </div>

            {/* Score comparison */}
            {result.scores && (
              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-6">Score Comparison</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm font-medium text-center mb-4 text-muted-foreground">
                      {policyA?.name || 'Policy A'}
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(result.scores.policyA).map(([key, val]) => (
                        <ScoreRing
                          key={key}
                          score={val as number}
                          label={key.replace(/([A-Z])/g, ' $1')}
                          size={80}
                          strokeWidth={7}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-center mb-4 text-muted-foreground">
                      {policyB?.name || 'Policy B'}
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(result.scores.policyB).map(([key, val]) => (
                        <ScoreRing
                          key={key}
                          score={val as number}
                          label={key.replace(/([A-Z])/g, ' $1')}
                          size={80}
                          strokeWidth={7}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Category comparison */}
            {result.categories && (
              <div className="rounded-2xl bg-card border border-border overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_1fr_auto] border-b border-border">
                  <div className="p-3 text-xs font-semibold text-muted-foreground uppercase">
                    {policyA?.name || 'Policy A'}
                  </div>
                  <div className="p-3 text-xs font-semibold text-muted-foreground uppercase text-center px-6">
                    Category
                  </div>
                  <div className="p-3 text-xs font-semibold text-muted-foreground uppercase text-right">
                    {policyB?.name || 'Policy B'}
                  </div>
                  <div className="p-3 text-xs font-semibold text-muted-foreground uppercase text-center">
                    Winner
                  </div>
                </div>

                {result.categories.map((cat, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1fr_auto_1fr_auto] border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <div className="p-4 text-sm text-muted-foreground">{cat.policyA}</div>
                    <div className="p-4 text-xs font-semibold text-foreground text-center px-6 flex items-center justify-center min-w-32">
                      {cat.name}
                    </div>
                    <div className="p-4 text-sm text-muted-foreground text-right">{cat.policyB}</div>
                    <div className="p-4 flex items-center justify-center">
                      {cat.winner === 'tie' ? (
                        <Minus className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Badge className={cn(
                          'text-xs rounded-full border',
                          cat.winner === 'A'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                            : 'bg-primary/15 text-primary border-primary/20'
                        )}>
                          {cat.winner}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
