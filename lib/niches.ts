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

  medicalbill: {
    id: "medicalbill",
    slug: "medical-bill-negotiation-letter-generator",
    name: "Medical Bill Negotiation Letter",
    h1: "Medical Bill Negotiation Letter Generator",
    metaTitle: "Medical Bill Negotiation Letter Generator — Lower a Hospital Bill in Writing",
    metaDescription:
      "Facing a huge hospital bill? Generate a professional negotiation letter using the right lever: charity care, Medicare-rate benchmark, or a lump-sum offer. Free preview.",
    priceCents: 700,
    priceLabel: "$7",
    heroSub:
      "Hospital bills are negotiable — but only if you ask in writing, with the right lever. Answer a few questions and get a professional negotiation letter pack. Free preview before you pay.",
    bullets: [
      "Picks the right lever: charity care, billing errors, Medicare-rate benchmark, or lump-sum settlement",
      "Includes an itemized-bill request — errors appear on a large share of hospital bills",
      "Professional tone billing departments take seriously",
      "Instant PDF + editable Word download",
    ],
    fields: [
      { id: "fullName", label: "Your full name", type: "text", required: true, placeholder: "Jane Smith" },
      { id: "provider", label: "Hospital / provider name", type: "text", required: true, placeholder: "Mercy General Hospital" },
      { id: "amount", label: "Total amount billed", type: "text", required: true, placeholder: "$14,300" },
      {
        id: "insurance",
        label: "Insurance situation",
        type: "select",
        options: [
          "Uninsured at the time of care",
          "Insured — this is what's left after insurance",
          "Insurance denied the claim",
        ],
        required: true,
      },
      {
        id: "situation",
        label: "Your situation: what happened, and what can you realistically pay?",
        type: "textarea",
        required: true,
        placeholder:
          "Example: Emergency appendectomy in March. I earn about $38k/year and support two kids. I could pay around $2,000 as a lump sum, or $150/month...",
        help: "Income level matters — many hospitals are required to offer charity care discounts based on income.",
      },
      {
        id: "goal",
        label: "What outcome are you asking for?",
        type: "select",
        options: [
          "Reduce the bill (discount / charity care)",
          "Settle for a lump sum I can afford",
          "Set up an affordable payment plan",
          "Dispute charges that look wrong",
        ],
        required: true,
      },
    ],
    faq: [
      {
        q: "Can you really negotiate a hospital bill?",
        a: "Yes — hospitals negotiate constantly. Nonprofit hospitals are legally required to have financial assistance (charity care) policies, uninsured patients are often billed 2-4x what insurers pay for the same care, and billing errors are common. A written request that cites the right lever gets routed to people with authority to adjust the bill.",
      },
      {
        q: "What's the 'right lever' and how does the generator pick it?",
        a: "It depends on your situation: income near charity-care thresholds → financial assistance application; uninsured → ask to be billed at the rate insurers actually pay (often benchmarked to Medicare rates); cash available → lump-sum settlement offer; suspicious charges → itemized bill request and dispute. The generator reads your answers and structures the letter around the strongest lever.",
      },
      {
        q: "Will negotiating hurt my credit?",
        a: "Asking to negotiate does not affect your credit. Medical debt under $500 no longer appears on credit reports at all, and paid medical collections are removed. Negotiating before a bill goes to collections is exactly the right time to act.",
      },
      {
        q: "Is this legal or financial advice?",
        a: "No — AppealKit drafts documents; it is not a law firm or financial advisor. For large debts, a nonprofit credit counselor or medical billing advocate can also help; our letter is often the right first step either way.",
      },
    ],
    seoBody: [
      {
        heading: "Why written negotiation beats phone calls",
        text: "Phone agents at billing departments have scripts and limited authority. A written negotiation letter gets escalated, creates a paper trail, and lets you cite specific policies — the hospital's own financial assistance policy, fair-price benchmarks, or billing errors — that a phone call glosses over. If the account is ever disputed or sent to collections, your letter is evidence you engaged in good faith.",
      },
      {
        heading: "The three numbers that change the conversation",
        text: "First: what Medicare pays for the same procedure — often a fraction of the chargemaster price you were billed. Second: the hospital's charity care income threshold — at many nonprofits, families earning under 2-4x the federal poverty line qualify for steep discounts or full forgiveness. Third: your realistic lump sum — billing departments frequently accept 40-60% of a balance paid at once. A letter built around these numbers reads like it was written by someone who knows the system.",
      },
      {
        heading: "Always request the itemized bill",
        text: "Summary bills hide errors: duplicate charges, services never rendered, wrong billing codes. Requesting a fully itemized bill is your legal right, frequently reveals reductions on its own, and signals to the billing department that you're paying attention. Our letter pack includes this request automatically.",
      },
    ],
    promptContext:
      "The user received a large medical bill and wants to negotiate it down in writing with the hospital/provider billing department. Levers, chosen based on the user's situation: (1) charity care / financial assistance if income is modest — nonprofit hospitals must have such policies; (2) uninsured fair-price argument — ask to be billed near Medicare/insurer rates rather than chargemaster rates; (3) lump-sum settlement offer if they can pay some cash now; (4) itemized bill request and dispute of errors. Tone: respectful, financially candid, cooperative but informed — someone who knows bills are negotiable.",
    letterStructure:
      "1) Header with patient name, account number placeholder [Account Number], date. 2) RE line with provider and amount. 3) Opening: intent to resolve the bill in good faith. 4) The situation: brief facts (care received, insurance status, financial reality with specifics the user provided). 5) The ask, built around the strongest lever for this user's situation, with a specific number if they provided one. 6) Request for a fully itemized bill. 7) Request for written response and a hold on collections activity while the account is under review. 8) Professional closing. After the letter, add a short 'NEXT STEPS' addendum: how to send it, who to address, what to do when they respond.",
    deliverables: ["Negotiation letter", "Itemized-bill request", "Next-steps guide", "PDF + Word download"],
  },

  visaletter: {
    id: "visaletter",
    slug: "visa-invitation-letter-generator",
    name: "Visa Invitation Letter",
    h1: "Visa Invitation Letter Generator (B1/B2)",
    metaTitle: "Visa Invitation Letter Generator — Invite Parents & Family to the USA",
    metaDescription:
      "Inviting parents or family for a US visitor visa? Generate a personalized invitation letter with the details consulates expect. Free preview, PDF & Word.",
    priceCents: 500,
    priceLabel: "$5",
    heroSub:
      "Inviting your parents or family to visit the US? A clear invitation letter with the right details supports their B1/B2 interview. Answer a few questions — free preview before you pay.",
    bullets: [
      "Personalized to your relationship, dates, and who covers expenses",
      "Includes the details consular officers look for — ties, purpose, accommodation",
      "Optional sponsor/accommodation statement included",
      "Instant PDF + editable Word download",
    ],
    fields: [
      { id: "fullName", label: "Your full name (the inviter)", type: "text", required: true, placeholder: "Anil Sharma" },
      {
        id: "status",
        label: "Your status in the US",
        type: "select",
        options: ["US citizen", "Green card holder", "H-1B / work visa", "F-1 / student", "Other"],
        required: true,
      },
      { id: "guests", label: "Who are you inviting? (names + relationship)", type: "text", required: true, placeholder: "My parents, Raj and Meena Sharma" },
      { id: "dates", label: "Planned visit dates (approximate)", type: "text", required: true, placeholder: "September 10 — November 20, 2026" },
      {
        id: "purpose",
        label: "Purpose of the visit",
        type: "select",
        options: [
          "Family visit / tourism",
          "Meeting a new grandchild",
          "Graduation ceremony",
          "Wedding",
          "Medical consultation support",
          "Other family event",
        ],
        required: true,
      },
      {
        id: "details",
        label: "Details: where will they stay, who pays for what, their ties back home",
        type: "textarea",
        required: true,
        placeholder:
          "Example: They will stay with me at my home in Austin, TX. I will cover accommodation and daily expenses; they cover flights. Both are retired with a home and pension in Delhi, my brother's family also lives there...",
        help: "Ties to their home country (home, pension, family, business) are what consular officers weigh most.",
      },
    ],
    faq: [
      {
        q: "Is an invitation letter required for a B1/B2 visitor visa?",
        a: "No — it's not a required document, but it's customary and helpful. A clear letter explains the purpose of the trip, where the visitor will stay, and who covers expenses, which supports the applicant's DS-160 answers and interview. It's one piece of a strong application, not a guarantee.",
      },
      {
        q: "What should a visa invitation letter include?",
        a: "Your full name, status in the US, and address; the visitor's names and relationship to you; the purpose and dates of the visit; where they'll stay; who covers which expenses; and a mention of the visitor's ties to their home country. Our generator structures all of this from your answers.",
      },
      {
        q: "Does the letter need to be notarized?",
        a: "Generally no — consulates do not require notarization for invitation letters. A signed letter (printed, or a clear PDF) is standard practice. Some applicants include a copy of the inviter's status document (visa/green card/passport page); that's optional and your choice.",
      },
      {
        q: "Will this guarantee the visa?",
        a: "No — visa decisions are made by consular officers based on the whole application, primarily the applicant's own ties to their home country. AppealKit drafts a clear, complete letter; it is not an immigration advisor and doesn't influence decisions.",
      },
    ],
    seoBody: [
      {
        heading: "What consular officers actually weigh",
        text: "The core question at a B1/B2 interview is whether the visitor will return home. That's why the strongest invitation letters don't oversell the trip — they matter-of-factly state the family occasion, the dates, the accommodation, and, crucially, the visitor's ties back home: property, pensions, other children, a business. Mentioning ties in the invitation supports what the applicant says in their own interview.",
      },
      {
        heading: "One letter, or letter plus sponsor statement?",
        text: "If you're covering costs, saying so clearly matters — vague financial arrangements invite questions. Many families pair the invitation letter with a short sponsor statement (sometimes alongside Form I-134, where appropriate) spelling out who pays for travel, lodging, and daily expenses. Our generator produces the invitation letter with an integrated support statement based on what you tell us about expenses.",
      },
      {
        heading: "Timing the letter with the interview",
        text: "Applicants typically bring the invitation letter to the visa interview as a printed copy, alongside the appointment confirmation and their own documents. Generate the letter once dates are roughly known — approximate dates are fine and normal — and email it to your family so they can print it at home.",
      },
    ],
    promptContext:
      "The user is a person in the US inviting family (often parents) to visit on a B1/B2 visitor visa and needs an invitation letter to support the application. The letter is addressed to the visa applicant (or 'To the U.S. Consulate' as customary), states the inviter's status, the relationship, purpose and dates of the visit, accommodation, who covers which expenses, and mentions the visitors' ties to their home country. Tone: warm but formal, factual, confident. Never promise or imply the letter guarantees a visa; never invent immigration details.",
    letterStructure:
      "1) Inviter's name and address block with [Address] placeholder, date. 2) 'To: U.S. Consulate General, [City]' or addressed to the applicant per convention. 3) Opening: who the inviter is (name, status in the US, occupation placeholder if not provided) and who they are inviting (names, relationship). 4) Purpose and dates of the visit, specific occasion if provided. 5) Accommodation and financial arrangements: who pays for what, stated plainly. 6) Visitors' ties to home country as provided. 7) Closing with willingness to provide further information, signature line. If the user indicated they cover expenses, integrate a brief sponsor statement paragraph.",
    deliverables: ["Invitation letter", "Integrated sponsor statement", "PDF + Word download"],
  },

  goodwill: {
    id: "goodwill",
    slug: "goodwill-letter-generator",
    name: "Goodwill Letter (Late Payment Removal)",
    h1: "Goodwill Letter Generator — Remove a Late Payment",
    metaTitle: "Goodwill Letter Generator — Ask a Creditor to Remove a Late Payment",
    metaDescription:
      "One late payment can cost you a mortgage rate. Generate a creditor-specific goodwill letter with the structure that actually gets late marks removed. Free preview.",
    priceCents: 500,
    priceLabel: "$5",
    heroSub:
      "A single late payment can sit on your credit report for 7 years — but creditors can remove it as a courtesy, and a well-written goodwill letter is how you ask. Free preview before you pay.",
    bullets: [
      "The emotional-plus-factual structure that works: what happened, your record since, the specific ask",
      "Tailored to your creditor and situation (autopay glitch, medical event, one-time hardship)",
      "Includes a follow-up letter if the first is ignored",
      "Instant PDF + editable Word download",
    ],
    fields: [
      { id: "fullName", label: "Your full name", type: "text", required: true, placeholder: "Jane Smith" },
      { id: "creditor", label: "Creditor name", type: "text", required: true, placeholder: "Chase, Capital One, Navient..." },
      { id: "account", label: "Account type", type: "select", options: ["Credit card", "Auto loan", "Student loan", "Mortgage", "Personal loan", "Other"], required: true },
      { id: "lateWhen", label: "When was the late payment (month/year)?", type: "text", required: true, placeholder: "March 2025" },
      {
        id: "reason",
        label: "What caused it? (the honest story)",
        type: "textarea",
        required: true,
        placeholder:
          "Example: I switched banks and my autopay didn't transfer — I didn't notice until the statement arrived. Paid in full the day I saw it. Never been late before or since...",
        help: "One-time, explainable causes work best: autopay failure, medical emergency, family crisis, deployment.",
      },
      {
        id: "history",
        label: "Your record with this creditor (how long, otherwise on-time?)",
        type: "text",
        required: true,
        placeholder: "Customer 6 years, no other late payments",
      },
    ],
    faq: [
      {
        q: "Do goodwill letters actually work?",
        a: "Sometimes — and 'sometimes' is worth a $5 letter when a late mark is costing you a mortgage approval. They work best when the late payment was a one-time event with a sympathetic cause, your history is otherwise clean, and the account is current or paid. Creditors have no obligation to remove accurate marks, but goodwill adjustments happen routinely.",
      },
      {
        q: "Is this the same as a credit dispute?",
        a: "No. A dispute is for inaccurate information and goes through the credit bureaus under the FCRA. A goodwill letter asks the creditor to remove an accurate late mark as a courtesy. If your late payment is actually an error, dispute it instead — and our letter tells you when that's the better path.",
      },
      {
        q: "Where do I send a goodwill letter?",
        a: "To the creditor's correspondence address (not the payment address) — often listed on your statement or the creditor's site. Some creditors respond to secure messages too; paper mail to the right department, politely persistent, tends to work best. The letter pack includes guidance on finding the right address and a follow-up letter template.",
      },
      {
        q: "Is this credit repair or legal advice?",
        a: "No. AppealKit is a letter-drafting tool — it is not a credit repair organization, law firm, or financial advisor, and results depend entirely on your creditor's discretion.",
      },
    ],
    seoBody: [
      {
        heading: "Why one late payment matters so much",
        text: "Payment history is the largest component of a credit score, and a single 30-day late mark on an otherwise clean report can drop a good score by 50-100 points — enough to change a mortgage rate or an approval decision. The mark stays for seven years, but its impact fades much faster, and its removal restores the score immediately. That asymmetry is why goodwill letters are worth writing.",
      },
      {
        heading: "The structure that gets read",
        text: "Effective goodwill letters are short and follow a consistent arc: the relationship (how long you've been a customer, your otherwise clean record), the event (what caused the late payment, honestly and briefly), the correction (you paid, you fixed the cause — new autopay, new bank), and the specific ask (a goodwill adjustment removing the late mark from all three bureaus). Groveling, threats, and template-speak all lower the odds; a specific, human, accountable letter raises them.",
      },
      {
        heading: "Persistence is part of the method",
        text: "First letters often get form-letter denials — 'we report accurate information.' That's not the end. A polite second letter, sometimes addressed to the executive office, succeeds where the first failed often enough that follow-up is standard practice among people who do this successfully. Our pack includes the follow-up letter, so you're ready for the 'no' before it comes.",
      },
    ],
    promptContext:
      "The user has a late payment mark on their credit report and is writing a goodwill letter asking the creditor to remove it as a courtesy. The mark is accurate (if it were an error, they'd dispute instead) — so the letter appeals to the relationship and circumstances, not to legal claims. Structure that works: loyal-customer framing, honest one-time cause, evidence of correction, specific ask (goodwill adjustment removing the mark from all three credit bureaus). Tone: warm, accountable, concise — a valued customer writing a human letter, not a form. Never threaten, never cite laws aggressively, never claim the mark is inaccurate.",
    letterStructure:
      "1) Header with customer name, account number placeholder [Account Number], date. 2) Creditor name and [Correspondence Address] placeholder. 3) RE line: 'Goodwill adjustment request — account [Account Number]'. 4) Opening: relationship length and appreciation, otherwise-clean record. 5) The event: what caused the late payment, with the user's specifics. 6) The correction: paid, and the safeguard now in place. 7) The ask: goodwill adjustment removing the [month/year] late mark from all three credit bureaus, with a sentence on why it matters to the user now. 8) Warm professional closing. After the letter, add a 'FOLLOW-UP LETTER' addendum: a shorter, polite second letter to send if there's no response in 30 days.",
    deliverables: ["Goodwill letter", "Follow-up letter", "Where-to-send guidance", "PDF + Word download"],
  },
};

export function getNicheBySlug(slug: string): Niche | undefined {
  return Object.values(NICHES).find((n) => n.slug === slug);
}
