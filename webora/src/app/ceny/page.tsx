import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBlock, JsonLd } from "@/components/ui";
import { cmsServices, coreServices } from "@/lib/catalog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Цены на создание сайтов, доработку CMS и SEO",
  description:
    "Ориентиры цен Сигнал: создание сайтов, доработка WordPress/PHP/Битрикс/Tilda/OpenCart и SEO. Точная смета — после брифа.",
  path: "/ceny",
});

export default function PricesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Цены", path: "/ceny" },
        ])}
      />
      <section className="section section-tight">
        <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Цены" }]} />
        <p className="kicker">Цены</p>
        <h1>Прозрачные ориентиры</h1>
        <p className="lead">
          Финальная смета зависит от шаблонов, интеграций и объёма семантики. Ниже — стартовые вилки.
        </p>
        <div className="price-table" style={{ marginTop: 28 }}>
          {coreServices.map((service) => (
            <div className="price-row" key={service.slug}>
              <div>
                <h2 style={{ fontSize: "1.25rem" }}>{service.name}</h2>
                <p className="muted" style={{ marginTop: 6 }}>
                  {service.lead}
                </p>
              </div>
              <p className="price" style={{ fontWeight: 600, color: "var(--primary)" }}>
                {service.priceFrom}
              </p>
              <Link className="btn btn-ghost" href={`/uslugi/${service.slug}`}>
                Подробнее
              </Link>
            </div>
          ))}
        </div>

        <div className="section-head" style={{ marginTop: 48 }}>
          <p className="kicker">CMS</p>
          <h2>Доработка по платформам</h2>
          <p className="muted">Точечные правки стартуют от 3 000 ₽. Битрикс и сложный функционал — после аудита.</p>
        </div>
        <div className="price-table">
          {cmsServices.map((service) => (
            <div className="price-row" key={service.slug}>
              <div>
                <h2 style={{ fontSize: "1.25rem" }}>{service.name}</h2>
                <p className="muted" style={{ marginTop: 6 }}>
                  {service.lead}
                </p>
              </div>
              <p className="price" style={{ fontWeight: 600, color: "var(--primary)" }}>
                {service.priceFrom}
              </p>
              <Link className="btn btn-ghost" href={`/uslugi/${service.slug}`}>
                Подробнее
              </Link>
            </div>
          ))}
        </div>
      </section>
      <CtaBlock title="Нужна смета под вашу задачу?" text="Напишите коротко цель и текущее состояние сайта — вернём ориентир по срокам и бюджету." />
    </>
  );
}
