import styles from "./orchestration-visual.module.css";

/**
 * The hero's signature element: three paths — standing in for
 * Understand / Plan / Orchestrate — converge into a single pulsing
 * core, with particles traveling along each path. Deliberately the
 * one bold animated moment on the page; every other section stays
 * quiet by comparison.
 *
 * Pure CSS + SVG (offset-path, stroke-dashoffset), no client JS
 * required, so it renders as a Server Component.
 */
export function OrchestrationVisual() {
  return (
    <svg
      viewBox="0 0 420 320"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="halisako-gold-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--silver))" stopOpacity={0.5} />
          <stop offset="100%" stopColor="hsl(var(--gold-primary))" stopOpacity={0.9} />
        </linearGradient>
        <radialGradient id="halisako-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--gold-accent))" />
          <stop offset="100%" stopColor="hsl(var(--gold-secondary))" stopOpacity={0} />
        </radialGradient>
      </defs>

      <path
        d="M 40,120 C 160,60 260,60 380,150"
        fill="none"
        stroke="url(#halisako-gold-line)"
        strokeWidth={1.4}
        className={styles.flowPath}
      />
      <path
        d="M 40,260 C 160,300 260,260 380,170"
        fill="none"
        stroke="url(#halisako-gold-line)"
        strokeWidth={1.4}
        className={styles.flowPath}
      />
      <path
        d="M 40,190 C 180,190 240,180 380,160"
        fill="none"
        stroke="url(#halisako-gold-line)"
        strokeWidth={1.4}
        className={styles.flowPath}
      />

      <circle cx={40} cy={120} r={4} fill="hsl(var(--silver))" />
      <circle cx={40} cy={260} r={4} fill="hsl(var(--silver))" />
      <circle cx={40} cy={190} r={4} fill="hsl(var(--silver))" />

      <circle
        cx={380}
        cy={160}
        r={46}
        fill="url(#halisako-core-glow)"
        className={styles.coreRing}
      />
      <circle cx={380} cy={160} r={7} fill="hsl(var(--gold-primary))" className={styles.corePulse} />

      <circle r={3.2} fill="hsl(var(--gold-secondary))" className={styles.particleA} />
      <circle r={3.2} fill="hsl(var(--gold-secondary))" className={styles.particleB} />
      <circle r={2.6} fill="hsl(var(--silver))" className={styles.particleC} />
    </svg>
  );
}
