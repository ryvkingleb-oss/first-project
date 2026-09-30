import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleContact } from "@/components/ArticleContact";
import { Breadcrumbs, CtaBlock, Faq, JsonLd } from "@/components/ui";
import {
  articlePath,
  getAllArticles,
  getArticle,
  getRelatedArticles,
} from "@/lib/articles";
import { getCategory } from "@/lib/catalog";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ category: a.category, slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: articlePath(article),
    type: "article",
  });
}

function renderSection(
  section: (typeof import("@/lib/articles").articles)[number]["sections"][number],
  index: number,
) {
  if (section.type === "p") return <p key={index}>{section.text}</p>;
  if (section.type === "h2") return <h2 key={index}>{section.text}</h2>;
  if (section.type === "callout")
    return (
      <aside key={index} className="callout">
        {section.text}
      </aside>
    );
  if (section.type === "ul")
    return (
      <ul key={index}>
        {section.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  return (
    <ol key={index}>
      {section.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();
  const cat = getCategory(article.category);
  if (!cat) notFound();
  const related = getRelatedArticles(article);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Блог", path: "/blog" },
            { name: cat.name, path: `/blog/${cat.slug}` },
            { name: article.h1, path: articlePath(article) },
          ]),
          articleJsonLd({
            title: article.title,
            description: article.description,
            path: articlePath(article),
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
            lead: article.lead,
          }),
          ...(article.faq ? [faqJsonLd(article.faq)] : []),
        ]}
      />
      <article className="section section-tight">
        <Breadcrumbs
          items={[
            { name: "Главная", href: "/" },
            { name: "Блог", href: "/blog" },
            { name: cat.name, href: `/blog/${cat.slug}` },
            { name: article.h1 },
          ]}
        />
        <p className="kicker">{cat.name}</p>
        <h1>{article.h1}</h1>
        <p className="lead">{article.lead}</p>
        <p className="pill-meta" style={{ marginTop: 12 }}>
          <time dateTime={article.publishedAt}>Опубликовано {article.publishedAt}</time>
          <span>Обновлено {article.updatedAt}</span>
          <span>{article.readingMinutes} мин чтения</span>
        </p>

        <ArticleContact source={articlePath(article)} />

        <div className="prose" style={{ marginTop: 28 }}>
          {article.sections.map(renderSection)}
        </div>

        {article.faq && article.faq.length > 0 && (
          <section style={{ marginTop: 36 }}>
            <h2>FAQ</h2>
            <Faq items={article.faq} />
          </section>
        )}

        <ArticleContact source={`${articlePath(article)}#bottom`} />

        <p style={{ marginTop: 28 }}>
          <Link href={`/uslugi/seo-prodvizhenie`}>SEO-продвижение</Link>
          {" · "}
          <Link href={`/uslugi/sozdanie-saitov`}>Создание сайтов</Link>
          {" · "}
          <Link href={`/blog/${cat.slug}`}>Ещё в разделе «{cat.name}»</Link>
        </p>
      </article>

      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <h2>Читайте также</h2>
          </div>
          <div className="article-grid">
            {related.map((item) => (
              <Link key={item.slug} className="article-link" href={articlePath(item)}>
                <span className="meta">{item.readingMinutes} мин</span>
                <h3>{item.h1}</h3>
                <p className="muted">{item.lead}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaBlock />
    </>
  );
}
