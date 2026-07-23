# PolicyWise AI 🛡️

> **AI-Powered Insurance Policy Analysis & Claim Assessment Platform**
> 
> Demystifying complex insurance fine print, sub-limits, exclusions, and hidden clauses into plain English.

---

## 📌 Overview

Insurance policies are notoriously complex, filled with legalese, hidden sub-limits, co-pay rules, and long waiting periods that catch policyholders off guard during medical emergencies.

**PolicyWise AI** changes that. By leveraging advanced Large Language Models and intelligent PDF extraction, PolicyWise AI analyzes insurance policy documents in seconds and explains them clearly—as if talking to a 16-year-old—without compromising on technical accuracy or clause references.

---

## ✨ Key Features

- 📄 **Instant PDF Policy Parsing**: Drag & drop any health or general insurance policy PDF. Instant text extraction and clause parsing.
- 📊 **6-Point Metric Scoring System**:
  - **Coverage Score**: Overall comprehensiveness of medical, accidental, and critical illness terms.
  - **Transparency Score**: Clarity of policy wording and lack of hidden traps.
  - **Complexity Score**: Ease of understanding for everyday users.
  - **Risk Score**: Potential coverage gaps and user exposure.
  - **Waiting Period Score**: Evaluation of pre-existing condition wait times.
  - **Claim Friendliness Score**: Ease of claim processing and cashless network access.
- 🩺 **AI Claim Checker (Claim Simulator)**: Input hospital bills, treatment details, and admission dates to get:
  - Estimated reimbursement amount (in ₹ / currency)
  - Approval probability score (%)
  - Specific potential rejection reasons (e.g., daily room rent sub-limits, excluded non-medical items)
  - Checklist of required claim documents
- 💬 **Interactive Policy Chatbot**: Ask questions directly about your uploaded policy. Answers are strictly grounded in your policy text with exact clause citations (e.g., *Clause 4.2.1*).
- ⚖️ **Side-by-Side Policy Comparison**: Compare two insurance policies head-to-head with category-level breakdowns and winner recommendations.
- 📜 **Policy Management & History**: View saved analyses, inspect past policy documents, and maintain your personal insurance ledger.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Frontend & UI**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev/), [Shadcn UI](https://ui.shadcn.com/)
- **AI & LLM Orchestration**: [Vercel AI SDK](https://sdk.vercel.ai/docs), [OpenAI API](https://openai.com/)
- **Document Parsing**: `unpdf` for serverless, light-weight PDF text extraction
- **Authentication**: [Clerk Auth](https://clerk.com/)
- **Database & Storage**: [Supabase](https://supabase.com/)
- **Language & Tooling**: TypeScript, ESLint

---

## 🌐 Live Site

Visit the live application at **[www.yashdubey.codes](https://www.yashdubey.codes)**.
