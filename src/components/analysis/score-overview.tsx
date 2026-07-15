'use client';

import { motion } from 'framer-motion';
import { ScoreRing } from '@/components/shared/score-ring';

interface ScoreOverviewProps {
  analysis: {
    coverage_score: number;
    transparency_score: number;
    complexity_score: number;
    risk_score: number;
    waiting_period_score: number;
    claim_friendliness_score: number;
    summary?: string;
  };
}

const SCORES = [
  { key: 'coverage_score', label: 'Coverage', good: 'higher' },
  { key: 'transparency_score', label: 'Transparency', good: 'higher' },
  { key: 'claim_friendliness_score', label: 'Claim Friendly', good: 'higher' },
  { key: 'risk_score', label: 'Risk Level', good: 'lower' },
  { key: 'waiting_period_score', label: 'Waiting Periods', good: 'lower' },
  { key: 'complexity_score', label: 'Complexity', good: 'lower' },
] as const;

export function ScoreOverview({ analysis }: ScoreOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      {analysis.summary && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card border border-border p-6"
        >
          <h2 className="text-base font-semibold text-foreground mb-3">AI Summary</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{analysis.summary}</p>
        </motion.div>
      )}

      {/* Score rings */}
      <div className="rounded-2xl bg-card border border-border p-6">
        <h2 className="text-base font-semibold text-foreground mb-6">Score Overview</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {SCORES.map(({ key, label }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
            >
              <ScoreRing
                score={analysis[key] ?? 0}
                label={label}
                size={100}
                strokeWidth={8}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
