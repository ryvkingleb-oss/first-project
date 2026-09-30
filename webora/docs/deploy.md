# Деплой Сигнала (cignalpro.ru)

Продакшен-домен: **https://cignalpro.ru**  
Превью по IP (пока нет DNS/Caddy): http://109.172.37.155:8792/

Сайт слушает **порт 8792** и **не трогает** Caddy, documentmigrant (:8787) и naryad.

## Яндекс.Вебмастер

1. Добавить сайт `https://cignalpro.ru` (или зеркало с www — выбрать главное).
2. Подтвердить владение: вписать код в `NEXT_PUBLIC_YANDEX_VERIFICATION` на сервере и перезапустить сервис.
3. Отправить sitemap: `https://cignalpro.ru/sitemap.xml` (обновляется автоматически, `revalidate` 1 час).
4. Проверить robots: `https://cignalpro.ru/robots.txt`
5. Для ИИ-ответов: `https://cignalpro.ru/llms.txt`

## Реквизиты

- Почта: info@cignalpro.ru
- Город: Санкт-Петербург
- Исполнитель: частное лицо, самозанятый, ИНН 781019511603

## На сервере

Каталог: `/opt/webora`  
systemd: `webora.service`  
`NEXT_PUBLIC_SITE_URL=https://cignalpro.ru`

```bash
export SSH_ASKPASS=/path/to/askpass SSH_ASKPASS_REQUIRE=force DISPLAY=:0

rsync -az --delete \
  --exclude node_modules --exclude .next --exclude .git \
  ./webora/ masterprorab:/opt/webora/

ssh masterprorab 'bash -s' <<'EOF'
set -e
cd /opt/webora
npm ci
npm run build
systemctl restart webora
curl -fsS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8792/
EOF
```

Когда DNS на cignalpro.ru готов — добавить в Caddy отдельный блок `reverse_proxy` на `:8792` **рядом** с migrant, не меняя его.
