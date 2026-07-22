import type { Metadata } from "next";

import { FeaturedProducts } from "@/components/sections/featured-products";
import { SectionTitle } from "@/components/shared/section-title";
import { Reveal } from "@/components/shared/reveal";
import { constructMetadata } from "@/lib/metadata";
import { futureProducts } from "@/lib/site-config";

export const metadata: Metadata = constructMetadata({
  title: "Products",
  description:
    "Chess2Fight and Song2Dance are the first experiences Halisako is orchestrating — with stories, education, sports and architecture to follow.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6 pb-4 pt-16 sm:pt-24">
        <SectionTitle
          eyebrow="Products"
          title="Built on one orchestration engine"
          description="Every Halisako product runs the same Understand → Plan → Orchestrate pipeline against a different kind of input."
        />
      </div>

      <FeaturedProducts />

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <Reveal className="rounded-lg border border-border bg-card px-8 py-10 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-gold-primary">
            What&apos;s next
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Future products will bring the same pipeline to{" "}
            {futureProducts.map((item, i) => (
              <span key={item} className="text-foreground">
                {item}
                {i < futureProducts.length - 2
                  ? ", "
                  : i === futureProducts.length - 2
                    ? " and "
                    : ""}
              </span>
            ))}
            .
          </p>
        </Reveal>
      </section>
    </>
  );
}
