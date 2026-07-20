export type FieldType = "text" | "textarea" | "select" | "date";

export interface WizardField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  help?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Niche {
  id: string;
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  priceCents: number;
  priceLabel: string;
  heroSub: string;
  bullets: string[];
  fields: WizardField[];
  faq: FaqItem[];
  seoBody: { heading: string; text: string }[];
  promptContext: string;
  letterStructure: string;
  deliverables: string[];
}

export const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada",
  "New Hampshire","New Jersey","New Mexico","New York","North Carolina",
  "North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island",
  "South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
  "District of Columbia",
];

export const NICHES: Record<string, Niche> = {
  unemployment: {
    id: "unemployment",
    slug: "unemployment-appeal-letter-generator",
    name: "Unemployment Appeal Letter",
    h1: "Unemployment Appeal Letter Generator",
    metaTitle: "Unemployment Appeal Letter Generator — State-Specific, Ready in 2 Minutes",
    metaDescription:
      "Denied unemployment benefits? Generate a professional, state-specific appeal letter in minutes. Free preview, hearing-ready PDF & Word download.",
    priceCents: 700,
    priceLabel: "$7",
    heroSub:
      "Denied benefits? You typically have 10–30 days to appeal. Answer a few questions and get a professional, state-specific appeal letter — free preview before you pay.",
    bullets: [
      "Addresses the exact denial reason (misconduct, voluntary quit, eligibility)",
      "Formatted for your state's unemployment agency",
      "Includes a hearing preparation checklist",
      "Instant PDF + editable Word download",
    ],
    fields: [
      { id: "fullName", label: "Your full name", type: "text", required: true, placeholder: "Jane Smith" },
      { id: "state", label: "State where you filed", type: "select", options: US_STATES, required: true },
      {
        id: "denialReason",
        label: "Why were you denied?",
        type: "select",
        options: [
          "Alleged misconduct",
          "Voluntary quit / resignation",
          "Not enough wages or work history",
          "Refused suitable work",
          "Missed deadline or paperwork issue",
          "Other / not sure",
        ],
        required: true,
      },
      { id: "employer", label: "Employer name", type: "text", required: true, placeholder: "Acme Corp" },
      { id: "lastDay", label: "Last day of work", type: "date", required: true },
      {
        id: "story",
        label: "What actually happened? (your side, in your own words)",
        type: "textarea",
        required: true,
        placeholder:
          "Example: I was let go after missing two shifts. Both absences were due to a documented medical emergency, and I notified my manager by text both times...",
        help: "Be specific: dates, names, what was said. The letter will turn this into professional language.",
      },
    ],
    faq: [
      {
        q: "How long do I have to appeal an unemployment denial?",
        a: "Deadlines vary by state, but most give you between 10 and 30 days from the date on your determination letter. Check the letter itself — the deadline is printed on it. File the appeal even if the deadline is close; a short, clear letter filed on time beats a perfect letter filed late.",
      },
      {
        q: "What should an unemployment appeal letter include?",
        a: "Your identifying information (name, claim ID), a clear statement that you are appealing the determination, the date of the determination, the specific reasons the decision was wrong, and a factual account of what happened with dates and any evidence you have. Our generator structures all of this automatically.",
      },
      {
        q: "Is this legal advice?",
        a: "No. AppealKit is a document drafting tool, not a law firm, and no attorney-client relationship is created. For complex cases, consider consulting an employment attorney or your state's free legal aid services.",
      },
      {
        q: "Can I see the letter before paying?",
        a: "Yes — you get a free preview of the opening of your letter before any payment. The full letter, PDF and Word downloads, and the hearing checklist unlock after a one-time $7 payment. No subscription.",
      },
    ],
    seoBody: [
      {
        heading: "Why appeals succeed more often than people think",
        text: "A large share of unemployment denials are reversed on appeal, especially misconduct cases where the employer carries the burden of proof. Many claimants never appeal at all — which means simply filing a clear, factual, on-time appeal letter already puts you ahead. The hearing officer has not seen your side of the story yet; the appeal letter is where they hear it first.",
      },
      {
        heading: "What hearing officers look for",
        text: "Hearing officers care about facts, dates, and credibility — not emotion. A strong appeal letter states the decision being appealed, identifies precisely why it is wrong (for example: the absences were protected medical absences, not misconduct), and lists the evidence you will bring. Our letters follow this structure because it is the structure appeals officers are trained to evaluate.",
      },
      {
        heading: "State-specific formatting matters",
        text: "Every state's agency has its own name, appeal address, and filing conventions — from the EDD in California to the TWC in Texas. The generator addresses your letter to the right agency and references your state's process, so it reads like it was written by someone who has done this before.",
      },
    ],
    promptContext:
      "The user was denied unemployment insurance benefits and is appealing the determination. The letter goes to their state unemployment agency's appeals division. The employer's version of events led to a denial; the burden is often on the employer in misconduct cases. The letter must be factual, calm, chronological, and confident — never emotional, angry, or begging.",
    letterStructure:
      "1) Header with claimant name, claim reference placeholder [Claim ID], date. 2) RE line: 'Appeal of Determination dated [date]'. 3) Opening: clear statement of appeal within the deadline. 4) Factual account: chronological, specific dates, what happened from claimant's perspective. 5) Why the determination is wrong, tied to the denial reason. 6) Evidence and witnesses the claimant will present. 7) Request: reversal of determination and a hearing. 8) Professional closing.",
    deliverables: ["Full appeal letter", "PDF download", "Editable Word (.docx)", "Hearing prep checklist"],
  },

  pip: {
    id: "pip",
    slug: "pip-rebuttal-letter-generator",
    name: "PIP Rebuttal Letter",
    h1: "PIP Rebuttal Letter Generator",
    metaTitle: "PIP Rebuttal Letter Generator — Respond to a Performance Improvement Plan Professionally",
    metaDescription:
      "Put on a PIP? Generate a professional written rebuttal that disputes vague claims, documents your record, and protects your position. Free preview.",
    priceCents: 900,
    priceLabel: "$9",
    heroSub:
      "A written response to your PIP creates a paper trail and protects your position. Paste your PIP, tell your side, and get a professional, non-hostile rebuttal — free preview before you pay.",
    bullets: [
      "Disputes vague or unmeasurable claims point by point",
      "Documents your accomplishments on the record",
      "Professional, non-hostile tone HR can't use against you",
      "Includes follow-up email templates for HR",
    ],
    fields: [
      { id: "fullName", label: "Your full name", type: "text", required: true, placeholder: "Jane Smith" },
      { id: "role", label: "Your job title", type: "text", required: true, placeholder: "Senior Account Manager" },
      { id: "tenure", label: "How long at the company?", type: "text", required: true, placeholder: "3.5 years" },
      {
        id: "pipText",
        label: "Paste the key claims from your PIP",
        type: "textarea",
        required: true,
        placeholder:
          "Paste the specific performance concerns listed in the PIP document (you can shorten, but keep the wording of the claims)...",
        help: "The letter will address these claims one by one. Company names are only used to draft your letter.",
      },
      {
        id: "yourSide",
        label: "Your side: what do you dispute, and what's your record?",
        type: "textarea",
        required: true,
        placeholder:
          "Example: The 'missed deadlines' claim refers to a project where requirements changed twice after sign-off. My last review (8 months ago) rated me 'exceeds expectations'. I closed the two largest accounts this quarter...",
      },
      {
        id: "goal",
        label: "Primary goal of your response",
        type: "select",
        options: [
          "Dispute the claims and correct the record",
          "Document accomplishments while cooperating with the plan",
          "Preserve my position while I plan next steps",
        ],
        required: true,
      },
    ],
    faq: [
      {
        q: "Should I respond to a PIP in writing?",
        a: "In most cases, yes. A written response becomes part of your personnel file, corrects the record while events are fresh, and demonstrates professionalism. If the PIP leads to termination and any dispute follows, your contemporaneous written response is often the only documentation of your side.",
      },
      {
        q: "Will responding to a PIP make things worse?",
        a: "A hostile response can. That's why the rebuttal is written in a cooperative, factual tone: it disputes specific claims with evidence while stating your commitment to doing your job well. It gives HR nothing to use against you.",
      },
      {
        q: "Is my PIP text stored anywhere?",
        a: "Your inputs are used to draft the letter and are not stored on our servers after generation. Payment is processed by Stripe; we never see your card details.",
      },
      {
        q: "Is this legal advice?",
        a: "No. This is a drafting tool. If you believe the PIP is retaliation or discrimination, consult an employment attorney — many offer free consultations, and your written rebuttal will make that consultation more productive.",
      },
    ],
    seoBody: [
      {
        heading: "Why a written PIP response matters",
        text: "A Performance Improvement Plan is a formal document in your personnel file. If you never respond in writing, the file contains only your employer's version. A professional rebuttal puts your version — with dates, metrics, and context — on the record, which matters for internal review, severance negotiation, unemployment claims, and any later dispute.",
      },
      {
        heading: "The structure that works",
        text: "Effective rebuttals do three things: acknowledge the process without conceding inaccurate claims, dispute specific points with verifiable facts, and close with forward-looking professionalism. Emotional or accusatory responses get discounted; factual point-by-point responses get read.",
      },
      {
        heading: "What to do in the first 48 hours of a PIP",
        text: "Request the PIP in writing if you haven't received it, note deadlines and success criteria, start a private log of relevant events, and submit a written response. Save copies of everything to personal (non-work) storage. The rebuttal letter is the centerpiece of this paper trail.",
      },
    ],
    promptContext:
      "The user has been placed on a Performance Improvement Plan (PIP) at work and wants to submit a written rebuttal to their manager and HR. The rebuttal must be professional, cooperative in tone, and legally prudent: dispute vague or inaccurate claims with specific facts, document accomplishments, avoid admissions of poor performance, avoid accusations or emotional language, and preserve the employee's position.",
    letterStructure:
      "1) Header with employee name, title, date. 2) RE line: 'Response to Performance Improvement Plan dated [date]'. 3) Opening: acknowledges receipt, states intent to engage constructively, and notes this response is to ensure the record is complete and accurate. 4) Point-by-point response to the PIP's specific claims, each with facts/context. 5) Record of accomplishments with specifics. 6) Requests: measurable success criteria, regular check-ins, resources needed. 7) Professional closing reaffirming commitment. Never admit misconduct or incompetence.",
    deliverables: ["Full rebuttal letter", "PDF download", "Editable Word (.docx)", "HR follow-up email templates"],
  },

  academic: {
    id: "academic",
    slug: "academic-dismissal-appeal-letter-generator",
    name: "Academic Dismissal Appeal Letter",
    h1: "Academic Dismissal Appeal Letter Generator",
    metaTitle: "Academic Dismissal Appeal Letter Generator — SAP & Suspension Appeals",
    metaDescription:
      "Dismissed or suspended from college? Generate the appeal letter committees expect: honest, specific, with a concrete success plan. Free preview.",
    priceCents: 700,
    priceLabel: "$7",
    heroSub:
      "Appeal committees look for two things: honest ownership and a concrete plan. Answer a few questions and get a letter with both — free preview before you pay.",
    bullets: [
      "Follows the take-responsibility + specific-plan structure committees expect",
      "Handles GPA, SAP (financial aid), and conduct appeals",
      "Includes a 'success plan' addendum — the document committees ask for",
      "Instant PDF + editable Word download",
    ],
    fields: [
      { id: "fullName", label: "Your full name", type: "text", required: true, placeholder: "Jane Smith" },
      { id: "school", label: "School name", type: "text", required: true, placeholder: "State University" },
      { id: "year", label: "Year / program", type: "text", required: true, placeholder: "Sophomore, Biology major" },
      {
        id: "dismissalType",
        label: "Type of dismissal / appeal",
        type: "select",
        options: [
          "Academic dismissal (GPA)",
          "SAP appeal (financial aid suspension)",
          "Academic suspension",
          "Conduct-related dismissal",
        ],
        required: true,
      },
      {
        id: "circumstances",
        label: "What happened? (the circumstances behind your grades)",
        type: "textarea",
        required: true,
        placeholder:
          "Example: During fall semester my mother was hospitalized and I became the primary caregiver for my younger brother, while working 30 hours a week. I stopped attending two classes instead of withdrawing...",
        help: "Committees respond to specific, honest circumstances — illness, family crisis, work hours, mental health.",
      },
      {
        id: "stepsTaken",
        label: "What have you already changed or arranged?",
        type: "textarea",
        required: true,
        placeholder:
          "Example: I've reduced work to 15 hours, registered with the campus counseling center, met with an academic advisor, and arranged tutoring for chemistry...",
      },
    ],
    faq: [
      {
        q: "What do academic appeal committees actually want to see?",
        a: "Three things: honest acknowledgment of what went wrong (without excuses or blame), evidence the underlying circumstances have changed, and a specific, realistic plan for success — course load, support services, work hours, checkpoints. Letters that blame professors or promise vaguely to 'try harder' get denied.",
      },
      {
        q: "What's the difference between an academic dismissal appeal and a SAP appeal?",
        a: "Academic dismissal is about your standing with the school; SAP (Satisfactory Academic Progress) appeals are about keeping federal financial aid. The structure is similar but SAP appeals must usually document the specific extenuating circumstance and what changed. The generator adjusts the letter based on which type you select.",
      },
      {
        q: "Will the committee know I used a tool?",
        a: "The letter is drafted from your specific circumstances, in plain sincere language — not template boilerplate. You should read it, edit anything that doesn't sound like you, and submit it as your own. It's your story; the tool handles the structure.",
      },
      {
        q: "Can I see it before paying?",
        a: "Yes — free preview of the opening before payment. The full letter, success-plan addendum, and PDF/Word downloads unlock for a one-time $7. No subscription.",
      },
    ],
    seoBody: [
      {
        heading: "Deadlines are short — act now",
        text: "Most schools give you between a few days and two weeks from the dismissal notice to submit an appeal. A submitted appeal with an honest narrative and a concrete plan almost always beats a missed deadline. If you're close to the deadline, generate the letter, edit it once, and submit.",
      },
      {
        heading: "The structure committees are trained to look for",
        text: "Successful appeal letters follow a consistent arc: what happened (specific, honest, no blame), why it won't happen again (what has materially changed), and how you will succeed (course plan, support services, hour-by-hour realism). Our letters follow this arc and attach a separate success plan — the addendum many committees explicitly request.",
      },
      {
        heading: "Honesty beats polish",
        text: "Committees read hundreds of appeals. Overwrought apologies and dramatic language read as insincere. What stands out is specificity: dates, hours worked, named support services, and a plan with numbers in it. The generator keeps your voice and your facts at the center.",
      },
    ],
    promptContext:
      "The user has been academically dismissed or suspended from college (or lost financial aid via SAP) and is writing an appeal letter to the academic appeals committee. Committees expect: honest ownership without excuses, specific extenuating circumstances, evidence circumstances have changed, and a concrete realistic success plan. Tone: sincere, mature, specific, humble but not self-flagellating. Written in the student's voice (first person), plain language a real student would use.",
    letterStructure:
      "1) Header with student name, ID placeholder [Student ID], date. 2) RE line: appeal of [dismissal type]. 3) Opening: respectful statement of appeal and gratitude for the process. 4) What happened: honest, specific circumstances with timeline. 5) Ownership: acknowledge poor decisions (e.g., not withdrawing, not seeking help) without groveling. 6) What has changed: concrete steps already taken. 7) The plan: specific course load, support services, work limits, checkpoints. 8) Respectful closing with commitment. After the letter, add a separate 'SUCCESS PLAN' addendum as a short structured list.",
    deliverables: ["Full appeal letter", "Success plan addendum", "PDF download", "Editable Word (.docx)"],
  },
};

export function getNicheBySlug(slug: string): Niche | undefined {
  return Object.values(NICHES).find((n) => n.slug === slug);
}
