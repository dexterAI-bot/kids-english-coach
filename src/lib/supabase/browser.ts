import { createClient as createSupabaseClient, type SupportedStorage } from '@supabase/supabase-js';
import fetch from 'cross-fetch';

function safeStorage(): SupportedStorage {
  // iOS Safari (especially standalone / private modes) can throw or behave oddly with storage.
  // Provide a best-effort localStorage adapter and fallback to in-memory storage.
  try {
    const ls = globalThis?.localStorage;
    if (ls) {
      // Touch to ensure it doesn't throw (some modes throw on access)
      const k = '__storage_test__';
      ls.setItem(k, '1');
      ls.removeItem(k);
      return ls;
    }
  } catch {
    // fall through to memory
  }

  const mem = new Map<string, string>();
  return {
    getItem: (key) => mem.get(key) ?? null,
    setItem: (key, value) => {
      mem.set(key, value);
    },
    removeItem: (key) => {
      mem.delete(key);
    },
  };
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createSupabaseClient(url, anon, {
    global: { fetch },
    auth: {
      storage: safeStorage(),
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
