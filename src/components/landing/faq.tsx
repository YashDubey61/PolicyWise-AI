'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    question: 'What types of insurance policies can I upload?',
    answer:
      'PolicyWise AI supports all major insurance types — health insurance, life insurance, term insurance, motor insurance, home insurance, and travel insurance. If it\'s a PDF policy document, we can analyze it.',
  },
  {
    question: 'How accurate is the AI analysis?',
    answer:
      'Our AI achieves 98%+ accuracy on standard policy documents. We use GPT-4o, the most advanced AI model available, and always cite exact clause numbers so you can verify every statement. For critical decisions, we always recommend also speaking to a licensed insurance advisor.',
  },
  {
    question: 'Is my policy document secure?',
    answer:
      'Absolutely. Your documents are encrypted in transit (TLS 1.3) and at rest (AES-256). We use Supabase\'s enterprise-grade storage with row-level security. Your data is never sold or shared with third parties. You can delete your documents at any time from your dashboard.',
  },
  {
    question: 'Can I chat with my policy in real-time?',
    answer:
      'Yes! Our AI Chat feature lets you ask any question about your specific policy. "Is dengue covered?", "What is my room rent limit?", "Can I claim for daycare surgery?" — you get instant, accurate answers with the exact clause reference every time.',
  },
  {
    question: 'What is the Coverage Score?',
    answer:
      'The Coverage Score (0-100) is a composite score that measures how well-protected you are. It considers 6 dimensions: how much is covered (Coverage), how clear the policy is (Transparency), how simple it is to understand (Complexity), how many risks you face (Risk), how long waiting periods are (Waiting Period), and how easy it is to claim (Claim Friendliness). Higher scores in coverage and transparency are better. Lower scores in risk and complexity are better.',
  },
  {
    question: 'How does the Claim Simulator work?',
    answer:
      'You enter your diagnosis or condition, the hospital bill amount, hospital type (network or non-network), and admission date. Our AI cross-references this with your specific policy terms and estimates: the likelihood of approval (0-100%), estimated reimbursement amount, possible rejection reasons, and all documents you\'ll need.',
  },
  {
    question: 'Can I compare multiple policies at once?',
    answer:
      'Yes! The Compare Policies feature lets you upload two policies and get a detailed side-by-side comparison across 6+ categories including coverage, premium value, waiting periods, exclusions, claim friendliness, and network hospitals. We tell you which policy wins each category and give an overall recommendation.',
  },
  {
    question: 'Is there a free plan?',
    answer:
      'Yes! The free plan lets you analyze 3 policies per month, use basic AI chat (10 messages), and view coverage scores. There\'s no credit card required to sign up. For unlimited analyses, the Claim Simulator, and Policy Comparison, upgrade to Pro for just ₹499/month.',
  },
];

export function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="faq" className="py-24 px-4" ref={ref}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Frequently asked{' '}
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about PolicyWise AI.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion className="space-y-3" multiple={false}>
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-2xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
