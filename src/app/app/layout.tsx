import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-sky-50 to-amber-50">
      <header className="sticky top-0 z-10 border-b border-white/60 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-4xl p-4 flex items-center justify-between">
          <Link href="/app" className="font-semibold">
            Kids’ English Coach
          </Link>
          <nav className="flex gap-3 text-sm">
            <Link className="rounded-full px-3 py-1 hover:bg-white/70" href="/app">
              משחק
            </Link>
            <Link className="rounded-full px-3 py-1 hover:bg-white/70" href="/app/progress">
              התקדמות
            </Link>
            <Link className="rounded-full px-3 py-1 hover:bg-white/70" href="/app/admin">
              ניהול
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-4">{children}</main>
    </div>
  );
}
