# SEO seeds — семантическое ядро Сигнал (RU)

| query | cluster | URL | type | status |
| --- | --- | --- | --- | --- |
| создание сайтов | sozdanie | /uslugi/sozdanie-saitov | service | live |
| создание сайта под ключ | sozdanie | /uslugi/sozdanie-saitov | service | live |
| разработка сайтов | sozdanie | /uslugi/sozdanie-saitov | service | live |
| сделать сайт | sozdanie | /blog/sozdanie-saitov/kak-zakazat-sozdanie-sajta-pod-klyuch | article | live |
| сколько стоит создание сайта | price | /blog/sozdanie-saitov/skolko-stoit-sozdanie-sajta | article | live |
| структура сайта seo | structure | /blog/sozdanie-saitov/struktura-sajta-pod-seo | article | live |
| доработка сайта | dorabotka | /uslugi/dorabotka-saitov | service | live |
| редизайн сайта | dorabotka | /blog/dorabotka/redizajn-bez-poteri-pozicij | article | live |
| ускорение сайта | speed | /blog/dorabotka/kak-uskorit-sajt | article | live |
| seo продвижение | seo | /uslugi/seo-prodvizhenie | service | live |
| продвижение сайта | seo | /uslugi/seo-prodvizhenie | service | live |
| seo оптимизация | seo | /blog/seo/seo-prodvizhenie-s-nulya | article | live |
| семантическое ядро | kontent | /blog/kontent/semanticheskoe-yadro-dlya-sajta-uslug | article | live |
| контент план seo | kontent | /blog/kontent/kontent-plan-na-1000-statej | article | live |
| техническое seo | tech | /blog/tehnicheskoe-seo/tehnicheskoe-seo-chek-list | article | live |
| core web vitals | tech | /blog/tehnicheskoe-seo/core-web-vitals-dlya-biznesa | article | live |
| sitemap | tech | /blog/tehnicheskoe-seo/sitemap-dlya-bolshogo-sajta | article | live |
| внутренняя перелинковка | seo | /blog/seo/vnutrennyaya-perelinkovka | article | live |
| создание лендинга | sozdanie | /blog/sozdanie-saitov | hub | planned |
| создание интернет магазина | sozdanie | /blog/sozdanie-saitov | hub | planned |
| создание корпоративного сайта | sozdanie | /blog/sozdanie-saitov | hub | planned |
| доработка wordpress | dorabotka | /blog/dorabotka | hub | planned |
| перенос сайта на новый хостинг | dorabotka | /blog/dorabotka | hub | planned |
| яндекс вебмастер | tech | /blog/tehnicheskoe-seo | hub | planned |
| google search console | tech | /blog/tehnicheskoe-seo | hub | planned |
| кластеризация запросов | kontent | /blog/kontent | hub | planned |
| коммерческие факторы seo | seo | /blog/seo | hub | planned |
| локальное seo | seo | /blog/seo | hub | planned |

## Как масштабировать до тысяч статей

1. Добавляйте маркеры в `content/seo-seeds.md` (кластер + query).
2. Запускайте `npm run generate:articles` — скрипт создаёт JSON-заготовки в `content/articles/`.
3. Редактируйте ТЗ/текст, переносите готовое в `src/lib/articles.ts` или подключайте загрузчик JSON.
4. Хабы категорий уже есть: `/blog/[category]`.
5. `sitemap.ts` подхватывает все статьи автоматически.
