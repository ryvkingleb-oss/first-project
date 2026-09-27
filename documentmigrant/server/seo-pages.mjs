import { portalPages } from "../shared/portal-pages.mjs";
import { USLUGI_REDIRECTS } from "./catalog.mjs";
/**
 * Public pages for documentmigrant.ru.
 * Search volumes are not stored here: they go stale and must not be invented.
 * Cluster choice follows the Wordstat export of 27 Sep 2026 (Russia, all regions).
 * Hubs/articles live in shared/portal-pages.mjs (SSR + React).
 */

const ADS_ENABLED = String(process.env.ADS_ENABLED || "false").toLowerCase() === "true";

export const SITE_NAME = "Документ мигранта";
export const SITE_ORIGIN = "https://documentmigrant.ru";
const UPDATED = "2026-09-27";

/** @type {Record<string, string>} */
export const redirects = { ...USLUGI_REDIRECTS };

/** @type {PublicPage[]} */
const marketingPages = [
  {
    path: "/",
    title: "Уведомление о прибытии и бланки МВД — заполнить онлайн",
    description:
      "Онлайн-заполнение бланков МВД: прибытие (и на ребёнка), убытие, патент, РВП, ВНЖ, подтверждение проживания и гражданство. Пустой бланк бесплатно. Готовый файл — после тестовой оплаты, деньги не списываются.",
    h1: "Уведомление о прибытии и бланки МВД: заполните онлайн и скачайте файл",
    lead:
      "Сервис подставляет ваши ответы в официальный бланк. В МВД и на Госуслуги файл не уходит. Подпись ставите от руки и несёте документ сами.",
    blocks: [
      {
        paragraphs: [
          "Постановка на [миграционный учёт](/migracionnyj-uchet) и бытовая формулировка «[регистрация иностранного гражданина](/registraciya-inostrannogo-grazhdanina)» для места пребывания начинаются с [уведомления о прибытии](/dokument/pribytie).",
        ],
      },
      {
        heading: "Какие бланки заполняем",
        items: [
          "[Уведомление о прибытии](/dokument/pribytie) — бланк, образец и заполнение онлайн; есть режим на ребёнка.",
          "[Уведомление об убытии](/dokument/ubytie).",
          "[Заявление на патент](/dokument/patent) — патент на работу иностранца, не патент для ИП.",
          "[Заявление на РВП](/dokument/rvp) — взрослый.",
          "[Заявление на вид на жительство](/dokument/vnzh).",
          "[Подтверждение проживания по ВНЖ](/dokument/vnzh-podtverzhdenie).",
          "[Подтверждение проживания по РВП](/dokument/rvp-podtverzhdenie).",
          "[Заявление на гражданство](/dokument/grazhdanstvo).",
        ],
      },
    ],
    cta: { to: "/dokument/pribytie", label: "Открыть уведомление о прибытии" },
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/ceny",
    title: "Цены: готовый файл бланка МВД — 490 ₽",
    description:
      "Готовый файл одного бланка стоит 490 ₽. Сейчас оплата тестовая: деньги не списываются. Это не госпошлина и не плата МВД.",
    kicker: "Цены",
    h1: "490 ₽ за готовый файл",
    lead: "Список, чек-лист и пустой бланк бесплатны. Платный шаг — скачать бланк, в котором уже стоят ваши ответы.",
    blocks: [
      {
        paragraphs: [
          "Сумма 490 ₽ — услуга этого сервиса за один файл. Касса в режиме заглушки: кнопка подтверждения не списывает деньги и не подключает банк. Живая оплата не включена.",
          "Госпошлину и другие платежи в казну сервис не принимает. Их платят отдельно, если они есть по вашей процедуре. Квитанцию сверяйте на странице МВД перед оплатой.",
        ],
      },
      {
        items: [
          "Уведомление о прибытии, патент, вид на жительство и гражданство — одна и та же цена файла.",
          "Повторное скачивание уже открытого файла в кабинете отдельным платежом не размечено.",
          "Подпись, печать подразделения и отметка на отрывной части в цену не входят: их ставите не здесь.",
        ],
      },
    ],
    cta: { to: "/kak-eto-rabotaet", label: "Как проходит заполнение" },
    priority: "0.6",
    changefreq: "monthly",
  },
  {
    path: "/kak-eto-rabotaet",
    title: "Как заполнить бланк МВД онлайн и скачать файл",
    description:
      "Регистрация, клетки бланка, тестовая оплата без списания и файл для печати. Сервис не подаёт заявление в МВД и на Госуслуги.",
    kicker: "Как это работает",
    h1: "От пустого бланка к файлу для печати",
    lead: "Вы заполняете те же поля, что на бумажном бланке. Сервис не заменяет приём в подразделении.",
    blocks: [
      {
        heading: "Шаги",
        items: [
          "Создаёте кабинет. Без него список можно читать, свой файл — нет.",
          "Выбираете документ и вписываете поля. Пустой бланк скачивается сразу.",
          "Сверяете ответы. Готовый файл стоит 490 ₽. Сейчас касса тестовая: деньги не списываются.",
          "Скачиваете официальный бланк с вашими ответами. Подпись ставите от руки и несёте сами.",
        ],
      },
      {
        paragraphs: [
          "Ответы лежат в кабинете, чтобы собрать файл. Пароль хранится как хеш. В МВД заявление не уходит. Если бланк на сайте МВД сменят, сервис сам его не подменит: дата сверки указана на странице документа.",
        ],
      },
    ],
    cta: { to: "/uslugi", label: "Выбрать документ" },
    priority: "0.6",
    changefreq: "monthly",
  },
  {
    path: "/kontakty",
    title: "Контакты сервиса заполнения бланков",
    description:
      "Сервис готовит файл для печати и не принимает документы в МВД. Отдельного окна приёма нет. Вопросы по кабинету — с почты, указанной при регистрации.",
    kicker: "Контакты",
    h1: "Как с нами связаться",
    lead: "Это не подразделение МВД, не МФЦ и не Госуслуги.",
    blocks: [
      {
        paragraphs: [
          "Офиса, куда можно принести паспорт, нет. Телефон приёма документов не публикуем, потому что заявления здесь не принимают. Файл вы печатаете и подаёте сами.",
          "Если не открывается кабинет, напишите с той почты, которой регистрировались: так видно, какой это аккаунт. Публичный ящик приёма заявлений не заведён.",
          "Юридические условия оплаты — короткая [памятка вместо оферты](/oferta). Что хранится в кабинете — в [памятке о данных](/politika).",
        ],
      },
    ],
    priority: "0.4",
    changefreq: "yearly",
  },
  {
    path: "/oferta",
    title: "Оплата файла: тестовая заглушка, не оферта",
    description:
      "Публичный договор на платную услугу не опубликован. Кнопка оплаты не списывает деньги. Живая касса не подключена.",
    kicker: "Правовая памятка",
    h1: "Оферта не действует: оплата тестовая",
    lead: "Страница намеренно короткая. Это не текст договора.",
    blocks: [
      {
        warn:
          "Кнопка «Подтвердить тестовую оплату» не создаёт платёж, не списывает 490 ₽ и не включает доступ «как будто деньги пришли из банка». Живая касса не подключена. Переменная PAYMENT_MODE, отличная от stub, живое списание тоже не включает.",
        paragraphs: [
          "Пока касса тестовая, публичная оферта на возмездную услугу не опубликована и не считается заключённой. Сумма 490 ₽ на экране показывает будущую цену файла, а не выставленный счёт.",
          "Сервис не оказывает юридическую помощь и не подаёт документы в государственные органы.",
        ],
      },
    ],
    priority: "0.2",
    changefreq: "yearly",
  },
  {
    path: "/politika",
    title: "Какие данные лежат в кабинете",
    description:
      "Ответы анкеты хранятся, чтобы собрать файл бланка. В МВД они не отправляются. Это короткая памятка, не полноценная политика оператора.",
    kicker: "Правовая памятка",
    h1: "Данные кабинета",
    lead: "Это не законченный текст политики обработки персональных данных.",
    blocks: [
      {
        paragraphs: [
          "В кабинете хранятся почта, имя, хеш пароля и ответы, которые вы вписали в бланк. Они нужны, чтобы снова открыть анкету и собрать PDF. Заявление в МВД, на Госуслуги и на почту ведомства не отправляется.",
          "Тестовое письмо с файлом наружу не уходит: запись остаётся в кабинете. Пустой бланк скачивается без этих ответов.",
          "Когда появится настоящая оплата и опубликованная политика, эта страница будет заменена. Сейчас ориентир для пользователя — только абзацы выше.",
        ],
      },
    ],
    priority: "0.2",
    changefreq: "yearly",
  },
];

/** @type {PublicPage[]} */
const procedurePages = [
  {
    path: "/dokument/pribytie",
    title: "Уведомление о прибытии: бланк, образец и заполнить онлайн",
    description:
      "Бланк уведомления о прибытии иностранного гражданина. Скачайте пустую форму, посмотрите образец клеток и заполните онлайн. Готовый файл — после тестовой оплаты, деньги не списываются.",
    h1: "Уведомление о прибытии иностранного гражданина или лица без гражданства в место пребывания",
    lead: "Постановка на учёт по месту пребывания. Обычно уведомление подаёт принимающая сторона.",
    blocks: [],
    supplements: [
      {
        heading: "Бланк уведомления о прибытии",
        paragraphs: [
          "Пустой бланк скачивается отдельно: [форма уведомления о прибытии](/api/blanks/pribytie). Это приложение № 4 к приказу МВД от 10.12.2020 № 856 в редакции, выложенной на странице образцов. Ваших ответов в файле нет. Все бланки собраны на странице [«Бланки»](/blanki).",
        ],
      },
      {
        heading: "Образец",
        paragraphs: [
          "Пустой файл — образец самой формы. Образец с чужими ответами на сайте МВД лежит рядом с бланком, ссылка есть ниже в источниках. Файл с вашими ответами сервис собирает после заполнения. Как проходят клетки: [как заполнить уведомление о прибытии](/statyi/kak-zapolnit-uvedomlenie-o-pribytii).",
        ],
      },
      {
        heading: "Заполнить онлайн",
        paragraphs: [
          "Есть переключатель «Взрослый / Ребёнок» и отдельная кнопка «Заполнить на ребёнка». Кнопка внизу открывает те же поля, что на бланке: кто подаёт, сведения об иностранце, адрес пребывания, принимающая сторона, отрывная часть. В ведомство анкета не отправляется. Сроки подачи: [сроки миграционного учёта](/statyi/sroki-migracionnogo-ucheta). Если вы пришли с запроса про учёт или регистрацию, начните с [миграционного учёта](/migracionnyj-uchet) или [регистрации по месту пребывания](/registraciya-inostrannogo-grazhdanina).",
        ],
      },
    ],
    cta: { to: "/dokument/pribytie", label: "Остаться на бланке" },
    priority: "0.95",
    changefreq: "weekly",
  },
  {
    path: "/dokument/patent",
    title: "Заявление на патент для иностранного гражданина — бланк МВД",
    description:
      "Бланк заявления об оформлении патента на работу. Это не патент для ИП и не заявление в налоговую. Пустой бланк бесплатно, заполненный файл — после тестовой оплаты.",
    h1: "Заявление об оформлении патента",
    lead: "Первый бланк, если приехали без визы и хотите работать.",
    blocks: [],
    supplements: [
      {
        warn:
          "Это патент на работу иностранного гражданина. Патент для ИП, заявление в налоговую и уменьшение патента на взносы здесь не заполняются.",
        paragraphs: [
          "Чем процедуры отличаются: [документы на патент для иностранных граждан](/statyi/dokumenty-na-patent-dlya-inostrannyh-grazhdan). Пустой бланк: [скачать заявление](/api/blanks/patent).",
        ],
      },
    ],
    priority: "0.85",
    changefreq: "weekly",
  },
  {
    path: "/dokument/vnzh",
    title: "Заявление на вид на жительство: бланк и заполнение онлайн",
    description:
      "Заявление о выдаче вида на жительство. Пустой бланк МВД и онлайн-заполнение клеток. Файл для печати вы несёте сами. Заявление ребёнка, замена и дубликат здесь не собираются.",
    h1: "Заявление о выдаче вида на жительство",
    lead: "Бланк взрослого со страницы МВД. Заявление ребёнка, замена и дубликат здесь не собираются.",
    blocks: [],
    supplements: [],
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/dokument/grazhdanstvo",
    title: "Заявление на гражданство РФ: бланк и заполнение онлайн",
    description:
      "Бланк заявления о приёме в гражданство Российской Федерации. Пустой образец и заполнение онлайн. Это помощник для печати, не портал МВД.",
    h1: "Заявление о приёме в гражданство Российской Федерации",
    lead: "Заявление взрослого по приложению № 1 к Положению о гражданстве. Документы зависят от статьи закона.",
    blocks: [],
    supplements: [],
    priority: "0.75",
    changefreq: "weekly",
  },
  {
    path: "/dokument/ubytie",
    title: "Уведомление об убытии: бланк и заполнить онлайн",
    description:
      "Бланк уведомления об убытии иностранного гражданина из места пребывания. Заполните онлайн и скачайте файл для печати. В МВД файл сам не уходит.",
    h1: "Уведомление об убытии из места пребывания",
    lead: "Снятие с учёта по адресу, когда иностранец уехал. Обычно подаёт принимающая сторона.",
    blocks: [],
    supplements: [
      {
        warn: "Файл в МВД сам не уходит. PDF — макет полей сервиса: перед подачей сверьте с бланком на сайте МВД. Юридические тексты — заглушки «для юриста».",
        paragraphs: [
          "Мастер заполнения открыт. Пустой бланк: [скачать](/api/blanks/ubytie). Статья: [уведомление об убытии](/statyi/uvedomlenie-ob-ubytii).",
        ],
      },
    ],
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/dokument/rvp",
    title: "Заявление на РВП: бланк и заполнение онлайн",
    description:
      "Заявление о выдаче разрешения на временное проживание (взрослый). Пустой бланк и онлайн-заполнение. Файл для печати вы несёте сами.",
    h1: "Заявление о выдаче разрешения на временное проживание",
    lead: "Мастер взрослого открыт. РВП ребёнку — отдельная страница «Скоро».",
    blocks: [],
    supplements: [
      {
        warn: "Юридические формулировки — заглушки «для юриста». Файл в МВД сам не уходит.",
        paragraphs: ["Статья-якорь: [заявление на РВП](/statyi/zayavlenie-na-rvp). Пустой бланк: [/api/blanks/rvp](/api/blanks/rvp)."],
      },
    ],
    priority: "0.85",
    changefreq: "weekly",
  },
  {
    path: "/dokument/vnzh-podtverzhdenie",
    title: "Подтверждение проживания по ВНЖ — заполнить онлайн",
    description:
      "Уведомление о подтверждении проживания по виду на жительство. Заполните онлайн и скачайте PDF для печати.",
    h1: "Уведомление о подтверждении проживания по ВНЖ",
    lead: "Ежегодное подтверждение для обладателя вида на жительство.",
    blocks: [],
    supplements: [
      {
        paragraphs: [
          "Статья: [подтверждение проживания](/statyi/podtverzhdenie-prozhivaniya). Пустой бланк: [/api/blanks/vnzh-podtverzhdenie](/api/blanks/vnzh-podtverzhdenie).",
        ],
      },
    ],
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/dokument/rvp-podtverzhdenie",
    title: "Подтверждение проживания по РВП — заполнить онлайн",
    description:
      "Уведомление о подтверждении проживания по разрешению на временное проживание. Онлайн-заполнение и PDF для печати.",
    h1: "Уведомление о подтверждении проживания по РВП",
    lead: "Подтверждение проживания для обладателя РВП.",
    blocks: [],
    supplements: [
      {
        paragraphs: [
          "Статья: [подтверждение проживания](/statyi/podtverzhdenie-prozhivaniya). Пустой бланк: [/api/blanks/rvp-podtverzhdenie](/api/blanks/rvp-podtverzhdenie).",
        ],
      },
    ],
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/dokument/rabotodatel-td-zaklyuchenie",
    title: "Уведомление работодателя о заключении ТД — скоро",
    description: "Скоро: бланк уведомления о заключении трудового договора с иностранным гражданином.",
    h1: "Уведомление о заключении трудового договора — скоро",
    lead: "Страница-заглушка волны B. Мастер заполнения ещё не открыт.",
    blocks: [{ warn: "Скоро. Файл в МВД сам не уходит.", paragraphs: ["Вернитесь к [доступным бланкам](/uslugi)."] }],
    priority: "0.25",
    changefreq: "monthly",
  },
  {
    path: "/dokument/rabotodatel-td-rastorzhenie",
    title: "Уведомление работодателя о расторжении ТД — скоро",
    description: "Скоро: бланк уведомления о расторжении трудового договора с иностранным гражданином.",
    h1: "Уведомление о расторжении трудового договора — скоро",
    lead: "Страница-заглушка волны B.",
    blocks: [{ warn: "Скоро.", paragraphs: ["Смотрите [услуги](/uslugi)."] }],
    priority: "0.25",
    changefreq: "monthly",
  },
  {
    path: "/dokument/patent-prodlenie",
    title: "Продление и переоформление патента — скоро",
    description: "Скоро: бланки продления и переоформления патента на работу иностранца.",
    h1: "Продление / переоформление патента — скоро",
    lead: "Отдельные бланки. Пока доступно только первичное [заявление на патент](/dokument/patent).",
    blocks: [{ warn: "Скоро. Патент на работу ≠ патент ИП.", paragraphs: [] }],
    priority: "0.25",
    changefreq: "monthly",
  },
  {
    path: "/dokument/rvp-rebenok",
    title: "РВП ребёнку — скоро",
    description: "Скоро: заявление о выдаче РВП несовершеннолетнему.",
    h1: "РВП ребёнку — скоро",
    lead: "Пока доступно [РВП взрослому](/dokument/rvp).",
    blocks: [{ warn: "Скоро.", paragraphs: [] }],
    priority: "0.25",
    changefreq: "monthly",
  },
  {
    path: "/dokument/vnzh-rebenok",
    title: "ВНЖ ребёнку — скоро",
    description: "Скоро: заявление о выдаче вида на жительство ребёнку.",
    h1: "ВНЖ ребёнку — скоро",
    lead: "Пока доступно [ВНЖ взрослому](/dokument/vnzh).",
    blocks: [{ warn: "Скоро.", paragraphs: [] }],
    priority: "0.25",
    changefreq: "monthly",
  },
  {
    path: "/dokument/grazhdanstvo-rebenok",
    title: "Гражданство ребёнку — скоро",
    description: "Скоро: заявление о гражданстве ребёнка и штамп о гражданстве, если бланк отдельный.",
    h1: "Гражданство ребёнку — скоро",
    lead: "Пока доступно [гражданство взрослому](/dokument/grazhdanstvo).",
    blocks: [{ warn: "Скоро.", paragraphs: [] }],
    priority: "0.25",
    changefreq: "monthly",
  },
];

const privatePaths = new Set(["/kabinet", "/vhod", "/registraciya"]);

export function indexablePages() {
  return [...marketingPages, ...portalPages, ...procedurePages];
}

function collectFaq(page) {
  const out = [...(page.faq || [])];
  for (const block of page.blocks || []) {
    for (const item of block.faq || []) out.push(item);
  }
  return out;
}

function breadcrumbsHtml(page) {
  const crumbs = page.breadcrumbs || [];
  if (!crumbs.length) return "";
  const items = crumbs
    .map((crumb, i) => {
      const last = i === crumbs.length - 1;
      if (crumb.path && !last) {
        return `<li><a href="${esc(crumb.path)}">${esc(crumb.name)}</a></li>`;
      }
      return `<li><span${last ? ' aria-current="page"' : ""}>${esc(crumb.name)}</span></li>`;
    })
    .join("");
  return `<nav class="breadcrumbs" aria-label="Хлебные крошки"><ol>${items}</ol></nav>`;
}

function adSlotHtml(placement) {
  const on = ADS_ENABLED ? "true" : "false";
  const cls = `ad-slot ad-slot--${placement}${ADS_ENABLED ? "" : " ad-slot--off"}`;
  return `<aside class="${cls}" data-ad-slot="${esc(placement)}" data-ads-enabled="${on}" aria-hidden="${ADS_ENABLED ? "false" : "true"}"></aside>`;
}

function jsonLdForPage(page) {
  if (!page || !["hub", "article", "index", "catalog"].includes(page.type)) return "";
  const scripts = [];
  const crumb = page.breadcrumbs || [];
  if (crumb.length) {
    scripts.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumb.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        ...(c.path ? { item: `${SITE_ORIGIN}${c.path === "/" ? "/" : c.path}` } : {}),
      })),
    });
  }
  const faq = collectFaq(page);
  if (faq.length) {
    scripts.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return scripts
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`)
    .join("\n");
}

export function stripPath(pathname) {
  const raw = String(pathname || "/").split("?")[0].split("#")[0] || "/";
  if (raw.length > 1 && raw.endsWith("/")) return raw.slice(0, -1);
  return raw || "/";
}

export function redirectTarget(pathname) {
  const original = String(pathname || "/").split("?")[0].split("#")[0] || "/";
  const path = stripPath(original);
  if (redirects[path]) return redirects[path];
  if (original !== path) return path;
  return null;
}

export function pageByPath(pathname) {
  const path = stripPath(pathname);
  return indexablePages().find((page) => page.path === path);
}

function privateMeta(path) {
  return {
    title: `Кабинет — ${SITE_NAME}`,
    description: "Служебная страница кабинета. В поиск её добавлять не нужно.",
    robots: "noindex, nofollow",
    canonical: "",
    path,
  };
}

export function isPrivatePath(pathname) {
  const path = stripPath(pathname);
  if (privatePaths.has(path)) return true;
  if (/^\/zayavlenie\/[^/]+$/.test(path)) return true;
  if (/^\/zayavlenie\/[^/]+\/oplata$/.test(path)) return true;
  return false;
}

export function metaForPath(pathname) {
  const path = stripPath(pathname);
  const page = pageByPath(path);
  if (page) {
    return {
      title: page.title,
      description: page.description,
      robots: "index, follow",
      canonical: `${SITE_ORIGIN}${page.path === "/" ? "/" : page.path}`,
      path: page.path,
    };
  }
  if (isPrivatePath(path)) return privateMeta(path);
  return {
    title: `Страница не найдена — ${SITE_NAME}`,
    description: "Такой страницы на сервисе нет.",
    robots: "noindex, nofollow",
    canonical: "",
    path,
  };
}

export function htmlStatus(pathname) {
  const path = stripPath(pathname);
  if (pageByPath(path) || isPrivatePath(path)) return 200;
  return 404;
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineHtml(text) {
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let html = "";
  let last = 0;
  for (const match of String(text).matchAll(re)) {
    const index = match.index ?? 0;
    html += esc(text.slice(last, index));
    const label = match[1];
    const href = match[2];
    if (href.startsWith("/") || href.startsWith("https://")) {
      html += `<a href="${esc(href)}">${esc(label)}</a>`;
    } else {
      html += esc(label);
    }
    last = index + match[0].length;
  }
  html += esc(text.slice(last));
  return html;
}

function paragraphHtml(text) {
  const bold = /^\*\*(.+?)\*\*\s*(.*)$/.exec(String(text || ""));
  if (bold) return `<p><strong>${esc(bold[1])}</strong> ${inlineHtml(bold[2])}</p>`;
  return `<p>${inlineHtml(text)}</p>`;
}

function blocksHtml(blocks, { injectAdAt } = {}) {
  return (blocks || [])
    .map((block, index) => {
      const parts = [];
      if (injectAdAt != null && index === injectAdAt) parts.push(adSlotHtml("in-article"));
      if (block.heading) parts.push(`<h2>${esc(block.heading)}</h2>`);
      if (block.warn) parts.push(`<p class="warn">${esc(block.warn)}</p>`);
      for (const paragraph of block.paragraphs || []) parts.push(paragraphHtml(paragraph));
      if (block.items?.length) {
        parts.push(`<ul>${block.items.map((item) => `<li>${inlineHtml(item)}</li>`).join("")}</ul>`);
      }
      if (block.faq?.length) {
        parts.push(
          `<dl class="portal-faq">${block.faq
            .map((f) => `<dt>${esc(f.q)}</dt><dd>${inlineHtml(f.a)}</dd>`)
            .join("")}</dl>`,
        );
      }
      return parts.join("");
    })
    .join("");
}

export function fallbackInnerHtml(page) {
  if (!page) return "<h1>Страница не найдена</h1><p>Такой страницы на сервисе нет.</p>";
  const withAds = page.type === "hub" || page.type === "article" || page.type === "index";
  const rich = withAds || page.type === "catalog";
  const mid = Math.max(1, Math.floor((page.blocks || []).length / 2));
  const cta = page.cta && page.path !== page.cta.to
    ? `<p class="portal-cta"><a class="btn" href="${esc(page.cta.to)}">${esc(page.cta.label)}</a></p>`
    : "";
  const article = [
    breadcrumbsHtml(page),
    page.kicker ? `<p class="kicker">${esc(page.kicker)}</p>` : "",
    `<h1>${esc(page.h1)}</h1>`,
    page.lead ? `<p class="lead">${inlineHtml(page.lead)}</p>` : "",
    blocksHtml(page.blocks, withAds ? { injectAdAt: mid } : undefined),
    blocksHtml(page.supplements),
    cta,
  ].join("");
  if (!rich) return article;
  if (!withAds) return `<div class="portal-layout"><article class="portal-article">${article}</article></div>`;
  return `<div class="portal-layout"><article class="portal-article">${article}</article><div class="portal-aside">${adSlotHtml("aside")}</div></div>`;
}

export function injectIndexHtml(template, pathname) {
  const meta = metaForPath(pathname);
  const page = pageByPath(pathname);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = upsertMeta(html, "description", meta.description);
  html = upsertMeta(html, "robots", meta.robots);
  html = upsertMeta(html, "og:title", meta.title, "property");
  html = upsertMeta(html, "og:description", meta.description, "property");
  if (meta.canonical) {
    if (/<link\s+rel="canonical"[^>]*>/.test(html)) {
      html = html.replace(/<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(meta.canonical)}" />`);
    } else {
      html = html.replace("</head>", `<link rel="canonical" href="${esc(meta.canonical)}" />\n</head>`);
    }
  }
  const ld = jsonLdForPage(page);
  if (ld) html = html.replace("</head>", `${ld}\n</head>`);
  const fallback = fallbackInnerHtml(page);
  html = html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${fallback}</div>`);
  return html;
}

function upsertMeta(html, name, content, attr = "name") {
  const tag = new RegExp(`<meta\\s+${attr}="${name}"\\s+content="[^"]*"\\s*/?>`);
  const next = `<meta ${attr}="${name}" content="${esc(content)}" />`;
  if (tag.test(html)) return html.replace(tag, next);
  return html.replace("</head>", `${next}\n</head>`);
}

export function sitemapXml() {
  const urls = indexablePages()
    .map((page) => {
      const loc = `${SITE_ORIGIN}${page.path === "/" ? "/" : page.path}`;
      return [
        "  <url>",
        `    <loc>${esc(loc)}</loc>`,
        `    <lastmod>${UPDATED}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function robotsTxt() {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /kabinet",
    "Disallow: /zayavlenie",
    "Disallow: /vhod",
    "Disallow: /registraciya",
    "Disallow: /api",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");
}
