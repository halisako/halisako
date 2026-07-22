import { NextResponse } from "next/server";

import { pickMockResult } from "@/lib/chess2fight/mock-data";

// Very light sanity check — a real backend does real PGN parsing.
// This just rejects empty input and obvious non-PGN pastes.
const LOOKS_LIKE_PGN = /\d+\.\s*\S+/;

/**
 * POST /api/chess2fight/generate
 *
 * Mock endpoint standing in for the real Halisako orchestration
 * pipeline. Validates the PGN loosely, waits briefly (this is server
 * latency only — the ~20s "generating" feel on the client comes from
 * PipelineProgress's own staged animation, not this delay), and
 * returns a randomly-picked GenerationResult.
 *
 * Swap the body of this handler for a real job dispatch (queue the
 * render, return a job id, poll or stream progress) without touching
 * the frontend contract — it already expects exactly this shape.
 */
export async function POST(request: Request) {
  let body: { pgn?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const pgn = typeof body.pgn === "string" ? body.pgn.trim() : "";

  if (!pgn) {
    return NextResponse.json({ error: "Paste a PGN before generating." }, { status: 400 });
  }
  if (!LOOKS_LIKE_PGN.test(pgn)) {
    return NextResponse.json(
      { error: "That doesn't look like a PGN. Try one of the sample games." },
      { status: 400 }
    );
  }

  // Simulated server-side latency — independent of the client's
  // staged pipeline animation.
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return NextResponse.json(pickMockResult());
}
