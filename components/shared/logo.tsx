import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-display text-lg font-semibold",
        className
      )}
    >
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#0B0A08]"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--gold-secondary)), hsl(var(--gold-primary)))",
        }}
      >
        H
      </span>
      Halisako
    </Link>
  );
}
