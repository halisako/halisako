import type { Metadata } from "next";

import { ThreeStepPlatform } from "@/components/sections/three-step-platform";
import { Pipeline } from "@/components/sections/pipeline";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { SectionTitle } from "@/components/shared/section-title";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Technology",
  description:
    "How Halisako's orchestration engine understands, plans and coordinates multiple AI systems into one coherent output.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pb-4 pt-16 sm:pt-24">
        <SectionTitle
          eyebrow="Technology"
          title="The orchestration engine"
          description="Three disciplined stages, one continuous pipeline, and a different result than a single model generating in one pass."
        />
      </div>

      <ThreeStepPlatform />
      <Pipeline />
      <ComparisonTable />
    </>
  );
}
