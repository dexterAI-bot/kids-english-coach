import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Browser client: use supabase-js directly (localStorage session persistence).
// This avoids SSR cookie-storage wiring issues surfacing as runtime errors.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createSupabaseClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
