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

      {/* Enhanced Infographic Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Dimension Bars */}
        <div className="rounded-2xl bg-card border border-border p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white">Coverage Dimension Analysis</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Detailed metric analysis compared against premium industry benchmarks.</p>
          </div>
          
          <div className="space-y-4.5">
            {SCORES.map(({ key, label, good }) => {
              const val = analysis[key] ?? 0;
              const benchmark = 75;
              // For risk/waiting/complexity, a lower value is better. But standard display is 0-100.
              const pct = good === 'higher' ? val : (100 - val);
              const color = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444';
              
              return (
                <div key={key} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-300">{label}</span>
                    <span className="text-white">{val}/100</span>
                  </div>
                  <div className="relative h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                    {/* Benchmark Line */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-zinc-700 z-10"
                      style={{ left: `${benchmark}%` }}
                      title="Industry Benchmark (75)"
                    />
                    {/* Progress Bar */}
                    <motion.div 
                      className="absolute top-0 bottom-0 left-0 rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${val}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-zinc-500">
                    <span>{good === 'higher' ? 'Higher is better' : 'Lower is better'}</span>
                    <span>Benchmark: {benchmark}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: SVG Radar / Comparative Chart Area */}
        <div className="rounded-2xl bg-card border border-border p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Policy Performance Matrix</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Visual footprint of your coverage compared to typical policy standards.</p>
          </div>

          {/* SVG Comparative Footprint Chart */}
          <div className="flex-1 flex items-center justify-center py-4">
            <svg className="w-full max-w-[240px] aspect-square" viewBox="0 0 100 100">
              {/* Grids / Concentric Circles */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              
              {/* Axis lines */}
              {Array.from({ length: 6 }).map((_, idx) => {
                const angle = (idx * 60 * Math.PI) / 180;
                const x = 50 + 40 * Math.cos(angle);
                const y = 50 + 40 * Math.sin(angle);
                return (
                  <line 
                    key={idx} 
                    x1="50" 
                    y1="50" 
                    x2={x} 
                    y2={y} 
                    stroke="rgba(255,255,255,0.06)" 
                    strokeWidth="0.5" 
                    strokeDasharray="1 1"
                  />
                );
              })}

              {/* Benchmark Area (Concentric Hexagon) */}
              {(() => {
                const points = Array.from({ length: 6 }).map((_, idx) => {
                  const angle = (idx * 60 * Math.PI) / 180;
                  // Benchmark is at 75% of max radius (which is 40) -> 30
                  const x = 50 + 30 * Math.cos(angle);
                  const y = 50 + 30 * Math.sin(angle);
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <polygon 
                    points={points} 
                    fill="none" 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth="0.75" 
                    strokeDasharray="2 2"
                  />
                );
              })()}

              {/* Actual Policy Footprint Polygon */}
              {(() => {
                const points = SCORES.map(({ key }, idx) => {
                  const val = analysis[key] ?? 0;
                  const angle = (idx * 60 * Math.PI) / 180;
                  // Radius scales from 0 to 40 based on score (0-100)
                  const r = (val / 100) * 40;
                  const x = 50 + r * Math.cos(angle);
                  const y = 50 + r * Math.sin(angle);
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <motion.polygon 
                    points={points} 
                    fill="rgba(255,255,255,0.04)" 
                    stroke="url(#polygon-grad)" 
                    strokeWidth="1.5"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="origin-center"
                  />
                );
              })()}

              {/* Gradients */}
              <defs>
                <linearGradient id="polygon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#d4d4d8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#52525b" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Axis Labels */}
              {SCORES.map(({ label }, idx) => {
                const angle = (idx * 60 * Math.PI) / 180;
                // Offset labels slightly outside radius 40
                const x = 50 + 44 * Math.cos(angle);
                const y = 50 + 44 * Math.sin(angle);
                
                let textAnchor: 'start' | 'end' | 'middle' = 'middle';
                if (Math.cos(angle) > 0.1) textAnchor = 'start';
                else if (Math.cos(angle) < -0.1) textAnchor = 'end';

                return (
                  <text 
                    key={idx} 
                    x={x} 
                    y={y + 1} 
                    fill="#71717a" 
                    fontSize="3.2" 
                    fontWeight="600"
                    textAnchor={textAnchor}
                    className="select-none"
                  >
                    {label}
                  </text>
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[10px] text-zinc-500 border-t border-zinc-900 pt-3 mt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-0.5 bg-white opacity-80" />
              <span>Current Policy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-0.5 border-t border-dashed border-zinc-500" />
              <span>Industry Benchmark</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
