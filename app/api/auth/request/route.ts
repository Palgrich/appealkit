import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/store";
import { makeToken } from "@/lib/auth";
import { baseUrl } from "@/lib/checkout";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    // Always respond OK (don't leak which emails have accounts).
    const user = await getUser(email);
    const apiKey = process.env.RESEND_API_KEY;
    if (user && apiKey) {
      const link = `${baseUrl()}/api/auth/verify?token=${encodeURIComponent(makeToken(email, 1))}`;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "AppealKit <onboarding@resend.dev>",
          to: [email],
          subject: "Your AppealKit sign-in link",
          text: `Click to sign in to your AppealKit account:\n\n${link}\n\nThe link is valid for 24 hours. If you didn't request this, ignore this email.`,
        }),
      }).catch(() => {});
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
