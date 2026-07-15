'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Upload, Sparkles, BarChart3, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    Icon: Upload,
    title: 'Upload Your Policy',
    description:
      'Drag and drop any insurance policy PDF — health, life, auto, or home. We support documents up to 20MB.',
    color: '#2563EB',
  },
  {
    step: '02',
    Icon: Sparkles,
    title: 'AI Analyzes Everything',
    description:
      'Our AI reads every clause, identifies hidden risks, calculates scores, and maps out all your coverage details.',
    color: '#14B8A6',
  },
  {
    step: '03',
    Icon: BarChart3,
    title: 'Get Clear Insights',
    description:
      'Receive scores, plain-English summaries, exclusions explained, and chat with your policy anytime.',
    color: '#22C55E',
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="how-it-works" className="py-24 px-4 bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Get clarity in{' '}
            <span className="gradient-text">3 simple steps</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            From upload to insights in under 2 minutes. No setup, no learning curve.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting lines (desktop only) */}
          <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-px" style={{
            background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)'
          }} />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              {/* Step number + icon */}
              <div className="relative mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}22, ${step.color}11)`,
                    border: `1px solid ${step.color}33`,
                  }}
                >
                  <step.Icon
                    className="w-9 h-9"
                    style={{ color: step.color }}
                    strokeWidth={1.5}
                  />
                </div>
                {/* Step badge */}
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: step.color }}
                >
                  {i + 1}
                </div>
              </div>

              {/* Arrow between steps (mobile) */}
              {i < STEPS.length - 1 && (
                <div className="md:hidden mb-6">
                  <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
                </div>
              )}

              <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
