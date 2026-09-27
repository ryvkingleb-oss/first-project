# documentmigrant.ru — бланки МВД онлайн

Сервис заполнения бланков МВД (Vite + React + Express). SEO-страницы подмешиваются на сервере. Оплата готового PDF — тестовая заглушка.

## Стек

- Node.js 22, Express
- Frontend: Vite + React (сборка в `dist/`)
- PDF: `pdf-lib` + бланки в `server/blanks/` (новые формы без скана — макет полей)
- Хранилище: `data/app-store.json`
- Прокси: Caddy → `HOST:PORT`
- Процесс: systemd `documentmigrant.service`

## Локально

```bash
cd documentmigrant   # или корень деплоя /opt/documentmigrant
cp .env.example .env
npm ci
npm run build
npm start
```

Откройте `http://127.0.0.1:8787/` (если `HOST=127.0.0.1`).

## Деплой только в `/opt/documentmigrant`

**Не трогайте** Docker/`/opt/naryad` (masterprorab.ru).

```bash
# на сервере, от root
rsync -a --delete \
  --exclude node_modules --exclude data --exclude .env \
  ./documentmigrant/ /opt/documentmigrant/

cd /opt/documentmigrant
cp -n .env.example .env   # если .env ещё нет
npm ci
npm run build
systemctl restart documentmigrant
systemctl status documentmigrant --no-pager
curl -sS http://172.18.0.1:8787/api/health
```

Проверка сайта: `https://documentmigrant.ru/api/health` и `/sitemap.xml`.

### systemd (кратко)

```ini
[Unit]
Description=Documentmigrant
After=network.target

[Service]
Type=simple
User=documentmigrant
WorkingDirectory=/opt/documentmigrant
EnvironmentFile=/opt/documentmigrant/.env
ExecStart=/usr/bin/node server/index.mjs
Restart=always

[Install]
WantedBy=multi-user.target
```

Caddy уже проксирует `documentmigrant.ru` на `HOST:PORT` из `.env` (часто `172.18.0.1:8787`).

## Статус бланков

Актуальная таблица ready / stub: [`docs/STATUS.md`](docs/STATUS.md). Источник в коде: `server/catalog.mjs`.

## Волна A (готово)

| Документ | URL |
|----------|-----|
| Уведомление о прибытии (+ ребёнок) | `/dokument/pribytie` |
| Уведомление об убытии | `/dokument/ubytie` |
| Патент (работа, не ИП) | `/dokument/patent` |
| РВП взрослый | `/dokument/rvp` |
| ВНЖ | `/dokument/vnzh` |
| Подтверждение по ВНЖ | `/dokument/vnzh-podtverzhdenie` |
| Подтверждение по РВП | `/dokument/rvp-podtverzhdenie` |
| Гражданство | `/dokument/grazhdanstvo` |

В прибытии: переключатель «Взрослый / Ребёнок» и CTA «Заполнить на ребёнка».

## Волна B (заглушки «Скоро»)

Маршруты уже в sitemap и меню: работодатель ТД (заключение/расторжение), продление патента, РВП/ВНЖ/гражданство ребёнку.

## Дисклеймеры

- Файл в МВД и на Госуслуги **сам не уходит**.
- Патент на работу **≠** патент ИП.
- Оферта / политика — **заглушки «для юриста»**.
- Сервис **не гарантирует** одобрение или приём бланка без замечаний.

## Оплата

- По умолчанию stub/test: кнопка «после оплаты скачать» без списания.
- Живая касса не подключена.

## SEO

- `https://documentmigrant.ru/sitemap.xml`
- `https://documentmigrant.ru/robots.txt`
- Контент страниц: `server/seo-pages.mjs`
