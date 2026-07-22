"use client";

import type { ReactNode } from "react";

import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

import styles from "./reveal.module.css";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
};

const delayClass = {
  0: "",
  1: styles.delay1,
  2: styles.delay2,
  3: styles.delay3,
} as const;

/**
 * Fades + slides its children in once they scroll into view. Used by
 * every section so the reveal treatment stays consistent without each
 * section re-implementing the IntersectionObserver wiring.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={cn(styles.reveal, visible && styles.visible, delayClass[delay], className)}
    >
      {children}
    </div>
  );
}
