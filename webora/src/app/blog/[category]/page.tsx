import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, CtaBlock, JsonLd } from "@/components/ui";
import { articlePath, getArticlesByCategory } from "@/lib/articles";
import { categories, getCategory } from "@/lib/catalog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return buildMetadata({
    title: cat.title,
    description: cat.description,
    path: `/blog/${cat.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const list = getArticlesByCategory(cat.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Блог", path: "/blog" },
          { name: cat.name, path: `/blog/${cat.slug}` },
        ])}
      />
      <section className="section section-tight">
        <Breadcrumbs
          items={[
            { name: "Главная", href: "/" },
            { name: "Блог", href: "/blog" },
            { name: cat.name },
          ]}
        />
        <p className="kicker">Категория</p>
        <h1>{cat.h1}</h1>
        <p className="lead">{cat.lead}</p>
        <p className="muted" style={{ marginTop: 10 }}>
          Ключевые запросы кластера: {cat.keywords.join(", ")}.
        </p>

        <div className="article-grid" style={{ marginTop: 32 }}>
          {list.map((article) => (
            <Link key={article.slug} className="article-link" href={articlePath(article)}>
              <span className="meta">
                {article.publishedAt} · {article.readingMinutes} мин
              </span>
              <h2 style={{ fontSize: "1.15rem" }}>{article.h1}</h2>
              <p className="muted">{article.lead}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBlock />
    </>
  );
}
