import type { Metadata } from 'next';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export const metadata: Metadata = {
  title: 'PolicyWise AI — Understand Your Insurance Before It Understands You',
  description:
    'Upload any insurance policy PDF and let AI explain everything in plain English. Detect hidden risks, understand coverage, and chat with your policy.',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
