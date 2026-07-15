'use client';

import { useState, useCallback } from 'react';
import type { UploadState } from '@/types';

export function useUpload() {
  const [state, setState] = useState<UploadState>({
    status: 'idle',
    progress: 0,
  });

  const upload = useCallback(async (file: File): Promise<string | null> => {
    try {
      // Step 1: Upload the file
      setState({ status: 'uploading', progress: 0 });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name.replace('.pdf', ''));

      // Simulate progress
      const progressInterval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 85),
        }));
      }, 300);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!uploadRes.ok) {
        const err = await uploadRes.json();
        throw new Error(err.error || 'Upload failed');
      }

      const { policyId } = await uploadRes.json();
      setState({ status: 'uploading', progress: 100 });

      // Step 2: Trigger analysis
      setState({ status: 'analyzing', progress: 0 });

      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ policyId }),
      });

      if (!analyzeRes.ok) {
        const err = await analyzeRes.json();
        throw new Error(err.error || 'Analysis failed');
      }

      setState({ status: 'complete', progress: 100, policyId });
      return policyId;
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Something went wrong';
      setState({ status: 'error', progress: 0, error });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ status: 'idle', progress: 0 });
  }, []);

  return { state, upload, reset };
}
