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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden text-center p-12 md:p-20"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-accent/10" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-primary/20" />

          {/* Glow orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #2563EB, transparent 70%)' }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30">
                <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Ready to understand{' '}
              <span className="gradient-text">your policy?</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
              Join thousands of Indians who&apos;ve decoded their insurance with PolicyWise AI.
              Start free, no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 rounded-2xl text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-2xl shadow-primary/30 hover:-translate-y-0.5 transition-all"
              >
                <Link href="/sign-up">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                No credit card required · Free forever
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
