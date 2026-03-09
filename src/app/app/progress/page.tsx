import { createClient } from '@/lib/supabase/server';

function Sparkline({ points }: { points: number[] }) {
  const w = 320;
  const h = 64;
  const pad = 6;
  const max = Math.max(1, ...points);

  const toX = (i: number) => pad + (i * (w - pad * 2)) / Math.max(1, points.length - 1);
  const toY = (v: number) => h - pad - (v * (h - pad * 2)) / max;

  const d = points
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`)
    .join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block">
      <path d={d} fill="none" stroke="#2563eb" strokeWidth="2" />
    </svg>
  );
}

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
    .limit(200);

  const total = attempts?.length ?? 0;
  const correct = (attempts ?? []).filter((a) => a.is_correct).length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  // Graph: last 14 days attempts count
  const byDay = new Map<string, number>();
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    byDay.set(key, 0);
  }
  for (const a of attempts ?? []) {
    const key = new Date(a.created_at).toISOString().slice(0, 10);
    if (byDay.has(key)) byDay.set(key, (byDay.get(key) ?? 0) + 1);
  }
  const points = [...byDay.values()];

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
        <h2 className="font-semibold">Last 14 days (attempts)</h2>
        <div className="mt-2 overflow-x-auto">
          <Sparkline points={points} />
        </div>
        <p className="mt-2 text-xs text-gray-500">This is total attempts per day (not score).</p>
      </div>

      <div className="rounded-xl border p-4">
        <details>
          <summary className="cursor-pointer font-semibold">Recent attempts (logs)</summary>
          <ul className="mt-3 space-y-1 text-sm">
            {(attempts ?? []).slice(0, 50).map((a) => (
              <li key={a.id} className="flex items-center justify-between">
                <span>{new Date(a.created_at).toLocaleString()}</span>
                <span className={a.is_correct ? 'text-green-700' : 'text-red-700'}>
                  {a.is_correct ? 'Correct' : 'Wrong'}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
}
