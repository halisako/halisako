import type {
  ActivePipelineStage,
  GenerationResult,
  IdlePipelineStage,
  PGNSample,
} from "@/types/chess2fight";

/**
 * SIDE PANEL — idle, ambient "what happens" overview (5 stages).
 * Distinct from ACTIVE_PIPELINE_STAGES below: this is the calm,
 * at-rest list shown before generation starts.
 */
export const IDLE_PIPELINE_STAGES: IdlePipelineStage[] = [
  { key: "pgn-analysis", label: "PGN Analysis" },
  { key: "game-understanding", label: "Game Understanding" },
  { key: "fight-choreography", label: "Fight Choreography" },
  { key: "scene-generation", label: "Scene Generation" },
  { key: "video-rendering", label: "Video Rendering" },
];

/**
 * PROGRESS EXPERIENCE — granular, active generation steps (6 stages).
 * Durations are in ms and sum to ~20s, matching the brief's "simulate
 * 20 second generation." Swap this timing model for real server-sent
 * progress events once the backend exists — see PipelineProgress.tsx.
 */
export const ACTIVE_PIPELINE_STAGES: ActivePipelineStage[] = [
  { key: "parsing", label: "Parsing PGN", duration: 2000 },
  { key: "evaluating", label: "Evaluating Position", duration: 3000 },
  { key: "momentum", label: "Understanding Momentum", duration: 3500 },
  { key: "fight-story", label: "Building Fight Story", duration: 4000 },
  { key: "prompt", label: "Creating Prompt", duration: 3500 },
  { key: "rendering", label: "Rendering Video", duration: 4000 },
];

export const PGN_SAMPLES: PGNSample[] = [
  {
    id: "scholars-mate",
    label: "Example PGN",
    description: "Scholar's Mate — a 4-move miniature",
    pgn: `[Event "Example Game"]
[White "Halisako"]
[Black "Guest"]
[Result "1-0"]

1. e4 e5 2. Qh5 Nc6 3. Bc4 Nf6?? 4. Qxf7# 1-0`,
  },
  {
    id: "legall-trap",
    label: "Paste Sample",
    description: "Légal's Mate — a sacrificial 7-move trap",
    pgn: `[Event "Example Game"]
[White "Halisako"]
[Black "Guest"]
[Result "1-0"]

1. e4 e5 2. Nf3 d6 3. Bc4 Bg4 4. Nc3 g6?? 5. Nxe5! Bxd1 6. Bxf7+ Ke7 7. Nd5# 1-0`,
  },
];

/**
 * Pool of mock outcomes returned by /api/chess2fight/generate. A real
 * backend replaces this whole module — the response shape
 * (GenerationResult) is the contract the frontend already expects.
 */
export const MOCK_RESULTS: GenerationResult[] = [
  {
    winner: "White wins by checkmate",
    opening: "Italian Game (early queen sortie)",
    fightStyle: "Blitz Aggression",
    bestMove: "4. Qxf7# — a lightning strike to the exposed flank",
    turningPoint: "Black's kingside knight move opened the gate too early",
    battleSummary:
      "A fighter in crimson armor closes the distance before her opponent can react, ending the duel in four decisive blows — a masterclass in tempo over caution.",
    prompt: `SCENE: Rooftop dojo, dusk lighting, embers drifting.
FIGHTERS: White — swift duelist, crimson sash. Black — guarded swordsman, indigo cloak.
BEAT 1 (0:00-0:03): Opening clash, both fighters test range.
BEAT 2 (0:03-0:07): Black overcommits with a forward strike.
BEAT 3 (0:07-0:11): White reads the opening, pivots inside guard.
FINISH (0:11-0:12): White lands a precise finishing blow — camera holds on Black's dropped blade.
STYLE: Sharp, high-contrast linework, fast cuts, minimal score swell.`,
    estimatedLength: "12 sec",
  },
  {
    winner: "White wins by checkmate",
    opening: "Italian Game, Légal Trap",
    fightStyle: "Calculated Sacrifice",
    bestMove: "5. Nxe5! — a knight thrown away to spring the trap",
    turningPoint: "Black's queen capture walked directly into a mating net",
    battleSummary:
      "One combatant appears to surrender his blade — only for it to be a feint. Three strikes later, the arena falls silent as the trap snaps shut.",
    prompt: `SCENE: Torch-lit courtyard, drifting mist.
FIGHTERS: White — patient tactician, twin short blades. Black — confident brawler, heavy cloak.
BEAT 1 (0:00-0:04): White appears to overextend, dropping a guard.
BEAT 2 (0:04-0:09): Black seizes the opening, commits fully.
BEAT 3 (0:09-0:15): Reveal — White's opening was bait. Reversal begins.
FINISH (0:15-0:18): Triple strike combo ends the exchange in one motion.
STYLE: Slow build, sudden tempo spike on the reveal, low string drone under BEAT 3.`,
    estimatedLength: "18 sec",
  },
  {
    winner: "Black wins by resignation",
    opening: "Sicilian Defense, Closed Variation",
    fightStyle: "Endgame Resolve",
    bestMove: "31...Rxd4 — trading down into a won pawn ending",
    turningPoint: "White's overextended pawn chain collapsed under pressure",
    battleSummary:
      "A grinding, patient duel where neither fighter lands an early blow — until one calculated exchange leaves the other cornered with nowhere left to retreat.",
    prompt: `SCENE: Open stone arena, harsh midday light.
FIGHTERS: White — heavy armored guardian. Black — measured strategist, staff weapon.
BEAT 1 (0:00-0:06): Long, cautious exchange — neither fighter commits.
BEAT 2 (0:06-0:14): White's stance overreaches, structure weakens.
BEAT 3 (0:14-0:20): Black capitalizes, systematically closes every angle.
FINISH (0:20-0:24): White concedes, kneeling as Black lowers their weapon.
STYLE: Wide, patient camera work; score builds slowly to the finish.`,
    estimatedLength: "24 sec",
  },
];

export function pickMockResult(): GenerationResult {
  return MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)]!;
}
