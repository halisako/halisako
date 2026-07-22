import { ArrowDown } from "lucide-react";

import { SectionTitle } from "@/components/shared/section-title";
import { Reveal } from "@/components/shared/reveal";
import { pipelineIcons } from "@/components/shared/icon-registry";
import { pipelineSteps } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Pipeline({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-3xl px-6 py-24", className)}>
      <SectionTitle
        align="center"
        eyebrow="How It Works"
        title="From input to finished experience"
        description="One continuous pipeline, from a single upload to a fully realized output."
      />
      <Reveal className="mt-16 flex flex-col items-center">
        {pipelineSteps.map((step, i) => {
          const Icon = pipelineIcons[step.icon];
          const isLast = i === pipelineSteps.length - 1;
          return (
            <div key={step.label} className="flex flex-col items-center">
              <div className="flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3">
                <Icon size={16} className="text-gold-primary" />
                <span className="font-display text-sm font-medium">{step.label}</span>
              </div>
              {!isLast && (
                <div className="flex flex-col items-center py-2">
                  <div className="h-6 w-px bg-gradient-to-b from-border via-gold-secondary to-border" />
                  <ArrowDown size={14} className="text-gold-secondary" />
                </div>
              )}
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
