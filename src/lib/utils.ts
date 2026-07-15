import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind CSS class names */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date string or Date object to a human-readable format */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

/** Format a number as Indian Rupee currency */
export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format bytes into human-readable file size */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/** Return a hex color based on score value (green/yellow/red) */
export function getScoreColor(score: number): string {
  if (score >= 70) return '#22C55E';
  if (score >= 40) return '#F59E0B';
  return '#EF4444';
}

/** Return a text label based on score value */
export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Average';
  if (score >= 30) return 'Below Average';
  return 'Poor';
}

/** Return a Tailwind gradient class string based on score */
export function getScoreGradient(score: number): string {
  if (score >= 70) return 'from-emerald-500 to-green-400';
  if (score >= 40) return 'from-amber-500 to-yellow-400';
  return 'from-red-500 to-rose-400';
}

/** Truncate text to a maximum length, adding ellipsis */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/** Get a greeting based on the current hour */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/** Validate that a file is a PDF and within size limits */
export function validatePdfFile(file: File, maxSizeMB: number = 20): string | null {
  if (file.type !== 'application/pdf') {
    return 'Only PDF files are accepted.';
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `File size must be under ${maxSizeMB}MB.`;
  }
  return null;
}

/** Generate a unique filename with timestamp */
export function generateFileName(originalName: string, userId: string): string {
  const timestamp = Date.now();
  const ext = originalName.split('.').pop();
  return `${userId}/${timestamp}.${ext}`;
}
