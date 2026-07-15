'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, DollarSign, Shield, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AnalysisSections, ExclusionItem, HiddenClause } from '@/types';

const SEVERITY_CONFIG = {
  high: { label: 'High Risk', className: 'bg-destructive/15 text-destructive border-destructive/20' },
  medium: { label: 'Medium Risk', className: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
  low: { label: 'Low Risk', className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
};

interface SectionTabsProps {
  sections: AnalysisSections;
}

export function SectionTabs({ sections }: SectionTabsProps) {
  if (!sections) return null;

  return (
    <Tabs defaultValue="summary" className="space-y-4">
      <TabsList className="bg-card border border-border rounded-xl p-1 flex flex-wrap gap-1 h-auto">
        <TabsTrigger value="summary" className="rounded-lg text-xs sm:text-sm">Summary</TabsTrigger>
        <TabsTrigger value="coverage" className="rounded-lg text-xs sm:text-sm">Coverage</TabsTrigger>
        <TabsTrigger value="exclusions" className="rounded-lg text-xs sm:text-sm">
          Exclusions {sections.exclusions?.length > 0 && <span className="ml-1 text-destructive">({sections.exclusions.length})</span>}
        </TabsTrigger>
        <TabsTrigger value="waiting" className="rounded-lg text-xs sm:text-sm">Waiting Periods</TabsTrigger>
        <TabsTrigger value="limits" className="rounded-lg text-xs sm:text-sm">Limits</TabsTrigger>
        <TabsTrigger value="hidden" className="rounded-lg text-xs sm:text-sm">
          Hidden Clauses {sections.hiddenClauses?.length > 0 && <span className="ml-1 text-amber-400">({sections.hiddenClauses.length})</span>}
        </TabsTrigger>
      </TabsList>

      {/* Summary */}
      <TabsContent value="summary">
        <div className="rounded-2xl bg-card border border-border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Plain English Summary</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{sections.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Co-Pay</p>
              <p className="text-sm text-foreground">{sections.copay || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Deductibles</p>
              <p className="text-sm text-foreground">{sections.deductibles || 'Not specified'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Network Hospitals</p>
              <p className="text-sm text-foreground">{sections.networkHospitals || 'Not specified'}</p>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Coverage */}
      <TabsContent value="coverage">
        <div className="rounded-2xl bg-card border border-border p-6 space-y-6">
          {sections.coverage && Object.entries(sections.coverage).map(([key, value]) => (
            <div key={key}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h4 className="font-semibold text-foreground text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-4">{value}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* Exclusions */}
      <TabsContent value="exclusions">
        <div className="space-y-3">
          {sections.exclusions?.length === 0 ? (
            <div className="rounded-2xl bg-card border border-border p-8 text-center text-muted-foreground">
              No significant exclusions found. This is a good sign!
            </div>
          ) : (
            sections.exclusions?.map((exclusion: ExclusionItem, i: number) => {
              const config = SEVERITY_CONFIG[exclusion.severity];
              return (
                <div key={i} className="rounded-2xl bg-card border border-border p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={cn('w-4 h-4 flex-shrink-0', exclusion.severity === 'high' ? 'text-destructive' : exclusion.severity === 'medium' ? 'text-amber-400' : 'text-emerald-400')} />
                      <h4 className="font-semibold text-foreground text-sm">{exclusion.item}</h4>
                    </div>
                    <Badge className={cn('text-xs rounded-full border flex-shrink-0', config.className)}>
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-6">{exclusion.explanation}</p>
                </div>
              );
            })
          )}
        </div>
      </TabsContent>

      {/* Waiting Periods */}
      <TabsContent value="waiting">
        <div className="space-y-3">
          {sections.waitingPeriods?.length === 0 ? (
            <div className="rounded-2xl bg-card border border-border p-8 text-center text-muted-foreground">
              No specific waiting periods found.
            </div>
          ) : (
            sections.waitingPeriods?.map((wp, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <h4 className="font-semibold text-foreground text-sm">{wp.condition}</h4>
                  </div>
                  <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/20 rounded-full text-xs border">
                    {wp.period}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">{wp.details}</p>
              </div>
            ))
          )}
        </div>
      </TabsContent>

      {/* Claim Limits */}
      <TabsContent value="limits">
        <div className="space-y-3">
          {sections.claimLimits?.length === 0 ? (
            <div className="rounded-2xl bg-card border border-border p-8 text-center text-muted-foreground">
              No specific claim limits found.
            </div>
          ) : (
            sections.claimLimits?.map((limit, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-foreground text-sm">{limit.type}</h4>
                  </div>
                  <Badge className="bg-primary/15 text-primary border-primary/20 rounded-full text-xs border">
                    {limit.limit}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">{limit.details}</p>
              </div>
            ))
          )}
        </div>
      </TabsContent>

      {/* Hidden Clauses */}
      <TabsContent value="hidden">
        <div className="space-y-3">
          {sections.hiddenClauses?.length === 0 ? (
            <div className="rounded-2xl bg-card border border-border p-8 text-center text-muted-foreground">
              No suspicious hidden clauses detected. 🎉
            </div>
          ) : (
            sections.hiddenClauses?.map((clause: HiddenClause, i: number) => {
              const config = SEVERITY_CONFIG[clause.risk];
              return (
                <div key={i} className={cn(
                  'rounded-2xl border p-5',
                  clause.risk === 'high' ? 'bg-destructive/5 border-destructive/20' : 'bg-card border-border'
                )}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className={cn('w-4 h-4 flex-shrink-0', clause.risk === 'high' ? 'text-destructive' : 'text-amber-400')} />
                      <h4 className="font-semibold text-foreground text-sm">{clause.clause}</h4>
                    </div>
                    <Badge className={cn('text-xs rounded-full border flex-shrink-0', config.className)}>
                      {clause.clauseNumber}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-6">{clause.explanation}</p>
                </div>
              );
            })
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
