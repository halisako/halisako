"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

import { DemoPosterArt } from "@/components/chess2fight/demo-poster-art";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  /** Real media URL. Omit (or let it 404) to show the placeholder art. */
  src?: string;
  variant: "demo" | "result";
  /** Small duration badge shown bottom-right, e.g. "0:12" — result mode only. */
  durationLabel?: string;
  className?: string;
};

/**
 * Wraps a native <video> with a minimal custom control cluster (no
 * browser chrome, matching the cinematic/premium brief). Used both by
 * DemoShowcase (autoplay, muted, loop) and ResultDisplay (user-started
 * playback). When `src` is missing or fails to load, falls back to
 * DemoPosterArt so the page never shows a broken video icon — drop a
 * real render URL into `src` once the backend exists and this
 * component needs no other changes.
 */
export function VideoPlayer({ src, variant, durationLabel, className }: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [hasSource, setHasSource] = React.useState(Boolean(src));
  const [playing, setPlaying] = React.useState(variant === "demo");
  // Demo autoplays, so it must start muted (browser policy). Result
  // playback is user-initiated, so it can start with sound on.
  const [muted, setMuted] = React.useState(variant === "demo");

  React.useEffect(() => {
    setHasSource(Boolean(src));
  }, [src]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card",
        className
      )}
    >
      {hasSource ? (
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          autoPlay={variant === "demo"}
          muted={muted}
          loop={variant === "demo"}
          playsInline
          onError={() => setHasSource(false)}
        />
      ) : (
        <DemoPosterArt variant={variant} />
      )}

      {/* Control cluster — always visible for the autoplaying demo per
          brief ("visible play/unmute control"); hover-reveal for result,
          where the poster/first-frame should read clean by default. */}
      <div
        className={cn(
          "absolute inset-0 flex items-end justify-between p-4 transition-opacity duration-300",
          variant === "demo" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            disabled={!hasSource}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            disabled={!hasSource}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {!hasSource && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur-sm"
        >
          {variant === "demo" ? "Preview build" : "Render preview"}
        </motion.div>
      )}

      {durationLabel && (
        <div className="absolute bottom-4 right-4 rounded-md bg-background/70 px-2 py-0.5 font-mono text-[11px] text-foreground backdrop-blur-sm">
          {durationLabel}
        </div>
      )}
    </div>
  );
}
