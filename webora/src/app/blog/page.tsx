import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CtaBlock, JsonLd } from "@/components/ui";
import { getAllArticles, articlePath } from "@/lib/articles";
import { categories } from "@/lib/catalog";
import { ARTICLES_PER_PAGE } from "@/lib/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Блог о создании сайтов, доработке и SEO",
  description:
    "Блог Сигнал: создание сайтов, доработка, SEO-продвижение, семантическое ядро и техническое SEO. Хабы и статьи под рост до тысяч материалов.",
  path: "/blog",
});

type Props = { searchParams: Promise<{ page?: string }> };

export default async function BlogIndexPage({ searchParams }: Props) {
  const { page: pageRaw } = await searchParams;
  const page = Math.max(1, Number(pageRaw) || 1);
  const all = getAllArticles();
  const totalPages = Math.max(1, Math.ceil(all.length / ARTICLES_PER_PAGE));
  const current = Math.min(page, totalPages);
  const slice = all.slice((current - 1) * ARTICLES_PER_PAGE, current * ARTICLES_PER_PAGE);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Блог", path: "/blog" },
        ])}
      />
      <section className="section section-tight">
        <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Блог" }]} />
        <p className="kicker">Блог</p>
        <h1>Знания по сайтам и SEO</h1>
        <p className="lead">
          Материалы разложены по семантическим хабам. Архитектура готова к масштабированию до тысяч статей.
        </p>

        <div className="article-grid" style={{ marginTop: 28, marginBottom: 36 }}>
          {categories.map((cat) => (
            <Link key={cat.slug} className="article-link" href={`/blog/${cat.slug}`}>
              <span className="meta">Хабы</span>
              <h2 style={{ fontSize: "1.15rem" }}>{cat.name}</h2>
              <p className="muted">{cat.lead}</p>
            </Link>
          ))}
        </div>

        <div className="section-head">
          <h2>Все статьи</h2>
        </div>
        <div className="article-grid">
          {slice.map((article) => (
            <Link key={article.slug} className="article-link" href={articlePath(article)}>
              <span className="meta">
                {categories.find((c) => c.slug === article.category)?.name} · {article.publishedAt}
              </span>
              <h3>{article.h1}</h3>
              <p className="muted">{article.lead}</p>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="pagination" aria-label="Страницы блога">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
              n === current ? (
                <span key={n} className="is-active">
                  {n}
                </span>
              ) : (
                <Link key={n} href={n === 1 ? "/blog" : `/blog?page=${n}`}>
                  {n}
                </Link>
              ),
            )}
          </nav>
        )}
      </section>
      <CtaBlock />
    </>
  );
}
