import { NextRequest, NextResponse } from "next/server";
import { NICHES } from "@/lib/niches";
import { generateLetter } from "@/lib/generate";
import { verifyPaidSession } from "@/lib/checkout";
import { sendLetterEmail } from "@/lib/email";
import { getAuthedEmail, makeToken } from "@/lib/auth";
import {
  getOrCreateUser,
  saveUser,
  isSessionConsumed,
  markSessionConsumed,
  StoredLetter,
} from "@/lib/store";
import { baseUrl } from "@/lib/checkout";

export const maxDuration = 60;

const BONUS_CREDITS = 2;

export async function POST(req: NextRequest) {
  try {
    const { sessionId, nicheId, form, answers } = await req.json();
    const niche = NICHES[nicheId];
    if (!niche || typeof form !== "object" || form === null) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const cleanAnswers =
      typeof answers === "object" && answers !== null ? answers : undefined;

    // ---- Mode A: paid Stripe session ----
    if (sessionId) {
      const verdict = await verifyPaidSession(sessionId);
      if (!verdict.paid) {
        return NextResponse.json({ error: "Payment not verified" }, { status: 402 });
      }
      if (verdict.nicheId && verdict.nicheId !== nicheId) {
        return NextResponse.json({ error: "Session/product mismatch" }, { status: 403 });
      }

      const letter = await generateLetter(niche, form, cleanAnswers);

      let emailed = false;
      let emailedTo: string | undefined;
      let credits: number | undefined;

      if (verdict.email) {
        // Auto-create account, store the letter, grant bonus credits once per session.
        const user = await getOrCreateUser(verdict.email);
        const stored: StoredLetter = {
          id: crypto.randomUUID(),
          nicheId: niche.id,
          nicheName: niche.name,
          createdAt: Date.now(),
          text: letter,
        };
        user.letters.unshift(stored);
        const firstTime = !(await isSessionConsumed(sessionId));
        if (firstTime) {
          user.credits += BONUS_CREDITS;
          await markSessionConsumed(sessionId);
        }
        await saveUser(user);
        credits = user.credits;

        const magicLink = `${baseUrl()}/api/auth/verify?token=${encodeURIComponent(
          makeToken(verdict.email, 7)
        )}`;
        emailed = await sendLetterEmail(verdict.email, niche, letter, {
          magicLink,
          credits: user.credits,
        });
        if (emailed) emailedTo = verdict.email;
      }

      return NextResponse.json({ letter, emailed, emailedTo, credits });
    }

    // ---- Mode B: signed-in user spending a credit ----
    const email = getAuthedEmail(req);
    if (!email) {
      return NextResponse.json({ error: "Payment not verified" }, { status: 402 });
    }
    const user = await getOrCreateUser(email);
    if (user.credits < 1) {
      return NextResponse.json({ error: "No credits left" }, { status: 402 });
    }

    const letter = await generateLetter(niche, form, cleanAnswers);

    user.credits -= 1;
    user.letters.unshift({
      id: crypto.randomUUID(),
      nicheId: niche.id,
      nicheName: niche.name,
      createdAt: Date.now(),
      text: letter,
    });
    await saveUser(user);

    const emailed = await sendLetterEmail(email, niche, letter, {
      credits: user.credits,
    });

    return NextResponse.json({
      letter,
      emailed,
      emailedTo: emailed ? email : undefined,
      credits: user.credits,
    });
  } catch (e) {
    console.error("unlock error", e);
    return NextResponse.json({ error: "Generation failed. Please try again." }, { status: 500 });
  }
}
