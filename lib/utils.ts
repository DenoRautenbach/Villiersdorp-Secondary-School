import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merges Tailwind class names safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date string to readable format */
export function formatDate(dateString: string, locale: 'en-ZA' | 'af-ZA' = 'en-ZA'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
}

/** Truncate text to a given character count */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Canonical site origin. Set NEXT_PUBLIC_SITE_URL to the live domain in production;
 * on Vercel it falls back to the project's production domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');

/** Get absolute URL for Open Graph meta */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}
