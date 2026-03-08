import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-zinc-50 dark:bg-black">
      <div className="max-w-xl w-full rounded-xl border bg-white dark:bg-zinc-950 p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Kids’ English Coach</h1>
        <p className="text-gray-700 dark:text-gray-200">
          MVP v0: English word + audio + 4 Hebrew options (בלי ניקוד) + progress per user.
        </p>
        <div className="flex gap-3">
          <Link className="rounded bg-blue-600 text-white px-4 py-2" href="/login">
            Login
          </Link>
          <Link className="rounded border px-4 py-2" href="/app">
            Go to app
          </Link>
        </div>
        <p className="text-xs text-gray-500">Admin email: freakazoid85@gmail.com</p>
      </div>
    </div>
  );
}
