#!/usr/bin/env node
/**
 * Generate article stubs from content/seo-seeds.md (planned rows).
 * Usage: node scripts/generate-articles.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const seedsPath = path.join(root, "content/seo-seeds.md");
const outDir = path.join(root, "content/articles");

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/ё/g, "e")
    .replace(/[^a-z0-9а-я\s-]/gi, "")
    .replace(/[а-я]/g, (ch) => {
      const map = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ж: "zh",
        з: "z",
        и: "i",
        й: "j",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "sch",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
      };
      return map[ch] ?? "";
    })
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const categoryByCluster = {
  sozdanie: "sozdanie-saitov",
  lending: "sozdanie-saitov",
  corp: "sozdanie-saitov",
  shop: "sozdanie-saitov",
  price: "sozdanie-saitov",
  structure: "sozdanie-saitov",
  dorabotka: "dorabotka",
  speed: "dorabotka",
  support: "podderzhka",
  wordpress: "wordpress",
  php: "cms",
  bitrix: "cms",
  tilda: "cms",
  opencart: "cms",
  cms: "cms",
  verstka: "verstka",
  integrations: "cms",
  seo: "seo",
  kontent: "kontent",
  tech: "tehnicheskoe-seo",
};

const md = await readFile(seedsPath, "utf8");
const rows = md
  .split("\n")
  .filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("query"))
  .map((line) =>
    line
      .split("|")
      .slice(1, -1)
      .map((c) => c.trim()),
  )
  .filter((cols) => cols.length >= 5 && cols[4] === "planned");

await mkdir(outDir, { recursive: true });
let created = 0;

for (const [query, cluster] of rows) {
  const category = categoryByCluster[cluster] ?? "seo";
  const slug = slugify(query);
  const file = path.join(outDir, `${category}__${slug}.json`);
  const today = new Date().toISOString().slice(0, 10);
  const article = {
    slug,
    category,
    title: `${query[0].toUpperCase()}${query.slice(1)} — гайд | Сигнал`,
    description: `Практический материал по запросу «${query}»: что важно знать и как применить на сайте.`,
    h1: `${query[0].toUpperCase()}${query.slice(1)}`,
    lead: `Черновик статьи под запрос «${query}». Заполните секции по ТЗ перед публикацией.`,
    keywords: [query],
    publishedAt: today,
    updatedAt: today,
    readingMinutes: 6,
    related: [],
    sections: [
      { type: "p", text: `Введение по теме «${query}».` },
      { type: "h2", text: "Что важно понять" },
      { type: "ul", items: ["Пункт 1", "Пункт 2", "Пункт 3"] },
      { type: "h2", text: "Практические шаги" },
      { type: "ol", items: ["Шаг 1", "Шаг 2", "Шаг 3"] },
      {
        type: "callout",
        text: "Свяжите статью с услугой и хабом категории перед публикацией.",
      },
    ],
    faq: [
      {
        q: `Что такое ${query}?`,
        a: "Краткий ответ для FAQ и FAQPage schema.",
      },
    ],
    status: "draft",
  };
  await writeFile(file, `${JSON.stringify(article, null, 2)}\n`);
  created += 1;
}

console.log(`Created ${created} draft stubs in content/articles/`);
