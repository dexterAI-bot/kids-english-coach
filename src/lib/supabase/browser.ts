import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import fetchPolyfill from 'cross-fetch';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // For maximum compatibility (iOS/Safari/private/standalone weirdness),
  // start with in-memory auth (no localStorage). We can re-enable persistence later.
  const fetchImpl: typeof fetch = (globalThis.fetch as any) ?? (fetchPolyfill as any);

  return createSupabaseClient(url, anon, {
    global: { fetch: fetchImpl },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: true,
    },
  });
}
