import Link from "next/link";
import { CtaBlock, JsonLd } from "@/components/ui";
import { getAllArticles, articlePath } from "@/lib/articles";
import { categories, services } from "@/lib/catalog";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export default function HomePage() {
  const latest = getAllArticles().slice(0, 6);

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <section className="hero">
        <div className="hero-visual" aria-hidden />
        <div className="hero-content">
          <p className="brand-inline">{site.name}</p>
          <h1>{site.tagline}</h1>
          <p className="lead">
            Создаём, дорабатываем и продвигаем сайты под семантическое ядро — от первой услуги до тысяч статей в блоге.
          </p>
          <div className="btn-row">
            <Link className="btn" href="/kontakty">
              Обсудить задачу
            </Link>
            <Link className="btn btn-ghost" href="/uslugi">
              Смотреть услуги
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="kicker">Услуги</p>
          <h2>Три направления — одна система роста</h2>
          <p className="muted">Разработка, доработка и SEO связаны: структура под спрос, техника и контент.</p>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <Link key={service.slug} className="service-row" href={`/uslugi/${service.slug}`}>
              <h3>{service.name}</h3>
              <p>{service.lead}</p>
              <span className="price">{service.priceFrom}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="kicker">Семантическое ядро</p>
          <h2>Кластеры знаний, а не свалка постов</h2>
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
