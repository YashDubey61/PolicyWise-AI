'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Policy } from '@/types';

export function usePolicies() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/policies');
      if (!res.ok) throw new Error('Failed to fetch policies');
      const data = await res.json();
      setPolicies(data.policies || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPolicies();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchPolicies]);

  return { policies, isLoading, error, refetch: fetchPolicies };
}
