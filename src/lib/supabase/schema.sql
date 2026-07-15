-- ============================================================
-- PolicyWise AI — Supabase Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ──────────────────────────────────────────────────────────
-- 1. USERS TABLE
-- ──────────────────────────────────────────────────────────
create table if not exists public.users (
  id          uuid primary key default gen_random_uuid(),
  clerk_id    text unique not null,
  email       text not null,
  name        text,
  avatar_url  text,
  role        text not null default 'user' check (role in ('user', 'admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_users_clerk_id on public.users(clerk_id);
create index if not exists idx_users_email on public.users(email);

-- ──────────────────────────────────────────────────────────
-- 2. POLICIES TABLE
-- ──────────────────────────────────────────────────────────
create table if not exists public.policies (
  id          uuid primary key default gen_random_uuid(),
  user_id     text not null,  -- Clerk user ID
  name        text not null,
  file_name   text not null,
  file_url    text not null,
  file_size   bigint not null default 0,
  status      text not null default 'uploading'
                check (status in ('uploading', 'processing', 'analyzed', 'error')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_policies_user_id on public.policies(user_id);
create index if not exists idx_policies_status on public.policies(status);
create index if not exists idx_policies_created_at on public.policies(created_at desc);

-- ──────────────────────────────────────────────────────────
-- 3. ANALYSES TABLE
-- ──────────────────────────────────────────────────────────
create table if not exists public.analyses (
  id                     uuid primary key default gen_random_uuid(),
  policy_id              uuid not null references public.policies(id) on delete cascade,
  summary                text,
  coverage_score         integer check (coverage_score >= 0 and coverage_score <= 100),
  transparency_score     integer check (transparency_score >= 0 and transparency_score <= 100),
  complexity_score       integer check (complexity_score >= 0 and complexity_score <= 100),
  risk_score             integer check (risk_score >= 0 and risk_score <= 100),
  waiting_period_score   integer check (waiting_period_score >= 0 and waiting_period_score <= 100),
  claim_friendliness_score integer check (claim_friendliness_score >= 0 and claim_friendliness_score <= 100),
  sections               jsonb,
  raw_text               text,  -- Stored for chat context
  created_at             timestamptz not null default now()
);

create index if not exists idx_analyses_policy_id on public.analyses(policy_id);

-- ──────────────────────────────────────────────────────────
-- 4. CHATS TABLE
-- ──────────────────────────────────────────────────────────
create table if not exists public.chats (
  id          uuid primary key default gen_random_uuid(),
  policy_id   uuid not null references public.policies(id) on delete cascade,
  user_id     text not null,
  title       text not null default 'New Chat',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_chats_policy_id on public.chats(policy_id);
create index if not exists idx_chats_user_id on public.chats(user_id);

-- ──────────────────────────────────────────────────────────
-- 5. CHAT MESSAGES TABLE
-- ──────────────────────────────────────────────────────────
create table if not exists public.chat_messages (
  id          uuid primary key default gen_random_uuid(),
  chat_id     uuid not null references public.chats(id) on delete cascade,
  role        text not null check (role in ('user', 'assistant')),
  content     text not null,
  citations   jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists idx_chat_messages_chat_id on public.chat_messages(chat_id);
create index if not exists idx_chat_messages_created_at on public.chat_messages(created_at);

-- ──────────────────────────────────────────────────────────
-- 6. COMPARISONS TABLE
-- ──────────────────────────────────────────────────────────
create table if not exists public.comparisons (
  id            uuid primary key default gen_random_uuid(),
  user_id       text not null,
  policy_a_id   uuid not null references public.policies(id) on delete cascade,
  policy_b_id   uuid not null references public.policies(id) on delete cascade,
  result        jsonb,
  created_at    timestamptz not null default now()
);

create index if not exists idx_comparisons_user_id on public.comparisons(user_id);

-- ──────────────────────────────────────────────────────────
-- 7. CLAIM SIMULATIONS TABLE
-- ──────────────────────────────────────────────────────────
create table if not exists public.claim_simulations (
  id          uuid primary key default gen_random_uuid(),
  user_id     text not null,
  policy_id   uuid not null references public.policies(id) on delete cascade,
  input       jsonb not null,
  result      jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists idx_claim_simulations_user_id on public.claim_simulations(user_id);
create index if not exists idx_claim_simulations_policy_id on public.claim_simulations(policy_id);

-- ──────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ──────────────────────────────────────────────────────────

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.policies enable row level security;
alter table public.analyses enable row level security;
alter table public.chats enable row level security;
alter table public.chat_messages enable row level security;
alter table public.comparisons enable row level security;
alter table public.claim_simulations enable row level security;

-- Users: users can read/update their own row
drop policy if exists "Users can view own profile" on public.users;
create policy "Users can view own profile" on public.users
  for select using (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');

drop policy if exists "Users can update own profile" on public.users;
create policy "Users can update own profile" on public.users
  for update using (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policies: users can CRUD their own policies
drop policy if exists "Users can view own policies" on public.policies;
create policy "Users can view own policies" on public.policies
  for select using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

drop policy if exists "Users can insert own policies" on public.policies;
create policy "Users can insert own policies" on public.policies
  for insert with check (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

drop policy if exists "Users can update own policies" on public.policies;
create policy "Users can update own policies" on public.policies
  for update using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

drop policy if exists "Users can delete own policies" on public.policies;
create policy "Users can delete own policies" on public.policies
  for delete using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Analyses: accessible if user owns the policy
drop policy if exists "Users can view analyses for own policies" on public.analyses;
create policy "Users can view analyses for own policies" on public.analyses
  for select using (
    exists (
      select 1 from public.policies p
      where p.id = analyses.policy_id
      and p.user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

-- Chats: users can CRUD their own chats
drop policy if exists "Users can view own chats" on public.chats;
create policy "Users can view own chats" on public.chats
  for select using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

drop policy if exists "Users can insert own chats" on public.chats;
create policy "Users can insert own chats" on public.chats
  for insert with check (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Chat messages: accessible if user owns the chat
drop policy if exists "Users can view own chat messages" on public.chat_messages;
create policy "Users can view own chat messages" on public.chat_messages
  for select using (
    exists (
      select 1 from public.chats c
      where c.id = chat_messages.chat_id
      and c.user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

-- Comparisons: users can CRUD their own comparisons
drop policy if exists "Users can view own comparisons" on public.comparisons;
create policy "Users can view own comparisons" on public.comparisons
  for select using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

drop policy if exists "Users can insert own comparisons" on public.comparisons;
create policy "Users can insert own comparisons" on public.comparisons
  for insert with check (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Claim simulations: users can CRUD their own simulations
drop policy if exists "Users can view own claim simulations" on public.claim_simulations;
create policy "Users can view own claim simulations" on public.claim_simulations
  for select using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

drop policy if exists "Users can insert own claim simulations" on public.claim_simulations;
create policy "Users can insert own claim simulations" on public.claim_simulations
  for insert with check (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- ──────────────────────────────────────────────────────────
-- STORAGE BUCKET (run in Supabase Dashboard > Storage)
-- ──────────────────────────────────────────────────────────
-- Create bucket named 'policies' with:
--   - Public: false (private bucket)
--   - File size limit: 20 MB
--   - Allowed MIME types: application/pdf

-- Storage policy (allow authenticated users to upload/read their own files):
-- INSERT: bucket_id = 'policies' and (storage.foldername(name))[1] = auth.uid()
-- SELECT: bucket_id = 'policies' and (storage.foldername(name))[1] = auth.uid()

-- ──────────────────────────────────────────────────────────
-- HELPER FUNCTION: Update updated_at timestamp
-- ──────────────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at
  before update on public.users
  for each row execute procedure public.handle_updated_at();

drop trigger if exists set_policies_updated_at on public.policies;
create trigger set_policies_updated_at
  before update on public.policies
  for each row execute procedure public.handle_updated_at();

drop trigger if exists set_chats_updated_at on public.chats;
create trigger set_chats_updated_at
  before update on public.chats
  for each row execute procedure public.handle_updated_at();
