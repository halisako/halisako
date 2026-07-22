"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { PGNUpload } from "@/components/chess2fight/pgn-upload";
import { ResultDisplay } from "@/components/chess2fight/result-display";
import type { ExperiencePhase, GenerationResult } from "@/types/chess2fight";

type PendingOutcome =
  | { ok: true; data: GenerationResult }
  | { ok: false; error: string };

export function Chess2FightExperience() {
  const [phase, setPhase] = React.useState<ExperiencePhase>("upload");
  const [pgn, setPgn] = React.useState("");
  const [result, setResult] = React.useState<GenerationResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const outcomeRef = React.useRef<Promise<PendingOutcome> | null>(null);

  function handleGenerate() {
    setError(null);
    setPhase("generating");

    outcomeRef.current = fetch("/api/chess2fight/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pgn }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) return { ok: false as const, error: data.error ?? "Generation failed." };
        return { ok: true as const, data: data as GenerationResult };
      })
      .catch(() => ({ ok: false as const, error: "Network error — please try again." }));
  }

  // Called by PipelineProgress once its ~20s staged animation finishes.
  // By this point outcomeRef's fetch has long since settled.
  async function handlePipelineComplete() {
    const outcome = await outcomeRef.current;
    if (!outcome) return;
    if (outcome.ok) {
      setResult(outcome.data);
      setPhase("result");
    } else {
      setError(outcome.error);
      setPhase("upload");
    }
  }

  function handleGenerateAnother() {
    setResult(null);
    setPhase("upload");
  }

  return (
    <section className="px-6 pb-28">
      <div className="mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          {phase === "result" && result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultDisplay result={result} onGenerateAnother={handleGenerateAnother} />
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PGNUpload
                pgn={pgn}
                onPgnChange={setPgn}
                onGenerate={handleGenerate}
                phase={phase}
                onPipelineComplete={handlePipelineComplete}
                error={error}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
