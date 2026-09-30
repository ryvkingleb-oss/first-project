import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBlock, JsonLd } from "@/components/ui";
import { services } from "@/lib/catalog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Услуги: создание сайтов, доработка и SEO",
  description:
    "Услуги студии Вебора: создание сайтов под ключ, доработка существующих проектов и SEO-продвижение под семантическое ядро.",
  path: "/uslugi",
});

export default function ServicesPage() {
  const crumbs = [
    { name: "Главная", href: "/" },
    { name: "Услуги" },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Услуги", path: "/uslugi" },
        ])}
      />
      <section className="section section-tight">
        <Breadcrumbs items={crumbs} />
        <p className="kicker">Услуги</p>
        <h1>Создание, доработка и SEO</h1>
        <p className="lead">
          Выберите задачу. Каждая услуга связана с хабами блога — так семантика и коммерция работают вместе.
        </p>
        <div className="service-list" style={{ marginTop: 28 }}>
          {services.map((service) => (
            <Link key={service.slug} className="service-row" href={`/uslugi/${service.slug}`}>
              <h2 style={{ fontSize: "1.45rem" }}>{service.name}</h2>
              <p>{service.lead}</p>
              <span className="price">{service.priceFrom}</span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
