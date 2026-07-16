'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  MessageSquare,
  Calculator,
  GitCompare,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Upload,
  History,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { icon: FileText, label: 'Policies', href: '/policies' },
  { icon: Upload, label: 'Upload', href: '/upload' },
  { icon: MessageSquare, label: 'AI Chat', href: '/chat' },
  { icon: Calculator, label: 'Claim Checker', href: '/claim-checker' },
  { icon: GitCompare, label: 'Compare Policies', href: '/compare' },
  { icon: History, label: 'History', href: '/history' },
];

const BOTTOM_ITEMS = [
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const pathname = usePathname();
  const { user } = useUser();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 280 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className={cn(
        'relative hidden lg:flex flex-col h-screen bg-black border-r border-zinc-900 flex-shrink-0 overflow-hidden select-none',
        className
      )}
    >
      {/* Logo Header */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-zinc-900 flex-shrink-0">
        <Link
          href="/upload"
          className="flex items-center gap-2.5 min-w-0"
        >
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-white/5 border border-white/10">
            <Shield className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-baseline gap-1 overflow-hidden whitespace-nowrap"
              >
                <span className="text-sm font-black tracking-tight text-white">PolicyWise</span>
                <span className="text-[10px] font-bold px-1.5 py-0.25 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  AI
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onMouseEnter={() => setHoveredHref(href)}
              onMouseLeave={() => setHoveredHref(null)}
              className={cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-150',
                active ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
              )}
            >
              {/* Dynamic hover sliding capsule */}
              <AnimatePresence>
                {hoveredHref === href && !active && (
                  <motion.div
                    layoutId="sidebar-hover"
                    className="absolute inset-0 bg-zinc-900/60 border border-zinc-800/40 rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </AnimatePresence>

              {/* Dynamic active sliding capsule */}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <Icon
                className={cn('w-4 h-4 flex-shrink-0 transition-colors', active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300')}
                strokeWidth={active ? 2.5 : 1.75}
              />
              
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.12 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile and Settings widget */}
      <div className="px-3 py-4 border-t border-zinc-900 space-y-1.5 flex-shrink-0">
        {BOTTOM_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onMouseEnter={() => setHoveredHref(href)}
              onMouseLeave={() => setHoveredHref(null)}
              className={cn(
                'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-150',
                active ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
              )}
            >
              <AnimatePresence>
                {hoveredHref === href && !active && (
                  <motion.div
                    layoutId="sidebar-hover"
                    className="absolute inset-0 bg-zinc-900/60 border border-zinc-800/40 rounded-xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>

              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl -z-10"
                />
              )}

              <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.75} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        {/* Clerk User profile widget card */}
        <div className={cn(
          'flex items-center gap-3 px-2 py-2 rounded-xl border border-transparent transition-all mt-2',
          !collapsed && 'hover:bg-zinc-950 hover:border-zinc-900'
        )}>
          <div className="flex-shrink-0 cursor-pointer">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'w-7 h-7 ring-1 ring-zinc-800 ring-offset-1 ring-offset-black',
                },
              }}
            />
          </div>
          <AnimatePresence>
            {!collapsed && user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col min-w-0"
              >
                <span className="text-[11px] font-bold text-white leading-tight truncate">
                  {user.fullName || user.firstName || 'My Account'}
                </span>
                <span className="text-[9px] text-zinc-500 truncate leading-none mt-0.5">
                  {user.primaryEmailAddress?.emailAddress || 'User Profile'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse vertical border line toggle trigger */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-20 w-7 h-7 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-all z-20 shadow-md shadow-black/20 cursor-pointer"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-black" strokeWidth={2.5} />
        ) : (
          <ChevronLeft className="w-4 h-4 text-black" strokeWidth={2.5} />
        )}
      </button>
    </motion.aside>
  );
}
