'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
  CloudUpload,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn, formatFileSize, validatePdfFile } from '@/lib/utils';
import { useUpload } from '@/hooks/use-upload';

interface UploadZoneProps {
  compact?: boolean;
  onSuccess?: (policyId: string) => void;
}

export function UploadZone({ compact = false, onSuccess }: UploadZoneProps) {
  const router = useRouter();
  const { state, upload, reset } = useUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFileError(null);
      const file = acceptedFiles[0];
      if (!file) return;

      const error = validatePdfFile(file);
      if (error) {
        setFileError(error);
        return;
      }

      setSelectedFile(file);
      const policyId = await upload(file);

      if (policyId) {
        if (onSuccess) {
          onSuccess(policyId);
        } else {
          router.push(`/policies/${policyId}`);
        }
      }
    },
    [upload, onSuccess, router]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled: state.status !== 'idle',
  });

  if (compact) {
    return (
      <div>
        <Button
          {...getRootProps()}
          className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/25"
          disabled={state.status !== 'idle'}
        >
          <input {...getInputProps()} />
          {state.status === 'uploading' || state.status === 'analyzing' ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              {state.status === 'uploading' ? `Uploading ${state.progress}%` : 'Analyzing...'}
            </>
          ) : (
            <>
              <Upload className="mr-2 w-4 h-4" />
              Upload PDF
            </>
          )}
        </Button>
        {fileError && (
          <p className="mt-2 text-xs text-destructive">{fileError}</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {state.status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              {...getRootProps()}
              className={cn(
                'relative rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300',
                isDragActive
                  ? 'border-primary bg-primary/10 scale-[1.01]'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
              )}
            >
              <input {...getInputProps()} />

              {/* Drag overlay glow */}
              {isDragActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-2xl"
                  style={{ boxShadow: '0 0 40px rgba(37, 99, 235, 0.2)' }}
                />
              )}

              <div className="relative z-10">
                <div className={cn(
                  'mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300',
                  isDragActive ? 'bg-primary/20 scale-110' : 'bg-muted'
                )}>
                  <CloudUpload
                    className={cn(
                      'w-8 h-8 transition-colors duration-300',
                      isDragActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {isDragActive ? 'Drop it here!' : 'Upload your insurance policy'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your PDF here, or{' '}
                  <span className="text-primary font-medium">browse files</span>
                </p>
                <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" /> PDF only
                  </span>
                  <span className="w-px h-3 bg-border" />
                  <span>Max 20MB</span>
                  <span className="w-px h-3 bg-border" />
                  <span>Analysis in &lt;2 min</span>
                </div>
              </div>
            </div>

            {fileError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {fileError}
              </motion.div>
            )}
          </motion.div>
        )}

        {(state.status === 'uploading' || state.status === 'analyzing') && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-border bg-card p-8 text-center space-y-5"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" strokeWidth={1.5} />
            </div>

            {selectedFile && (
              <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
                <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground truncate">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {state.status === 'uploading' ? 'Uploading...' : 'AI analyzing...'}
                </span>
                <span className="text-foreground font-medium">
                  {state.status === 'uploading' ? `${state.progress}%` : 'Processing'}
                </span>
              </div>
              <Progress value={state.status === 'analyzing' ? 85 : state.progress} className="h-2" />
            </div>

            <p className="text-xs text-muted-foreground">
              {state.status === 'uploading'
                ? 'Uploading your policy securely...'
                : 'AI is reading every clause and building your analysis...'}
            </p>
          </motion.div>
        )}

        {state.status === 'complete' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center"
          >
            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Analysis Complete!</h3>
            <p className="text-sm text-muted-foreground">Redirecting you to your results...</p>
          </motion.div>
        )}

        {state.status === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center"
          >
            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-destructive/15 border border-destructive/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-destructive" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Upload Failed</h3>
            <p className="text-sm text-muted-foreground mb-4">{state.error || 'Something went wrong'}</p>
            <Button onClick={reset} variant="outline" className="rounded-xl">
              <X className="mr-2 w-4 h-4" />
              Try again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
