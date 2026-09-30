export const site = {
  name: "Сигнал",
  legalName: "Самозанятый",
  logoSlogan: "Разработка сайтов",
  tagline: "Сайты, которые находят клиентов",
  description:
    "Сигнал: создание сайтов, доработка и SEO-продвижение. Услуги оказывает частное лицо — самозанятый. Санкт-Петербург и удалённо по России.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cignalpro.ru",
  domain: "cignalpro.ru",
  locale: "ru_RU",
  language: "ru",
  email: "info@cignalpro.ru",
  city: "Санкт-Петербург",
  legal: {
    form: "Частное лицо, самозанятый",
    inn: "781019511603",
    note: "Услуги по созданию, доработке и SEO-продвижению сайтов оказывает частное лицо — налогоплательщик налога на профессиональный доход (самозанятый).",
  },
  yandexVerification: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? "",
  messengers: {
    telegram: {
      label: "Telegram",
      href: "https://t.me/Stasvew",
    },
    whatsapp: {
      label: "WhatsApp",
      href: "https://wa.me/79581769228",
    },
    max: {
      label: "Max",
      href: "https://max.ru/u/f9LHodD0cOI8wMvs4qthOHMSdTrU5fJVakNn7XlASaXupj3NTIN8i0BYJ7U",
    },
  },
  phone: "+79581769228",
  sameAs: [
    "https://t.me/Stasvew",
    "https://wa.me/79581769228",
    "https://max.ru/u/f9LHodD0cOI8wMvs4qthOHMSdTrU5fJVakNn7XlASaXupj3NTIN8i0BYJ7U",
  ],
} as const;

export const nav = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/blog", label: "Блог" },
  { href: "/kejsy", label: "Кейсы" },
  { href: "/ceny", label: "Цены" },
  { href: "/kontakty", label: "Контакты" },
] as const;

export const ARTICLES_PER_PAGE = 12;
