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

## 💾 Database Setup (Supabase)

Copy the SQL contents of [schema.sql](src/lib/supabase/schema.sql) and execute it inside the **SQL Editor** in your Supabase Dashboard. This configures:

1.  Tables (`users`, `policies`, `analyses`, `chats`, `chat_messages`, `comparisons`, `claim_simulations`).
2.  Indexes for fast searches and relationship lookups.
3.  **Row Level Security (RLS)** policies to ensure users can only CRUD their own uploaded policies and analyses.
4.  Database triggers to handle automated `updated_at` timestamps.

### Storage Bucket Setup
1.  Go to **Storage** in the Supabase Dashboard.
2.  Create a **new private bucket** named `policies`.
3.  Set file size limit to **20 MB**.
4.  Under allowed MIME types, restrict to `application/pdf`.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root folder with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

# Supabase Configurations
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Google AI Studio key
GOOGLE_GENERATIVE_AI_API_KEY=your-api-key
```

---

## 🏃 Local Run

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Run the local development server:
    ```bash
    npm run dev
    ```
3.  Open [http://localhost:3000](http://localhost:3000) in your browser.
