import type { Metadata } from "next";

import { VisionSection } from "@/components/sections/vision-section";
import { SectionTitle } from "@/components/shared/section-title";
import { Reveal } from "@/components/shared/reveal";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Vision",
  description:
    "Halisako's vision: transform ideas into experiences by planning before generating.",
  path: "/vision",
});

export default function VisionPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pb-4 pt-16 sm:pt-24">
        <SectionTitle
          eyebrow="Vision"
          title="Transform ideas into experiences"
          description="We're building the category above the model: a layer that understands an idea fully before deciding how to bring it to life."
        />
      </div>

      <VisionSection />

      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Chess2Fight and Song2Dance are the first proof points. The same
            engine — understand, plan, orchestrate — will eventually reach
            stories, education, sports and architecture: any input worth
            turning into an experience.
          </p>
        </Reveal>
      </section>
    </>
  );
}
