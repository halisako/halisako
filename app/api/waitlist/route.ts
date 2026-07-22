import { NextResponse } from "next/server";

import { interestOptions } from "@/lib/site-config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistBody = {
  name?: unknown;
  email?: unknown;
  interest?: unknown;
};

/**
 * POST /api/waitlist
 *
 * Validates and accepts an early-access signup. This handler currently
 * logs the entry server-side — swap the `// TODO` below for a real
 * integration (e.g. write to a database, or forward to an email
 * provider like Resend) before going to production. Kept dependency-
 * free on purpose so this project builds and deploys with zero extra
 * services configured.
 */
export async function POST(request: Request) {
  let body: WaitlistBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const interest = typeof body.interest === "string" ? body.interest : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!interestOptions.includes(interest as (typeof interestOptions)[number])) {
    return NextResponse.json({ error: "Invalid interest selection." }, { status: 400 });
  }

  // TODO: persist the signup (database write, CRM, or email provider).
  console.log("[waitlist] new signup:", { name, email, interest });

  return NextResponse.json({ ok: true });
}
