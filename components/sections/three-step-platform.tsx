import { Card } from "@/components/ui/card";
import { SectionTitle } from "@/components/shared/section-title";
import { Reveal } from "@/components/shared/reveal";
import { stepIcons } from "@/components/shared/icon-registry";
import { steps } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function ThreeStepPlatform({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-6xl px-6 py-24", className)}>
      <SectionTitle
        eyebrow="The Platform"
        title="One pipeline, three disciplined stages"
        description="Instead of generating immediately, Halisako moves deliberately from comprehension to a finished, coordinated experience."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = stepIcons[step.icon];
          return (
            <Reveal key={step.n} delay={Math.min(i + 1, 3) as 1 | 2 | 3}>
              <Card className="group h-full p-8 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-gold-secondary hover:shadow-[0_20px_40px_-20px_hsl(var(--foreground)/0.12)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest text-gold-primary">
                    {step.n}
                  </span>
                  <Icon size={20} className="text-gold-primary" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
