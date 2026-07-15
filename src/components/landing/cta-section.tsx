'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden text-center p-12 md:p-16 bg-[#070707] border border-border"
        >
          {/* Subtle overhead glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-10 blur-[80px]"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)' }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-border flex items-center justify-center shadow-2xl">
                <Shield className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Ready to understand{' '}
              <span className="gradient-text-animate">your policy?</span>
            </h2>

            <p className="text-sm text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
              Join thousands of policyholders who have decoded their insurance policies.
              Start now and understand your coverage in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-xl text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all shadow-xl shadow-white/5 hover:-translate-y-0.5 cursor-pointer"
              >
                <Link href="/sign-up">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
