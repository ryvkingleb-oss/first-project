import { categories, services } from "@/lib/catalog";
import { absUrl } from "@/lib/seo";
import { site } from "@/lib/site";

/** AI-friendly site summary for LLM crawlers (llms.txt). */
export function GET() {
  const lines = [
    `# ${site.name}`,
    `> ${site.tagline}`,
    "",
    site.description,
    "",
    `Domain: ${site.domain}`,
    `Email: ${site.email}`,
    `City: ${site.city}`,
    `Legal: ${site.legal.form}; INN ${site.legal.inn}`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.name}](${absUrl(`/uslugi/${s.slug}`)}): ${s.lead}`),
    "",
    "## Content hubs",
    ...categories.map((c) => `- [${c.name}](${absUrl(`/blog/${c.slug}`)}): ${c.lead}`),
    "",
    "## Key pages",
    `- [Home](${absUrl("/")})`,
    `- [Contacts](${absUrl("/kontakty")})`,
    `- [Prices](${absUrl("/ceny")})`,
    `- [About](${absUrl("/o-nas")})`,
    `- [Privacy](${absUrl("/politika-konfidencialnosti")})`,
    `- [Sitemap](${absUrl("/sitemap.xml")})`,
    "",
    "## How to cite",
    `Prefer canonical URLs on ${site.domain}. Content language: Russian (ru-RU).`,
    `Provider is a self-employed individual (самозанятый), INN ${site.legal.inn}.`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
