import Link from "next/link";
import { Github, Swords } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const links = [
  { label: "About", href: "/" },
  { label: "Technology", href: "/technology" },
  { label: "Examples", href: "/chess2fight#demo" },
];

/**
 * Product-specific navigation for /chess2fight. Deliberately different
 * from the marketing <Navbar/>: different links, no CTA, no login.
 * Uses the same semantic tokens (background/foreground/border) as the
 * rest of the app — this route just renders inside a forced ".dark"
 * wrapper (see app/chess2fight/layout.tsx), so those tokens already
 * resolve to the dark palette here.
 */
export function Chess2FightNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/chess2fight" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-secondary to-gold-primary">
            <Swords size={16} className="text-[#0B0A08]" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold text-foreground">
              Chess2Fight
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              by {siteConfig.name}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteConfig.links.github}
            aria-label="GitHub"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
