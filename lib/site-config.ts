/**
 * lib/site-config.ts
 * ------------------------------------------------------------------
 * Central content + configuration store. Section components stay pure
 * (they render props/data, they don't own copy), so the same section
 * can be reused across the homepage and its dedicated route with a
 * different slice of this data, and copy can be edited in one place.
 */

import type { PipelineIconKey, ProductIconKey, StepIconKey } from "@/types";

export const siteConfig = {
  name: "Halisako",
  title: "Halisako — Transform Ideas into Experiences",
  description:
    "Halisako understands, plans and orchestrates AI to transform your ideas into immersive digital experiences.",
  url: "https://halisako.com",
  ogImage: "/opengraph-image",
  links: {
    github: "https://github.com/halisako",
  },
} as const;

export const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Technology", href: "/technology" },
  { label: "Vision", href: "/vision" },
] as const;

export const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/vision" },
      { label: "Vision", href: "/vision" },
      { label: "Careers", href: "/#" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Chess2Fight", href: "/chess2fight" },
      { label: "Song2Dance", href: "/products" },
      { label: "Developer APIs", href: "/waitlist" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "https://github.com/halisako" },
      { label: "Technology", href: "/technology" },
      { label: "Waitlist", href: "/waitlist" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/#" },
      { label: "Terms", href: "/#" },
      { label: "Contact", href: "/waitlist" },
    ],
  },
] as const;

export type Step = {
  n: string;
  icon: StepIconKey;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    n: "01",
    icon: "understand",
    title: "Understand",
    body: "Halisako reads your input closely — its structure, intent and emotional shape — before anything is generated.",
  },
  {
    n: "02",
    icon: "plan",
    title: "Plan",
    body: "A full experience is storyboarded: pacing, style and sequence are decided ahead of any rendering.",
  },
  {
    n: "03",
    icon: "orchestrate",
    title: "Orchestrate",
    body: "Multiple specialized AI systems are coordinated in the right order to produce one coherent output.",
  },
];

export type Product = {
  slug: string;
  badge: string;
  icon: ProductIconKey;
  title: string;
  tagline: string;
  description: string;
  /** Present once the product has a real page to link to. */
  href?: string;
};

export const products: Product[] = [
  {
    slug: "chess2fight",
    badge: "Try It Now",
    icon: "chess",
    title: "Chess2Fight",
    tagline: "Chess games, reimagined as anime battles",
    description:
      "A PGN file becomes a cinematic anime fight scene — every move choreographed into an exchange of blows, every capture a decisive strike.",
    href: "/chess2fight",
  },
  {
    slug: "song2dance",
    badge: "Coming Soon",
    icon: "dance",
    title: "Song2Dance",
    tagline: "Songs, reimagined as choreography",
    description:
      "A song becomes a fully choreographed dance performance, synchronized to rhythm, lyrics, melody and emotion.",
  },
];

export const futureProducts = [
  "Stories",
  "Education",
  "Sports",
  "Architecture",
] as const;

export const pipelineSteps: { icon: PipelineIconKey; label: string }[] = [
  { icon: "upload", label: "Upload" },
  { icon: "understand", label: "Understand" },
  { icon: "plan", label: "Plan" },
  { icon: "orchestrate", label: "Orchestrate" },
  { icon: "experience", label: "Experience" },
];

export type ComparisonRow = {
  row: string;
  halText: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    row: "Starts generating immediately",
    halText: "Plans the full experience first",
  },
  {
    row: "Single model, single pass",
    halText: "Multiple systems, coordinated",
  },
  {
    row: "Output quality depends on the prompt",
    halText: "Output quality depends on the plan",
  },
  {
    row: "Inconsistent pacing and structure",
    halText: "Deliberate pacing, start to finish",
  },
  {
    row: "One-shot, hard to iterate",
    halText: "Understands, then adapts",
  },
];

export const interestOptions = [
  "Chess2Fight",
  "Song2Dance",
  "Developer APIs",
] as const;
