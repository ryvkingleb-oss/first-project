import type { MetadataRoute } from "next";
import { getAllArticles, articlePath } from "@/lib/articles";
import { categories, services } from "@/lib/catalog";
import { absUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["/", "/uslugi", "/blog", "/ceny", "/kontakty", "/o-nas", "/kejsy"].map(
    (path) => ({
      url: absUrl(path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    }),
  );

  const servicePages = services.map((s) => ({
    url: absUrl(`/uslugi/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const categoryPages = categories.map((c) => ({
    url: absUrl(`/blog/${c.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articlePages = getAllArticles().map((a) => ({
    url: absUrl(articlePath(a)),
    lastModified: new Date(a.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...categoryPages, ...articlePages];
}
