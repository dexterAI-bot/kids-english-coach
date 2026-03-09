import { createBrowserClient } from '@supabase/ssr';

// Browser client for Next.js SSR cookie-based auth.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient(url, anon);
}
