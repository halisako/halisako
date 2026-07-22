"use client";

import { motion } from "framer-motion";

export function Chess2FightHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
      {/* Soft cinematic glow — the only "loud" element on an otherwise quiet dark canvas */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--gold-primary)/0.35) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
        >
          Powered by the Halisako orchestration engine
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Turn Chess Games Into
          <br />
          <span className="bg-gradient-to-r from-gold-secondary to-gold-primary bg-clip-text text-transparent">
            Cinematic Anime Battles
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground"
        >
          Paste a PGN. Our AI analyzes the game, understands every tactical
          moment, and generates an action-packed fight scene inspired by your
          moves.
        </motion.p>
      </div>
    </section>
  );
}
