import type { Metadata } from 'next';
import { PolicyList } from '@/components/policies/policy-list';
import { PageHeader } from '@/components/shared/page-header';

export const metadata: Metadata = {
  title: 'My Policies',
};

export default function PoliciesPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <PageHeader
        title="My Policies"
        description="All your analyzed insurance policies in one place."
      />
      <PolicyList />
    </div>
  );
}
