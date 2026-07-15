'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  MessageSquare,
  Sparkles,
  GitCompare,
  ArrowRight,
  Calculator,
  Check,
  FileText,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

/* ── MOCK SIMULATOR COMPONENTS ───────────────────────── */

// Feature 1: AI Chat Simulator
function ChatSimulator() {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const fullTextUser = 'Are there waiting periods for pre-existing diseases?';
  const fullTextAI =
    'Yes, according to Section 5.1 (Specific Exclusions), there is a 24-month waiting period for joint replacements and a 48-month waiting period for any pre-existing ailments declared at sign-up.';

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (step === 0) {
      // Type user message
      let charIndex = 0;
      interval = setInterval(() => {
        setTypedText(fullTextUser.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex >= fullTextUser.length) {
          clearInterval(interval);
          setTimeout(() => setStep(1), 1000); // Wait, then switch to thinking
        }
      }, 50);
    } else if (step === 1) {
      // Thinking state
      interval = setTimeout(() => {
        setStep(2); // Switch to AI response
        setTypedText('');
      }, 2000);
    } else if (step === 2) {
      // Stream AI message
      let charIndex = 0;
      interval = setInterval(() => {
        setTypedText(fullTextAI.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex >= fullTextAI.length) {
          clearInterval(interval);
          setTimeout(() => {
            // Restart loop
            setTimeout(() => {
              setStep(0);
              setTypedText('');
            }, 4000);
          }, 1000);
        }
      }, 25);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(interval);
    };
  }, [step]);

  return (
    <div className="w-full max-w-[440px] aspect-[4/3] rounded-2xl bg-[#090909] border border-border p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
      
      {/* Ambient background glow */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 rounded-3xl blur-2xl opacity-50 pointer-events-none z-0" />
      
      {/* Glow highlight under the card */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-24 rounded-full bg-white/[0.02] blur-xl opacity-30 z-0 pointer-events-none group-hover:bg-white/[0.04] transition-colors" />

      {/* Top chat header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-3 flex-shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-zinc-950 border border-border flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-bold text-foreground">AI Policy Assistant</span>
        </div>
        <span className="text-[10px] text-zinc-500 font-mono">Star_Health_Premier.pdf</span>
      </div>

      {/* Message space */}
      <div className="flex-1 py-4 flex flex-col gap-4 overflow-y-auto text-xs relative z-10">
        
        {/* User message */}
        {(step === 0 || step === 1 || step === 2) && (
          <div className="flex gap-2 flex-row-reverse items-start">
            <div className="w-6 h-6 rounded-full bg-zinc-800 border border-border/60 flex items-center justify-center text-[9px] text-zinc-300 font-semibold flex-shrink-0">U</div>
            <div className="bg-[#121212] border border-border text-foreground px-3 py-2 rounded-xl rounded-tr-none max-w-[80%]">
              {step === 0 ? typedText : fullTextUser}
              {step === 0 && <span className="inline-block w-1.5 h-3 bg-zinc-400 ml-0.5 animate-pulse" />}
            </div>
          </div>
        )}

        {/* AI response */}
        {step === 1 && (
          <div className="flex gap-2 items-start">
            <div className="relative w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <motion.span
                className="absolute inset-0 rounded-full bg-white/30 -z-10"
                animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <Sparkles className="w-3.5 h-3.5 text-black" />
            </div>
            <div className="bg-zinc-950 border border-border px-3 py-2.5 rounded-xl rounded-tl-none flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-zinc-500"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex gap-2 items-start">
            <div className="relative w-6 h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <motion.span
                className="absolute inset-0 rounded-full bg-white/20 -z-10"
                animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
              />
              <Sparkles className="w-3.5 h-3.5 text-black" />
            </div>
            <div className="bg-zinc-950 border border-border text-zinc-300 px-3 py-2.5 rounded-xl rounded-tl-none max-w-[80%] leading-relaxed">
              {typedText}
              {typedText.length < fullTextAI.length && (
                <span className="inline-block w-1.5 h-3 bg-white ml-0.5 animate-pulse" />
              )}
            </div>
          </div>
        )}

      </div>

      {/* Input bar */}
      <div className="h-10 rounded-xl bg-zinc-950 border border-border/60 flex items-center justify-between px-3 flex-shrink-0 opacity-60 relative z-10">
        <span className="text-[10px] text-zinc-600">Ask about waiting periods or deductibles...</span>
        <div className="w-5 h-5 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-500">
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>

    </div>
  );
}

// Feature 2: Policy Comparison Simulator
function CompareSimulator() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-[440px] aspect-[4/3] rounded-2xl bg-[#090909] border border-border p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
      
      {/* Ambient background glow */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 rounded-3xl blur-2xl opacity-50 pointer-events-none z-0" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-3 flex-shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-bold text-foreground">Policy Comparison</span>
        </div>
        <Badge className="bg-zinc-900 border border-border text-[9px] px-1.5 py-0">Delta Scan</Badge>
      </div>

      {/* Display Arena */}
      <div className="flex-1 py-4 flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            // Drag-drop mockup
            <motion.div
              key="stage-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-16 rounded-xl border border-dashed border-zinc-700 bg-zinc-950/60 flex flex-col items-center justify-center text-zinc-500"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FileText className="w-6 h-6 mb-1 text-zinc-400" />
                  <span className="text-[7px]">Policy A</span>
                </motion.div>
                
                <div className="w-6 h-px border-t border-dashed border-zinc-700" />
                
                <motion.div 
                  className="w-14 h-16 rounded-xl border border-dashed border-zinc-700 bg-zinc-950/60 flex flex-col items-center justify-center text-zinc-500"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                >
                  <FileText className="w-6 h-6 mb-1 text-zinc-400" />
                  <span className="text-[7px]">Policy B</span>
                </motion.div>
              </div>
              <p className="text-[10px] text-zinc-500">Drop two policy PDFs side-by-side to inspect difference</p>
            </motion.div>
          )}

          {stage === 1 && (
            // Processing mockup with laser scanner
            <motion.div
              key="stage-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 text-center w-full h-full justify-center relative"
            >
              {/* Vertical Laser scanning line */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative w-10 h-10 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full border border-zinc-800 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />
                <GitCompare className="w-4 h-4 text-zinc-400" />
              </div>
              <p className="text-[10px] text-zinc-400 animate-pulse">Analyzing coverage parameters...</p>
            </motion.div>
          )}

          {stage === 2 && (
            // Comparison Grid Mockup
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col gap-2 text-[10px]"
            >
              <div className="grid grid-cols-3 gap-2 font-semibold text-zinc-500 pb-1 border-b border-border/40">
                <span>Metric</span>
                <span>Star Premier</span>
                <span>HDFC Optima</span>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-3 gap-2 py-1 items-center border-b border-border/30"
              >
                <span className="text-zinc-400">Sum Insured</span>
                <span>₹10 Lakhs</span>
                <span>₹10 Lakhs</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="grid grid-cols-3 gap-2 py-1 items-center border-b border-border/30"
              >
                <span className="text-zinc-400">Room Rent</span>
                <span className="text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded text-center">1% Sub-limit</span>
                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-center">No Limit</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-2 py-1 items-center"
              >
                <span className="text-zinc-400">Restoration</span>
                <span className="text-zinc-500">100% Once</span>
                <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-center font-bold">Unlimited</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer advice */}
      <div className="h-6 flex items-center justify-between text-[9px] text-zinc-500 border-t border-border/40 pt-2 flex-shrink-0">
        <span>Star Premier vs HDFC Optima Secure</span>
        <span className="text-emerald-400 font-semibold">HDFC Optima Wins (4/5)</span>
      </div>

    </div>
  );
}

// Feature 3: Claim Checker Simulator
function ClaimSimulator() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (stage === 0) {
      interval = setTimeout(() => setStage(1), 1500); // Hold form, then scan
    } else if (stage === 1) {
      // Simulate progress load
      let val = 0;
      interval = setInterval(() => {
        val += 4;
        setProgress(Math.min(val, 92));
        if (val >= 92) {
          clearInterval(interval);
          setTimeout(() => setStage(2), 1500);
        }
      }, 50);
    } else if (stage === 2) {
      // Hold result, then reset
      interval = setTimeout(() => {
        setProgress(0);
        setStage(0);
      }, 5000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(interval);
    };
  }, [stage]);

  return (
    <div className="w-full max-w-[440px] aspect-[4/3] rounded-2xl bg-[#090909] border border-border p-4 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
      
      {/* Ambient background glow */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 rounded-3xl blur-2xl opacity-50 pointer-events-none z-0" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 pb-3 flex-shrink-0 relative z-10">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-bold text-foreground">Claim Eligibility Checker</span>
        </div>
        <span className="text-[10px] text-zinc-500">Claim Simulator</span>
      </div>

      {/* Simulator Arena */}
      <div className="flex-1 py-4 flex flex-col justify-center text-[10px] relative z-10">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            // Simulation details card
            <motion.div
              key="stage-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2.5"
            >
              <div className="text-xs font-semibold text-foreground">Submit Claim Scenario</div>
              
              <div className="flex flex-col gap-1">
                <span className="text-zinc-500">Diagnosis / Surgery</span>
                <div className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-border text-foreground">Kidney Stone Laser Treatment</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-500">Hospital Type</span>
                  <div className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-border text-foreground">Network (Fortis)</div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-500">Estimated Bill</span>
                  <div className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-border text-foreground">₹1,20,000</div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === 1 && (
            // Progress scan timeline with circular sweep glow
            <motion.div
              key="stage-scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3 justify-center items-center h-full relative"
            >
              <div className="relative w-14 h-14 flex items-center justify-center">
                {/* Looping glowing sweep circle */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/10"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
                
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" className="stroke-zinc-800" strokeWidth="3" fill="transparent" />
                  <circle cx="28" cy="28" r="24" className="stroke-white transition-all duration-75" strokeWidth="3" fill="transparent"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 * (1 - progress / 100)}
                  />
                </svg>
                <span className="absolute text-xs font-bold text-foreground">{progress}%</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] text-zinc-500 animate-pulse">Running verification sequence...</span>
                <span className="text-[10px] text-zinc-400">Verifying Deductibles & Waiting Periods</span>
              </div>
            </motion.div>
          )}

          {stage === 2 && (
            // Results screen with green outcome glow
            <motion.div
              key="stage-result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 relative overflow-hidden">
                {/* Glowing green banner aura */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl -z-10 pointer-events-none" />

                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-emerald-500 uppercase tracking-widest font-bold">Eligibility Outcome</span>
                  <span className="text-sm font-extrabold text-foreground">92% Likely Approved</span>
                </div>
                <div className="relative w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  {/* Pulsing check mark circle */}
                  <motion.span
                    className="absolute inset-0 rounded-full bg-emerald-500/20 -z-10"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                  <Check className="w-4 h-4" />
                </div>
              </div>

              <div className="flex flex-col gap-1 text-[9px] text-zinc-400 leading-relaxed bg-[#0d0d0d] p-3 rounded-lg border border-border/40">
                <span className="font-semibold text-foreground mb-1 block">AI Analysis Breakdown:</span>
                • Hospital is inside active Network Directory (No co-pay).<br />
                • Laser Kidney Treatment waiting period (24-months) has elapsed.<br />
                • Estimated out-of-pocket: ₹8,000 (Deductibles).
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer advice */}
      <div className="h-6 flex items-center justify-between text-[9px] text-zinc-500 border-t border-border/40 pt-2 flex-shrink-0">
        <span>Disclaimer: Simulated projection.</span>
        <span className="text-zinc-400">Policy ID: 89a2-f94</span>
      </div>

    </div>
  );
}

/* ── MAIN COMPONENT ────────────────────────────────────── */

export function Features() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const section1InView = useInView(section1Ref, { amount: 0.35, once: false });
  const section2InView = useInView(section2Ref, { amount: 0.35, once: false });
  const section3InView = useInView(section3Ref, { amount: 0.35, once: false });

  return (
    <div id="features" className="bg-black relative">
      
      {/* Feature Section 1: AI Policy Assistant */}
      <section ref={section1Ref} className="min-h-screen flex items-center py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-border/40 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Details */}
          <div className="lg:col-span-6 space-y-6">
            <Badge className="bg-zinc-900 border border-border text-xs px-3 py-1 font-semibold text-zinc-400 mb-2 cursor-default">
              <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-zinc-400 inline" />
              AI Copilot
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Say goodbye to reading <br />
              <span className="gradient-text-animate">fine print documents.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Our AI Policy Assistant translates dense legal jargon into plain English. 
              Ask anything about waiting periods, sub-limits, deductibles, and room-rent limits, 
              and get answers cited with exact clause numbers.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-semibold text-zinc-500">
              <div className="flex items-center gap-2 border border-border/40 bg-zinc-950/40 p-3.5 rounded-xl">
                <Check className="w-4 h-4 text-white" />
                <span>Clause Citations</span>
              </div>
              <div className="flex items-center gap-2 border border-border/40 bg-zinc-950/40 p-3.5 rounded-xl">
                <Check className="w-4 h-4 text-white" />
                <span>Plain English Translation</span>
              </div>
            </div>
          </div>

          {/* Interactive Screen Showcase */}
          <div className="lg:col-span-6 flex justify-center w-full relative">
            <AnimatePresence>
              {section1InView && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex justify-center"
                >
                  <ChatSimulator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Feature Section 2: Policy Comparison */}
      <section ref={section2Ref} className="min-h-screen flex items-center py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-border/40 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Details */}
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <Badge className="bg-zinc-900 border border-border text-xs px-3 py-1 font-semibold text-zinc-400 mb-2 cursor-default">
              <GitCompare className="w-3.5 h-3.5 mr-1.5 text-zinc-400 inline" />
              Compare Policies
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Compare policies <br />
              <span className="gradient-text-animate">side-by-side.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Thinking of buying a new plan? Upload two policy documents and let AI cross-reference 
              them instantly. Compare sum insured options, co-payments, and restoration clauses, 
              complete with a direct recommendation.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-semibold text-zinc-500">
              <div className="flex items-center gap-2 border border-border/40 bg-zinc-950/40 p-3.5 rounded-xl">
                <Check className="w-4 h-4 text-white" />
                <span>Delta Highlight Scans</span>
              </div>
              <div className="flex items-center gap-2 border border-border/40 bg-zinc-950/40 p-3.5 rounded-xl">
                <Check className="w-4 h-4 text-white" />
                <span>Wins/Losses Breakdown</span>
              </div>
            </div>
          </div>

          {/* Interactive Screen Showcase */}
          <div className="lg:col-span-6 lg:order-1 flex justify-center w-full relative">
            <AnimatePresence>
              {section2InView && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex justify-center"
                >
                  <CompareSimulator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Feature Section 3: Claim Checker */}
      <section ref={section3Ref} className="min-h-screen flex items-center py-20 px-4 md:px-8 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Details */}
          <div className="lg:col-span-6 space-y-6">
            <Badge className="bg-zinc-900 border border-border text-xs px-3 py-1 font-semibold text-zinc-400 mb-2 cursor-default">
              <Calculator className="w-3.5 h-3.5 mr-1.5 text-zinc-400 inline" />
              Claim Checker
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Pre-check your claim <br />
              <span className="gradient-text-animate">before hospital admission.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg">
              Simulate surgery claims before entering the hospital. Our Claim Checker calculates 
              expected approval probabilities, flags hidden deductibles, and outlines the exact 
              supporting paperwork you will need to guarantee reimbursement.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-semibold text-zinc-500">
              <div className="flex items-center gap-2 border border-border/40 bg-zinc-950/40 p-3.5 rounded-xl">
                <Check className="w-4 h-4 text-white" />
                <span>Approval Probability Score</span>
              </div>
              <div className="flex items-center gap-2 border border-border/40 bg-zinc-950/40 p-3.5 rounded-xl">
                <Check className="w-4 h-4 text-white" />
                <span>Document Checklist</span>
              </div>
            </div>
          </div>

          {/* Interactive Screen Showcase */}
          <div className="lg:col-span-6 flex justify-center w-full relative">
            <AnimatePresence>
              {section3InView && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full flex justify-center"
                >
                  <ClaimSimulator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  );
}
