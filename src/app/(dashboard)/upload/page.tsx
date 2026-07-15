import type { Metadata } from 'next';
import { UploadZone } from '@/components/upload/upload-zone';
import { PageHeader } from '@/components/shared/page-header';
import { Shield, Sparkles, AlertCircle, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Upload Policy',
};

export default function UploadPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="Upload Insurance Policy"
        description="Extract exclusions, room rent caps, waiting periods, and deductible limits in under 2 minutes."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Upload zone */}
        <div className="md:col-span-8 bg-[#070707]/60 border border-border p-6 rounded-2xl">
          <UploadZone />
        </div>

        {/* Right Side: What gets analyzed */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-[#070707]/60 border border-border p-5 rounded-2xl flex flex-col gap-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              Extraction Details
            </h3>
            
            <div className="space-y-3.5 text-xs text-zinc-400">
              <div className="flex gap-2.5 items-start">
                <Shield className="w-4 h-4 text-white flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="font-bold text-foreground block">Policy Exclusions</span>
                  Identifies specific diseases or scenarios that are permanently or temporarily excluded.
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <AlertCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="font-bold text-foreground block">Waiting Periods</span>
                  Detects standard waiting terms (e.g. 24 or 36 months) for pre-existing disease claims.
                </div>
              </div>

              <div className="flex gap-2.5 items-start">
                <FileText className="w-4 h-4 text-white flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="font-bold text-foreground block">Room Rent & Co-Pay</span>
                  Flags daily room sub-limits and percentage co-payment criteria.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
