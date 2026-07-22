"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

import { IDLE_PIPELINE_STAGES } from "@/lib/chess2fight/mock-data";

export function SidePanel() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card/60 p-6">
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Clock size={15} className="text-gold-primary" />
          Estimated video length
        </div>
        <p className="mt-1 font-display text-2xl font-semibold text-foreground">
          15–30 sec
        </p>
      </div>

      <div className="h-px bg-border" />

      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          AI Pipeline
        </p>
        <ul className="mt-4 flex flex-col gap-3.5">
          {IDLE_PIPELINE_STAGES.map((stage, i) => (
            <li key={stage.key} className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 rounded-full bg-gold-primary/40" />
                <motion.span
                  className="absolute h-2 w-2 rounded-full bg-gold-primary"
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.15, 0.85] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.35,
                  }}
                />
              </span>
              <span className="text-sm text-muted-foreground">{stage.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
