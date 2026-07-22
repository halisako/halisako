"use client";

import * as React from "react";
import { ChevronDown, Trophy, Swords, Flame, Target, Crosshair, ScrollText } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { GenerationResult } from "@/types/chess2fight";
import { cn } from "@/lib/utils";

const fields: {
  key: keyof Pick<
    GenerationResult,
    "winner" | "opening" | "fightStyle" | "bestMove" | "turningPoint"
  >;
  label: string;
  icon: typeof Trophy;
}[] = [
  { key: "winner", label: "Winner", icon: Trophy },
  { key: "opening", label: "Opening", icon: Swords },
  { key: "fightStyle", label: "Fight Style", icon: Flame },
  { key: "bestMove", label: "Best Move", icon: Target },
  { key: "turningPoint", label: "Turning Point", icon: Crosshair },
];

export function MatchReport({ result }: { result: GenerationResult }) {
  const [promptOpen, setPromptOpen] = React.useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6 sm:p-8">
      <h3 className="font-display text-lg font-semibold text-foreground">Match Report</h3>

      <dl className="mt-6 flex flex-col gap-4">
        {fields.map((field) => (
          <div key={field.key} className="flex items-start gap-3">
            <field.icon size={16} className="mt-0.5 shrink-0 text-gold-primary" />
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {field.label}
              </dt>
              <dd className="mt-0.5 text-sm text-foreground">{result[field.key]}</dd>
            </div>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t border-border pt-6">
        <div className="flex items-start gap-3">
          <ScrollText size={16} className="mt-0.5 shrink-0 text-gold-primary" />
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              AI Battle Summary
            </dt>
            <dd className="mt-0.5 text-sm leading-relaxed text-foreground">
              {result.battleSummary}
            </dd>
          </div>
        </div>
      </div>

      <Collapsible open={promptOpen} onOpenChange={setPromptOpen} className="mt-6">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View AI Prompt
            <ChevronDown
              size={15}
              className={cn("transition-transform duration-300", promptOpen && "rotate-180")}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1">
          <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-background/60 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
            {result.prompt}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
