import { NextRequest, NextResponse } from "next/server";
import { verifyPaidSession } from "@/lib/checkout";
import { letterToPdf, letterToDocx } from "@/lib/documents";
import { getAuthedEmail } from "@/lib/auth";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { sessionId, letter, format } = await req.json();
    if (typeof letter !== "string" || letter.length === 0 || letter.length > 50000) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    // Authorized via a paid Stripe session OR a signed-in account.
    let authorized = false;
    if (sessionId) {
      const verdict = await verifyPaidSession(sessionId);
      authorized = verdict.paid;
    }
    if (!authorized) {
      authorized = getAuthedEmail(req) !== null;
    }
    if (!authorized) {
      return NextResponse.json({ error: "Payment not verified" }, { status: 402 });
    }

    if (format === "pdf") {
      const bytes = await letterToPdf(letter);
      return new NextResponse(Buffer.from(bytes), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="letter.pdf"',
        },
      });
    }
    if (format === "docx") {
      const buf = await letterToDocx(letter);
      return new NextResponse(new Uint8Array(buf), {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": 'attachment; filename="letter.docx"',
        },
      });
    }
    return NextResponse.json({ error: "Unknown format" }, { status: 400 });
  } catch (e) {
    console.error("download error", e);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
