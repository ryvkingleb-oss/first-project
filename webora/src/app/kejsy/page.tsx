import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBlock, JsonLd } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Кейсы Вебора — сайты и SEO",
  description: "Примеры задач: запуск сайта под ключ, доработка и SEO-структура под семантическое ядро.",
  path: "/kejsy",
});

const cases = [
  {
    title: "Корпоративный сайт услуг с SEO-хабами",
    text: "Карта URL по семантике, шаблоны услуг и блог. Старт индекса без каши из дублей.",
  },
  {
    title: "Доработка магазина: скорость и формы",
    text: "Ужали LCP, починили мобильную корзину и цели в аналитике — без смены платформы.",
  },
  {
    title: "Контент-конвейер под рост статей",
    text: "Категории-хабы, ТЗ, перелинковка и sitemap index — база под масштабирование.",
  },
];

export default function CasesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Кейсы", path: "/kejsy" },
        ])}
      />
      <section className="section section-tight">
        <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Кейсы" }]} />
        <p className="kicker">Кейсы</p>
        <h1>Как решаем задачи</h1>
        <p className="lead">Короткие форматы работ. Развёрнутые цифры добавим по мере публикации клиентских историй.</p>
        <div className="article-grid" style={{ marginTop: 28 }}>
          {cases.map((item) => (
            <div key={item.title} className="article-link" style={{ cursor: "default" }}>
              <span className="meta">Формат</span>
              <h2 style={{ fontSize: "1.15rem" }}>{item.title}</h2>
              <p className="muted">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="btn-row">
          <Link className="btn btn-ghost" href="/uslugi">
            К услугам
          </Link>
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
