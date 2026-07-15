import type { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your PolicyWise AI account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* ── Left branding panel ─────────────────────────── */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[oklch(0.546_0.245_262.881)] via-[oklch(0.45_0.2_270)] to-[oklch(0.30_0.15_280)]">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-80 w-80 rounded-full bg-[oklch(0.720_0.139_181.071)]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center flex-1 px-12 xl:px-16">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              PolicyWise
            </span>
          </div>

          {/* Tagline */}
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
            Your AI-Powered
            <br />
            <span className="text-white/80">Insurance Companion</span>
          </h1>
          <p className="text-lg text-white/60 max-w-md leading-relaxed">
            Upload, analyze, and understand your insurance policies with
            cutting-edge AI. Make smarter coverage decisions effortlessly.
          </p>

          {/* Feature pills */}
          <div className="mt-12 flex flex-wrap gap-3">
            {["Smart Analysis", "Claim Checker", "Policy Compare", "AI Chat"].map(
              (feature) => (
                <div
                  key={feature}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm border border-white/5"
                >
                  {feature}
                </div>
              )
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-12 xl:px-16 pb-8">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} PolicyWise AI. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Right auth panel ────────────────────────────── */}
      <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              PolicyWise
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
