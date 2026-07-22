/**
 * A cinematic "movie still" placeholder — stands in for a real
 * rendered frame wherever VideoPlayer has no working video source.
 * Pure SVG so there's no binary asset to manage; swap VideoPlayer's
 * `src`/`poster` props for real media and this never renders.
 */
export function DemoPosterArt({ variant = "demo" }: { variant?: "demo" | "result" }) {
  return (
    <svg
      viewBox="0 0 800 450"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`c2f-bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(var(--card))" />
          <stop offset="100%" stopColor="hsl(var(--background))" />
        </linearGradient>
        <radialGradient id={`c2f-glow-${variant}`} cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="hsl(var(--gold-primary)/0.35)" />
          <stop offset="100%" stopColor="hsl(var(--gold-primary)/0)" />
        </radialGradient>
      </defs>

      <rect width="800" height="450" fill={`url(#c2f-bg-${variant})`} />
      <rect width="800" height="450" fill={`url(#c2f-glow-${variant})`} />

      {/* Two facing silhouettes, standing in for the eventual fight scene */}
      <g opacity={0.9}>
        <path
          d="M270 340 C260 300 275 270 260 240 C250 220 258 195 275 185 C265 175 268 155 285 150 C300 146 312 158 312 172 C312 190 300 198 300 215 C316 225 322 250 312 275 C324 295 320 320 305 340 Z"
          fill="hsl(var(--foreground)/0.14)"
        />
        <path
          d="M530 340 C540 300 525 270 540 240 C550 220 542 195 525 185 C535 175 532 155 515 150 C500 146 488 158 488 172 C488 190 500 198 500 215 C484 225 478 250 488 275 C476 295 480 320 495 340 Z"
          fill="hsl(var(--gold-primary)/0.5)"
        />
      </g>

      {/* Ground line */}
      <line x1="180" y1="345" x2="620" y2="345" stroke="hsl(var(--border))" strokeWidth={1} />

      {/* Central energy clash mark */}
      <g transform="translate(400,220)">
        <path
          d="M0,-26 L7,-6 L26,0 L7,6 L0,26 L-7,6 L-26,0 L-7,-6 Z"
          fill="hsl(var(--gold-secondary))"
          opacity={0.9}
        />
      </g>
    </svg>
  );
}
