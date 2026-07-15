'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  collapsed?: boolean;
  className?: string;
  href?: string;
}

export function Logo({ collapsed = false, className, href = '/' }: LogoProps) {
  const content = (
    <motion.div
      className={cn('flex items-center gap-2.5 select-none', className)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Shield Icon */}
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
          <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary to-accent opacity-20 blur-sm -z-10" />
      </div>

      {/* Text — hidden when collapsed */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2 }}
          className="flex items-baseline gap-1"
        >
          <span className="text-lg font-bold text-foreground tracking-tight">
            PolicyWise
          </span>
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/20 leading-none">
            AI
          </span>
        </motion.div>
      )}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
