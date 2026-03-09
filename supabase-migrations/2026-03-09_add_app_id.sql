-- Adds app scoping to attempts so multiple apps can share the same Supabase Auth + DB.
-- Run in Supabase SQL editor.

alter table public.attempts
add column if not exists app_id text not null default 'kids-english-coach';

create index if not exists attempts_app_id_user_created_at
on public.attempts (app_id, user_id, created_at desc);
