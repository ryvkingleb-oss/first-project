import type { Metadata } from "next";
import { site } from "./site";

export function absUrl(path = "/") {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absUrl(path);
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    other: {
      ...(site.yandexVerification
        ? { "yandex-verification": site.yandexVerification }
        : {}),
    },
  };
}

/** Самозанятый как Person + ProfessionalService — для Яндекса и ИИ-ответов. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    name: site.name,
    alternateName: "Cignal Pro",
    url: site.url,
    email: site.email,
    description: site.description,
    sameAs: [...site.sameAs],
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "RU",
    },
    areaServed: {
      "@type": "Country",
      name: "Russia",
    },
    taxID: site.legal.inn,
    identifier: {
      "@type": "PropertyValue",
      name: "ИНН",
      value: site.legal.inn,
    },
    knowsAbout: [
      "создание сайтов",
      "доработка сайтов",
      "SEO-продвижение",
      "WordPress",
      "техническое SEO",
      "семантическое ядро",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: site.email,
      availableLanguage: ["Russian"],
      areaServed: "RU",
      url: absUrl("/kontakty"),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: "cignalpro.ru",
    url: site.url,
    inLanguage: "ru-RU",
    publisher: {
      "@type": "Person",
      name: site.name,
      email: site.email,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absUrl("/blog")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absUrl(item.path) } : {}),
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
  lead?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt,
    mainEntityOfPage: absUrl(input.path),
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
      email: site.email,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    inLanguage: "ru-RU",
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".lead", "article h1", ".prose h2"],
    },
    about: input.lead ?? input.description,
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    provider: {
      "@type": "Person",
      name: site.name,
      email: site.email,
      taxID: site.legal.inn,
      url: site.url,
    },
    areaServed: [
      { "@type": "City", name: site.city },
      { "@type": "Country", name: "Russia" },
    ],
    url: absUrl(input.path),
  };
}
