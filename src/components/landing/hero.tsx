'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
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
  MessageSquare,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [mounted, setMounted] = useState(false);

  // Mouse coordinates for Vercel-style interactive glow tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const mountTimeout = setTimeout(() => {
      setMounted(true);
    }, 0);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Get position relative to viewport
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mountTimeout);
    };
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 px-4 md:px-8 bg-black">
      
      {/* Vercel-style Interactive Glow Tracker */}
      {mounted && (
        <motion.div
          className="absolute pointer-events-none w-[600px] h-[600px] rounded-full blur-[130px] opacity-[0.06] -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block"
          style={{
            left: springX,
            top: springY,
            background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
          }}
        />
      )}

      {/* Cinematic Aurora Glow & Mesh Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Overhead white glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full opacity-[0.07] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 80%)' }}
        />
        
        {/* Vercel grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Abstract floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-zinc-500/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 10, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column: Headline and Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
          
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-zinc-950/80 backdrop-blur-md text-foreground/80 hover:border-zinc-700/60 transition-all text-xs font-medium cursor-default shadow-lg shadow-black/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>PolicyWise AI</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-zinc-500">Intelligent Policy Analysis</span>
          </motion.div>

          {/* Cinematic Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]"
          >
            Understand Your <br />
            <span className="gradient-text-animate">Insurance Policy</span> <br />
            Before It&apos;s Too Late.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed"
          >
            Upload any insurance policy PDF and let AI translate the legal jargon. 
            Instantly detect hidden exclusions, room rent sub-limits, and waiting periods before you make a claim.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 rounded-xl text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 shadow-xl shadow-white/5 hover:-translate-y-0.5 cursor-pointer text-center"
            >
              <a href="#features">
                Explore Features & Scroll to Upload
              </a>
            </Button>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-border/60 w-full text-zinc-500 text-xs"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-zinc-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-zinc-400" />
              <span>Full confidentiality</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-zinc-400" />
              <span>Under 2 minutes</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Layered Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 relative flex items-center justify-center w-full min-h-[400px] lg:min-h-auto"
        >
          {/* Dashboard Frame (Base layer) */}
          <div className="w-full max-w-[460px] aspect-[4/3] rounded-2xl bg-[#090909] border border-border shadow-2xl shadow-black p-4 flex flex-col gap-3 relative overflow-hidden">
            
            {/* Mock sidebar & top bar */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>
              <div className="h-4 w-28 bg-zinc-900 rounded border border-border/40" />
            </div>

            {/* Mock Dashboard Grid */}
            <div className="grid grid-cols-3 gap-3 flex-1">
              
              {/* Quick statistics */}
              <div className="col-span-2 bg-[#0d0d0d] rounded-xl border border-border/40 p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] text-zinc-500">
                  <span>Coverage Analysis</span>
                  <BarChart3 className="w-3 h-3 text-zinc-500" />
                </div>
                {/* Visual mock chart */}
                <div className="h-16 flex items-end gap-1.5 px-1 py-1">
                  {[40, 65, 50, 80, 55, 94].map((val, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-zinc-800 w-full rounded-t"
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 1.2, delay: 0.5 + idx * 0.1, ease: 'easeOut' }}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-baseline text-[10px] font-semibold text-foreground">
                  <span>Active Analysis</span>
                  <span className="text-xs text-white">94%</span>
                </div>
              </div>

              {/* Smaller Action items */}
              <div className="col-span-1 bg-[#0d0d0d] border border-border/40 rounded-xl p-3 flex flex-col justify-between items-center">
                <Shield className="w-5 h-5 text-zinc-500 mt-2" />
                <span className="text-[9px] text-zinc-500 text-center leading-tight">No Risks Found</span>
                <span className="w-full py-1 text-center bg-white text-black font-medium text-[8px] rounded-lg">Safe</span>
              </div>

              {/* Document List mock */}
              <div className="col-span-3 bg-[#0d0d0d] border border-border/40 rounded-xl p-3 flex flex-col gap-2">
                <div className="text-[10px] font-semibold text-foreground">Recent Policy Documents</div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-border/30">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] text-foreground truncate max-w-[120px]">Star_Health_Policy.pdf</span>
                  </div>
                  <span className="text-[9px] text-zinc-500">2.4 MB</span>
                </div>
              </div>

            </div>

          </div>

          {/* Floating glassmorphic cards (Layered above base frame) */}
          
          {/* Card 1: AI Chat bubble - Floating left */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -left-6 top-1/3 glass border border-border/80 p-3 rounded-xl shadow-xl max-w-[200px] flex gap-2.5 items-start hidden sm:flex"
            style={{ y: useSpring(useMotionValue(0), { stiffness: 50, damping: 10 }) }}
          >
            <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-border flex items-center justify-center text-zinc-400 flex-shrink-0">
              <MessageSquare className="w-3 h-3 text-white" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] text-zinc-500 font-semibold uppercase">AI Assistant</span>
              <p className="text-[9px] text-zinc-300 leading-relaxed font-medium">Maternity sub-limit is covered up to ₹50,000.</p>
            </div>
          </motion.div>

          {/* Card 2: Claims simulator check - Floating bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="absolute -right-6 bottom-8 glass border border-border/80 p-3.5 rounded-xl shadow-xl max-w-[180px] flex items-center gap-3 hidden sm:flex"
          >
            <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-border flex items-center justify-center text-emerald-400 flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-zinc-400 font-medium">Claim Approval</span>
              <span className="text-xs font-bold text-foreground">94.2% Likely</span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
