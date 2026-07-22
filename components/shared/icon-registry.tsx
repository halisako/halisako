import {
  ScanEye,
  ListTree,
  Workflow,
  Upload,
  PlayCircle,
  Swords,
  Music4,
  type LucideIcon,
} from "lucide-react";

import type { PipelineIconKey, ProductIconKey, StepIconKey } from "@/types";

/**
 * Maps the content-layer icon keys in lib/site-config.ts to concrete
 * lucide-react components, so section components never import icons
 * directly by name — they look them up by the semantic key that lives
 * next to the copy. Keeps content and presentation decoupled.
 */
export const stepIcons: Record<StepIconKey, LucideIcon> = {
  understand: ScanEye,
  plan: ListTree,
  orchestrate: Workflow,
};

export const pipelineIcons: Record<PipelineIconKey, LucideIcon> = {
  upload: Upload,
  understand: ScanEye,
  plan: ListTree,
  orchestrate: Workflow,
  experience: PlayCircle,
};

export const productIcons: Record<ProductIconKey, LucideIcon> = {
  chess: Swords,
  dance: Music4,
};
