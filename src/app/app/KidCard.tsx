'use client';

export function KidCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur p-5 sm:p-6 shadow-[0_18px_50px_rgba(2,8,23,0.08)]">
      {children}
    </div>
  );
}
