'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

export function DeletePolicyButton({ policyId }: { policyId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch('/api/policies', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: policyId }),
      });

      if (!res.ok) throw new Error('Failed to delete policy');
      setOpen(false);
      router.push('/policies');
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to delete policy.');
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button variant="destructive" size="sm" className="rounded-xl font-bold cursor-pointer bg-red-950/40 text-red-400 border border-red-500/20 hover:bg-red-900/40">
          <Trash2 className="mr-1.5 w-4 h-4" />
          Delete Policy
        </Button>
      } />
      <DialogContent className="bg-zinc-950 border border-zinc-900 text-foreground rounded-2xl max-w-md p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg font-bold text-white">Delete Policy</DialogTitle>
          <DialogDescription className="text-xs text-zinc-400 leading-relaxed">
            Are you absolutely sure? This action cannot be undone. It will permanently delete this policy and all associated AI conversations, comparisons, and claim checks.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 flex justify-end gap-3">
          <DialogClose render={
            <Button variant="outline" className="rounded-xl bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white">
              Cancel
            </Button>
          } />
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                Deleting...
              </>
            ) : (
              'Delete Policy'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
