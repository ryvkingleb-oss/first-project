import type { Article } from "./catalog";
import { seoArticles as cmsSeedArticles } from "./articles-seo";
import { kontentArticles } from "./articles/kontent";
import { seoArticles as seoHubArticles } from "./articles/seo";
import { sozdanieArticles } from "./articles/sozdanie";

/** Остаточные короткие статьи — заменяются по мере готовности полных модулей. */
const pendingArticles: Article[] = [
  {
    slug: "dorabotka-ili-novyj-sajt",
    category: "dorabotka",
    title: "Доработка сайта или новый с нуля: как решить",
    description:
      "Когда выгоднее доработать текущий сайт, а когда заказать новый: индекс, долг по коду, дизайн и SEO-риски.",
    h1: "Доработка или новый сайт",
    lead: "Решение по четырём осям: индекс, код, дизайн, бизнес-цели. Не по вкусу «надоел цвет».",
    keywords: ["доработка сайта", "редизайн сайта", "новый сайт или доработка"],
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-30",
    readingMinutes: 8,
    related: ["kak-uskorit-sajt", "redizajn-bez-poteri-pozicij", "skolko-stoit-sozdanie-sajta"],
    sections: [
      {
        type: "p",
        text: "Если сайт уже в индексе, собирает трафик и код не развален — чаще выигрывает доработка: новые шаблоны, скорость, формы, разделы. Новый сайт оправдан при мёртвой платформе, токсичном коде или смене бизнес-модели.",
      },
      { type: "h2", text: "Оставляем и дорабатываем, если" },
      {
        type: "ul",
        items: [
          "Есть полезный трафик и позиции",
          "URL-структура в целом здравая",
          "CMS позволяет добавить хабы и статьи",
          "Проблемы точечные: скорость, UX, контент",
        ],
      },
      { type: "h2", text: "Делаем новый, если" },
      {
        type: "ul",
        items: [
          "Платформа не тянет тысячи страниц",
          "Нет доступа к коду или подрядчик-заложник",
          "Дублей и технического долга больше, чем смысла чинить",
          "Меняется оффер и дерево услуг целиком",
        ],
      },
    ],
  },
  {
    slug: "kak-uskorit-sajt",
    category: "dorabotka",
    title: "Как ускорить сайт: практический порядок работ",
    description:
      "Практический порядок ускорения сайта: LCP, изображения, JS, кеш, шрифты и сервер. Что делать первым.",
    h1: "Как ускорить сайт",
    lead: "Скорость — и UX, и техническое SEO. Чинить нужно по измерениям, а не «по ощущениям».",
    keywords: ["ускорение сайта", "core web vitals", "как ускорить сайт"],
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-30",
    readingMinutes: 8,
    related: ["core-web-vitals-dlya-biznesa", "dorabotka-ili-novyj-sajt", "tehnicheskoe-seo-chek-list"],
    sections: [
      {
        type: "p",
        text: "Начните с полевых данных (CrUX / Метрика) и лабораторных (Lighthouse, WebPageTest). Иначе оптимизируете то, что не болит.",
      },
      { type: "h2", text: "Порядок, который обычно даёт эффект" },
      {
        type: "ol",
        items: [
          "Сжать и правильно разметить LCP-изображение",
          "Убрать блокирующие скрипты с первого экрана",
          "Подключить современные форматы изображений и srcset",
          "Настроить кеш и сжатие на сервере",
          "Сократить шрифты и использовать font-display: swap",
        ],
      },
    ],
  },
  {
    slug: "redizajn-bez-poteri-pozicij",
    category: "dorabotka",
    title: "Редизайн сайта без потери позиций",
    description:
      "Как сделать редизайн сайта без проседания SEO: сохранение URL, редиректы, шаблоны и контроль индекса.",
    h1: "Редизайн без потери позиций",
    lead: "Редизайн опасен не новым цветом, а сменой URL и пропаданием контентных блоков.",
    keywords: ["редизайн сайта", "редизайн seo", "переезд сайта"],
    publishedAt: "2026-09-17",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: ["dorabotka-ili-novyj-sajt", "tehnicheskoe-seo-chek-list", "vnutrennyaya-perelinkovka"],
    sections: [
      {
        type: "p",
        text: "Перед редизайном снимите карту индексных URL, топ-страницы по трафику и шаблоны title/H1. После выкладки сравните покрытие индекса и коды ответа.",
      },
      { type: "h2", text: "Жёсткие правила" },
      {
        type: "ul",
        items: [
          "Не меняйте ЧПУ без 301 и обновления внутренних ссылок",
          "Сохраняйте смысл H1 и ключевые текстовые блоки",
          "Перенесите schema, canonical, hreflang если были",
          "Обновите sitemap в день релиза",
        ],
      },
    ],
  },
  {
    slug: "tehnicheskoe-seo-chek-list",
    category: "tehnicheskoe-seo",
    title: "Техническое SEO: чек-лист перед масштабированием контента",
    description:
      "Чек-лист технического SEO перед ростом контента: индекс, дубли, скорость, sitemap, schema и пагинация.",
    h1: "Техническое SEO: чек-лист",
    lead: "Пока техника хромает, тысячи статей только ускоряют хаос в индексе.",
    keywords: ["техническое seo", "чек лист seo", "индексация сайта"],
    publishedAt: "2026-09-13",
    updatedAt: "2026-09-30",
    readingMinutes: 8,
    related: ["core-web-vitals-dlya-biznesa", "kak-uskorit-sajt", "sitemap-dlya-bolshogo-sajta"],
    sections: [
      { type: "h2", text: "Минимум перед контент-заводом" },
      {
        type: "ul",
        items: [
          "ЧПУ без мусорных параметров в индексе",
          "Каноникалы на шаблонах",
          "Корректные 404/301",
          "XML sitemap и sitemap index при росте URL",
          "robots без случайных Disallow важных разделов",
          "SSR/SSG для HTML с title и текстом в первом ответе",
        ],
      },
    ],
  },
  {
    slug: "core-web-vitals-dlya-biznesa",
    category: "tehnicheskoe-seo",
    title: "Core Web Vitals для бизнеса: что чинить в первую очередь",
    description:
      "Какие Core Web Vitals важны для бизнеса и что обычно чинят первым: LCP, INP, CLS на шаблонах сайта.",
    h1: "Core Web Vitals для бизнеса",
    lead: "Метрики нужны не ради баллов, а ради скорости первого экрана и стабильности интерфейса.",
    keywords: ["core web vitals", "lcp", "inp", "cls"],
    publishedAt: "2026-09-12",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: ["kak-uskorit-sajt", "tehnicheskoe-seo-chek-list"],
    sections: [
      {
        type: "p",
        text: "LCP — скорость главного содержимого. INP — отзывчивость на действия. CLS — прыжки вёрстки. Для коммерческих страниц чаще всего боль в LCP из-за тяжёлого героя и шрифтов.",
      },
      {
        type: "ul",
        items: [
          "Заранее задавайте размеры медиа",
          "Не вставляйте баннеры над контентом без резерва места",
          "Откладывайте тяжёлые виджеты до взаимодействия",
        ],
      },
    ],
  },
  {
    slug: "sitemap-dlya-bolshogo-sajta",
    category: "tehnicheskoe-seo",
    title: "Sitemap для большого сайта: индекс и лимиты",
    description:
      "Как устроить sitemap для сайта на тысячи URL: лимиты, sitemap index, lastmod и приоритет разделов.",
    h1: "Sitemap для большого сайта",
    lead: "Один файл на всё — нормально до роста. Дальше нужен индекс карт.",
    keywords: ["sitemap", "sitemap index", "карта сайта xml"],
    publishedAt: "2026-09-11",
    updatedAt: "2026-09-30",
    readingMinutes: 6,
    related: ["tehnicheskoe-seo-chek-list", "kontent-plan-na-1000-statej"],
    sections: [
      {
        type: "p",
        text: "Лимит одного sitemap — до 50 000 URL и 50 МБ несжатых. При тысячах статей делите карты по типам: услуги, категории, статьи. В Сигнале заложена генерация через Next.js sitemap API.",
      },
    ],
  },
];

const FULL_SLUGS = new Set(
  [...sozdanieArticles, ...seoHubArticles, ...kontentArticles].map((a) => a.slug),
);

/** CMS/прочие сиды без дублей уже переписанных полных статей. */
const cmsArticles = cmsSeedArticles.filter((a) => !FULL_SLUGS.has(a.slug));

export const articles: Article[] = [
  ...sozdanieArticles,
  ...seoHubArticles,
  ...kontentArticles,
  ...pendingArticles.filter((a) => !FULL_SLUGS.has(a.slug)),
  ...cmsArticles,
];

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
