import Link from 'next/link';
import { Shield, Mail } from 'lucide-react';

// Custom GitHub SVG Icon matching Lucide style
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// Custom LinkedIn SVG Icon matching Lucide style
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-black py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand details */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
              <Shield className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm text-foreground">PolicyWise AI</span>
          </Link>
          <span className="text-zinc-800">|</span>
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} PolicyWise AI. All rights reserved.
          </p>
        </div>

        {/* Developer profiles & Credit */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          
          <div className="text-sm text-zinc-400 font-medium">
            Made with ❤️ by{' '}
            <a
              href="https://github.com/YashDubey61"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 font-extrabold hover:underline transition-colors"
            >
              Yash Dubey
            </a>
          </div>

          <div className="hidden sm:block w-px h-4 bg-zinc-800" />

          {/* Maker social links */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:dubeyy426@gmail.com"
              aria-label="Email"
              className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-border flex items-center justify-center text-zinc-400 hover:text-foreground transition-all duration-200"
            >
              <Mail className="w-4 h-4" strokeWidth={1.5} />
            </a>

            <a
              href="https://linkedin.com/in/yash-dubey61"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-border flex items-center justify-center text-zinc-400 hover:text-foreground transition-all duration-200"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/YashDubey61"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-border flex items-center justify-center text-zinc-400 hover:text-foreground transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
