import type { Metadata } from 'next';
import { PolicyList } from '@/components/policies/policy-list';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Upload } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Policies',
};

export default function PoliciesPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <PageHeader
        title="My Policies"
        description="All your analyzed insurance policies in one place."
        action={
          <Button
            asChild
            className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Link href="/dashboard">
              <Upload className="mr-2 w-4 h-4" />
              Upload Policy
            </Link>
          </Button>
        }
      />
      <PolicyList />
    </div>
  );
}
