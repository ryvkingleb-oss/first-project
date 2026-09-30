export const site = {
  name: "Вебора",
  legalName: "Вебора",
  tagline: "Сайты, которые находят клиентов",
  description:
    "Студия Вебора: создание сайтов, доработка и SEO-продвижение. Проектируем структуру под спрос, пишем страницы под семантическое ядро и доводим до заявок.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://109.172.37.155:8792",
  locale: "ru_RU",
  language: "ru",
  email: "hello@webora.ru",
  phone: "+7 (495) 000-00-00",
  phoneHref: "tel:+74950000000",
  city: "Москва",
  sameAs: [] as string[],
} as const;

export const nav = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/blog", label: "Блог" },
  { href: "/kejsy", label: "Кейсы" },
  { href: "/ceny", label: "Цены" },
  { href: "/kontakty", label: "Контакты" },
] as const;

export const ARTICLES_PER_PAGE = 12;
