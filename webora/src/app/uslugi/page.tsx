import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBlock, JsonLd } from "@/components/ui";
import { cmsServices, coreServices } from "@/lib/catalog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Услуги: создание сайтов, доработка WordPress/PHP/CMS и SEO",
  description:
    "Услуги студии Сигнал: создание сайтов, доработка WordPress, PHP, Битрикс, Tilda, OpenCart и SEO-продвижение.",
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
          {coreServices.map((service) => (
            <Link key={service.slug} className="service-row" href={`/uslugi/${service.slug}`}>
              <h2 style={{ fontSize: "1.45rem" }}>{service.name}</h2>
              <p>{service.lead}</p>
              <span className="price">{service.priceFrom}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" id="cms" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="kicker">CMS</p>
          <h2>Доработка по основным платформам</h2>
          <p className="muted">
            WordPress, PHP, 1С-Битрикс, Tilda, OpenCart — точечные правки и развитие функционала.
          </p>
        </div>
        <div className="service-list">
          {cmsServices.map((service) => (
            <Link key={service.slug} className="service-row" href={`/uslugi/${service.slug}`}>
              <h2 style={{ fontSize: "1.35rem" }}>{service.name}</h2>
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
