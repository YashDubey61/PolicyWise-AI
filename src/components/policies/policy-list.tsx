'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, LayoutGrid, List, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PolicyCard } from './policy-card';
import { usePolicies } from '@/hooks/use-policies';
import { EmptyState } from '@/components/shared/empty-state';
import { CardSkeleton } from '@/components/shared/loading-skeleton';

export function PolicyList() {
  const { policies, isLoading, error } = usePolicies();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = policies.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return (
      <div className="text-center py-12 text-destructive">
        <p>Failed to load policies: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search policies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-xl bg-card border-border"
          />
        </div>

        <div className="flex items-center gap-1 bg-card rounded-xl border border-border p-1">
          <Button
            variant={view === 'grid' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setView('grid')}
            className="rounded-lg h-8 w-8 p-0"
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setView('list')}
            className="rounded-lg h-8 w-8 p-0"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results count */}
      {!isLoading && policies.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {policies.length} policies
        </p>
      )}

      {/* Content */}
      {isLoading ? (
        <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-4'}>
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={search ? 'No policies match your search' : 'No policies yet'}
          description={
            search
              ? 'Try a different search term.'
              : 'Upload your first insurance policy to get AI-powered insights.'
          }
          action={
            search
              ? undefined
              : { label: 'Upload Policy', onClick: () => {} }
          }
        />
      ) : (
        <motion.div
          layout
          className={
            view === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
              : 'space-y-4'
          }
        >
          {filtered.map((policy, i) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <PolicyCard policy={policy} layout={view} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
