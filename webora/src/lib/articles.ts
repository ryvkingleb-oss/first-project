import type { Article } from "./catalog";
import { seoArticles as cmsSeedArticles } from "./articles-seo";
import { cmsArticles } from "./articles/cms";
import { dorabotkaArticles } from "./articles/dorabotka";
import { kontentArticles } from "./articles/kontent";
import { seoArticles as seoHubArticles } from "./articles/seo";
import { sozdanieArticles } from "./articles/sozdanie";
import { techArticles } from "./articles/tech";

const fullModules: Article[] = [
  ...sozdanieArticles,
  ...seoHubArticles,
  ...kontentArticles,
  ...techArticles,
  ...dorabotkaArticles,
  ...cmsArticles,
];

const FULL_SLUGS = new Set(fullModules.map((a) => a.slug));

/** Сиды CMS/вёрстки/поддержки, пока нет полных модулей wordpress/verstka/podderzhka. */
const leftoverSeeds = cmsSeedArticles.filter((a) => !FULL_SLUGS.has(a.slug));

export const articles: Article[] = [...fullModules, ...leftoverSeeds];

export function articlePath(article: Pick<Article, "category" | "slug">) {
  return `/blog/${article.category}/${article.slug}`;
}

export function getArticle(category: string, slug: string) {
  return articles.find((a) => a.category === category && a.slug === slug);
}

export function getArticlesByCategory(category: string) {
  return articles
    .filter((a) => a.category === category)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getAllArticles() {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getRelatedArticles(article: Article) {
  return article.related
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter(Boolean) as Article[];
}
