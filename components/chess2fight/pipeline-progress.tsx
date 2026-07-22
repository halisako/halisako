"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { ACTIVE_PIPELINE_STAGES } from "@/lib/chess2fight/mock-data";

const TOTAL_DURATION = ACTIVE_PIPELINE_STAGES.reduce((sum, s) => sum + s.duration, 0);

type PipelineProgressProps = {
  /** Called once, after the full staged animation finishes. */
  onComplete: () => void;
};

/**
 * Purely presentational — knows nothing about the actual network
 * request. The parent (Chess2FightExperience) fires the real fetch in
 * parallel and reconciles once this animation calls onComplete, so a
 * real backend just needs to resolve before this timer does.
 */
export function PipelineProgress({ onComplete }: PipelineProgressProps) {
  const [completedCount, setCompletedCount] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const onCompleteRef = React.useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Discrete stage advancement — set up once, immune to parent re-renders.
  React.useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let cumulative = 0;

    ACTIVE_PIPELINE_STAGES.forEach((stage, i) => {
      cumulative += stage.duration;
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setCompletedCount(i + 1);
          if (i === ACTIVE_PIPELINE_STAGES.length - 1) {
            onCompleteRef.current();
          }
        }, cumulative)
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  // Smooth continuous fill for the overall progress bar.
  React.useEffect(() => {
    let raf: number;
    const start = performance.now();
    function tick(now: number) {
      const pct = Math.min(100, ((now - start) / TOTAL_DURATION) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="rounded-xl border border-border bg-background/40 p-5">
      <Progress value={progress} />
      <ul className="mt-5 flex flex-col gap-3">
        {ACTIVE_PIPELINE_STAGES.map((stage, i) => {
          const isComplete = i < completedCount;
          const isActive = i === completedCount;
          return (
            <li key={stage.key} className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  {isComplete ? (
                    <motion.span
                      key="done"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-primary text-[#0B0A08]"
                    >
                      <Check size={12} strokeWidth={3} />
                    </motion.span>
                  ) : isActive ? (
                    <motion.span
                      key="active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Loader2 size={16} className="animate-spin text-gold-primary" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="pending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-2 w-2 rounded-full border border-border"
                    />
                  )}
                </AnimatePresence>
              </span>
              <span
                className={
                  isComplete
                    ? "text-sm text-foreground"
                    : isActive
                      ? "text-sm font-medium text-foreground"
                      : "text-sm text-muted-foreground"
                }
              >
                {stage.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
