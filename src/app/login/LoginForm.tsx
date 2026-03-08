'use client';

import { useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase/browser';

export function LoginForm({ next }: { next: string }) {
  const supabase = useMemo(() => createClient(), []);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const fn = mode === 'signin' ? supabase.auth.signInWithPassword : supabase.auth.signUp;
      const { error } = await fn({ email, password });
      if (error) throw error;
      window.location.href = next;
    } catch (e: any) {
      setError(e?.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-6 bg-white dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold">Kids’ English Coach</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">התחברות / הרשמה</p>

        <div className="mt-4 flex gap-2">
          <button
            className={`px-3 py-1 rounded border ${mode === 'signin' ? 'bg-black text-white' : ''}`}
            onClick={() => setMode('signin')}
            type="button"
          >
            Sign in
          </button>
          <button
            className={`px-3 py-1 rounded border ${mode === 'signup' ? 'bg-black text-white' : ''}`}
            onClick={() => setMode('signup')}
            type="button"
          >
            Sign up
          </button>
        </div>

        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <input
            data-testid="login-email"
            className="w-full rounded border p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            data-testid="login-password"
            className="w-full rounded border p-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <button
            data-testid="login-submit"
            className="w-full rounded bg-blue-600 text-white py-2 disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? '...' : mode === 'signin' ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500">
          v0: Word → 4 Hebrew options + progress tracking.
        </p>
      </div>
    </div>
  );
}
