import fs from "node:fs";
import path from "node:path";

function loadEnvFile() {
  const file = path.resolve(".env");
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i < 0) continue;
    const key = trimmed.slice(0, i).trim();
    const value = trimmed.slice(i + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile();

const num = (key, fallback) => {
  const n = Number(process.env[key]);
  return Number.isFinite(n) ? n : fallback;
};

export const config = {
  port: num("PORT", 8787),
  host: process.env.HOST || "127.0.0.1",
  siteUrl: (process.env.SITE_URL || "https://documentmigrant.ru").replace(/\/$/, ""),
  sessionSecret: process.env.SESSION_SECRET || "change-me-documentmigrant-dev",
  cookieSecure: process.env.COOKIE_SECURE === "1",
  priceRub: num("PRICE_RUB", 490),
  metrikaId: process.env.METRIKA_ID || "113097423",
  yookassa: {
    shopId: process.env.YOOKASSA_SHOP_ID || "",
    secretKey: process.env.YOOKASSA_SECRET_KEY || "",
    returnUrl: process.env.YOOKASSA_RETURN_URL || "",
  },
  admin: {
    email: process.env.ADMIN_EMAIL || "",
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
    telegramChatId: process.env.TELEGRAM_CHAT_ID || "",
  },
  dataDir: path.resolve(process.env.DATA_DIR || "data"),
  retentionDays: num("PDN_RETENTION_DAYS", 90),
};

export const paymentLive = Boolean(config.yookassa.shopId && config.yookassa.secretKey);
