import type { Metadata } from "next";
import Link from "next/link";
import { STATE_DEADLINES, DEADLINES_VERIFIED } from "@/lib/deadlines";

export const metadata: Metadata = {
  title: "Unemployment Appeal Deadlines by State (All 50 States, Verified)",
  description:
    "How many days do you have to appeal an unemployment denial? Verified deadlines for all 50 states + DC, with links to each state's official appeal page.",
  alternates: { canonical: "/unemployment-appeal-deadlines-by-state" },
};

export default function DeadlinesPage() {
  const sorted = [...STATE_DEADLINES].sort((a, b) => a.state.localeCompare(b.state));
  const shortest = [...STATE_DEADLINES].sort((a, b) => parseInt(a.days) - parseInt(b.days));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many days do I have to appeal an unemployment denial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `It depends on your state — anywhere from 8 days (West Virginia) to 45 days (Minnesota), counted from the mailing date of your determination letter. Most states allow 10–30 days. Check the table for your state's exact deadline and official source.`,
        },
      },
      {
        "@type": "Question",
        name: "What happens if I miss the unemployment appeal deadline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In most states the determination becomes final. Some states accept late appeals for 'good cause' (serious illness, never receiving the letter), but it's an uphill battle. If you're near the deadline, file a short appeal immediately — you can add details later.",
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Unemployment Appeal Deadlines by State
      </h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">
        Denied unemployment benefits? The clock started the day your determination letter was
        mailed — and in some states you have as few as{" "}
        <b>{shortest[0].days} days ({shortest[0].state})</b> to appeal. Below are the current
        deadlines for all 50 states and DC, each verified against the state agency&apos;s
        official page or statute (last verified {DEADLINES_VERIFIED}). Note: several states
        changed their deadlines recently — Minnesota is now 45 days (not 20), New Jersey 21
        (not 7–10), Maine 30 (not 15) — and many older articles still show the outdated
        numbers.
      </p>

      <div className="mt-4 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-900">
        Inside the deadline?{" "}
        <Link href="/unemployment-appeal-letter-generator" className="font-semibold underline">
          Generate your appeal letter now
        </Link>{" "}
        — free preview, state-specific, takes about 5 minutes.
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-slate-300 text-left">
              <th className="py-2 pr-4 font-semibold text-slate-900">State</th>
              <th className="py-2 pr-4 font-semibold text-slate-900">Deadline</th>
              <th className="py-2 pr-4 font-semibold text-slate-900">Notes</th>
              <th className="py-2 font-semibold text-slate-900">Official source</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((d) => (
              <tr key={d.state} className="border-b border-slate-200 align-top">
                <td className="py-2.5 pr-4 font-medium text-slate-900">{d.state}</td>
                <td className="py-2.5 pr-4 whitespace-nowrap font-semibold text-indigo-700">
                  {d.days} days
                </td>
                <td className="py-2.5 pr-4 text-slate-600">{d.note}</td>
                <td className="py-2.5 text-slate-600">
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline hover:text-indigo-800"
                  >
                    {d.agency}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 space-y-8 max-w-3xl">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            The deadline is counted from the mailing date — not when you read the letter
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Almost every state counts the appeal window from the date the determination was
            mailed (or sent electronically), not the date you received or opened it. If mail
            was slow, you may have less time than you think. A few states add mailing days
            (Alaska adds 3) or extend to the next business day if the deadline lands on a
            weekend — but never plan on it.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            File something short rather than nothing
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            An appeal filed on time with two sentences beats a perfect letter filed a day
            late. Most states let you supplement your appeal before the hearing. If you&apos;re
            close to your deadline: file the appeal through your state&apos;s portal today,
            then prepare your full written statement for the hearing.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Ready to write the appeal?</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Our{" "}
            <Link href="/unemployment-appeal-letter-generator" className="text-indigo-600 underline">
              unemployment appeal letter generator
            </Link>{" "}
            turns your side of the story into a professional, state-specific appeal letter —
            structured the way hearing officers are trained to read. Free preview before any
            payment.
          </p>
        </section>
        <p className="rounded-xl bg-slate-100 p-4 text-xs leading-relaxed text-slate-500">
          Deadlines change. This table was verified against official sources in{" "}
          {DEADLINES_VERIFIED}, but always confirm the deadline printed on your own
          determination letter — that number controls. This page is general information, not
          legal advice.
        </p>
      </div>
    </div>
  );
}
