import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PolicyWise AI — Intelligent Insurance Companion",
    template: "%s | PolicyWise AI",
  },
  description:
    "Understand, compare, and optimize your insurance policies with the power of AI. Upload documents, chat with your policies, and make smarter coverage decisions.",
  keywords: [
    "insurance",
    "AI",
    "policy analysis",
    "claim checker",
    "insurance comparison",
    "PolicyWise",
  ],
  authors: [{ name: "PolicyWise AI" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PolicyWise AI",
    title: "PolicyWise AI — Intelligent Insurance Companion",
    description:
      "Understand, compare, and optimize your insurance policies with the power of AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PolicyWise AI",
    description:
      "Understand, compare, and optimize your insurance policies with the power of AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#2563EB",
          colorBackground: "#FFFFFF",
          borderRadius: "1.25rem",
        },
        elements: {
          card: "shadow-2xl",
          formButtonPrimary:
            "bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors duration-200",
          footerActionLink: "text-[#2563EB] hover:text-[#1d4ed8]",
        },
      }}
    >
      <html
        lang="en"
        className={`${inter.variable} dark h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-background text-foreground">
          <TooltipProvider>
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                className:
                  "glass border-white/10 text-foreground",
              }}
              theme="dark"
              richColors
              closeButton
            />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
