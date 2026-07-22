/**
 * lib/theme.ts
 * ------------------------------------------------------------------
 * Single source of truth for the Halisako design system.
 *
 * These values are the *canonical* brand tokens. They are mirrored as
 * HSL CSS custom properties in `app/globals.css` (so Tailwind, shadcn/ui
 * primitives, and dark mode can all consume them at runtime) and as
 * Tailwind color/radius aliases in `tailwind.config.ts`.
 *
 * If the brand palette changes, change it here first, then update the
 * matching HSL triplets in globals.css. `scripts` below documents how
 * each hex was converted, so the two files never drift silently.
 */

export const brand = {
  name: "Halisako",
  motto: "Creation through Intelligent Orchestration",
  vision: "Transform ideas into experiences.",
} as const;

export const palette = {
  gold: {
    primary: "#B8860B",
    secondary: "#D4AF37",
    accent: "#F4E4A6",
  },
  silver: {
    DEFAULT: "#C0C0C0",
    light: "#D9D9D9",
  },
  light: {
    background: "#FAFAFA",
    card: "#FFFFFF",
    border: "#ECECEC",
    text: "#111111",
    textSecondary: "#5A5A5A",
  },
  dark: {
    background: "#0B0A08",
    card: "#131210",
    border: "#232019",
    text: "#F5F1E8",
    textSecondary: "#A8A296",
    goldAccent: "#4A3D1A",
  },
} as const;

/**
 * HSL triplets (hue, saturation%, lightness%) for every hex above,
 * generated once via `colorsys.rgb_to_hls` and pasted into
 * `app/globals.css` as `--token: H S% L%;`. Kept here purely as a
 * documented cross-reference — CSS custom properties are the runtime
 * source, this file is the design-intent source.
 */
export const hslReference = {
  "gold-primary": "43 89% 38%",
  "gold-secondary": "46 65% 52%",
  "gold-accent": "48 78% 80%",
  silver: "0 0% 75%",
  "silver-light": "0 0% 85%",
  "bg-light": "0 0% 98%",
  "card-light": "0 0% 100%",
  "border-light": "0 0% 93%",
  "text-light": "0 0% 7%",
  "text-secondary-light": "0 0% 35%",
  "bg-dark": "40 16% 4%",
  "card-dark": "40 9% 7%",
  "border-dark": "42 17% 12%",
  "text-dark": "42 39% 94%",
  "text-secondary-dark": "40 9% 62%",
  "gold-accent-dark": "44 48% 20%",
} as const;

export const radii = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  full: "9999px",
} as const;

export const fontVars = {
  display: "var(--font-display)",
  body: "var(--font-body)",
  mono: "var(--font-mono)",
} as const;

export const motion = {
  revealDuration: "0.7s",
  revealEasing: "cubic-bezier(.16,1,.3,1)",
  hoverDuration: "0.3s",
} as const;

export type Palette = typeof palette;
