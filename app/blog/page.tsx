import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Guides — appeals, rebuttals, and how to win them",
  description:
    "Practical guides to unemployment appeals, PIP responses, and academic dismissal appeals — what decision-makers look for and how to prepare.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Guides</h1>
      <p className="mt-3 text-slate-600">
        What hearing officers, HR departments, and appeal committees actually look for.
      </p>
      <div className="mt-8 space-y-6">
        {POSTS.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-900">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.metaDescription}</p>
            <p className="mt-3 text-xs text-slate-400">{p.readMinutes} min read</p>
          </Link>
        ))}
        <Link
          href="/unemployment-appeal-deadlines-by-state"
          className="block rounded-2xl border border-indigo-200 bg-indigo-50 p-6 transition hover:border-indigo-300"
        >
          <h2 className="text-lg font-semibold text-indigo-900">
            Unemployment Appeal Deadlines by State — verified table
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-indigo-800">
            All 50 states + DC, verified against official sources, with recent law changes
            most sites still get wrong.
          </p>
        </Link>
      </div>
    </div>
  );
}
