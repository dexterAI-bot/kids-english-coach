import { createBrowserClient } from '@supabase/ssr';

// IMPORTANT: In client components, Next.js only inlines env vars when accessed
// via direct property reads (process.env.NEXT_PUBLIC_*). Avoid dynamic access.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient(url, anon);
}
