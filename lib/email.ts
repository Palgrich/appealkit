import { letterToPdf, letterToDocx } from "./documents";
import type { Niche } from "./niches";

/**
 * Sends the finished letter to the buyer via Resend.
 * Returns true if the email was accepted, false otherwise (never throws).
 */
export async function sendLetterEmail(
  to: string,
  niche: Niche,
  letter: string,
  opts?: { magicLink?: string; credits?: number }
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to) return false;

  const accountBlock = opts?.magicLink
    ? `\n\nYOUR ACCOUNT\nWe saved this letter to your AppealKit account${
        typeof opts.credits === "number"
          ? ` and added ${opts.credits} free letter credit${opts.credits === 1 ? "" : "s"} — you can generate ${opts.credits} more letter${opts.credits === 1 ? "" : "s"} of any type at no charge`
          : ""
      }.\nSign in here (no password needed): ${opts.magicLink}\n`
    : typeof opts?.credits === "number"
      ? `\n\nThis letter is saved to your AppealKit account. Credits remaining: ${opts.credits}.\n`
      : "";

  try {
    const [pdf, docx] = await Promise.all([letterToPdf(letter), letterToDocx(letter)]);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "AppealKit <onboarding@resend.dev>",
        to: [to],
        subject: `Your ${niche.name} is ready`,
        text: `Here is the letter you generated on AppealKit.\n\nIt's attached as PDF (ready to print/send) and Word (.docx, if you want to edit). The full text is below.\n\nBefore sending it: review any [bracketed] placeholders — those are administrative details only you know (claim ID, addresses, dates on official notices).${accountBlock}\n----------------------------------------\n\n${letter}\n\n----------------------------------------\n\nGood luck. — AppealKit\n\nThis is a transactional email with your purchased document. AppealKit is a drafting tool, not a law firm; nothing in this email is legal advice.`,
        attachments: [
          {
            filename: "appeal-letter.pdf",
            content: Buffer.from(pdf).toString("base64"),
          },
          {
            filename: "appeal-letter.docx",
            content: docx.toString("base64"),
          },
        ],
      }),
    });
    if (!res.ok) {
      console.error("resend error", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (e) {
    console.error("email send failed", e);
    return false;
  }
}
