import type { MetadataRoute } from "next";
import { NICHES } from "@/lib/niches";
import { POSTS } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...Object.values(NICHES).map((n) => ({
      url: `${base}/${n.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${base}/unemployment-appeal-deadlines-by-state`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    { url: `${base}/blog`, changeFrequency: "weekly" as const, priority: 0.6 },
    ...POSTS.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
