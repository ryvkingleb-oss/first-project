import type { Article } from "./catalog";
import { seoArticles } from "./articles-seo";
import { sozdanieArticles } from "./articles/sozdanie";

/** Seed articles — expand via `npm run generate:articles` from semantic seeds. */
const baseArticles: Article[] = [
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
    related: [
      "kak-uskorit-sajt",
      "redizajn-bez-poteri-pozicij",
      "skolko-stoit-sozdanie-sajta",
    ],
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
    related: [
      "core-web-vitals-dlya-biznesa",
      "dorabotka-ili-novyj-sajt",
      "tehnicheskoe-seo-chek-list",
    ],
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
    related: [
      "dorabotka-ili-novyj-sajt",
      "tehnicheskoe-seo-chek-list",
      "vnutrennyaya-perelinkovka",
    ],
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
    slug: "seo-prodvizhenie-s-nulya",
    category: "seo",
    title: "SEO-продвижение сайта с нуля: с чего начать",
    description:
      "Пошаговый старт SEO-продвижения: семантика, техника, структура, контент и измерение заявок.",
    h1: "SEO-продвижение с нуля",
    lead: "Не начинайте с «написать 100 статей». Сначала ядро, техника и каркас URL.",
    keywords: ["seo продвижение", "продвижение сайта с нуля", "seo оптимизация"],
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-30",
    readingMinutes: 10,
    related: [
      "semanticheskoe-yadro-dlya-sajta-uslug",
      "tehnicheskoe-seo-chek-list",
      "kontent-plan-na-1000-statej",
    ],
    sections: [
      {
        type: "p",
        text: "SEO-продвижение — это система страниц под спрос плюс техническая возможность их индексировать. Контент без структуры даёт шум. Структура без контента — пустые полки.",
      },
      { type: "h2", text: "Порядок запуска" },
      {
        type: "ol",
        items: [
          "Собрать семантическое ядро и кластеры",
          "Закрыть критичные технические ошибки",
          "Собрать карту коммерческих и информационных URL",
          "Запустить хабы и первые статьи по приоритету спроса",
          "Настроить цели на заявку и смотреть не только позиции",
        ],
      },
    ],
  },
  {
    slug: "semanticheskoe-yadro-dlya-sajta-uslug",
    category: "kontent",
    title: "Семантическое ядро для сайта услуг: как собрать",
    description:
      "Как собрать семантическое ядро для сайта услуг: источники, чистка, кластеризация и привязка к URL.",
    h1: "Семантическое ядро для сайта услуг",
    lead: "Ядро — не Excel ради Excel. Это список URL, которые вы реально опубликуете.",
    keywords: ["семантическое ядро", "сбор семантики", "кластеризация запросов"],
    publishedAt: "2026-09-15",
    updatedAt: "2026-09-30",
    readingMinutes: 9,
    related: [
      "kontent-plan-na-1000-statej",
      "struktura-sajta-pod-seo",
      "seo-prodvizhenie-s-nulya",
    ],
    sections: [
      {
        type: "p",
        text: "Для сайта услуг ядро обычно состоит из коммерческих запросов («создание сайтов», «доработка wordpress») и информационных («как выбрать подрядчика», «что такое семантическое ядро»).",
      },
      { type: "h2", text: "Рабочий мини-процесс" },
      {
        type: "ol",
        items: [
          "Маркеры: услуги, синонимы, гео, типы сайтов",
          "Расширение через Wordstat / подсказки / конкурентов",
          "Чистка: нецелевые, дубли, ошибочный интент",
          "Сигналы по смыслу страницы",
          "Привязка кластера к одному URL",
        ],
      },
      {
        type: "callout",
        text: "Один кластер — один основной URL. Иначе каннибализация: страницы отбирают друг у друга клики и позиции.",
      },
    ],
  },
  {
    slug: "kontent-plan-na-1000-statej",
    category: "kontent",
    title: "Контент-план на 1000 статей: как не утонуть",
    description:
      "Как спланировать контент на сотни и тысячи SEO-статей: кластеры, шаблоны ТЗ, очередь публикации и контроль качества.",
    h1: "Контент-план на 1000 статей",
    lead: "Масштаб возможен, если есть редакция, шаблоны и жёсткая привязка к семантике.",
    keywords: ["контент план seo", "тысячи статей", "массовый контент"],
    publishedAt: "2026-09-14",
    updatedAt: "2026-09-30",
    readingMinutes: 10,
    related: [
      "semanticheskoe-yadro-dlya-sajta-uslug",
      "vnutrennyaya-perelinkovka",
      "seo-prodvizhenie-s-nulya",
    ],
    sections: [
      {
        type: "p",
        text: "План на 1000 статей начинается не с генерации текста, а с дерева кластеров: сколько хабов, сколько статей на хаб, какой интент и какая коммерческая страница усиливается.",
      },
      { type: "h2", text: "Каркас процесса" },
      {
        type: "ul",
        items: [
          "Сигнал → ТЗ → черновик → редатура → публикация → перелинковка",
          "Единый шаблон статьи: H1, лид, H2, списки, FAQ, CTA",
          "Очередь по потенциалу спроса и бизнес-приоритету",
          "Запрет дублей: проверка похожих title перед постановкой в план",
        ],
      },
      {
        type: "p",
        text: "На сайте студии «Сигнал» архитектура блога уже рассчитана на рост: категории-хабы, статьи, пагинация, sitemap и генератор заготовок из семантических семян.",
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
    related: [
      "core-web-vitals-dlya-biznesa",
      "kak-uskorit-sajt",
      "sitemap-dlya-bolshogo-sajta",
    ],
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
    related: [
      "kak-uskorit-sajt",
      "tehnicheskoe-seo-chek-list",
    ],
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
    related: [
      "tehnicheskoe-seo-chek-list",
      "kontent-plan-na-1000-statej",
    ],
    sections: [
      {
        type: "p",
        text: "Лимит одного sitemap — до 50 000 URL и 50 МБ несжатых. При тысячах статей делите карты по типам: услуги, категории, статьи. В Сигнале заложена генерация через Next.js sitemap API.",
      },
    ],
  },
  {
    slug: "vnutrennyaya-perelinkovka",
    category: "seo",
    title: "Внутренняя перелинковка: схема для услуг и блога",
    description:
      "Как строить внутреннюю перелинковку между услугами, хабами и статьями, чтобы усиливать деньги-страницы.",
    h1: "Внутренняя перелинковка",
    lead: "Ссылки внутри сайта — бесплатный способ объяснить структуру людям и поисковикам.",
    keywords: ["внутренняя перелинковка", "перелинковка seo", "хабы и статьи"],
    publishedAt: "2026-09-10",
    updatedAt: "2026-09-30",
    readingMinutes: 8,
    related: [
      "struktura-sajta-pod-seo",
      "kontent-plan-na-1000-statej",
      "seo-prodvizhenie-s-nulya",
    ],
    sections: [
      {
        type: "p",
        text: "Рабочая схема: статья → хаб категории → коммерческая услуга. Плюс горизонтальные ссылки на соседние статьи того же кластера.",
      },
      {
        type: "ul",
        items: [
          "В статье — 2–5 осмысленных внутренних ссылок",
          "Анкоры по смыслу, без спама ключом",
          "С хаба — на лучшие материалы и услугу",
          "Со страницы услуги — на подтверждающие гайды",
        ],
      },
    ],
  },
];

export const articles: Article[] = [...sozdanieArticles, ...baseArticles, ...seoArticles];

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
