# Halisako — v2.1

Two things live in this repo now:

1. **The Halisako marketing site** — `/`, `/products`, `/technology`,
   `/vision`, `/waitlist`. Light-first, Apple/Linear/Stripe/Notion-
   inspired, gold/silver brand palette.
2. **Chess2Fight** (`/chess2fight`) — the first real product
   experience: paste a PGN, watch a mock AI pipeline animate, get a
   mock cinematic-fight result. Dark, cinematic, its own navigation —
   deliberately not styled like the marketing site.

Both share the same design-token system, shadcn/ui primitives, and
Next.js project — see "Design tokens" below for how the product page
gets a different look without a second theme system.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the marketing site, or
http://localhost:3000/chess2fight for the product.

```bash
npm run build      # production build
npm run start       # serve the production build
npm run lint        # next lint
npm run typecheck  # tsc --noEmit
```

> **Note on `next/font`:** the build fetches Geist, Inter and JetBrains
> Mono from Google Fonts at build time (then self-hosts them — no
> runtime request to Google). This requires outbound internet access
> during `npm run build`. It works out of the box on Vercel and on a
> normal machine; it will fail in network-sandboxed CI unless
> `fonts.googleapis.com` is reachable.

## Project structure

```
app/
  layout.tsx                Root layout — next/font, ThemeProvider only.
                             No Navbar/Footer here — see route groups below.
  globals.css                Tailwind layers + HSL design-token variables
  not-found.tsx               Custom 404
  sitemap.ts / robots.ts      Generated SEO files (includes /chess2fight)
  icon.tsx / apple-icon.tsx             Dynamic favicon + Apple touch icon (next/og)
  opengraph-image.tsx / twitter-image.tsx  Dynamic OG/Twitter card (next/og)
  api/waitlist/route.ts        POST handler for the early-access form (stub)
  api/chess2fight/generate/route.ts   Mock generation endpoint (stub)

  (marketing)/                Route group — URLs are unaffected by the
                               parens, this only scopes shared chrome.
    layout.tsx                 Renders <Navbar/> + <Footer/>
    page.tsx                    /
    products/page.tsx           /products
    technology/page.tsx         /technology
    vision/page.tsx              /vision
    waitlist/page.tsx            /waitlist

  chess2fight/
    layout.tsx                 Forces dark theme, renders <Chess2FightNav/>
                                + a minimal footer. No marketing chrome.
    page.tsx                    Hero + DemoShowcase + Chess2FightExperience

components/
  layout/          Navbar, Footer, MobileNav (Sheet), ThemeProvider, ThemeToggle
                    — marketing site only.
  sections/        Hero, ThreeStepPlatform, FeaturedProducts, Pipeline,
                    ComparisonTable, VisionSection, EarlyAccessForm
                    — marketing site only, reused across its 5 routes.
  orchestration/   OrchestrationVisual — marketing hero's signature animation.
  shared/          SectionTitle, Eyebrow, Reveal, Logo, icon-registry,
                    product-illustration — marketing site only.
  ui/              shadcn/ui primitives, shared by both sites: button,
                    card, input, label, select, badge, separator, sheet,
                    table, textarea, progress, collapsible.
  chess2fight/      Product-specific components — see below.

hooks/use-reveal.ts   IntersectionObserver hook backing <Reveal> (marketing)

lib/
  theme.ts          Canonical design tokens (hex values + HSL reference)
  site-config.ts    Marketing site copy/content
  metadata.ts       constructMetadata() — consistent SEO/OG per route
  og.tsx             Shared JSX for the generated OG/Twitter image
  utils.ts           cn() class-merge helper
  chess2fight/mock-data.ts   PGN samples, pipeline stage lists, mock results

types/
  index.ts           Marketing-site icon-key unions
  chess2fight.ts      Chess2Fight domain types (GenerationResult, phases, etc.)
```

## Design tokens

`lib/theme.ts` is the single source of truth for the brand palette,
radii, and font variable names, mirrored as HSL CSS custom properties
in `app/globals.css` (`:root` for light, `.dark` for dark) and exposed
as Tailwind colors in `tailwind.config.ts` (`gold-primary`,
`gold-secondary`, `gold-accent`, `silver`, `silver-light`, plus the
standard shadcn set).

**Chess2Fight reuses this exact token system rather than defining its
own.** `app/chess2fight/layout.tsx` wraps its whole subtree in a
`.dark` class, which re-scopes every CSS variable for that part of the
app — no component inside `components/chess2fight/` references a raw
color, they all use the same `bg-background`, `text-foreground`,
`border-border`, `text-gold-primary` utilities the marketing site uses
in light mode. This is why the product page can look completely
different (dark, cinematic, glowing) from a handful of layout
decisions rather than a parallel theme.

Dark mode on the *marketing* site is user-toggled via
[`next-themes`](https://github.com/pacocoursey/next-themes) from the
navbar. Chess2Fight ignores that toggle by design — it's always dark.

## Chess2Fight

`/chess2fight` is a self-contained product experience:

- **`components/chess2fight/navigation.tsx`** — its own nav (About /
  Technology / Examples / GitHub, no login, no CTA), distinct from the
  marketing `<Navbar/>`.
- **`hero.tsx`** — headline + subheadline over a soft gold glow.
- **`demo-showcase.tsx`** — the autoplay/muted/loop demo video (see
  `video-player.tsx` below) with its caption, and the "Ready to create
  your own?" heading.
- **`pgn-upload.tsx`** — the glass card: auto-resizing textarea, four
  quick actions (Example PGN, Paste Sample, Upload PGN File, Paste
  from Clipboard) plus Clear, and the side panel
  (`side-panel.tsx`, ambient/idle 5-stage pipeline overview +
  estimated length).
- **`pipeline-progress.tsx`** — replaces the Generate button once
  clicked: a 6-stage animated checklist + progress bar. This is purely
  presentational timing (~20s total, matching the brief) — it knows
  nothing about the network call.
- **`experience.tsx`** (`Chess2FightExperience`) — the stateful piece
  tying it together. On Generate, it fires the real POST to
  `/api/chess2fight/generate` *in parallel* with
  `PipelineProgress`'s animation, and reconciles once the animation's
  `onComplete` fires (by which point the fetch has long since
  settled). **This is the seam for a real backend**: replace the
  route handler with a real job dispatch, or swap the whole
  fetch-and-wait pattern for polling/SSE — `PipelineProgress` and
  `PGNUpload` don't need to change.
- **`result-display.tsx`** + **`match-report.tsx`** — the finished
  view: video player, Download (Watermarked) / Share / Generate
  Another, and the match report (Winner, Opening, Fight Style, Best
  Move, Turning Point, AI Battle Summary) with the generated prompt
  under an expandable "View AI Prompt" disclosure.
- **`video-player.tsx`** — reused by both the demo and the result
  view. No real video exists yet, so it falls back to
  `demo-poster-art.tsx` (an SVG "movie still," not a broken video
  icon). Pass a real `src` once rendering exists and nothing else
  changes.

**Mock data** lives entirely in `lib/chess2fight/mock-data.ts` — two
sample PGNs (Scholar's Mate, Légal's Mate) and a pool of three
`GenerationResult` variants the API route picks from at random, so
repeated demos don't feel identical. `app/api/chess2fight/generate/route.ts`
does light validation (non-empty, PGN-shaped) and returns one of them
after a short simulated delay — swap its body for a real pipeline
without touching any component.

**What's honestly mocked, on purpose:** there is no real video
anywhere. Download and Share are fully wired UI (correct labels,
icons, click handling) that surface a small inline note rather than
faking a download of a file that doesn't exist.

## shadcn/ui

`components/ui/` follows shadcn/ui conventions (Radix primitives +
`class-variance-authority` + `cn()`), styled with the brand tokens
instead of shadcn's neutral defaults: button, card, input, label,
select, badge, separator, sheet, table, textarea, progress,
collapsible. `components.json` is included, so the CLI can add more:

```bash
npx shadcn@latest add dialog
```

## Fonts

`app/layout.tsx` loads Geist (display), Inter (body), and JetBrains
Mono (labels/code) via `next/font/google`, exposed as CSS variables
that `tailwind.config.ts` maps to `font-display`, `font-sans`, and
`font-mono`. Both the marketing site and Chess2Fight use the same
three typefaces — only the color scheme changes between them.

## API routes

- `app/api/waitlist/route.ts` — still a stub. Validates and logs
  early-access signups; has a `// TODO` marking where real persistence
  would go.
- `app/api/chess2fight/generate/route.ts` — **has two modes.** With no
  `CHESS2FIGHT_API_URL` env var set, it behaves exactly as before
  (randomly-picked mock `GenerationResult`, ~1.2s simulated delay). Set
  `CHESS2FIGHT_API_URL` to a deployed instance of the real backend (see
  `/backend` — a separate FastAPI service, not part of this Next.js
  app) and this route forwards the PGN there instead, mapping its
  nested response (`fight_story.fight_style`, etc.) into the same flat
  `GenerationResult` shape the UI already renders. No component
  changes needed either way.

  If the backend URL is configured but unreachable at request time,
  this deliberately returns a real error rather than silently falling
  back to mock data — showing fabricated results for someone's actual
  pasted PGN would be worse than an honest "couldn't reach the
  generation service" message.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is
   auto-detected, no build settings needed.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (see
   `.env.example`) so canonical URLs and OG image URLs resolve
   correctly.
4. Deploy.

Or, from the CLI:

```bash
npm i -g vercel
vercel
```
