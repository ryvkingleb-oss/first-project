import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBlock, Faq, JsonLd } from "@/components/ui";
import { getArticlesByCategory, articlePath } from "@/lib/articles";
import { getService, services } from "@/lib/catalog";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/uslugi/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedArticles = service.relatedCategories
    .flatMap((cat) => getArticlesByCategory(cat))
    .slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Услуги", path: "/uslugi" },
            { name: service.name, path: `/uslugi/${service.slug}` },
          ]),
          serviceJsonLd({
            name: service.name,
            description: service.description,
            path: `/uslugi/${service.slug}`,
          }),
          faqJsonLd(service.faq),
        ]}
      />
      <section className="section section-tight">
        <Breadcrumbs
          items={[
            { name: "Главная", href: "/" },
            { name: "Услуги", href: "/uslugi" },
            { name: service.name },
          ]}
        />
        <p className="kicker">Услуга</p>
        <h1>{service.h1}</h1>
        <p className="lead">{service.lead}</p>
        <p className="pill-meta" style={{ marginTop: 14 }}>
          <span>{service.priceFrom}</span>
        </p>
        <div className="btn-row">
          <Link className="btn" href="/kontakty">
            Получить план работ
          </Link>
          <Link className="btn btn-ghost" href="/ceny">
            Все цены
          </Link>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Что получите</h2>
        </div>
        <ul className="hub-links" style={{ maxWidth: "40rem" }}>
          {service.outcomes.map((item) => (
            <li key={item} style={{ listStyle: "none" }}>
              <span style={{ display: "block", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Как работаем</h2>
        </div>
        <div className="steps">
          {service.steps.map((step) => (
            <div className="step" key={step.title}>
              <div>
                <h3>{step.title}</h3>
                <p className="muted" style={{ marginTop: 6 }}>
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Частые вопросы</h2>
        </div>
        <Faq items={service.faq} />
      </section>

      {relatedArticles.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <h2>Материалы по теме</h2>
          </div>
          <div className="article-grid">
            {relatedArticles.map((article) => (
              <Link key={article.slug} className="article-link" href={articlePath(article)}>
                <span className="meta">{article.readingMinutes} мин чтения</span>
                <h3>{article.h1}</h3>
                <p className="muted">{article.lead}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaBlock title={`Обсудим ${service.name.toLowerCase()}`} />
    </>
  );
}
