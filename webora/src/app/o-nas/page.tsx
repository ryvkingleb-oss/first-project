import type { Metadata } from "next";
import { Breadcrumbs, CtaBlock, JsonLd } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "О студии Вебора",
  description:
    "Вебора — студия создания сайтов, доработки и SEO-продвижения. Делаем структуру под семантическое ядро и контент на рост.",
  path: "/o-nas",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "О студии", path: "/o-nas" },
        ])}
      />
      <section className="section section-tight">
        <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "О студии" }]} />
        <p className="kicker">О студии</p>
        <h1>{site.name}</h1>
        <div className="prose" style={{ marginTop: 18 }}>
          <p>
            Мы собираем сайты как систему роста: коммерческие страницы, хабы и статьи под семантическое ядро. Дизайн
            должен помогать заявке, а техника — индексу.
          </p>
          <p>
            Подход одинаков и для нового проекта, и для доработки: сначала смысл и структура, потом визуал и код. Так
            дешевле масштабировать контент до сотен и тысяч материалов.
          </p>
          <h2>Принципы</h2>
          <ul>
            <li>Один кластер — один основной URL</li>
            <li>HTML с мета и текстом в первом ответе сервера</li>
            <li>Перелинковка услуга ↔ хаб ↔ статья</li>
            <li>Измеряем заявки, а не только позиции</li>
          </ul>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
