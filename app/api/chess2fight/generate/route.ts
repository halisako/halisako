import { NextResponse } from "next/server";

import { pickMockResult } from "@/lib/chess2fight/mock-data";
import type { GenerationResult } from "@/types/chess2fight";

// Very light sanity check, applied before we even attempt a network
// call — the real backend (if configured) does the actual parsing.
const LOOKS_LIKE_PGN = /\d+\.\s*\S+/;

// Set this to a deployed backend's base URL (e.g. the Render service
// from /backend) to switch this route from mock data to the real
// Halisako orchestration pipeline. Unset -> mock mode, unchanged from
// before. See backend/README.md.
const BACKEND_URL = process.env.CHESS2FIGHT_API_URL;

/** Shape returned by POST /api/v1/chess2fight/generate on the FastAPI
 * backend — see backend/products/chess2fight/schemas.py. Only the
 * fields this route actually reads are declared. */
type BackendGenerateResponse = {
  fight_story: {
    winner: string;
    opening: string;
    fight_style: string;
    best_move: string;
    turning_point: string;
    battle_summary: string;
    prompt: string;
    estimated_length: string;
  };
};

function mapBackendResponse(data: BackendGenerateResponse): GenerationResult {
  const story = data.fight_story;
  return {
    winner: story.winner,
    opening: story.opening,
    fightStyle: story.fight_style,
    bestMove: story.best_move,
    turningPoint: story.turning_point,
    battleSummary: story.battle_summary,
    prompt: story.prompt,
    estimatedLength: story.estimated_length,
  };
}

/**
 * POST /api/chess2fight/generate
 *
 * Mock mode (default, CHESS2FIGHT_API_URL unset): validates the PGN
 * loosely, waits briefly, returns a randomly-picked mock
 * GenerationResult — unchanged from before.
 *
 * Real mode (CHESS2FIGHT_API_URL set): forwards the PGN to the FastAPI
 * backend and maps its response (nested: status/game_analysis/
 * fight_story/video_placeholder) into the flat GenerationResult shape
 * this frontend already renders, so no component needed to change.
 *
 * Either way the client-visible contract is identical — the ~20s
 * "generating" feel still comes entirely from PipelineProgress's own
 * staged animation, not from this request's latency.
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

  if (!BACKEND_URL) {
    // Simulated server-side latency — independent of the client's
    // staged pipeline animation.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return NextResponse.json(pickMockResult());
  }

  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/v1/chess2fight/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pgn, style: "anime" }),
      signal: AbortSignal.timeout(25_000),
    });

    if (!backendRes.ok) {
      const errorBody = await backendRes.json().catch(() => ({}));
      // Forward the backend's own status/detail where sensible (400 for
      // a bad PGN); anything else becomes a generic 502 so we never leak
      // backend internals to the client.
      const status = backendRes.status === 400 ? 400 : 502;
      return NextResponse.json(
        { error: errorBody.detail ?? "The generation service couldn't process that PGN." },
        { status }
      );
    }

    const data: BackendGenerateResponse = await backendRes.json();
    return NextResponse.json(mapBackendResponse(data));
  } catch {
    // Backend is configured but unreachable (down, timed out, DNS,
    // etc). Deliberately NOT falling back to mock data here — that
    // would present fabricated results for the user's actual PGN as if
    // they were real, which is worse than a clear, honest failure.
    return NextResponse.json(
      { error: "Couldn't reach the generation service. Please try again shortly." },
      { status: 502 }
    );
  }
}
