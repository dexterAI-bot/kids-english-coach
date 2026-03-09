export function Mascot({ className = '' }: { className?: string }) {
  // Simple original SVG mascot (friendly "cloud-buddy"), no external assets.
  return (
    <svg
      className={className}
      viewBox="0 0 220 140"
      role="img"
      aria-label="Mascot"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="m1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd7f5" />
          <stop offset="1" stopColor="#bde6ff" />
        </linearGradient>
        <linearGradient id="m2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7dd3fc" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0b1220" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Body */}
      <g filter="url(#shadow)">
        <path
          d="M55 95c-18 0-32-11-32-26 0-13 10-23 24-25 4-16 21-28 41-28 16 0 31 7 38 18 4-2 10-3 15-3 20 0 36 13 36 30 0 18-17 34-43 34H55z"
          fill="url(#m1)"
          stroke="#ffffff"
          strokeOpacity="0.75"
          strokeWidth="3"
        />

        {/* cheeks */}
        <circle cx="78" cy="78" r="8" fill="#ff8fc5" opacity="0.45" />
        <circle cx="142" cy="78" r="8" fill="#ff8fc5" opacity="0.45" />

        {/* eyes */}
        <circle cx="90" cy="70" r="7" fill="#0b1220" opacity="0.9" />
        <circle cx="130" cy="70" r="7" fill="#0b1220" opacity="0.9" />
        <circle cx="88" cy="68" r="2" fill="#fff" />
        <circle cx="128" cy="68" r="2" fill="#fff" />

        {/* smile */}
        <path d="M103 83c7 7 15 7 22 0" fill="none" stroke="#0b1220" strokeWidth="4" strokeLinecap="round" />

        {/* little wand */}
        <path d="M170 40l18-18" stroke="url(#m2)" strokeWidth="6" strokeLinecap="round" />
        <path d="M186 24l8 8" stroke="url(#m2)" strokeWidth="6" strokeLinecap="round" />
        <path d="M186 24l8-8" stroke="url(#m2)" strokeWidth="6" strokeLinecap="round" />
        <path d="M186 24l-8-8" stroke="url(#m2)" strokeWidth="6" strokeLinecap="round" />
        <path d="M186 24l-8 8" stroke="url(#m2)" strokeWidth="6" strokeLinecap="round" />
      </g>
    </svg>
  );
}
