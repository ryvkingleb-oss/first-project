import { config } from "./config.mjs";
import { logEvent } from "./store.mjs";

export async function notifyAdminPayment({ order, document, mode }) {
  const text = [
    "Новая оплата documentmigrant.ru",
    `Режим: ${mode}`,
    `Заказ: ${order?.id}`,
    `Документ: ${document?.id || order?.documentId}`,
    `Сумма: ${order?.amountRub} ₽`,
    `Процедура: ${document?.procedureId || "—"}`,
  ].join("\n");

  if (config.admin.telegramBotToken && config.admin.telegramChatId) {
    try {
      await fetch(`https://api.telegram.org/bot${config.admin.telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: config.admin.telegramChatId,
          text,
        }),
      });
    } catch (error) {
      logEvent("telegram_fail", { message: String(error) });
    }
  }

  if (config.admin.email) {
    // Почта: заглушка в лог. Подключите SMTP/mailer при наличии.
    logEvent("admin_email_stub", { to: config.admin.email, text });
  } else {
    logEvent("admin_notify", { text });
  }
}
