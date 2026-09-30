import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Robots for Yandex/Google + AI crawlers; sitemap always absolute. */
export default function robots(): MetadataRoute.Robots {
  const host = site.domain;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Явный доступ для поисковых и ИИ-ботов (AEO / ответы ассистентов)
      { userAgent: "Yandex", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
    ],
    sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
    host,
  };
}
