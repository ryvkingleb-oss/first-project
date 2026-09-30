import type { Article } from "./catalog";

/** Коммерческие и информационные статьи под CMS / PHP / вёрстку / поддержку. */
export const seoArticles: Article[] = [
  {
    slug: "dorabotka-saitov-na-wordpress",
    category: "wordpress",
    title: "Доработка сайтов на WordPress: что входит и как заказать",
    description:
      "Доработка сайтов на WordPress: темы, плагины, WooCommerce, скорость и SEO. Когда хватит правок, а когда нужен рефакторинг.",
    h1: "Доработка сайтов на WordPress",
    lead: "WordPress закрывает большую часть задач бизнеса — если тема и плагины не превратились в зоопарк. Разбираем типичный объём работ.",
    keywords: [
      "доработка сайтов на wordpress",
      "доработка wordpress",
      "программист wordpress",
    ],
    publishedAt: "2026-09-28",
    updatedAt: "2026-09-30",
    readingMinutes: 9,
    related: [
      "sozdanie-sajta-wordpress",
      "nastrojka-wordpress",
      "natyazhka-verstki-na-wordpress",
      "woocommerce-razrabotka",
    ],
    sections: [
      {
        type: "p",
        text: "Доработка сайтов на WordPress — это не «поставить ещё один плагин». Обычно нужно аккуратно встроить функционал в тему, сохранить обновляемость и не убить скорость. Хороший подрядчик сначала смотрит child theme, хуки и конфликты плагинов.",
      },
      { type: "h2", text: "Что чаще всего дорабатывают" },
      {
        type: "ul",
        items: [
          "Шаблоны страниц, карточек и архивов",
          "Формы заявок, квизы, калькуляторы",
          "Каталог и WooCommerce",
          "Интеграции с CRM, почтой, оплатой",
          "Ускорение и мобильная версия",
          "Базовое техническое SEO: title, schema, sitemap",
        ],
      },
      { type: "h2", text: "Как не сломать сайт правками" },
      {
        type: "ol",
        items: [
          "Бэкап и staging перед крупными изменениями",
          "Child theme вместо правок родительской темы",
          "Минимум плагинов «на все случаи жизни»",
          "Проверка форм и целей аналитики после релиза",
        ],
      },
      {
        type: "callout",
        text: "Нужна точечная или комплексная доработка WordPress — смотрите услугу «Доработка WordPress» и напишите, что болит: форма, скорость, магазин или новый раздел.",
      },
    ],
    faq: [
      {
        q: "Сколько стоит доработка WordPress?",
        a: "Мелкие правки — от 3 000 ₽. Крупный функционал и WooCommerce оцениваем после короткого аудита доступов.",
      },
      {
        q: "Можно ли доработать сайт без смены дизайна?",
        a: "Да. Часто достаточно шаблонов, скорости и логики заявок — без полного редизайна.",
      },
    ],
  },
  {
    slug: "sozdanie-sajta-wordpress",
    category: "wordpress",
    title: "Создание сайта на WordPress под ключ",
    description:
      "Создание сайта на WordPress: структура под SEO, тема, формы, блог и базовая техника для роста контента.",
    h1: "Создание сайта на WordPress",
    lead: "WordPress удобен, когда нужен редактор для команды и масштабируемый блог — при условии чистой темы и структуры URL.",
    keywords: ["создание сайта wordpress", "сайт на wordpress", "разработка wordpress"],
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-30",
    readingMinutes: 8,
    related: [
      "dorabotka-saitov-na-wordpress",
      "nastrojka-wordpress",
      "natyazhka-verstki-na-wordpress",
    ],
    sections: [
      {
        type: "p",
        text: "Создание сайта на WordPress под ключ включает прототип, дизайн или вёрстку на тему, типы записей, формы и стартовое SEO. Важно сразу заложить категории блога и шаблон статьи — иначе контент-план упрётся в «страницы вручную».",
      },
      { type: "h2", text: "Что закладываем на старте" },
      {
        type: "ul",
        items: [
          "Карта услуг и хабов под семантику",
          "Child theme и нормальные шаблоны",
          "ЧПУ, title/H1, sitemap, schema",
          "Роли пользователей и регламент обновлений",
        ],
      },
    ],
  },
  {
    slug: "nastrojka-wordpress",
    category: "wordpress",
    title: "Настройка WordPress после запуска: чек-лист",
    description:
      "Настройка WordPress: безопасность, кеш, SEO-плагин, формы, резервные копии и базовая производительность.",
    h1: "Настройка WordPress",
    lead: "После установки ядра сайт ещё не готов к бою. Ниже — рабочий минимум настройки.",
    keywords: ["настройка wordpress", "wordpress после установки"],
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: ["dorabotka-saitov-na-wordpress", "sozdanie-sajta-wordpress"],
    sections: [
      {
        type: "ol",
        items: [
          "SSL, корректные URL сайта, постоянные ссылки",
          "Ограничение попыток входа и сильные пароли",
          "Кеш и сжатие изображений без перегруза плагинами",
          "SEO-плагин: title, schema, sitemap",
          "Автобэкапы и тестовое восстановление",
          "Цели в аналитике на отправку форм",
        ],
      },
    ],
  },
  {
    slug: "natyazhka-verstki-na-wordpress",
    category: "wordpress",
    title: "Натяжка вёрстки на WordPress",
    description:
      "Как перенести HTML/CSS вёрстку на WordPress: шаблоны темы, циклы, ACF и сохранение скорости.",
    h1: "Натяжка вёрстки на WordPress",
    lead: "Натяжка — это превращение статичной вёрстки в управляемые шаблоны темы без потери пиксельной точности.",
    keywords: ["натяжка верстки на wordpress", "верстка wordpress"],
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-30",
    readingMinutes: 8,
    related: [
      "dorabotka-saitov-na-wordpress",
      "verstka-sajta",
      "sozdanie-sajta-wordpress",
    ],
    sections: [
      {
        type: "p",
        text: "Сначала режем макет на шаблоны: шапка, подвал, главная, услуга, статья, архив. Затем выносим повторяющиеся поля в ACF или блоки — чтобы контент правился без разработчика.",
      },
      {
        type: "ul",
        items: [
          "Семантика HTML и доступные заголовки",
          "Адаптив и ретина-изображения",
          "Минификация и отказ от лишнего jQuery",
          "Редакторские поля вместо хардкода текстов",
        ],
      },
    ],
  },
  {
    slug: "woocommerce-razrabotka",
    category: "wordpress",
    title: "WooCommerce разработка и доработка магазина",
    description:
      "WooCommerce разработка: каталог, корзина, оплаты, доставки и доработка карточки товара под конверсию.",
    h1: "WooCommerce разработка",
    lead: "Магазин на WooCommerce живёт скоростью карточки, понятным checkout и стабильными оплатами.",
    keywords: ["woocommerce разработка", "доработка woocommerce"],
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-30",
    readingMinutes: 8,
    related: ["dorabotka-saitov-na-wordpress", "dorabotka-opencart-magazin"],
    sections: [
      {
        type: "p",
        text: "Типовые задачи: фильтры, вариации, доставка по зонам, онлайн-оплата, выгрузка в маркетплейсы, письма заказа и микроразметка Product.",
      },
      {
        type: "callout",
        text: "Если магазин уже на OpenCart или Битрикс — смотрите отдельные услуги доработки этих CMS.",
      },
    ],
  },
  {
    slug: "dorabotka-saitov-na-php",
    category: "cms",
    title: "Доработка сайтов на PHP: самопис и фреймворки",
    description:
      "Доработка сайтов на PHP — баги, новый функционал, API и интеграции. Как оценить чужой код и снизить риск правок.",
    h1: "Доработка сайтов на PHP",
    lead: "Самописный PHP часто приносит деньги бизнесу и головную боль разработчику. Главное — не переписывать всё сразу.",
    keywords: [
      "доработка сайтов на php",
      "php разработчик",
      "backend разработка",
    ],
    publishedAt: "2026-09-28",
    updatedAt: "2026-09-30",
    readingMinutes: 9,
    related: [
      "backend-razrabotka",
      "integraciya-api",
      "razrabotka-crm",
      "dorabotka-1c-bitrix-obzor",
    ],
    sections: [
      {
        type: "p",
        text: "Доработка сайтов на PHP начинается с доступа к репозиторию или файлам, понимания окружения и карты критичных сценариев: заявки, оплата, личный кабинет. Дальше — точечные задачи с критериями приёмки.",
      },
      { type: "h2", text: "Типичный объём" },
      {
        type: "ul",
        items: [
          "Исправление ошибок и утечек",
          "Новые разделы админки",
          "Интеграция API и вебхуков",
          "Оптимизация SQL и кеша",
          "Подготовка к миграции, если платформа исчерпана",
        ],
      },
      {
        type: "callout",
        text: "Заказать доработку на PHP можно через услугу «Доработка на PHP» — приложите ссылку на сайт и кратко опишите задачу.",
      },
    ],
    faq: [
      {
        q: "Что если кода в Git нет?",
        a: "Работаем с файлами на хостинге, параллельно предлагаем завести репозиторий — иначе следующий подрядчик снова начнёт с нуля.",
      },
    ],
  },
  {
    slug: "dorabotka-1c-bitrix-obzor",
    category: "cms",
    title: "Доработка 1С-Битрикс: компоненты, каталог, обмен",
    description:
      "Доработка Битрикс: шаблоны, компоненты, торговый каталог, обмен с 1С и типичные ошибки кастомизации.",
    h1: "Доработка 1С-Битрикс",
    lead: "Битрикс мощный, но легко «утяжеляется» кастомом. Правим через local/ и события, а не правкой ядра.",
    keywords: ["доработка 1с-битрикс", "доработка битрикс"],
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-30",
    readingMinutes: 8,
    related: ["dorabotka-saitov-na-php", "integraciya-api"],
    sections: [
      {
        type: "p",
        text: "Частые задачи: карточка товара, умный фильтр, оформление заказа, личный кабинет, синхронизация остатков с 1С, ускорение списка товаров.",
      },
      {
        type: "ul",
        items: [
          "Не править ядро — только local и свои модули",
          "Проверять обмен после каждого релиза",
          "Следить за кешем и композитом",
        ],
      },
    ],
  },
  {
    slug: "dorabotka-tilda-vozmozhnosti",
    category: "cms",
    title: "Доработка Tilda: Zero Block, формы и границы платформы",
    description:
      "Доработка сайтов на Tilda: кастомный код, CRM, квизы. Когда Tilda хватает, а когда пора переезжать.",
    h1: "Доработка сайтов на Tilda",
    lead: "Tilda отлично закрывает лендинги. Проблемы начинаются, когда нужен сложный каталог или тысячи статей.",
    keywords: ["доработка тильда", "доработка tilda"],
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: ["dorabotka-saitov-na-wordpress", "verstka-sajta"],
    sections: [
      {
        type: "p",
        text: "В рамках Tilda можно сильно улучшить первый экран, формы, аналитику и Zero Block. Если нужны сложные роли, фильтры и контент-завод — честнее спланировать перенос.",
      },
    ],
  },
  {
    slug: "dorabotka-opencart-magazin",
    category: "cms",
    title: "Доработка OpenCart: модули и оформление заказа",
    description:
      "Доработка OpenCart — фильтры, checkout, оплаты, доставки и конфликты модулей в интернет-магазине.",
    h1: "Доработка OpenCart",
    lead: "У OpenCart сильная экосистема модулей — и столь же сильный риск конфликтов. Чиним по сценарию покупки.",
    keywords: ["доработка opencart", "opencart модули"],
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: ["woocommerce-razrabotka", "dorabotka-1c-bitrix-obzor"],
    sections: [
      {
        type: "ol",
        items: [
          "Проверить путь от карточки до «Спасибо за заказ»",
          "Найти конфликт модулей и переопределений шаблона",
          "Починить оплаты/доставки на тестовых ключах",
          "Ускорить листинги и картинки",
        ],
      },
    ],
  },
  {
    slug: "dorabotka-joomla",
    category: "cms",
    title: "Доработка сайтов на Joomla",
    description:
      "Доработка Joomla: шаблоны, расширения, обновления и миграции на более удобную CMS при необходимости.",
    h1: "Доработка Joomla",
    lead: "Joomla всё ещё встречается на старых проектах. Дорабатываем точечно или готовим перенос без потери URL.",
    keywords: ["доработка joomla"],
    publishedAt: "2026-09-20",
    updatedAt: "2026-09-30",
    readingMinutes: 6,
    related: ["dorabotka-drupal", "dorabotka-modx", "dorabotka-saitov-na-php"],
    sections: [
      {
        type: "p",
        text: "Типичные задачи: шаблон, меню, формы, обновление версии и закрытие уязвимостей. Если расширений мало и ядро старое — иногда дешевле переехать на WordPress с 301.",
      },
    ],
  },
  {
    slug: "dorabotka-drupal",
    category: "cms",
    title: "Доработка сайтов на Drupal",
    description:
      "Доработка Drupal: модули, темы, производительность и поддержка корпоративных порталов.",
    h1: "Доработка Drupal",
    lead: "Drupal берут за гибкость ролей и сложные сущности. Доработка требует аккуратной работы с модулями и кешем.",
    keywords: ["доработка drupal"],
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-30",
    readingMinutes: 6,
    related: ["dorabotka-joomla", "dorabotka-modx", "backend-razrabotka"],
    sections: [
      {
        type: "p",
        text: "Часто правим тему, Views, кастомные типы материалов и интеграции. Перед крупными обновлениями ядра — staging и проверка прав доступа.",
      },
    ],
  },
  {
    slug: "dorabotka-modx",
    category: "cms",
    title: "Доработка сайтов на MODX",
    description:
      "Доработка MODX Revolution: чанки, сниппеты, TV-поля и миграции на другие CMS.",
    h1: "Доработка MODX",
    lead: "MODX любят за свободу вёрстки. Доработка обычно идёт через чанки, сниппеты и аккуратный Fenom/pdoTools.",
    keywords: ["доработка modx"],
    publishedAt: "2026-09-18",
    updatedAt: "2026-09-30",
    readingMinutes: 6,
    related: ["dorabotka-joomla", "dorabotka-drupal", "dorabotka-saitov-na-php"],
    sections: [
      {
        type: "p",
        text: "Берёмся за правки шаблонов, форм, каталогов и ускорение. Если команде заказчика нужен более привычный редактор — обсуждаем перенос.",
      },
    ],
  },
  {
    slug: "backend-razrabotka",
    category: "cms",
    title: "Backend разработка для сайта: API, логика, интеграции",
    description:
      "Backend разработка: серверная логика, API, очереди и интеграции, которые держат заявки и оплаты.",
    h1: "Backend разработка",
    lead: "Красивый frontend бесполезен, если заявка не доходит до CRM. Backend — про надёжные сценарии.",
    keywords: ["backend разработка", "api сайт"],
    publishedAt: "2026-09-17",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: ["integraciya-api", "dorabotka-saitov-na-php", "razrabotka-crm"],
    sections: [
      {
        type: "ul",
        items: [
          "REST/Webhook интеграции",
          "Очереди писем и уведомлений",
          "Права, логи, обработка ошибок",
          "Наблюдаемость: чтобы падения было видно сразу",
        ],
      },
    ],
  },
  {
    slug: "integraciya-api",
    category: "cms",
    title: "Интеграция API на сайте: CRM, оплата, 1С",
    description:
      "Интеграция API: как подключить CRM, платёжку, 1С и сервисы доставки без хрупких костылей.",
    h1: "Интеграция API",
    lead: "Интеграция должна переживать рестарты, таймауты и повторные вебхуки — иначе «раз в неделю теряем заявки».",
    keywords: ["интеграция api", "интеграция crm сайт"],
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-30",
    readingMinutes: 8,
    related: ["razrabotka-crm", "backend-razrabotka", "dorabotka-saitov-na-php"],
    sections: [
      {
        type: "ol",
        items: [
          "Описать сущности и направление данных",
          "Предусмотреть идемпотентность и логи",
          "Сделать тестовый контур",
          "Проверить боевые сценарии и откаты",
        ],
      },
    ],
  },
  {
    slug: "razrabotka-crm",
    category: "cms",
    title: "Разработка и внедрение связки сайт ↔ CRM",
    description:
      "Разработка CRM-связки для сайта: сделки, поля, стадии, ответственность и контроль потерь заявок.",
    h1: "Разработка CRM для заявок с сайта",
    lead: "Цель не «отправить в CRM», а чтобы менеджер увидел сделку с нужными полями вовремя.",
    keywords: ["разработка crm", "интеграция сайта с crm"],
    publishedAt: "2026-09-15",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: ["integraciya-api", "backend-razrabotka"],
    sections: [
      {
        type: "p",
        text: "Настраиваем поля, источники, дубли, уведомления и отчёт «заявка с сайта → статус». Без этого SEO и реклама льют в чёрный ящик.",
      },
    ],
  },
  {
    slug: "verstka-sajta",
    category: "verstka",
    title: "Вёрстка сайта: от макета до CMS",
    description:
      "Вёрстка сайта под дизайн-макет: семантика, адаптив, скорость и подготовка к натяжке на CMS.",
    h1: "Вёрстка сайта",
    lead: "Хорошая вёрстка — это не только «как в Figma», но и доступность, скорость и удобство для следующей CMS.",
    keywords: ["верстка сайта", "html css верстка"],
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: [
      "adaptivnaya-verstka",
      "frontend-razrabotka",
      "natyazhka-verstki-na-wordpress",
    ],
    sections: [
      {
        type: "ul",
        items: [
          "Семантическая разметка и иерархия заголовков",
          "Адаптив от мобильного к десктопу",
          "Оптимизация шрифтов и изображений",
          "Чистая структура под натяжку на WordPress/Битрикс",
        ],
      },
    ],
  },
  {
    slug: "adaptivnaya-verstka",
    category: "verstka",
    title: "Адаптивная вёрстка: чек-лист приёмки",
    description:
      "Адаптивная вёрстка: что проверить на телефоне и планшете перед приёмкой сайта.",
    h1: "Адаптивная вёрстка",
    lead: "Большая часть трафика — с мобильных. Приёмка без телефона не считается.",
    keywords: ["адаптивная верстка", "мобильная версия сайта"],
    publishedAt: "2026-09-22",
    updatedAt: "2026-09-30",
    readingMinutes: 6,
    related: ["verstka-sajta", "frontend-razrabotka"],
    sections: [
      {
        type: "ul",
        items: [
          "Нет горизонтального скролла на ключевых страницах",
          "Кликабельные зоны не меньше пальца",
          "Формы удобно заполнять",
          "Картинки не разъезжают блоки (CLS)",
        ],
      },
    ],
  },
  {
    slug: "html-css-verstka",
    category: "verstka",
    title: "HTML CSS вёрстка без лишнего фреймворка",
    description:
      "HTML/CSS вёрстка: когда хватает чистой вёрстки и когда нужен стек со сборкой.",
    h1: "HTML CSS вёрстка",
    lead: "Для лендинга и простых шаблонов чистый HTML/CSS часто быстрее и легче тяжёлого UI-kit.",
    keywords: ["html css верстка"],
    publishedAt: "2026-09-21",
    updatedAt: "2026-09-30",
    readingMinutes: 5,
    related: ["verstka-sajta", "javascript-razrabotchik"],
    sections: [
      {
        type: "p",
        text: "Используем современный CSS: grid/flex, custom properties, clamp для типографики. JS — только там, где без него нельзя.",
      },
    ],
  },
  {
    slug: "frontend-razrabotka",
    category: "verstka",
    title: "Frontend разработка для коммерческих сайтов",
    description:
      "Frontend разработка: интерактив, формы, анимации и связка с backend без ущерба для SEO.",
    h1: "Frontend разработка",
    lead: "Frontend должен помогать заявке и индексу, а не только «оживлять» макет.",
    keywords: ["frontend разработка", "javascript разработчик"],
    publishedAt: "2026-09-20",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: ["javascript-razrabotchik", "verstka-sajta", "backend-razrabotka"],
    sections: [
      {
        type: "p",
        text: "Для SEO-критичных страниц важна HTML-отдача контента. Тяжёлые виджеты — отложенно, анимации — умеренно, формы — с понятными ошибками.",
      },
    ],
  },
  {
    slug: "javascript-razrabotchik",
    category: "verstka",
    title: "JavaScript разработчик для сайта: что заказывают",
    description:
      "Задачи для JavaScript разработчика на сайте: квизы, калькуляторы, корзина, валидация и интеграции виджетов.",
    h1: "JavaScript разработчик для сайта",
    lead: "Чаще всего нужен не «фреймворк ради фреймворка», а надёжный интерактив вокруг заявки.",
    keywords: ["javascript разработчик"],
    publishedAt: "2026-09-19",
    updatedAt: "2026-09-30",
    readingMinutes: 5,
    related: ["frontend-razrabotka", "integraciya-api"],
    sections: [
      {
        type: "ul",
        items: [
          "Квизы и многошаговые формы",
          "Калькуляторы стоимости",
          "Динамические фильтры каталога",
          "Виджеты чатов и аналитики без убийства LCP",
        ],
      },
    ],
  },
  {
    slug: "podderzhka-sajta",
    category: "podderzhka",
    title: "Поддержка сайта: что входит в сопровождение",
    description:
      "Поддержка сайта: обновления, мониторинг, мелкие правки, бэкапы и реакция на инциденты.",
    h1: "Поддержка сайта",
    lead: "Сайт без поддержки стареет быстро: плагины, сертификаты, формы, чужие правки.",
    keywords: ["поддержка сайта", "сопровождение сайта"],
    publishedAt: "2026-09-28",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: [
      "soprovozhdenie-sajta",
      "tehnicheskaya-podderzhka-sajta",
      "administrirovanie-sajta",
    ],
    sections: [
      {
        type: "ul",
        items: [
          "Регулярные обновления CMS и плагинов",
          "Мониторинг доступности",
          "Пакет часов на мелкие правки",
          "Контроль бэкапов",
        ],
      },
    ],
  },
  {
    slug: "soprovozhdenie-sajta",
    category: "podderzhka",
    title: "Сопровождение сайта после запуска",
    description:
      "Сопровождение сайта: как договориться о SLA, приоритетах задач и развитии функционала.",
    h1: "Сопровождение сайта",
    lead: "Сопровождение — это договорённость о скорости реакции и понятном бэклоге, а не «пишите в чат когда сломается».",
    keywords: ["сопровождение сайта", "обслуживание сайтов"],
    publishedAt: "2026-09-27",
    updatedAt: "2026-09-30",
    readingMinutes: 6,
    related: ["podderzhka-sajta", "obsluzhivanie-saitov"],
    sections: [
      {
        type: "p",
        text: "Фиксируем каналы связи, приоритеты (инцидент / правка / развитие) и ежемесячный отчёт: что сделали, что в очереди, какие риски.",
      },
    ],
  },
  {
    slug: "obsluzhivanie-saitov",
    category: "podderzhka",
    title: "Обслуживание сайтов для бизнеса",
    description:
      "Обслуживание сайтов: пакетные работы для компаний с несколькими площадками или сезонными пиками.",
    h1: "Обслуживание сайтов",
    lead: "Когда сайтов несколько, нужна единая точка ответственности за технику и мелкий функционал.",
    keywords: ["обслуживание сайтов"],
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-30",
    readingMinutes: 5,
    related: ["podderzhka-sajta", "administrirovanie-sajta"],
    sections: [
      {
        type: "p",
        text: "Ведём чек-листы по площадкам: SSL, диск, обновления, формы, цели. Крупные задачи выносим в отдельные сметы доработки.",
      },
    ],
  },
  {
    slug: "tehnicheskaya-podderzhka-sajta",
    category: "podderzhka",
    title: "Техническая поддержка сайта: инциденты и регламент",
    description:
      "Техническая поддержка сайта: что считать инцидентом, как эскалировать и как не потерять заявки.",
    h1: "Техническая поддержка сайта",
    lead: "Инцидент — это когда не работает заявка, оплата или сайт целиком. Всё остальное — очередь правок.",
    keywords: ["техническая поддержка сайта"],
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-30",
    readingMinutes: 6,
    related: ["podderzhka-sajta", "administrirovanie-sajta"],
    sections: [
      {
        type: "ol",
        items: [
          "Зафиксировать симптом и время",
          "Проверить хостинг, DNS, SSL, логи",
          "Откатить последний релиз при необходимости",
          "Сообщить причину и профилактику",
        ],
      },
    ],
  },
  {
    slug: "administrirovanie-sajta",
    category: "podderzhka",
    title: "Администрирование сайта и доступов",
    description:
      "Администрирование сайта: пользователи, роли, обновления, хостинг и порядок в доступах.",
    h1: "Администрирование сайта",
    lead: "Половина «внезапных поломок» — это чужие доступы и обновления без бэкапа.",
    keywords: ["администрирование сайта"],
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-30",
    readingMinutes: 5,
    related: ["podderzhka-sajta", "tehnicheskaya-podderzhka-sajta"],
    sections: [
      {
        type: "ul",
        items: [
          "Реестр доступов и двухфакторка где возможно",
          "Разделение ролей редактор / админ",
          "Календарь обновлений",
          "Проверка бэкапов раз в месяц",
        ],
      },
    ],
  },
  {
    slug: "ispravlenie-oshibok-sajta",
    category: "dorabotka",
    title: "Исправление ошибок сайта: 500, формы, вёрстка",
    description:
      "Исправление ошибок сайта: серверные сбои, битые формы, JS-ошибки и визуальные баги после обновлений.",
    h1: "Исправление ошибок сайта",
    lead: "Сначала воспроизводим и смотрим логи — потом «наугад переустанавливаем плагины».",
    keywords: ["исправление ошибок сайта", "правки на сайте"],
    publishedAt: "2026-09-23",
    updatedAt: "2026-09-30",
    readingMinutes: 6,
    related: ["pravki-na-sajte", "razrabotka-funkcionala-sajta"],
    sections: [
      {
        type: "p",
        text: "Собираем URL, браузер, шаги воспроизведения. Для WordPress/Битрикс проверяем последние обновления и конфликты. Для самописа — стек трейс и окружение.",
      },
    ],
  },
  {
    slug: "pravki-na-sajte",
    category: "dorabotka",
    title: "Правки на сайте: как ставить задачи разработчику",
    description:
      "Правки на сайте без хаоса: скриншоты, приоритет, критерии готовности и пакетные итерации.",
    h1: "Правки на сайте",
    lead: "Чем конкретнее задача, тем дешевле и быстрее правка. «Сделайте красивее» — самый дорогой бриф.",
    keywords: ["правки на сайте"],
    publishedAt: "2026-09-22",
    updatedAt: "2026-09-30",
    readingMinutes: 5,
    related: ["ispravlenie-oshibok-sajta", "razrabotka-funkcionala-sajta"],
    sections: [
      {
        type: "ul",
        items: [
          "Ссылка на страницу и скрин «как сейчас»",
          "Описание «как должно быть»",
          "Приоритет: блокер / важно / можно позже",
          "Дедлайн и ответственный со стороны бизнеса",
        ],
      },
    ],
  },
  {
    slug: "razrabotka-funkcionala-sajta",
    category: "dorabotka",
    title: "Разработка функционала сайта под задачу бизнеса",
    description:
      "Разработка функционала сайта: личные кабинеты, калькуляторы, фильтры, интеграции — от ТЗ до приёмки.",
    h1: "Разработка функционала сайта",
    lead: "Новый функционал начинается с пользовательского сценария, а не с выбора библиотеки.",
    keywords: ["разработка функционала сайта"],
    publishedAt: "2026-09-21",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: ["dorabotka-saitov-na-php", "dorabotka-saitov-na-wordpress"],
    sections: [
      {
        type: "ol",
        items: [
          "Сценарий пользователя и критерии успеха",
          "Ограничения CMS/хостинга",
          "Прототип или user flow",
          "Разработка, тест, документация для редакторов",
        ],
      },
    ],
  },
  {
    slug: "optimizaciya-sajta",
    category: "dorabotka",
    title: "Оптимизация сайта: скорость, код, конверсия",
    description:
      "Оптимизация сайта — не только PageSpeed. Скорость, чистота шаблонов и путь к заявке работают вместе.",
    h1: "Оптимизация сайта",
    lead: "Оптимизация имеет смысл, когда измерили: где теряем секунды и где теряем заявки.",
    keywords: ["оптимизация сайта", "ускорение сайта"],
    publishedAt: "2026-09-20",
    updatedAt: "2026-09-30",
    readingMinutes: 7,
    related: ["kak-uskorit-sajt", "ispravlenie-oshibok-sajta"],
    sections: [
      {
        type: "ul",
        items: [
          "Техника: LCP, кеш, изображения",
          "Код: мёртвые плагины и скрипты",
          "UX: форма, оффер, мобильный CTA",
          "SEO: дубли, тонкий контент, перелинковка",
        ],
      },
    ],
  },
];
