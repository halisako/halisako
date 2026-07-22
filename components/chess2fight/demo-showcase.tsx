"use client";

import { motion } from "framer-motion";

import { VideoPlayer } from "@/components/chess2fight/video-player";

export function DemoShowcase() {
  return (
    <section id="demo" className="scroll-mt-20 px-6 pb-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <VideoPlayer variant="demo" />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            From chess notation to cinematic battle in under 30 seconds.
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 text-center font-display text-3xl font-semibold text-foreground sm:text-4xl"
        >
          Ready to create your own?
        </motion.h2>
      </div>
    </section>
  );
}
