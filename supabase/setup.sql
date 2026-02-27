-- ============================================================
-- SNEHAL FULLUKE — PORTFOLIO SUPABASE SETUP
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================


-- ─────────────────────────────────────────────────────────────
-- 1. ANALYTICS EVENTS
--    Tracks page views, project clicks, hire intents, blog reads
-- ─────────────────────────────────────────────────────────────

create table if not exists analytics_events (
  id          uuid          default gen_random_uuid() primary key,
  event_type  text          not null,   -- page_view | project_click | hire_click | blog_view | contact_click
  page        text          not null,
  meta        text,                     -- extra context (e.g. project slug)
  created_at  timestamptz   default now()
);

alter table analytics_events enable row level security;

-- Only service role can insert/select
create policy "analytics_service_role" on analytics_events
  using (auth.role() = 'service_role');

-- Enable realtime
alter publication supabase_realtime add table analytics_events;


-- ─────────────────────────────────────────────────────────────
-- 2. LEADS (CRM)
--    Hire page form submissions managed in Studio
-- ─────────────────────────────────────────────────────────────

create table if not exists leads (
  id          uuid          default gen_random_uuid() primary key,
  name        text          not null,
  email       text          not null,
  service     text          not null,
  message     text,
  budget      text,
  status      text          default 'new'
                            check (status in ('new', 'contacted', 'closed')),
  notes       text,
  created_at  timestamptz   default now()
);

alter table leads enable row level security;

-- Service role has full CRUD
create policy "leads_service_role" on leads
  using (auth.role() = 'service_role');

-- Enable realtime so Studio dashboard gets live updates
alter publication supabase_realtime add table leads;


-- ─────────────────────────────────────────────────────────────
-- 3. SITE CONTENT (Owner Mode CMS)
--    Key-value store for inline-editable text content
-- ─────────────────────────────────────────────────────────────

create table if not exists site_content (
  id          uuid          default gen_random_uuid() primary key,
  key         text          unique not null,
  value       text          not null,
  updated_at  timestamptz   default now()
);

alter table site_content enable row level security;

-- Public visitors can read content
create policy "site_content_public_read" on site_content
  for select using (true);

-- Only service role can write (owner auth verified server-side)
create policy "site_content_service_write" on site_content
  for all using (auth.role() = 'service_role');


-- ─────────────────────────────────────────────────────────────
-- 4. SEED DEFAULT CONTENT
--    Initial values for Owner Mode editable fields
-- ─────────────────────────────────────────────────────────────

insert into site_content (key, value) values
  ('hero_tagline',    'Creative Developer & Visual Creator'),
  ('about_tagline',   'My Narrative'),
  ('about_headline',  'Bridging pixels with perfected logic.')
on conflict (key) do nothing;


-- ─────────────────────────────────────────────────────────────
-- 5. ADMIN USER SETUP
--
-- Go to: Authentication > Users > Add User > Create New User
--   Email:    snehalfulluke@gmail.com
--   Password: (choose a strong one)
--
-- IMPORTANT: Disable public signup so only you can create users.
--   Go to: Authentication > Settings > toggle off "Enable Email Signup"
-- ─────────────────────────────────────────────────────────────


-- ─────────────────────────────────────────────────────────────
-- 6. ENVIRONMENT VARIABLES (add to .env.local & Vercel)
-- ─────────────────────────────────────────────────────────────
--
-- NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
-- NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
-- SUPABASE_SERVICE_ROLE_KEY=eyJhbG...   (Project Settings > API > service_role)
--
-- Note: SUPABASE_SERVICE_ROLE_KEY is a secret. Never expose it client-side.
-- ─────────────────────────────────────────────────────────────
