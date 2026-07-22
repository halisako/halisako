"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ClipboardPaste, Eraser, Sparkles, Upload as UploadIcon, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SidePanel } from "@/components/chess2fight/side-panel";
import { PipelineProgress } from "@/components/chess2fight/pipeline-progress";
import { PGN_SAMPLES } from "@/lib/chess2fight/mock-data";
import type { ExperiencePhase } from "@/types/chess2fight";
import { cn } from "@/lib/utils";

type PGNUploadProps = {
  pgn: string;
  onPgnChange: (value: string) => void;
  onGenerate: () => void;
  phase: ExperiencePhase;
  onPipelineComplete: () => void;
  error: string | null;
};

export function PGNUpload({
  pgn,
  onPgnChange,
  onGenerate,
  phase,
  onPipelineComplete,
  error,
}: PGNUploadProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [clipboardError, setClipboardError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Smoothly auto-grow the textarea to fit its content.
  React.useEffect(() => {
    const node = textareaRef.current;
    if (!node) return;
    node.style.height = "0px";
    node.style.height = `${Math.min(Math.max(node.scrollHeight, 200), 420)}px`;
  }, [pgn]);

  async function handlePasteFromClipboard() {
    setClipboardError(null);
    try {
      const text = await navigator.clipboard.readText();
      onPgnChange(text);
    } catch {
      setClipboardError("Clipboard access was blocked — try pasting manually instead.");
    }
  }

  function handleFileChosen(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onPgnChange(String(reader.result ?? ""));
    reader.readAsText(file);
    event.target.value = "";
  }

  const quickActions = [
    {
      label: PGN_SAMPLES[0]!.label,
      icon: Sparkles,
      onClick: () => onPgnChange(PGN_SAMPLES[0]!.pgn),
    },
    {
      label: PGN_SAMPLES[1]!.label,
      icon: FileText,
      onClick: () => onPgnChange(PGN_SAMPLES[1]!.pgn),
    },
    {
      label: "Upload PGN File",
      icon: UploadIcon,
      onClick: () => fileInputRef.current?.click(),
    },
    {
      label: "Paste from Clipboard",
      icon: ClipboardPaste,
      onClick: handlePasteFromClipboard,
    },
  ];

  const isGenerating = phase === "generating";
  const canGenerate = pgn.trim().length > 0 && !isGenerating;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-border bg-card/60 p-6 shadow-[0_40px_80px_-40px_hsl(var(--background))] backdrop-blur-xl sm:p-8"
    >
      <h2 className="font-display text-xl font-semibold text-foreground">Paste your PGN</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_280px]">
        <div className="flex flex-col">
          <Textarea
            ref={textareaRef}
            value={pgn}
            onChange={(e) => onPgnChange(e.target.value)}
            disabled={isGenerating}
            placeholder={`[Event "Example Game"]\n[White "Halisako"]\n[Black "Guest"]\n[Result "1-0"]\n\n1. e4 e5 2. Qh5 Nc6 3. Bc4 Nf6?? 4. Qxf7# 1-0`}
            className="min-h-[200px] resize-none font-mono text-sm leading-relaxed transition-[height] duration-200 ease-premium"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                disabled={isGenerating}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-gold-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <action.icon size={13} />
                {action.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                onPgnChange("");
                setClipboardError(null);
              }}
              disabled={isGenerating || !pgn}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              <Eraser size={13} />
              Clear
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pgn,.txt"
              className="hidden"
              onChange={handleFileChosen}
            />
          </div>

          {(clipboardError || error) && (
            <p className="mt-3 text-sm text-destructive">{clipboardError ?? error}</p>
          )}

          <div className="mt-6">
            {isGenerating ? (
              <PipelineProgress onComplete={onPipelineComplete} />
            ) : (
              <Button
                size="lg"
                className="w-full"
                disabled={!canGenerate}
                onClick={onGenerate}
              >
                Generate Fight Scene
              </Button>
            )}
          </div>
        </div>

        <div className={cn(isGenerating && "pointer-events-none opacity-60")}>
          <SidePanel />
        </div>
      </div>
    </motion.div>
  );
}
