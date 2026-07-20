import type { MetadataRoute } from "next";
import { NICHES } from "@/lib/niches";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...Object.values(NICHES).map((n) => ({
      url: `${base}/${n.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
