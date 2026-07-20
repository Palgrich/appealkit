import Anthropic from "@anthropic-ai/sdk";
import { Niche } from "./niches";

export type FormData = Record<string, string>;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";

function buildPrompt(niche: Niche, form: FormData): string {
  const fieldLines = niche.fields
    .map((f) => `${f.label}: ${form[f.id] || "(not provided)"}`)
    .join("\n");

  return `You are an expert professional letter writer. Draft a complete letter for the situation below.

CONTEXT:
${niche.promptContext}

REQUIRED STRUCTURE:
${niche.letterStructure}

USER'S INFORMATION:
${fieldLines}

RULES:
- Write the complete, ready-to-send letter. Use today's date placeholder [Date].
- Use placeholders in [square brackets] ONLY for information the user did not provide (e.g. [Claim ID], [Address]).
- Plain, professional English. No purple prose, no legalese the user couldn't defend in person.
- Never fabricate facts, dates, or events not present in the user's information. Where a supporting fact would help but wasn't provided, use a bracketed placeholder with a short hint, e.g. [describe date of doctor visit].
- Length: 350-550 words for the letter body.
- Output ONLY the letter text (and any addendum required by the structure). No commentary before or after.`;
}

function mockLetter(niche: Niche, form: FormData): string {
  const name = form.fullName || "[Your Name]";
  const fieldSummary = niche.fields
    .filter((f) => f.type !== "textarea")
    .map((f) => `- ${f.label}: ${form[f.id] || "—"}`)
    .join("\n");
  return `[Date]

[Recipient Address]

RE: ${niche.name} — DRAFT (mock mode)

Dear Sir or Madam,

This is a MOCK letter generated without an LLM API key (set ANTHROPIC_API_KEY to enable real generation). In production, this section contains a complete, professionally structured ${niche.name.toLowerCase()} drafted from the user's answers:

${fieldSummary}

The user's narrative would be transformed here into a factual, chronological, professional account following this structure:

${niche.letterStructure}

Sincerely,
${name}`;
}

export async function generateLetter(niche: Niche, form: FormData): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return mockLetter(niche, form);
  }
  const client = new Anthropic({ apiKey });
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    messages: [{ role: "user", content: buildPrompt(niche, form) }],
  });
  const block = msg.content.find((b) => b.type === "text");
  return block && block.type === "text" ? block.text.trim() : mockLetter(niche, form);
}

/** Cut a preview: first ~2 paragraphs / ~450 chars, ending on a sentence boundary. */
export function makePreview(fullLetter: string): string {
  const target = 450;
  if (fullLetter.length <= target) return fullLetter.slice(0, Math.floor(fullLetter.length * 0.4));
  const slice = fullLetter.slice(0, target);
  const lastPeriod = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf(".\n"));
  return lastPeriod > 200 ? slice.slice(0, lastPeriod + 1) : slice;
}
