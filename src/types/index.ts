// ============================================================
// PolicyWise AI — All TypeScript Types & Interfaces
// ============================================================

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Policy {
  id: string;
  userId: string;
  name: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  status: 'uploading' | 'processing' | 'analyzed' | 'error';
  createdAt: string;
  updatedAt: string;
}

export interface PolicyAnalysis {
  id: string;
  policyId: string;
  summary: string;
  coverageScore: number;
  transparencyScore: number;
  complexityScore: number;
  riskScore: number;
  waitingPeriodScore: number;
  claimFriendlinessScore: number;
  sections: AnalysisSections;
  createdAt: string;
}

export interface AnalysisSections {
  summary: string;
  coverage: {
    medical: string;
    accidental: string;
    criticalIllness: string;
    hospitalization: string;
  };
  exclusions: ExclusionItem[];
  waitingPeriods: WaitingPeriodItem[];
  claimLimits: ClaimLimitItem[];
  copay: string;
  deductibles: string;
  networkHospitals: string;
  hiddenClauses: HiddenClause[];
}

export interface ExclusionItem {
  item: string;
  explanation: string;
  severity: 'low' | 'medium' | 'high';
}

export interface WaitingPeriodItem {
  condition: string;
  period: string;
  details: string;
}

export interface ClaimLimitItem {
  type: string;
  limit: string;
  details: string;
}

export interface HiddenClause {
  clause: string;
  clauseNumber: string;
  risk: 'low' | 'medium' | 'high';
  explanation: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  createdAt: string;
}

export interface Citation {
  clauseNumber: string;
  text: string;
}

export interface Chat {
  id: string;
  policyId: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClaimSimulationInput {
  policyId: string;
  disease: string;
  hospitalBill: number;
  hospitalType: 'network' | 'non-network';
  admissionDate: string;
}

export interface ClaimSimulationResult {
  id?: string;
  userId?: string;
  policyId: string;
  input?: ClaimSimulationInput;
  coverageLikelihood: number;
  estimatedReimbursement: number;
  rejectionReasons: string[];
  confidenceScore: number;
  requiredDocuments: string[];
  explanation: string;
  createdAt?: string;
}

export interface PolicyComparison {
  id: string;
  userId: string;
  policyAId: string;
  policyBId: string;
  result: ComparisonResult;
  createdAt: string;
}

export interface ComparisonResult {
  summary: string;
  winner: 'A' | 'B' | 'tie';
  recommendation: string;
  categories: ComparisonCategory[];
  scores: {
    policyA: PolicyScores;
    policyB: PolicyScores;
  };
}

export interface ComparisonCategory {
  name: string;
  policyA: string;
  policyB: string;
  winner: 'A' | 'B' | 'tie';
}

export interface PolicyScores {
  coverage: number;
  transparency: number;
  claimFriendliness: number;
  risk: number;
  waitingPeriod: number;
  complexity: number;
}

export type ScoreType =
  | 'coverage'
  | 'transparency'
  | 'complexity'
  | 'risk'
  | 'waitingPeriod'
  | 'claimFriendliness';

export interface UploadState {
  status: 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';
  progress: number;
  policyId?: string;
  error?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalPolicies: number;
  totalAnalyses: number;
  activeSubscriptions: number;
}
