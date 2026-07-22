import type { ReactElement } from "react";

import type { ProductIconKey } from "@/types";

function ChessIllustration() {
  return (
    <svg viewBox="0 0 300 160" className="h-40 w-full" aria-hidden="true">
      <rect width="300" height="160" rx="12" className="fill-gold-accent" opacity={0.35} />
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => {
          const isDark = (row + col) % 2 === 0;
          if (!isDark) return null;
          return (
            <rect
              key={`${row}-${col}`}
              x={70 + col * 20}
              y={12 + row * 16}
              width={20}
              height={16}
              className="fill-foreground"
              opacity={0.08}
            />
          );
        })
      )}
      <path
        d="M150 32 L165 90 L180 32"
        className="stroke-gold-primary"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={165} cy={22} r={9} className="fill-gold-primary" />
    </svg>
  );
}

function DanceIllustration() {
  return (
    <svg viewBox="0 0 300 160" className="h-40 w-full" aria-hidden="true">
      <rect width="300" height="160" rx="12" className="fill-silver-light" opacity={0.35} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={40 + i * 45}
          y={124 - (i % 3) * 26 - 16}
          width={6}
          height={36 + (i % 3) * 26}
          rx={3}
          className="fill-gold-primary"
          opacity={0.3 + i * 0.12}
        />
      ))}
      <circle cx={150} cy={48} r={16} fill="none" className="stroke-gold-secondary" strokeWidth={2} />
    </svg>
  );
}

const illustrations: Record<ProductIconKey, () => ReactElement> = {
  chess: ChessIllustration,
  dance: DanceIllustration,
};

export function ProductIllustration({ icon }: { icon: ProductIconKey }) {
  const Illustration = illustrations[icon];
  return <Illustration />;
}
