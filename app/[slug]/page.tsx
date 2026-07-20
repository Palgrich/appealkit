import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NICHES, getNicheBySlug } from "@/lib/niches";
import LetterLanding from "@/components/LetterLanding";

export function generateStaticParams() {
  return Object.values(NICHES).map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const niche = getNicheBySlug(slug);
  if (!niche) return {};
  return {
    title: niche.metaTitle,
    description: niche.metaDescription,
    alternates: { canonical: `/${niche.slug}` },
    openGraph: {
      title: niche.metaTitle,
      description: niche.metaDescription,
      type: "website",
    },
  };
}

export default async function NichePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const niche = getNicheBySlug(slug);
  if (!niche) notFound();
  return <LetterLanding niche={niche} />;
}
