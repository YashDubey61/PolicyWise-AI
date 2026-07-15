import { SignIn } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — PolicyWise AI',
  description: 'Sign in to your PolicyWise AI account to analyze insurance policies.',
};

export default function SignInPage() {
  return <SignIn />;
}
