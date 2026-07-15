import { SignUp } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account — PolicyWise AI',
  description: 'Create a free PolicyWise AI account and start understanding your insurance policies.',
};

export default function SignUpPage() {
  return <SignUp />;
}
