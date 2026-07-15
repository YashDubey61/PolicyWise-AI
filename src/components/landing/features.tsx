'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Clock,
  Languages,
  AlertTriangle,
  MessageSquare,
  Shield,
  TrendingUp,
} from 'lucide-react';

const FEATURES = [
  {
    Icon: Clock,
    title: 'Understand in Minutes',
    description:
      'Upload your policy and get a complete plain-English analysis in under 2 minutes. No more reading 50-page documents filled with confusing terms.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    Icon: Languages,
    title: 'No Legal Jargon',
    description:
      'Every clause is explained in everyday language. We translate "subrogation rights" and "indemnification clauses" into words anyone can understand.',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
  },
  {
    Icon: AlertTriangle,
    title: 'Hidden Risks Detection',
    description:
      'AI identifies suspicious clauses, hidden exclusions, sub-limits, and potential claim rejection triggers that insurers bury in fine print.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    Icon: MessageSquare,
    title: 'AI Policy Chat',
    description:
      'Ask any question about your policy and get instant, accurate answers with exact clause citations. "Will knee surgery be covered?" — answered in seconds.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    Icon: Shield,
    title: 'Coverage Score',
    description:
      'Get a 0-100 score across 6 dimensions — Coverage, Transparency, Complexity, Risk, Waiting Periods, and Claim Friendliness. Know exactly where you stand.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    Icon: TrendingUp,
    title: 'Claim Prediction',
    description:
      'Simulate a claim before you make it. Enter your diagnosis, hospital bill, and hospital type — and know your approval chances and estimated reimbursement.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" className="py-24 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Everything you need to{' '}
            <span className="gradient-text">decode your insurance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop guessing what your policy covers. PolicyWise AI gives you the clarity you deserve.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-border/60 transition-all duration-300 cursor-default"
              style={{
                boxShadow: '0 0 0 0 transparent',
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: '0 8px 32px rgba(37,99,235,0.08)' }}
              />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-5`}>
                <feature.Icon className={`w-6 h-6 ${feature.color}`} strokeWidth={1.5} />
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
