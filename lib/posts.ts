export interface PostSection {
  h2?: string;
  paragraphs: string[];
}

export interface Post {
  slug: string;
  title: string;
  metaDescription: string;
  date: string;
  readMinutes: number;
  intro: string;
  sections: PostSection[];
  cta: { href: string; label: string };
}

export const POSTS: Post[] = [
  {
    slug: "how-to-win-unemployment-appeal",
    title: "How to Win an Unemployment Appeal: What Hearing Officers Actually Look For",
    metaDescription:
      "Most unemployment denials can be reversed on appeal. A former-insider look at what hearing officers weigh, the mistakes that sink appeals, and how to prepare.",
    date: "2026-07-20",
    readMinutes: 7,
    intro:
      "Here's the number that should change how you think about your denial: a large share of unemployment appeals succeed — in misconduct cases, claimants win roughly half the time or more, because the employer carries the burden of proof. Yet most people never appeal. They read the denial letter, assume the decision is final, and walk away from thousands of dollars in benefits. The determination you received is not a verdict. It's a first pass, made quickly, usually based mostly on your employer's version of events. The appeal hearing is the first time a neutral person hears yours.",
    sections: [
      {
        h2: "The deadline comes first — everything else second",
        paragraphs: [
          "Your appeal window is counted from the mailing date of the determination, not the day you read it. Depending on your state it can be as short as 8 days (West Virginia) or as long as 45 (Minnesota) — check your state's exact deadline in our verified table of unemployment appeal deadlines by state. If you're near the edge: file a short appeal today. Two sentences — 'I disagree with the determination dated [date]. The facts stated are incorrect and I request a hearing.' — filed on time beats a masterpiece filed late. You can supplement it afterward.",
        ],
      },
      {
        h2: "Understand what the hearing officer is actually deciding",
        paragraphs: [
          "Hearing officers don't decide whether you were a good employee or whether your firing was fair in a cosmic sense. They decide a narrow legal question. In a misconduct case: did the employer prove you deliberately violated a known, reasonable rule? Ordinary imperfection — missed targets, honest mistakes, being 'not a good fit' — is not misconduct in most states, and benefits should be paid. In a voluntary-quit case: did you have 'good cause' connected to the work, and did you try to resolve it before quitting?",
          "This is why generic pleas ('I really need these benefits', 'I was a loyal employee for five years') do nothing. The officer is listening for facts that map onto the legal standard: dates, warnings received or not received, what the rule was, whether it was enforced consistently, what you said and when.",
        ],
      },
      {
        h2: "The appeal letter: factual, chronological, calm",
        paragraphs: [
          "Your written appeal sets the frame for the hearing. The strongest letters do four things: state precisely which determination you're appealing and that you're within the deadline; tell the story chronologically with specific dates; connect the facts to why the determination is wrong ('missing two shifts due to a documented medical emergency, with notice to my manager, is not willful misconduct'); and list the evidence and witnesses you'll bring.",
          "Just as important is what strong letters don't do: they don't attack the employer's character, don't speculate about motives, don't exaggerate, and don't beg. Hearing officers read hundreds of these. Emotion reads as noise; specificity reads as credibility.",
        ],
      },
      {
        h2: "Prepare for the hearing like it's a short trial — because it is",
        paragraphs: [
          "Most hearings are 30–60 minutes by phone. The officer asks questions, your employer (or their rep) tells their version, you tell yours, each side can question the other. Three preparation steps carry most of the weight. First, write a one-page timeline of events and keep it in front of you. Second, gather documents — texts with your manager, schedules, doctor's notes, the employee handbook page with the actual rule — and submit them before the hearing the way your state instructs. Third, rehearse answering the hardest question once out loud: 'Why did you miss the shift?' or 'Why did you quit before finding other work?' A calm, specific, 60-second answer to the worst question usually decides the hearing.",
          "If your employer doesn't show up — which happens frequently — the officer decides on the evidence presented. Show up prepared and you may win by default. If you lose, most states allow a second-level appeal; deadlines there are even shorter, so read the decision letter the day it arrives.",
        ],
      },
    ],
    cta: {
      href: "/unemployment-appeal-letter-generator",
      label: "Generate your state-specific appeal letter — free preview",
    },
  },
  {
    slug: "how-to-respond-to-a-pip",
    title: "Put on a PIP? Respond in Writing First — Here's Why and How",
    metaDescription:
      "A Performance Improvement Plan often precedes termination. A written rebuttal protects your record, your severance leverage, and your unemployment claim. Here's the structure.",
    date: "2026-07-20",
    readMinutes: 6,
    intro:
      "A Performance Improvement Plan arrives wearing the costume of help — 'we want you to succeed' — but everyone in the room knows what it usually is: documentation. If the PIP ends in termination, your personnel file will contain your employer's version of your performance, in detail, with dates and metrics. The question is whether it will contain yours. That's what a written rebuttal is for. Not to vent, not to fight — to put your version of the facts on the record while they're fresh, in a tone no HR department can hold against you.",
    sections: [
      {
        h2: "Why the paper trail matters more than the plan",
        paragraphs: [
          "Three doors are still open when a PIP starts, and your written response matters behind each one. If you keep the job, the rebuttal marks the claims as disputed, which matters at your next review. If you're terminated and negotiate severance, a documented, contemporaneous dispute of the PIP's claims is leverage. And if you file for unemployment, the question becomes whether you committed 'misconduct' — and a file containing your specific, dated rebuttal makes it much harder to paint ordinary performance disagreements as misconduct.",
          "Silence, by contrast, reads as agreement. Months later, 'I never agreed with any of that' sounds like hindsight. The same words in a letter dated three days after the PIP sound like the truth.",
        ],
      },
      {
        h2: "The tone that works: cooperative on the surface, precise underneath",
        paragraphs: [
          "The fatal mistake is writing angry. An accusatory rebuttal gives HR exactly what a shaky PIP lacks: evidence of a difficult employee. The tone that works is almost unsettlingly professional — you acknowledge receiving the plan, state your commitment to your role, and then, point by point, correct the record with facts. No adjectives, no motives, no sarcasm. Think of it as writing for a future reader — an arbitrator, a judge, an unemployment hearing officer — who will only ever see the paper.",
        ],
      },
      {
        h2: "Structure: answer claims with facts, not feelings",
        paragraphs: [
          "Take the two or three most consequential claims in the PIP and answer each with specifics. Claim: 'missed the Q2 delivery deadline.' Response: 'The Q2 scope was changed twice after sign-off, on May 3 and May 21, at the client's request; the revised delivery date of June 10 was approved by [manager] in writing, and I delivered June 8.' Dates, documents, names. Where a claim is simply vague — 'poor communication' — say so professionally: ask what specific incidents the claim refers to and what measurable standard applies.",
          "Then add the paragraph most people forget: your record. Recent wins, metrics, praise — with dates. Close by requesting what a fair process would include anyway: measurable success criteria, the resources the plan assumes, and regular written check-ins. You'll either get them (good) or create a record that you asked and didn't (also good).",
          "Practical hygiene: send it by email so it's timestamped, keep copies off work systems, and start a private log of everything relevant from this day forward. If you believe the PIP is retaliation for something protected — a complaint, a leave request, a disclosure — talk to an employment attorney; many consult free, and your written rebuttal will make that conversation far more productive.",
        ],
      },
    ],
    cta: {
      href: "/pip-rebuttal-letter-generator",
      label: "Generate your PIP rebuttal — free preview",
    },
  },
  {
    slug: "academic-dismissal-appeal-guide",
    title: "Academic Dismissal Appeals: The Structure Committees Actually Approve",
    metaDescription:
      "Dismissed or suspended from college? Appeal committees approve letters with a specific structure: honest ownership, changed circumstances, and a concrete plan. Here it is.",
    date: "2026-07-20",
    readMinutes: 6,
    intro:
      "Academic appeal committees read stacks of letters every term, and they sort them fast. One pile is excuses: the professor was unfair, the tests were tricky, everything happened to the student. One pile is drama: three pages of apology and self-flagellation with no plan. The thin pile — the one that gets reinstated — does three things in order: owns the outcome honestly, shows what has materially changed, and lays out a plan with numbers in it. Committees aren't looking for perfect students. They're looking for students whose next semester will be different for reasons more concrete than trying harder.",
    sections: [
      {
        h2: "First, know which appeal you're writing",
        paragraphs: [
          "Academic dismissal (your standing with the school) and SAP appeal (keeping federal financial aid) are different processes with similar letters. SAP appeals formally require two elements: documentation of the extenuating circumstance, and evidence the circumstance has changed or been addressed. Academic dismissal appeals are more flexible but reward the same structure. If you've lost both standing and aid, you may need both appeals — check your school's deadlines today, because they're often only days away.",
        ],
      },
      {
        h2: "Ownership without groveling, circumstances without excuses",
        paragraphs: [
          "The opening pages of failed appeals blame professors, advisors, and roommates. The committee stops reading. But the opposite failure is just as common: students who think honesty means abasement. 'I'm a failure and I understand if you reject me' doesn't demonstrate insight; it demonstrates panic.",
          "The line that works sounds like this: 'In October my mother was hospitalized and I became the primary caregiver for my younger brother while working 30 hours a week. Instead of withdrawing or contacting my professors, I stopped attending two classes — that was the wrong decision, and it was mine.' Specific circumstance, specific dates, and ownership of the specific bad decision. If you can document the circumstance — hospital records, work schedules, a counselor's note — say so and attach it. Documentation moves appeals from 'maybe' to 'yes' more reliably than any sentence you can write.",
        ],
      },
      {
        h2: "The success plan decides it — make it arithmetic, not adjectives",
        paragraphs: [
          "Committees approve plans they can verify. 'I will take school more seriously' is an adjective. A plan is: 12 credits instead of 16; work hours capped at 15 per week, confirmed with my employer; registered with the campus counseling center with biweekly sessions scheduled; tutoring for chemistry booked through the learning center; a standing appointment with my academic advisor every other Friday. Each item is checkable, and together they answer the committee's real question: what exactly absorbs the load that crushed last semester?",
          "Keep the whole letter to one page if you can, address it respectfully, and have one adult you trust read it before you submit. Then submit early — appeals that arrive the last hour read like the habits that caused the problem.",
        ],
      },
    ],
    cta: {
      href: "/academic-dismissal-appeal-letter-generator",
      label: "Generate your dismissal appeal letter — free preview",
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
