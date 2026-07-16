'use client';

import { useState } from 'react';
import {
  FileText,
  MessageSquare,
  Calculator,
  GitCompare,
  User,
  Settings,
  Menu,
  Shield,
  Upload,
  History,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { icon: FileText, label: 'Policies', href: '/policies' },
  { icon: Upload, label: 'Upload', href: '/upload' },
  { icon: MessageSquare, label: 'AI Chat', href: '/chat' },
  { icon: Calculator, label: 'Claim Checker', href: '/claim-checker' },
  { icon: GitCompare, label: 'Compare Policies', href: '/compare' },
  { icon: History, label: 'History', href: '/history' },
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-xl w-8 h-8 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Menu className="w-5 h-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-card border-border p-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-border">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-foreground">PolicyWise</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/20">
              AI
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={active ? 2 : 1.5} />
                {label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
