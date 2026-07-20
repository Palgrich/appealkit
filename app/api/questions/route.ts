import { NextRequest, NextResponse } from "next/server";
import { NICHES } from "@/lib/niches";
import { generateFollowUpQuestions } from "@/lib/generate";
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
    const questions = await generateFollowUpQuestions(niche, form);
    return NextResponse.json({ questions });
  } catch (e) {
    console.error("questions error", e);
    return NextResponse.json({ questions: [] });
  }
}
