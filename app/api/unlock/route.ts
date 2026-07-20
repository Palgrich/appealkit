import { NextRequest, NextResponse } from "next/server";
import { NICHES } from "@/lib/niches";
import { generateLetter } from "@/lib/generate";
import { verifyPaidSession } from "@/lib/checkout";
import { sendLetterEmail } from "@/lib/email";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { sessionId, nicheId, form, answers } = await req.json();
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

    const letter = await generateLetter(
      niche,
      form,
      typeof answers === "object" && answers !== null ? answers : undefined
    );

    // Email the letter to the buyer (address comes from Stripe checkout).
    // Never blocks or fails the response — the on-screen letter is the primary delivery.
    let emailed = false;
    let emailedTo: string | undefined;
    if (verdict.email) {
      emailed = await sendLetterEmail(verdict.email, niche, letter);
      if (emailed) emailedTo = verdict.email;
    }

    return NextResponse.json({ letter, emailed, emailedTo });
  } catch (e) {
    console.error("unlock error", e);
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}
