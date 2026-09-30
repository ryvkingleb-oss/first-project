import Image from "next/image";
import Link from "next/link";
import { CtaBlock, JsonLd } from "@/components/ui";
import { getAllArticles, articlePath } from "@/lib/articles";
import { categories, services } from "@/lib/catalog";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

const serviceVisuals: Record<
  string,
  { src: string; alt: string; points: string[] }
> = {
  "sozdanie-saitov": {
    src: "/images/service-create.jpg",
    alt: "Разработка сайта на ноутбуке: от макета к готовой странице",
    points: [
      "Прототип и карта URL под семантику",
      "Дизайн, вёрстка, CMS и формы",
      "Базовое SEO на старте",
    ],
  },
  "dorabotka-saitov": {
    src: "/images/service-refine.jpg",
    alt: "Доработка сайта: сравнение старой и новой версии на мониторах",
    points: [
      "Скорость, формы, мобильная версия",
      "Редизайн без поломки индекса",
      "Новые разделы и шаблоны",
    ],
  },
  "seo-prodvizhenie": {
    src: "/images/service-seo.jpg",
    alt: "SEO-продвижение: аналитика, семантика и рост трафика",
    points: [
      "Семантическое ядро и кластеры",
      "Хабы, статьи, перелинковка",
      "Техничка и рост заявок",
    ],
  },
};

const processSteps = [
  {
    n: "01",
    title: "Бриф и ядро",
    text: "Цели, оффер, черновая семантика — понимаем, какие страницы реально нужны.",
  },
  {
    n: "02",
    title: "Структура",
    text: "Карта URL: услуги, хабы, статьи. Чтобы потом масштабировать без переделки.",
  },
  {
    n: "03",
    title: "Сборка",
    text: "Дизайн, код, контентные шаблоны, формы и аналитика.",
  },
  {
    n: "04",
    title: "Рост",
    text: "Индекс, доработки, контент-план — от первых страниц до тысяч статей.",
  },
];

export default function HomePage() {
  const latest = getAllArticles().slice(0, 6);

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

      <section className="hero">
        <Image
          className="hero-photo"
          src="/images/hero.jpg"
          alt="Рабочее место студии Вебора: монитор с сайтом и аналитикой SEO"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-scrim" aria-hidden />
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
          <h2>Что делаем — наглядно</h2>
          <p className="muted">
            Три направления одной системы: сайт → доработка → поиск. У каждого — свой результат и цена от.
          </p>
        </div>

        <div className="service-showcase">
          {services.map((service, index) => {
            const visual = serviceVisuals[service.slug];
            return (
              <article
                key={service.slug}
                className={`service-showcase-item${index % 2 === 1 ? " is-flip" : ""}`}
              >
                <Link href={`/uslugi/${service.slug}`} className="service-showcase-media">
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    width={960}
                    height={720}
                    sizes="(max-width: 900px) 100vw, 52vw"
                  />
                </Link>
                <div className="service-showcase-body">
                  <p className="kicker">{service.priceFrom}</p>
                  <h3>{service.name}</h3>
                  <p className="muted">{service.lead}</p>
                  <ul className="service-points">
                    {visual.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="btn-row">
                    <Link className="btn" href={`/uslugi/${service.slug}`}>
                      Подробнее
                    </Link>
                    <Link className="btn btn-ghost" href="/kontakty">
                      Заявка
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section process-section">
        <div className="section-head">
          <p className="kicker">Как работаем</p>
          <h2>От брифа до роста в поиске</h2>
          <p className="muted">Понятный порядок — чтобы не платить дважды за переделку структуры.</p>
        </div>
        <ol className="process-grid">
          {processSteps.map((step) => (
            <li key={step.n}>
              <span className="process-n">{step.n}</span>
              <h3>{step.title}</h3>
              <p className="muted">{step.text}</p>
            </li>
          ))}
        </ol>
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
