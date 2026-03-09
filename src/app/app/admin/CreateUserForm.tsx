'use client';

import { useState } from 'react';

export function CreateUserForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setResult(`Created: ${json.email}`);
      setEmail('');
      setPassword('');
    } catch (e: any) {
      setResult(e?.message ?? 'Failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-xl border p-4 space-y-3">
      <h2 className="font-semibold">Create user</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          className="rounded border p-2"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          className="rounded border p-2"
          placeholder="temp password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          required
        />
      </div>
      <button className="rounded bg-blue-600 text-white px-4 py-2 disabled:opacity-50" disabled={loading}>
        {loading ? '...' : 'Create'}
      </button>
      {result ? <div className="text-sm text-gray-700">{result}</div> : null}
      <p className="text-xs text-gray-500">
        Uses a server route with the Supabase service role key. Keep this page admin-only.
      </p>
    </form>
  );
}
