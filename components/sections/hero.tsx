import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { OrchestrationVisual } from "@/components/orchestration/orchestration-visual";
import { brand } from "@/lib/theme";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
            <Sparkles size={12} className="text-gold-primary" />
            {brand.motto}
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.4rem]">
            Transform Ideas
            <br />
            into Experiences
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Halisako understands, plans and orchestrates AI to transform your
            ideas into immersive digital experiences.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/waitlist">
                Get Early Access
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/vision">Explore the Vision</Link>
            </Button>
          </div>
        </Reveal>

        <div className="relative h-[280px] sm:h-[340px]">
          <OrchestrationVisual />
        </div>
      </div>
    </section>
  );
}
