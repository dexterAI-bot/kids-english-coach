import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="mx-auto max-w-4xl p-4 flex items-center justify-between">
          <Link href="/app" className="font-semibold">
            Kids’ English Coach
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/app">Quiz</Link>
            <Link href="/app/progress">Progress</Link>
            <Link href="/app/admin">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-4">{children}</main>
    </div>
  );
}
