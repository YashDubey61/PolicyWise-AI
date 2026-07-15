'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    description: 'Perfect for understanding one policy',
    features: [
      '3 policy analyses per month',
      'Basic AI chat (10 messages)',
      'Coverage score',
      'Exclusions list',
      'Email support',
    ],
    cta: 'Get Started Free',
    href: '/sign-up',
    highlighted: false,
    badge: null,
  },
  {
    name: 'Pro',
    price: '₹499',
    period: 'per month',
    description: 'For individuals serious about coverage',
    features: [
      'Unlimited policy analyses',
      'Unlimited AI chat',
      'Claim simulator',
      'Policy comparison',
      'Waiting period tracker',
      'Hidden clause detection',
      'Priority support',
      'PDF download of analysis',
    ],
    cta: 'Start Pro Trial',
    href: '/sign-up?plan=pro',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'billed annually',
    description: 'For teams, brokers, and organizations',
    features: [
      'Everything in Pro',
      'API access',
      'Bulk policy processing',
      'Team management',
      'Custom integrations',
      'White-labeling',
      'Dedicated account manager',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
    badge: null,
  },
];

export function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pricing" className="py-24 px-4 bg-card/20" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Simple,{' '}
            <span className="gradient-text">transparent pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            No hidden fees. Cancel anytime. Start free, upgrade when you need more.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                'relative rounded-2xl p-8 border flex flex-col',
                plan.highlighted
                  ? 'bg-gradient-to-b from-primary/10 to-card border-primary/40 shadow-2xl shadow-primary/10 md:-mt-4 md:pb-12'
                  : 'bg-card border-border'
              )}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold shadow-lg">
                    <Zap className="w-3 h-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Plan name */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className={cn(
                    'text-4xl font-extrabold',
                    plan.highlighted ? 'gradient-text' : 'text-foreground'
                  )}>
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <div className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                      plan.highlighted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                    )}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                className={cn(
                  'w-full rounded-xl',
                  plan.highlighted
                    ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/25'
                    : ''
                )}
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
