export const site = {
  name: "Сигнал",
  legalName: "Сигнал",
  tagline: "Сайты, которые находят клиентов",
  description:
    "Студия Сигнал: создание сайтов, доработка и SEO-продвижение. Проектируем структуру под спрос, пишем страницы под семантическое ядро и доводим до заявок.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://109.172.37.155:8792",
  locale: "ru_RU",
  language: "ru",
  email: "hello@signal.pro",
  city: "Москва",
  messengers: {
    telegram: {
      label: "Telegram",
      href: "https://t.me/signal_studio",
    },
    whatsapp: {
      label: "WhatsApp",
      href: "https://wa.me/79000000000",
    },
    max: {
      label: "Max",
      href: "https://max.ru/signal_studio",
    },
  },
  sameAs: [
    "https://t.me/signal_studio",
    "https://wa.me/79000000000",
    "https://max.ru/signal_studio",
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
