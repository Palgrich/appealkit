import type { Niche } from "@/lib/niches";
import Wizard from "./Wizard";

export default function LetterLanding({ niche }: { niche: Niche }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: niche.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {niche.h1}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{niche.heroSub}</p>
        <ul className="mx-auto mt-6 inline-block space-y-2 text-left text-[15px] text-slate-700">
          {niche.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-indigo-600">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Wizard */}
      <div className="mx-auto mt-10 max-w-2xl">
        <Wizard niche={niche} />
      </div>

      {/* SEO body */}
      <div className="mx-auto mt-16 max-w-3xl space-y-10">
        {niche.seoBody.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-semibold text-slate-900">{s.heading}</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{s.text}</p>
          </section>
        ))}

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-slate-200">
            {niche.faq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="cursor-pointer list-none font-medium text-slate-800">
                  {item.q}
                </summary>
                <p className="mt-2 leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="rounded-xl bg-slate-100 p-4 text-xs leading-relaxed text-slate-500">
          AppealKit is a document drafting tool, not a law firm, and does not provide legal
          advice. No attorney-client relationship is created by using this site. For legal
          advice about your specific situation, consult a licensed attorney in your state.
        </p>
      </div>
    </div>
  );
}
