import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CtaBlock, JsonLd } from "@/components/ui";
import { getAllArticles, articlePath } from "@/lib/articles";
import { categories, cmsServices, coreServices } from "@/lib/catalog";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const serviceImages: Record<string, { src: string; alt: string }> = {
  "sozdanie-saitov": {
    src: "/images/service-create.jpg",
    alt: "Создание сайта за ноутбуком",
  },
  "dorabotka-saitov": {
    src: "/images/service-refine.jpg",
    alt: "Доработка сайта на мониторах",
  },
  "seo-prodvizhenie": {
    src: "/images/service-seo.jpg",
    alt: "SEO-аналитика и рост трафика",
  },
};

const cmsHubs = [
  { href: "/uslugi/dorabotka-wordpress", name: "WordPress", text: "Темы, плагины, WooCommerce, скорость" },
  { href: "/uslugi/dorabotka-php", name: "PHP", text: "Самопис, Laravel, API и интеграции" },
  { href: "/uslugi/dorabotka-1c-bitrix", name: "1С-Битрикс", text: "Компоненты, каталог, обмен с 1С" },
  { href: "/uslugi/dorabotka-tilda", name: "Tilda", text: "Zero Block, формы, CRM" },
  { href: "/uslugi/dorabotka-opencart", name: "OpenCart", text: "Модули, checkout, оплаты" },
  { href: "/blog/cms", name: "Joomla / Drupal / MODX", text: "Точечная доработка и переносы" },
];

export default function HomePage() {
  const latest = getAllArticles().slice(0, 6);

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <Hero />

      <section className="section">
        <div className="section-head">
          <p className="kicker">Услуги</p>
          <h2>Три направления — одна система роста</h2>
          <p className="muted">Разработка, доработка и SEO связаны: структура под спрос, техника и контент.</p>
        </div>
        <div className="service-list">
          {coreServices.map((service) => {
            const img = serviceImages[service.slug];
            return (
              <Link key={service.slug} className="service-row" href={`/uslugi/${service.slug}`}>
                <span className="service-thumb">
                  <Image src={img.src} alt={img.alt} width={220} height={165} sizes="140px" />
                </span>
                <span className="service-copy">
                  <h3>{service.name}</h3>
                  <p>{service.lead}</p>
                </span>
                <span className="price">{service.priceFrom}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="kicker">Доработка по CMS</p>
          <h2>WordPress, PHP и основные платформы</h2>
          <p className="muted">
            Дорабатываем сайты на популярных CMS — от точечной правки до нового функционала и интеграций.
          </p>
        </div>
        <div className="article-grid">
          {cmsHubs.map((item) => (
            <Link key={item.href} className="article-link" href={item.href}>
              <span className="meta">CMS</span>
              <h3>{item.name}</h3>
              <p className="muted">{item.text}</p>
            </Link>
          ))}
        </div>
        <div className="btn-row">
          <Link className="btn btn-ghost" href="/uslugi#cms">
            Все CMS-услуги
          </Link>
          <Link className="btn btn-ghost" href={`/uslugi/${cmsServices[0]?.slug ?? "dorabotka-wordpress"}`}>
            Доработка WordPress
          </Link>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="kicker">Семантическое ядро</p>
          <h2>Сигналы знаний, а не свалка постов</h2>
          <p className="muted">Блог делится на хабы — каждый кластер усиливает услуги и соседние статьи.</p>
        </div>
        <div className="article-grid">
          {categories.map((cat) => (
            <Link key={cat.slug} className="article-link" href={`/blog/${cat.slug}`}>
              <span className="meta">Категория</span>
              <h3>{cat.name}</h3>
              <p className="muted">{cat.lead}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="kicker">Блог</p>
          <h2>Свежие материалы</h2>
          <p className="muted">Архитектура готова к масштабу: категории, ЧПУ, sitemap и шаблоны статей.</p>
        </div>
        <div className="article-grid">
          {latest.map((article) => (
            <Link key={article.slug} className="article-link" href={articlePath(article)}>
              <span className="meta">
                {categories.find((c) => c.slug === article.category)?.name} · {article.readingMinutes} мин
              </span>
              <h3>{article.h1}</h3>
              <p className="muted">{article.lead}</p>
            </Link>
          ))}
        </div>
        <div className="btn-row">
          <Link className="btn btn-ghost" href="/blog">
            Весь блог
          </Link>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
