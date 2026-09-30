import type { MetadataRoute } from "next";
import { getAllArticles, articlePath } from "@/lib/articles";
import { categories, services } from "@/lib/catalog";
import { absUrl } from "@/lib/seo";

/** Пересборка sitemap при запросе / по ревалидации — свежие lastmod для Яндекс.Вебмастера. */
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    "/",
    "/uslugi",
    "/blog",
    "/ceny",
    "/kontakty",
    "/o-nas",
    "/kejsy",
    "/politika-konfidencialnosti",
  ].map((path) => ({
    url: absUrl(path),
    lastModified: now,
    changeFrequency: path === "/" || path === "/blog" ? ("daily" as const) : ("weekly" as const),
    priority: path === "/" ? 1 : path === "/politika-konfidencialnosti" ? 0.3 : 0.8,
  }));

  const servicePages = services.map((s) => ({
    url: absUrl(`/uslugi/${s.slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
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
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...categoryPages, ...articlePages];
}
