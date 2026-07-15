'use client';

import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import {
  Mail,
  Calendar,
  FileText,
  MessageSquare,
  Calculator,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { usePolicies } from '@/hooks/use-policies';
import { PageHeader } from '@/components/shared/page-header';

export default function ProfilePage() {
  const { user } = useUser();
  const { policies } = usePolicies();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="max-w-3xl space-y-8">
      <PageHeader title="Profile" description="Your account information and statistics." />

      {/* User card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-card border border-border p-6"
      >
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {user.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.imageUrl}
                alt={user.fullName || ''}
                className="w-20 h-20 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                {user.firstName?.[0] || 'U'}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-foreground">{user.fullName || 'User'}</h2>
              <Badge className="bg-primary/15 text-primary border-primary/20 rounded-full text-xs border">
                Free Plan
              </Badge>
            </div>

            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{user.primaryEmailAddress?.emailAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  Joined {user.createdAt ? formatDate(user.createdAt) : 'Recently'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: FileText, label: 'Policies', value: policies.length },
          { icon: MessageSquare, label: 'Conversations', value: 0 },
          { icon: Calculator, label: 'Claims Checked', value: 0 },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl bg-card border border-border p-5 text-center"
          >
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>


      {/* Danger zone */}
      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
        <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Deleting your account will permanently remove all your policies and data. This cannot be undone.
        </p>
        <Button
          variant="destructive"
          className="rounded-xl"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 className="mr-2 w-4 h-4" />
          Delete Account
        </Button>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="rounded-2xl border-border bg-card">
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete Account?</DialogTitle>
            <DialogDescription>
              This will permanently delete your account, all policies, analyses, and chat history. This action cannot be reversed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button variant="destructive" className="rounded-xl">
              Yes, Delete Everything
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
