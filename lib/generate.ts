import Anthropic from "@anthropic-ai/sdk";
import { Niche } from "./niches";

export type FormData = Record<string, string>;

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";

function buildPrompt(niche: Niche, form: FormData, answers?: FormData): string {
  const fieldLines = niche.fields
    .map((f) => `${f.label}: ${form[f.id] || "(not provided)"}`)
    .join("\n");

  const answerLines =
    answers && Object.keys(answers).length > 0
      ? `\nFOLLOW-UP INTERVIEW (additional facts the user provided — use ALL of them):\n${Object.entries(
          answers
        )
          .filter(([, v]) => v && v.trim())
          .map(([q, v]) => `Q: ${q}\nA: ${v}`)
          .join("\n")}\n`
      : "";

  return `You are an expert professional letter writer. Draft a complete letter for the situation below.

CONTEXT:
${niche.promptContext}

REQUIRED STRUCTURE:
${niche.letterStructure}

USER'S INFORMATION:
${fieldLines}
${answerLines}
RULES:
- Write the complete, ready-to-send letter. Use today's date placeholder [Date].
- Weave every concrete fact the user provided (including follow-up answers) into the letter. The goal is a letter that is ready to send with minimal editing.
- Use placeholders in [square brackets] ONLY for administrative details the user must fill themselves (e.g. [Claim ID], [Address], [Date of Denial Letter]). Do NOT use bracketed placeholders for narrative content — if a narrative fact is missing, write around it gracefully instead of inserting a fill-in-the-blank.
- Plain, professional English. No purple prose, no legalese the user couldn't defend in person.
- Never fabricate facts, dates, or events not present in the user's information.
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

export async function generateLetter(
  niche: Niche,
  form: FormData,
  answers?: FormData
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return mockLetter(niche, form);
  }
  const client = new Anthropic({ apiKey });
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    messages: [{ role: "user", content: buildPrompt(niche, form, answers) }],
  });
  const block = msg.content.find((b) => b.type === "text");
  return block && block.type === "text" ? block.text.trim() : mockLetter(niche, form);
}

export interface FollowUpQuestion {
  question: string;
  why: string;
  hint: string;
}

const FALLBACK_QUESTIONS: Record<string, FollowUpQuestion[]> = {
  unemployment: [
    {
      question: "What exact date did you receive the denial letter, and what date is printed on it?",
      why: "The appeal must reference the determination date and show you filed on time.",
      hint: "e.g. The letter is dated July 2, I received it July 7",
    },
    {
      question: "Walk through the key event step by step: dates, who said what, how you responded.",
      why: "Hearing officers decide on specific facts and chronology, not general statements.",
      hint: "e.g. On June 12 my manager called about an extra shift; I explained I had a documented medical appointment...",
    },
    {
      question: "What evidence do you have — texts, emails, doctor's notes, schedules, witnesses?",
      why: "Listing concrete evidence in the letter signals a strong case and frames the hearing.",
      hint: "e.g. Text thread with my manager from June 12; doctor's note dated June 11",
    },
  ],
  pip: [
    {
      question: "Pick the 2-3 most unfair claims in the PIP. For each: what actually happened, with dates or numbers?",
      why: "A rebuttal that answers specific claims with specific facts is far stronger than a general defense.",
      hint: "e.g. 'Missed Q2 deadline' — requirements changed on May 3 after sign-off; delivery was re-approved for June 1",
    },
    {
      question: "What measurable wins or positive feedback can you cite from the last 6-12 months?",
      why: "Documented accomplishments in the file directly counter the underperformance narrative.",
      hint: "e.g. Closed 2 largest accounts in Q1; 'exceeds expectations' in last review; praised by client X in March email",
    },
    {
      question: "Is there any context HR should know — workload changes, staffing gaps, new manager, shifted goals?",
      why: "Context reframes performance claims without sounding like excuses.",
      hint: "e.g. Team went from 5 to 2 people in January; I absorbed two roles",
    },
  ],
  academic: [
    {
      question: "What specific dates/semester did the difficulties start, and which courses were most affected?",
      why: "A precise timeline shows the committee the problem was situational, not chronic.",
      hint: "e.g. Fall semester, from October; failed Chemistry and Statistics, kept a B in English",
    },
    {
      question: "Can you document the circumstances — hospital records, work schedules, a counselor's note?",
      why: "Committees approve appeals with documentation far more often.",
      hint: "e.g. Mom's hospital discharge papers from November; my work schedule showing 30 hrs/week",
    },
    {
      question: "What exactly will be different next semester? Numbers help: course load, work hours, support services.",
      why: "The success plan is the deciding factor for most committees.",
      hint: "e.g. 12 credits instead of 16, work capped at 15 hrs, weekly advisor check-ins, tutoring for math",
    },
  ],
};

export async function generateFollowUpQuestions(
  niche: Niche,
  form: FormData
): Promise<FollowUpQuestion[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const fallback = FALLBACK_QUESTIONS[niche.id] || [];
  if (!apiKey) return fallback;

  const fieldLines = niche.fields
    .map((f) => `${f.label}: ${form[f.id] || "(not provided)"}`)
    .join("\n");

  try {
    const client = new Anthropic({ apiKey });
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 1200,
      messages: [
        {
          role: "user",
          content: `You are preparing to write this letter:

CONTEXT: ${niche.promptContext}

USER'S ANSWERS SO FAR:
${fieldLines}

Identify the 3-5 most important MISSING facts that would make this letter concrete and persuasive instead of generic. Focus on gaps in THIS user's specific answers (dates, chronology, evidence, numbers, names of documents). Do not ask for anything already provided. Do not ask for contact details.

Return ONLY a JSON array, no other text:
[{"question": "the question, direct and specific to their situation", "why": "one sentence: why this strengthens the letter", "hint": "a short example answer starting with 'e.g.'"}]`,
        },
      ],
    });
    const block = msg.content.find((b) => b.type === "text");
    if (!block || block.type !== "text") return fallback;
    const match = block.text.match(/\[[\s\S]*\]/);
    if (!match) return fallback;
    const parsed = JSON.parse(match[0]) as FollowUpQuestion[];
    const valid = parsed.filter(
      (q) => typeof q.question === "string" && q.question.length > 0
    );
    return valid.length > 0 ? valid.slice(0, 5) : fallback;
  } catch {
    return fallback;
  }
}

/** Cut a preview: first ~2 paragraphs / ~450 chars, ending on a sentence boundary. */
export function makePreview(fullLetter: string): string {
  const target = 450;
  if (fullLetter.length <= target) return fullLetter.slice(0, Math.floor(fullLetter.length * 0.4));
  const slice = fullLetter.slice(0, target);
  const lastPeriod = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf(".\n"));
  return lastPeriod > 200 ? slice.slice(0, lastPeriod + 1) : slice;
}
