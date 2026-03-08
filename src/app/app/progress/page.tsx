import { createClient } from '@/lib/supabase/server';

export default async function ProgressPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: attempts } = await supabase
    .from('attempts')
    .select('id,is_correct,created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const total = attempts?.length ?? 0;
  const correct = (attempts ?? []).filter((a) => a.is_correct).length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Your progress</h1>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border p-4">
          <div className="text-xs text-gray-500">Attempts</div>
          <div className="text-2xl font-semibold">{total}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-xs text-gray-500">Correct</div>
          <div className="text-2xl font-semibold">{correct}</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-xs text-gray-500">Accuracy</div>
          <div className="text-2xl font-semibold">{accuracy}%</div>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <h2 className="font-semibold">Recent attempts</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {(attempts ?? []).map((a) => (
            <li key={a.id} className="flex items-center justify-between">
              <span>{new Date(a.created_at).toLocaleString()}</span>
              <span className={a.is_correct ? 'text-green-700' : 'text-red-700'}>
                {a.is_correct ? 'Correct' : 'Wrong'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
