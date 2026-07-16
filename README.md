# PolicyWise AI 🛡️
> "Understand your insurance before it understands you."

PolicyWise AI is an AI-first startup MVP built to help normal people instantly understand complex, jargon-heavy insurance policies. Simply upload any insurance policy PDF, and receive plain-English analysis of coverage, exclusions, waiting periods, and room rent limits, alongside a context-aware AI chat and a claim checker.

---

## 🚀 Key Features

*   **Plain English Explanations:** Turns dense 60+ page legal/insurance jargon PDFs into clean, digestible summaries.
*   **Hidden Risk & Exclusion Detector:** Highlights critical exclusions, copay terms, and warning-level clauses automatically.
*   **Waiting Periods Table:** Transparent breakdown of how long you must wait before specific conditions (e.g., pre-existing diseases) are covered.
*   **AI Policy Chat:** A context-aware chatbot trained on the uploaded PDF. Ask questions like *"Is appendix surgery covered?"* or *"Do I have sub-limits on ICU rent?"*.
*   **Claim Simulator:** Input disease names, hospital types, admission dates, and bill amounts to predict the likelihood of claim approvals.
*   **Policy Comparison:** Side-by-side comparison of multiple policies with winner recommendations and a score radar chart.
*   **Dashboard Shell:** Glassmorphism UI complete with activity statistics, quick actions, and dark mode defaults.

---

## 🛠️ Tech Stack

*   **Frontend & Routing:** Next.js 16.2.10 (App Router), React 19, TypeScript
*   **Styling & UI:** Tailwind CSS (v4), Framer Motion (premium animations), Lucide React Icons
*   **Authentication:** Clerk (Email Sign-up/In, customized user buttons)
*   **Database & File Storage:** Supabase (PostgreSQL with Row Level Security + Private Storage Bucket)
*   **AI SDK:** Vercel AI SDK v4, Google AI (`gemini-3.1-flash-lite`)
*   **PDF Extraction:** `pdf-parse`

---

