import type { Metadata } from "next";

import { Chess2FightNav } from "@/components/chess2fight/navigation";
import { constructMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = constructMetadata({
  title: "Chess2Fight",
  description:
    "Paste a PGN and watch Halisako turn your chess game into a cinematic anime fight scene.",
  path: "/chess2fight",
});

/**
 * /chess2fight is a product experience, not a marketing page — it
 * intentionally does NOT use the (marketing) route group's layout
 * (no Navbar, no five-column Footer). It always renders dark
 * regardless of the visitor's site-wide theme preference: cinematic
 * dark is part of this product's brief, not a togglable preference.
 * Wrapping in `.dark` re-scopes every CSS variable this subtree reads
 * (see app/globals.css) — no other component here needs to know.
 */
export default function Chess2FightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark" style={{ colorScheme: "dark" }}>
      <div className="min-h-screen bg-background text-foreground">
        <Chess2FightNav />
        <main>{children}</main>
        <footer className="border-t border-border px-6 py-8 text-center font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Chess2Fight is an
          early preview.
        </footer>
      </div>
    </div>
  );
}
