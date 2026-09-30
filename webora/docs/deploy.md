# Деплой Веборы на 109.172.37.155

Сайт слушает **отдельный порт 8792** и **не трогает** Caddy, documentmigrant (:8787) и naryad.

## URL превью

http://109.172.37.155:8792/

Мигранты остаются:

- http://109.172.37.155/ и https://documentmigrant.ru/ → :8787

## На сервере

Каталог: `/opt/webora`  
systemd: `webora.service`  
Пользователь: `webora`

## Обновление с машины разработки

```bash
export SSH_ASKPASS=/path/to/askpass SSH_ASKPASS_REQUIRE=force DISPLAY=:0
# или ваш ssh-ключ на masterprorab

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

UFW (если включён): `ufw allow 8792/tcp`

Когда появится домен — добавить отдельный блок в Caddy **рядом** с migrant/naryad, не меняя их `reverse_proxy`.
