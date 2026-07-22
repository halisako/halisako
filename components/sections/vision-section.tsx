import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

export function VisionSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "border-y border-border bg-card py-28 sm:py-36",
        className
      )}
    >
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>Vision</Eyebrow>
        <p className="mt-6 text-balance font-display text-3xl font-medium leading-[1.25] sm:text-4xl md:text-5xl">
          We believe the future of AI isn&apos;t about better prompts.
          <br />
          <span className="text-gold-primary">It&apos;s about better planning.</span>
        </p>
      </Reveal>
    </section>
  );
}
