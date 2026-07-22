"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Download, RotateCcw, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/chess2fight/video-player";
import { MatchReport } from "@/components/chess2fight/match-report";
import type { GenerationResult } from "@/types/chess2fight";

type ResultDisplayProps = {
  result: GenerationResult;
  onGenerateAnother: () => void;
};

export function ResultDisplay({ result, onGenerateAnother }: ResultDisplayProps) {
  const [note, setNote] = React.useState<string | null>(null);

  function showNote(message: string) {
    setNote(message);
    window.setTimeout(() => setNote((current) => (current === message ? null : current)), 4000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-border bg-card/60 p-6 shadow-[0_40px_80px_-40px_hsl(var(--background))] backdrop-blur-xl sm:p-8"
    >
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <div>
          <VideoPlayer variant="result" durationLabel={result.estimatedLength} />

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              className="flex-1"
              onClick={() =>
                showNote("Rendering backend not yet connected — this is a preview build.")
              }
            >
              <Download size={16} />
              Download Watermarked Video
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                showNote("Sharing will go live once real video rendering is connected.")
              }
            >
              <Share2 size={16} />
              Share
            </Button>
            <Button variant="ghost" onClick={onGenerateAnother}>
              <RotateCcw size={16} />
              Generate Another
            </Button>
          </div>

          {note && <p className="mt-3 text-sm text-muted-foreground">{note}</p>}

          <p className="mt-4 text-xs text-muted-foreground">
            All generated videos include a subtle Chess2Fight + Powered by
            Halisako watermark.
          </p>
        </div>

        <MatchReport result={result} />
      </div>
    </motion.div>
  );
}
