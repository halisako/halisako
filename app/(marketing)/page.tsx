import { Hero } from "@/components/sections/hero";
import { ThreeStepPlatform } from "@/components/sections/three-step-platform";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { Pipeline } from "@/components/sections/pipeline";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { VisionSection } from "@/components/sections/vision-section";
import { EarlyAccessForm } from "@/components/sections/early-access-form";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThreeStepPlatform />
      <FeaturedProducts />
      <Pipeline />
      <ComparisonTable />
      <VisionSection />
      <EarlyAccessForm />
    </>
  );
}
