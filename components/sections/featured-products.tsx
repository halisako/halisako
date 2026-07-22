import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionTitle } from "@/components/shared/section-title";
import { Reveal } from "@/components/shared/reveal";
import { productIcons } from "@/components/shared/icon-registry";
import { ProductIllustration } from "@/components/shared/product-illustration";
import { products } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function FeaturedProducts({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-6xl px-6 py-24", className)}>
      <SectionTitle
        eyebrow="Featured Products"
        title="The first experiences we're orchestrating"
        description="Each product applies the same three-stage pipeline to a different kind of input."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {products.map((product, i) => {
          const Icon = productIcons[product.icon];
          const card = (
            <Card className="group h-full overflow-hidden transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-gold-secondary hover:shadow-[0_20px_40px_-20px_hsl(var(--foreground)/0.12)]">
              <div className="p-6 pb-0">
                <ProductIllustration icon={product.icon} />
              </div>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={18} className="text-gold-primary" />
                    <h3 className="font-display text-xl font-semibold">
                      {product.title}
                    </h3>
                  </div>
                  <Badge variant={product.href ? "gold" : "default"}>
                    {product.badge}
                  </Badge>
                </div>
                <p className="mt-1 text-sm font-medium text-gold-primary">
                  {product.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                {product.href && (
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    Open Chess2Fight
                    <ArrowUpRight size={14} />
                  </div>
                )}
              </CardContent>
            </Card>
          );

          return (
            <Reveal key={product.slug} delay={Math.min(i + 1, 3) as 1 | 2 | 3}>
              {product.href ? (
                <Link href={product.href} className="block h-full">
                  {card}
                </Link>
              ) : (
                card
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
