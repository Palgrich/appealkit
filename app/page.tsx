import Link from "next/link";
import { NICHES } from "@/lib/niches";

const PAIN_HOOKS: Record<string, { pain: string; deadline?: string }> = {
  unemployment: {
    pain: "Denied benefits after losing your job — based on your employer's version of events.",
    deadline: "8–45 days to appeal, depending on state",
  },
  pip: {
    pain: "A PIP lands in your file with claims you never agreed to — and silence reads as agreement.",
    deadline: "Respond before the narrative sets",
  },
  academic: {
    pain: "One brutal semester, and the dismissal letter gives you days to make your case.",
    deadline: "Appeal windows are often under 2 weeks",
  },
  medicalbill: {
    pain: "A hospital bill 3–4× what insurers pay for the same care — negotiable, if you ask right.",
    deadline: "Act before it goes to collections",
  },
  visaletter: {
    pain: "Your parents' visa interview is scheduled — and they need a clear invitation letter from you.",
  },
  goodwill: {
    pain: "One late payment is dragging your score down right when you need a mortgage approval.",
  },
};

const STEPS = [
  {
    n: "1",
    title: "Tell your side",
    text: "Answer a short set of questions about what happened — plain words, no legalese needed.",
  },
  {
    n: "2",
    title: "See the free preview",
    text: "We draft the letter and show you the opening before you pay a cent. No account, no card required.",
  },
  {
    n: "3",
    title: "Answer follow-ups, get the letter",
    text: "After checkout we ask a few targeted questions to fill the gaps in your story — then deliver the full letter on screen, by email, as PDF and Word.",
  },
];

const HOME_FAQ = [
  {
    q: "Is this legal advice?",
    a: "No. AppealKit drafts documents from the facts you provide — it's a writing tool, not a law firm. You review every letter and send it as your own. For legal advice, consult a licensed attorney.",
  },
  {
    q: "What exactly do I get for the money?",
    a: "The complete letter (not a template — written from your answers), delivered on screen and by email, as a print-ready PDF and an editable Word file, plus the extras for your situation (hearing checklist, follow-up letter, next-steps guide). One-time payment. And 2 free credits for any other letters.",
  },
  {
    q: "What if it doesn't help or something goes wrong?",
    a: "If a technical problem keeps you from getting your letter, we regenerate it or refund you — email support@appealkits.com with your receipt. We can't guarantee outcomes (no one honestly can), but we can guarantee you a professional, specific, on-time letter.",
  },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Appeal · Rebuttal · Negotiation letters
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              You have days to respond.
              <br />
              Make the letter count.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Denied unemployment. Put on a PIP. A hospital bill you can&apos;t pay. In every
              one of these, the decision-maker reads a letter before they ever hear your
              voice. AppealKit interviews you about your situation and writes that letter —
              specific, professional, and structured the way decision-makers are trained to
              read.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#letters"
                className="w-full rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500 sm:w-auto"
              >
                Start my letter — free preview
              </a>
              <Link
                href="/unemployment-appeal-deadlines-by-state"
                className="w-full rounded-xl border border-slate-300 px-8 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                Check my deadline first
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Free preview before any payment · $5–9 one-time, no subscription · Ready in ~5
              minutes
            </p>
          </div>
        </div>
      </div>

      {/* URGENCY STRIP */}
      <div className="bg-indigo-600">
        <div className="mx-auto max-w-5xl px-4 py-3 text-center text-sm font-medium text-white">
          Appeal deadlines run from the <b>mailing date</b> of your notice — as few as 8 days
          in some states.{" "}
          <Link href="/unemployment-appeal-deadlines-by-state" className="underline">
            See all 50 states →
          </Link>
        </div>
      </div>

      {/* LETTER CARDS */}
      <div id="letters" className="mx-auto max-w-5xl scroll-mt-8 px-4 py-14">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
          What are you dealing with?
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(NICHES).map((n) => {
            const hook = PAIN_HOOKS[n.id];
            return (
              <Link
                key={n.id}
                href={`/${n.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700">
                  {n.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {hook?.pain || n.metaDescription}
                </p>
                {hook?.deadline && (
                  <p className="mt-3 text-xs font-medium text-amber-600">⏱ {hook.deadline}</p>
                )}
                <p className="mt-3 text-sm font-semibold text-indigo-600">
                  Free preview → {n.priceLabel} full letter
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
            Not a template. An interview.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Generic templates read like generic templates — decision-makers see a hundred of
            them a week. AppealKit asks about <i>your</i> dates, <i>your</i> evidence,{" "}
            <i>your</i> record, then follows up on the gaps. The letter that comes out is
            yours.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>

          {/* Letter mock */}
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-inner">
            <p className="font-serif text-sm leading-relaxed text-slate-700">
              RE: Appeal of Determination dated June 28
              <br />
              <br />
              Dear Appeals Officer:
              <br />
              <br />
              I am writing to formally appeal the determination denying my claim. The denial
              states I was discharged for misconduct. The record does not support this: both
              absences in question, on June 12 and June 14, followed a documented medical
              emergency, and I notified my manager by text on each date&nbsp;…
            </p>
            <p className="mt-4 text-center text-xs text-slate-400">
              — real structure, your facts, ready to send
            </p>
          </div>
        </div>
      </div>

      {/* GUARANTEE + TRUST */}
      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-2xl">🔍</p>
            <h3 className="mt-2 font-semibold text-slate-900">See before you pay</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              The preview is generated from your real answers — judge the quality first. No
              card, no account required.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-2xl">🤝</p>
            <h3 className="mt-2 font-semibold text-slate-900">Fair-deal promise</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Technical problem with your letter? We regenerate it or refund you. One email
              to support@appealkits.com.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-2xl">🔒</p>
            <h3 className="mt-2 font-semibold text-slate-900">Private by design</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Payments by Stripe — we never see your card. Your story is used to write your
              letter, not stored in a database or sold.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-indigo-50 p-6 text-center">
          <p className="font-semibold text-indigo-900">
            Every purchase includes 2 free letter credits
          </p>
          <p className="mt-1 text-sm text-indigo-800">
            Hard seasons rarely bring just one problem. Buy any letter — get two more of any
            type, free, saved to your account.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">
            Fair questions
          </h2>
          <div className="mt-6 divide-y divide-slate-200">
            {HOME_FAQ.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-medium text-slate-800">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="#letters"
              className="inline-block rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Start my letter — free preview
            </a>
            <p className="mt-3 text-xs text-slate-500">
              5 minutes from now, you&apos;ll know exactly what your letter says.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
