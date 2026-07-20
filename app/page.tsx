import Link from "next/link";
import { NICHES } from "@/lib/niches";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          The right letter, when it matters most.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Denied benefits. Put on a PIP. Dismissed from school. In each case you have days to
          respond in writing — and the quality of that letter matters. AppealKit turns your
          side of the story into a professional, ready-to-send letter in minutes.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {Object.values(NICHES).map((n) => (
          <Link
            key={n.id}
            href={`/${n.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
          >
            <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700">
              {n.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{n.metaDescription}</p>
            <p className="mt-4 text-sm font-semibold text-indigo-600">
              Free preview → {n.priceLabel} full letter
            </p>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-3xl text-center text-sm text-slate-500">
        <p>
          Free preview before any payment · One-time price, no subscription · Instant PDF and
          Word downloads · Payments secured by Stripe
        </p>
      </div>
    </div>
  );
}
