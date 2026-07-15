'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, FileText, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScoreRing } from '@/components/shared/score-ring';
import { usePolicies } from '@/hooks/use-policies';
import { formatCurrency } from '@/lib/utils';
import type { ClaimSimulationResult } from '@/types';
import { PageHeader } from '@/components/shared/page-header';

export default function ClaimCheckerPage() {
  const { policies } = usePolicies();
  const [policyId, setPolicyId] = useState('');
  const [disease, setDisease] = useState('');
  const [hospitalBill, setHospitalBill] = useState('');
  const [hospitalType, setHospitalType] = useState('network');
  const [admissionDate, setAdmissionDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClaimSimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyId || !disease || !hospitalBill || !admissionDate) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/claim-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          policyId,
          disease,
          hospitalBill: parseInt(hospitalBill),
          hospitalType,
          admissionDate,
        }),
      });

      if (!res.ok) throw new Error('Claim check failed');
      const data = await res.json();
      setResult(data);
    } catch {
      setError('Failed to check claim. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <PageHeader
        title="Claim Simulator"
        description="Predict your claim outcome before you submit it. Enter your details and let AI estimate the result."
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-2xl bg-card border border-border p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Claim Details</h2>
        </div>

        <div className="space-y-2">
          <Label>Select Policy</Label>
          <Select value={policyId} onValueChange={(v) => setPolicyId(v ?? '')}>
            <SelectTrigger className="rounded-xl border-border bg-background">
              <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Choose a policy..." />
            </SelectTrigger>
            <SelectContent>
              {policies.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="disease">Condition / Diagnosis</Label>
          <Input
            id="disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            placeholder="e.g., Appendicitis, Knee Surgery, Dengue Fever"
            className="rounded-xl border-border"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bill">Hospital Bill (₹)</Label>
            <Input
              id="bill"
              type="number"
              value={hospitalBill}
              onChange={(e) => setHospitalBill(e.target.value)}
              placeholder="e.g., 150000"
              className="rounded-xl border-border"
            />
          </div>

          <div className="space-y-2">
            <Label>Hospital Type</Label>
            <Select value={hospitalType} onValueChange={(v) => setHospitalType(v ?? 'network')}>
              <SelectTrigger className="rounded-xl border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="network">Network Hospital (Cashless)</SelectItem>
                <SelectItem value="non-network">Non-Network Hospital</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Admission Date</Label>
          <Input
            id="date"
            type="date"
            value={admissionDate}
            onChange={(e) => setAdmissionDate(e.target.value)}
            className="rounded-xl border-border"
          />
        </div>

        <Button
          type="submit"
          disabled={!policyId || !disease || !hospitalBill || !admissionDate || isLoading}
          className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 h-12"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Calculator className="mr-2 w-4 h-4" />
              Simulate Claim
            </>
          )}
        </Button>
      </form>

      {/* Error */}
      {error && (
        <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-4 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-card border border-border p-6 space-y-6"
          >
            {/* Score + Reimbursement */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <ScoreRing
                  score={result.coverageLikelihood}
                  label="Coverage Likelihood"
                  size={120}
                />
              </div>
              <div className="flex flex-col justify-center space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Estimated Reimbursement</p>
                  <p className="text-2xl font-bold gradient-text">
                    {formatCurrency(result.estimatedReimbursement)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">AI Confidence</p>
                  <p className="text-lg font-semibold text-foreground">{result.confidenceScore}%</p>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <p className="text-sm text-foreground leading-relaxed">{result.explanation}</p>
            </div>

            {/* Rejection reasons */}
            {result.rejectionReasons.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <h3 className="font-semibold text-foreground text-sm">Potential Issues</h3>
                </div>
                <div className="space-y-2">
                  {result.rejectionReasons.map((reason, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                      {reason}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Required documents */}
            {result.requiredDocuments.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground text-sm">Required Documents</h3>
                </div>
                <div className="space-y-2">
                  {result.requiredDocuments.map((doc, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
