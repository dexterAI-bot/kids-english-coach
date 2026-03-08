-- Run this in Supabase SQL editor for project jbhaleeptrllvlczuobq

-- 1) Profiles table (role management)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- 2) Attempts table (progress events)
create table if not exists public.attempts (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  word_id text not null,
  chosen_hebrew text,
  is_correct boolean not null,
  created_at timestamptz not null default now()
);

alter table public.attempts enable row level security;

-- 3) Helper function: is_admin
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
as $$
  select exists(
    select 1 from public.profiles p where p.id = uid and p.role = 'admin'
  );
$$;

-- 4) RLS Policies
-- NOTE: Postgres doesn't support CREATE POLICY IF NOT EXISTS.
-- We drop first to make this script re-runnable.

-- profiles: users can read their own row; admins can read all

drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own" on public.profiles
for select
to authenticated
using (id = auth.uid());

drop policy if exists "profiles admin read all" on public.profiles;
create policy "profiles admin read all" on public.profiles
for select
to authenticated
using (public.is_admin(auth.uid()));

-- attempts: users can read/insert their own; admins can read all

drop policy if exists "attempts insert own" on public.attempts;
create policy "attempts insert own" on public.attempts
for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "attempts read own" on public.attempts;
create policy "attempts read own" on public.attempts
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "attempts admin read all" on public.attempts;
create policy "attempts admin read all" on public.attempts
for select
to authenticated
using (public.is_admin(auth.uid()));

-- 5) Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
