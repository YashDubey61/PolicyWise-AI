'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer, Bangalore',
    initials: 'PS',
    color: '#2563EB',
    rating: 5,
    quote:
      'I uploaded my health policy and within minutes found out my room rent was capped at ₹3,000/day. My hospital costs ₹8,000/day. This tool saved me from a rude shock during my surgery.',
  },
  {
    name: 'Rahul Verma',
    role: 'Business Owner, Delhi',
    initials: 'RV',
    color: '#14B8A6',
    rating: 5,
    quote:
      'The hidden clauses section is incredible. My policy had a 90-day waiting period for accidents I never knew about. PolicyWise caught it in seconds.',
  },
  {
    name: 'Ananya Krishnan',
    role: 'Doctor, Chennai',
    initials: 'AK',
    color: '#22C55E',
    rating: 5,
    quote:
      'The AI chat feature is brilliant. I asked "Is my appendix surgery covered?" and got a detailed answer with the exact clause number. Couldn\'t have found that in the 60-page document.',
  },
  {
    name: 'Vikram Patel',
    role: 'Finance Professional, Mumbai',
    initials: 'VP',
    color: '#F59E0B',
    rating: 5,
    quote:
      'Used the Compare feature to compare two family floater plans. The winner recommendation was spot-on and I switched to the better plan before my renewal.',
  },
  {
    name: 'Sneha Reddy',
    role: 'Teacher, Hyderabad',
    initials: 'SR',
    color: '#8B5CF6',
    rating: 5,
    quote:
      'My previous claim was rejected for a reason I didn\'t understand. The claim simulator helped me understand exactly why and what documents I needed. Game changer.',
  },
  {
    name: 'Arun Mehta',
    role: 'CA, Ahmedabad',
    initials: 'AM',
    color: '#EF4444',
    rating: 5,
    quote:
      'I recommend PolicyWise to all my clients who buy insurance. It\'s like having an insurance lawyer in your pocket — for free.',
  },
  {
    name: 'Kavitha Nair',
    role: 'HR Manager, Kochi',
    initials: 'KN',
    color: '#0EA5E9',
    rating: 5,
    quote:
      'The coverage score gave me clarity instantly. My old policy had a score of 42 — switched to a 78-scoring plan and my premium barely increased.',
  },
  {
    name: 'Deepak Singh',
    role: 'Entrepreneur, Pune',
    initials: 'DS',
    color: '#10B981',
    rating: 5,
    quote:
      'Three family members\'s claims were rejected last year. After analyzing our policies with PolicyWise, we understand exactly what\'s covered and what\'s not.',
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div className="flex-shrink-0 w-80 glass rounded-2xl p-6 border border-white/10 mx-3">
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-foreground/80 leading-relaxed mb-5">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: testimonial.color }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const row1 = TESTIMONIALS.slice(0, 4);
  const row2 = TESTIMONIALS.slice(4);

  return (
    <section className="py-24 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Loved by policyholders{' '}
            <span className="gradient-text">across India</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Join thousands who&apos;ve stopped guessing and started knowing.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-6">
        <div
          className="flex"
          style={{
            animation: 'marquee 40s linear infinite',
          }}
        >
          {[...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div
          className="flex"
          style={{
            animation: 'marquee-reverse 35s linear infinite',
          }}
        >
          {[...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
