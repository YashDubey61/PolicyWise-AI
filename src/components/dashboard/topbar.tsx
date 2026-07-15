'use client';

import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Slash } from 'lucide-react';
import { MobileNav } from './mobile-nav';

const ROUTE_LABELS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/policies': 'Policies',
  '/chat': 'AI Chat',
  '/claim-checker': 'Claim Checker',
  '/compare': 'Compare Policies',
  '/profile': 'Profile',
  '/settings': 'Settings',
  '/admin': 'Admin',
};

export function Topbar() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const currentLabel =
    ROUTE_LABELS['/' + segments[0]] ||
    segments[0]?.charAt(0).toUpperCase() + segments[0]?.slice(1) ||
    'Dashboard';

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
      {/* Left: Mobile nav + Breadcrumb */}
      <div className="flex items-center gap-3">
        <MobileNav />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground hidden sm:block">PolicyWise AI</span>
          <Slash className="w-3.5 h-3.5 text-border hidden sm:block" />
          <span className="font-medium text-foreground">{currentLabel}</span>
          {segments.length > 1 && (
            <>
              <Slash className="w-3.5 h-3.5 text-border" />
              <span className="text-muted-foreground text-xs truncate max-w-[120px]">
                {segments[1]}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right: User */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-1.5 border border-border">
          <span>Search</span>
          <kbd className="text-xs bg-background rounded px-1.5 py-0.5 border border-border font-mono">⌘K</kbd>
        </div>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
        />
      </div>
    </header>
  );
}
