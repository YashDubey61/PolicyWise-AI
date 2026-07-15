'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Upload,
  Sparkles,
  ArrowRight,
  Shield,
  FileText,
  FileCheck,
  Search,
  MessageSquare,
  HelpCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStep, setActiveStep] = useState(0); // 0: Idle/Drag, 1: Uploading, 2: Scanning, 3: Completed Insights
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scanPage, setScanPage] = useState(1);

  // Auto-run simulation when in view
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isInView && activeStep === 0) {
      // Transition to uploading after 2 seconds
      timer = setTimeout(() => {
        setActiveStep(1);
      }, 2500);
    } else if (activeStep === 1) {
      // Animate progress bar
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setActiveStep(2);
          }, 800);
        }
      }, 100);
      return () => clearInterval(progressInterval);
    } else if (activeStep === 2) {
      // Simulate page scanning
      let page = 1;
      const scanInterval = setInterval(() => {
        page += 1;
        setScanPage(page);
        if (page > 3) {
          clearInterval(scanInterval);
          setTimeout(() => {
            setActiveStep(3);
          }, 800);
        }
      }, 1200);
      return () => clearInterval(scanInterval);
    }

    return () => clearTimeout(timer);
  }, [isInView, activeStep]);

  const handleReset = () => {
    setActiveStep(0);
    setUploadProgress(0);
    setScanPage(1);
  };

  return (
    <section id="how-it-works" className="py-28 px-4 bg-[#050505]/40 border-b border-border/40" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Step narration */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-3">
              Interactive Demo
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              Experience the <br />
              <span className="gradient-text-animate">intelligence.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mt-4">
              Watch how our deep-analysis engine reads through complex policies, pulls key exclusions, and generates instant claims profiles.
            </p>
          </div>

          {/* Steps indicators */}
          <div className="space-y-4">
            
            {/* Step 1 */}
            <div className={`flex gap-4 p-3 rounded-xl transition-all duration-200 ${activeStep === 0 ? 'bg-zinc-950 border border-border' : 'opacity-50'}`}>
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-border flex items-center justify-center text-xs font-bold text-foreground">1</div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Drag & Drop Policy</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Simulate uploading your policy PDF.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`flex gap-4 p-3 rounded-xl transition-all duration-200 ${activeStep === 1 || activeStep === 2 ? 'bg-zinc-950 border border-border' : 'opacity-50'}`}>
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-border flex items-center justify-center text-xs font-bold text-foreground">2</div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Deep Scanning</h4>
                <p className="text-xs text-zinc-500 mt-0.5">AI reads pages and identifies key clauses.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`flex gap-4 p-3 rounded-xl transition-all duration-200 ${activeStep === 3 ? 'bg-zinc-950 border border-border' : 'opacity-50'}`}>
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-border flex items-center justify-center text-xs font-bold text-foreground">3</div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Instant Summary</h4>
                <p className="text-xs text-zinc-500 mt-0.5">Coverage scores and risk warnings appear.</p>
              </div>
            </div>

          </div>

          {activeStep === 3 && (
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="rounded-xl border-border text-xs font-medium cursor-pointer"
            >
              <RotateCcw className="mr-2 w-3.5 h-3.5" />
              Replay Demo
            </Button>
          )}

        </div>

        {/* Right Side: Demo Screen Simulator */}
        <div className="lg:col-span-7 flex justify-center w-full relative">
          
          <div className="w-full max-w-[540px] aspect-[4/3] rounded-2xl bg-[#090909] border border-border shadow-2xl overflow-hidden flex flex-col justify-between p-4 relative">
            
            {/* Mock Screen Header */}
            <div className="flex items-center justify-between border-b border-border/50 pb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-foreground">PolicyWise Console</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-border/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-border/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-border/40" />
              </div>
            </div>

            {/* Display Arena */}
            <div className="flex-1 py-6 flex flex-col items-center justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* Step 0: Idle/Drag simulator */}
                {activeStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center gap-4 text-center cursor-pointer group"
                    onClick={() => setActiveStep(1)}
                  >
                    {/* Animated Cursor Dragging PDF */}
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/60 flex items-center justify-center text-zinc-500 group-hover:border-zinc-500 transition-colors">
                        <Upload className="w-7 h-7" />
                      </div>
                      
                      {/* Dragging Mockup Indicator */}
                      <motion.div
                        className="absolute -right-8 -bottom-6 flex items-center gap-1.5 bg-zinc-900 border border-border px-2 py-1.5 rounded-lg shadow-lg"
                        animate={{ x: [-20, 0], y: [-20, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                      >
                        <FileText className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-[8px] text-zinc-300 font-mono">health_policy.pdf</span>
                      </motion.div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-foreground">Drag insurance policy PDF here</p>
                      <p className="text-[10px] text-zinc-500">Supports documents up to 20MB</p>
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Uploading bar */}
                {activeStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-xs flex flex-col gap-3 text-center"
                  >
                    <div className="flex justify-between text-[10px] text-zinc-400">
                      <span>Uploading health_policy.pdf</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-border/30">
                      <motion.div
                        className="h-full bg-white"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-[9px] text-zinc-500 font-mono">Encrypting in transit (TLS 1.3)...</p>
                  </motion.div>
                )}

                {/* Step 2: Scanning Effect */}
                {activeStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-sm flex items-center gap-6 relative"
                  >
                    {/* Page mockup with scan beam */}
                    <div className="w-24 h-32 rounded-lg bg-[#0d0d0d] border border-border/60 relative overflow-hidden flex-shrink-0 flex flex-col gap-1.5 p-2.5">
                      {/* Scanning laser line */}
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-white/40 shadow-[0_0_8px_white]"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      {[...Array(6)].map((_, idx) => (
                        <div key={idx} className="h-1 bg-zinc-800 rounded" style={{ width: `${60 + (idx % 3) * 15}%` }} />
                      ))}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="text-xs font-semibold text-foreground">AI Scanning Document</div>
                      <div className="flex flex-col gap-1.5 text-[9px] font-mono text-zinc-500">
                        <div className="flex items-center gap-1.5 text-zinc-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Page {scanPage} of 3 processed</span>
                        </div>
                        <div>• Parsing insurance definitions</div>
                        <div>• Mapping waiting exclusions</div>
                        <div>• Compiling room rent limits</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Completed Insights Dashboard */}
                {activeStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full flex flex-col gap-4 text-[10px]"
                  >
                    
                    {/* Overview row */}
                    <div className="grid grid-cols-3 gap-3">
                      
                      <div className="bg-[#0c0c0c] border border-border/40 p-3 rounded-xl flex flex-col gap-1 items-center">
                        <span className="text-[8px] text-zinc-500 uppercase font-semibold">Coverage Score</span>
                        <span className="text-sm font-extrabold text-foreground">85/100</span>
                      </div>

                      <div className="bg-[#0c0c0c] border border-border/40 p-3 rounded-xl flex flex-col gap-1 items-center">
                        <span className="text-[8px] text-zinc-500 uppercase font-semibold">Room Rent</span>
                        <span className="text-xs font-bold text-red-400">1% Cap</span>
                      </div>

                      <div className="bg-[#0c0c0c] border border-border/40 p-3 rounded-xl flex flex-col gap-1 items-center">
                        <span className="text-[8px] text-zinc-500 uppercase font-semibold">Maternity</span>
                        <span className="text-xs font-bold text-emerald-400">Covered</span>
                      </div>

                    </div>

                    {/* Exclusions checklist */}
                    <div className="bg-[#0c0c0c] border border-border/40 p-3 rounded-xl space-y-2">
                      <div className="font-semibold text-foreground">Critical Clauses Found</div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span>Waiting period for pre-existing disease</span>
                          <span className="font-semibold text-foreground">36 Months</span>
                        </div>
                        <div className="flex items-center justify-between text-zinc-400">
                          <span>Deductible amount</span>
                          <span className="font-semibold text-foreground">₹10,000 / Year</span>
                        </div>
                      </div>
                    </div>

                    {/* Next suggestions */}
                    <div className="flex gap-2">
                      <div className="flex-1 bg-zinc-950 border border-border/60 p-2 rounded-lg text-zinc-400 text-center font-medium hover:border-zinc-500 cursor-pointer">
                        Ask about claims
                      </div>
                      <div className="flex-1 bg-zinc-950 border border-border/60 p-2 rounded-lg text-zinc-400 text-center font-medium hover:border-zinc-500 cursor-pointer">
                        Compare policies
                      </div>
                    </div>

                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Mock Screen Footer */}
            <div className="h-6 flex items-center justify-between text-[9px] text-zinc-500 border-t border-border/40 pt-2 flex-shrink-0">
              <span className="flex items-center gap-1">
                <FileCheck className="w-3 h-3 text-zinc-400" />
                <span>health_policy_summary.json</span>
              </span>
              <span>Status: {activeStep === 3 ? 'Completed' : activeStep === 2 ? 'Scanning...' : activeStep === 1 ? 'Uploading...' : 'Idle'}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
