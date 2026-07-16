'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth, UserButton } from '@clerk/nextjs';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
            <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-foreground">PolicyWise</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/20">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {!isSignedIn ? (
            <Button asChild variant="ghost" size="sm" className="rounded-xl text-sm">
              <Link href="/sign-in">Log in</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                size="sm"
                className="rounded-xl text-sm bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                <Link href="/upload">
                  <LayoutDashboard className="mr-1.5 w-3.5 h-3.5" />
                  Upload Policies
                </Link>
              </Button>
              <UserButton />
            </>
          )}
        </div>

        {/* Mobile menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-xl w-8 h-8 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-card border-border">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="font-bold text-foreground">PolicyWise AI</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <nav className="flex flex-col gap-1 mb-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-3 mt-auto">
                {!isSignedIn ? (
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center justify-center rounded-xl w-full h-8 border border-border bg-background hover:bg-muted text-sm font-medium transition-colors"
                  >
                    Log in
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/upload"
                      className="inline-flex items-center justify-center rounded-xl w-full h-8 bg-gradient-to-r from-primary to-accent text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <LayoutDashboard className="mr-1.5 w-3.5 h-3.5" />
                      Go to Upload
                    </Link>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
