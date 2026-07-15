'use client';

import { motion } from 'framer-motion';
import { FileText, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn, formatDate, formatFileSize } from '@/lib/utils';
import type { Policy } from '@/types';

interface PolicyCardProps {
  policy: Policy;
  layout?: 'grid' | 'list';
}

const STATUS_CONFIG = {
  analyzed: {
    label: 'Analyzed',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  },
  processing: {
    label: 'Processing...',
    className: 'bg-primary/15 text-primary border-primary/20',
  },
  uploading: {
    label: 'Uploading',
    className: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  },
  error: {
    label: 'Error',
    className: 'bg-destructive/15 text-destructive border-destructive/20',
  },
};

export function PolicyCard({ policy, layout = 'grid' }: PolicyCardProps) {
  const statusConfig = STATUS_CONFIG[policy.status] || STATUS_CONFIG.processing;

  if (layout === 'list') {
    return (
      <Link href={`/policies/${policy.id}`}>
        <motion.div
          whileHover={{ x: 4 }}
          className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">{policy.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatDate(policy.createdAt)} · {formatFileSize(policy.fileSize)}
            </p>
          </div>
          <Badge className={cn('text-xs rounded-full border', statusConfig.className)}>
            {statusConfig.label}
          </Badge>
          <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/policies/${policy.id}`}>
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 transition-all duration-200 cursor-pointer h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <Badge className={cn('text-xs rounded-full border', statusConfig.className)}>
            {statusConfig.label}
          </Badge>
        </div>

        <h3 className="font-semibold text-foreground text-sm mb-1.5 truncate">
          {policy.name}
        </h3>
        <p className="text-xs text-muted-foreground">{policy.fileName}</p>

        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {formatDate(policy.createdAt)}
          </div>
          <span className="text-border">·</span>
          <span className="text-xs text-muted-foreground">{formatFileSize(policy.fileSize)}</span>
        </div>
      </motion.div>
    </Link>
  );
}
