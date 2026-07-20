import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.metaDescription, type: "article" },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    description: post.metaDescription,
    author: { "@type": "Organization", name: "AppealKit" },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="text-xs text-slate-400">
        {new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long" })} ·{" "}
        {post.readMinutes} min read
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{post.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-slate-700">{post.intro}</p>

      {post.sections.map((s, i) => (
        <section key={i} className="mt-8">
          {s.h2 && <h2 className="text-xl font-semibold text-slate-900">{s.h2}</h2>}
          {s.paragraphs.map((p, j) => (
            <p key={j} className="mt-4 leading-relaxed text-slate-700">
              {p}
            </p>
          ))}
        </section>
      ))}

      <div className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
        <p className="font-semibold text-indigo-900">Ready to write yours?</p>
        <Link
          href={post.cta.href}
          className="mt-3 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          {post.cta.label}
        </Link>
        <p className="mt-3 text-xs text-indigo-700">
          Also see:{" "}
          <Link href="/unemployment-appeal-deadlines-by-state" className="underline">
            appeal deadlines for all 50 states
          </Link>
        </p>
      </div>

      <p className="mt-8 rounded-xl bg-slate-100 p-4 text-xs leading-relaxed text-slate-500">
        This guide is general information, not legal advice. AppealKit is a document drafting
        tool, not a law firm.
      </p>
    </article>
  );
}
