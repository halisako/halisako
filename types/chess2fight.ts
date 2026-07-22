/**
 * types/chess2fight.ts
 * Domain types for the Chess2Fight product experience — kept separate
 * from types/index.ts (marketing-site content) since this is its own
 * product with its own data shapes.
 */

export type ExperiencePhase = "upload" | "generating" | "result";

export type IdlePipelineStageKey =
  | "pgn-analysis"
  | "game-understanding"
  | "fight-choreography"
  | "scene-generation"
  | "video-rendering";

export type ActivePipelineStageKey =
  | "parsing"
  | "evaluating"
  | "momentum"
  | "fight-story"
  | "prompt"
  | "rendering";

export type IdlePipelineStage = {
  key: IdlePipelineStageKey;
  label: string;
};

export type ActivePipelineStage = {
  key: ActivePipelineStageKey;
  label: string;
  /** Roughly how long this stage should hold, in ms, for the mock animation. */
  duration: number;
};

export type PGNSample = {
  id: string;
  label: string;
  description: string;
  pgn: string;
};

export type GenerationResult = {
  winner: string;
  opening: string;
  fightStyle: string;
  bestMove: string;
  turningPoint: string;
  battleSummary: string;
  prompt: string;
  estimatedLength: string;
};
