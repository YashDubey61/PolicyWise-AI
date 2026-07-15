'use client';

import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  Shield,
  Search,
  BarChart3,
  CheckCircle,
  Sparkles,
  Zap,
  Lock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const FLOATING_ICONS = [
  { Icon: FileText, x: '8%', y: '20%', delay: 0, size: 28 },
  { Icon: Shield, x: '88%', y: '15%', delay: 0.3, size: 32 },
  { Icon: Search, x: '5%', y: '72%', delay: 0.6, size: 24 },
  { Icon: BarChart3, x: '90%', y: '65%', delay: 0.9, size: 30 },
  { Icon: CheckCircle, x: '15%', y: '45%', delay: 1.2, size: 22 },
  { Icon: Sparkles, x: '82%', y: '40%', delay: 1.5, size: 26 },
];

const VALUE_PROPS = [
  { icon: Zap, label: 'Analysis in Minutes', description: 'Not hours of reading' },
  { icon: Shield, label: 'Hidden Risk Detection', description: 'Clauses you\'d miss' },
  { icon: Lock, label: 'Private & Secure', description: 'Your data stays yours' },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-4">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, #2563EB44, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-2/3 right-1/4 w-[400px] h-[400px] translate-x-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, #14B8A644, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating icons */}
      {FLOATING_ICONS.map(({ Icon, x, y, delay, size }, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex items-center justify-center w-14 h-14 rounded-2xl glass border-white/10"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{
            opacity: 0.7,
            scale: 1,
            rotate: 0,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay, duration: 0.5 },
            scale: { delay, duration: 0.5 },
            rotate: { delay, duration: 0.5 },
            y: { delay: delay + 0.5, duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Icon
            style={{ width: size, height: size }}
            className="text-primary/70"
            strokeWidth={1.5}
          />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          AI-Powered Insurance Analysis — Free to Try
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-6"
        >
          Understand Your{' '}
          <span className="gradient-text-animate">Insurance Policy</span>{' '}
          Before It&apos;s Too Late.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Upload any insurance policy PDF and AI explains it in plain English.
          Find hidden exclusions, waiting periods, and room rent limits — before your claim gets rejected.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            asChild
            size="lg"
            className="h-14 px-8 rounded-2xl text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5"
          >
            <Link href="/sign-up">
              <Upload className="mr-2 w-5 h-5" />
              Upload Your Policy — It&apos;s Free
            </Link>
          </Button>
        </motion.div>

        {/* Value props — honest, not fake stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {VALUE_PROPS.map((prop, i) => (
            <motion.div
              key={prop.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <prop.icon className="w-5 h-5 text-primary mx-auto mb-2" strokeWidth={1.5} />
              <div className="text-sm font-semibold text-foreground">{prop.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{prop.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
