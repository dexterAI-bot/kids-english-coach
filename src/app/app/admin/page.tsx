import { createClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';

async function isAdmin(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase.from('profiles').select('role').eq('id', userId).maybeSingle();
  return data?.role === 'admin';
}

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const adminByProfile = await isAdmin(user.id);
  const adminByEmail = (user.email ?? '').toLowerCase() === env.adminEmail.toLowerCase();
  const isAllowed = adminByProfile || adminByEmail;

  if (!isAllowed) {
    return (
      <div className="rounded-xl border p-6">
        <h1 className="text-xl font-semibold">Admin</h1>
        <p className="text-sm text-gray-600">Not authorized.</p>
      </div>
    );
  }

  const { data: users } = await supabase
    .from('profiles')
    .select('id,email,role,created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Admin</h1>
        <p className="text-sm text-gray-600">All users + progress (v0)</p>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-semibold">Users</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {(users ?? []).map((u) => (
            <li key={u.id} className="flex items-center justify-between">
              <span>{u.email}</span>
              <span className="text-gray-600">{u.role}</span>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-xs text-gray-500">
          Next: add “Create user” UI (requires server-side service key).
        </p>
      </div>
    </div>
  );
}
