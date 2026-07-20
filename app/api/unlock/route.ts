import { NextRequest, NextResponse } from "next/server";
import { NICHES } from "@/lib/niches";
import { generateLetter } from "@/lib/generate";
import { verifyPaidSession } from "@/lib/checkout";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { sessionId, nicheId, form } = await req.json();
    const niche = NICHES[nicheId];
    if (!niche || !sessionId || typeof form !== "object" || form === null) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const verdict = await verifyPaidSession(sessionId);
    if (!verdict.paid) {
      return NextResponse.json({ error: "Payment not verified" }, { status: 402 });
    }
    // If Stripe metadata carries a niche, it must match what we're generating.
    if (verdict.nicheId && verdict.nicheId !== nicheId) {
      return NextResponse.json({ error: "Session/product mismatch" }, { status: 403 });
    }

    const letter = await generateLetter(niche, form);
    return NextResponse.json({ letter });
  } catch (e) {
    console.error("unlock error", e);
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}
