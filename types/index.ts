/**
 * types/index.ts
 * Shared type-level contracts used by more than one component, so the
 * icon registries in components/shared/icon-registry.tsx and the
 * content in lib/site-config.ts always agree on valid keys.
 */

export type StepIconKey = "understand" | "plan" | "orchestrate";

export type PipelineIconKey =
  | "upload"
  | "understand"
  | "plan"
  | "orchestrate"
  | "experience";

export type ProductIconKey = "chess" | "dance";

export type NavLink = {
  label: string;
  href: string;
};
