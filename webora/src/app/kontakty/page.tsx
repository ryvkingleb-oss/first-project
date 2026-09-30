import type { Metadata } from "next";
import { MessengerIcons } from "@/components/Messengers";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Контакты студии Сигнал",
  description: "Связаться со студией Сигнал в Telegram, WhatsApp или Max: создание сайтов, доработка и SEO.",
  path: "/kontakty",
});

export default function ContactsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "Контакты", path: "/kontakty" },
        ])}
      />
      <section className="section section-tight">
        <Breadcrumbs items={[{ name: "Главная", href: "/" }, { name: "Контакты" }]} />
        <p className="kicker">Контакты</p>
        <h1>Обсудим задачу</h1>
        <p className="lead">
          Напишите в удобный мессенджер или кратко опишите задачу формой — ответим с вопросами и ориентиром по работам.
        </p>

        <MessengerIcons size="lg" className="contacts-messengers" />

        <div className="contact-grid" style={{ marginTop: 36 }}>
          <form className="contact-form" action={`mailto:${site.email}`} method="post" encType="text/plain">
            <label>
              Имя
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              Telegram / WhatsApp / Max
              <input name="contact" required placeholder="@username или ссылка" autoComplete="off" />
            </label>
            <label>
              Задача
              <textarea name="message" required placeholder="Создать сайт / доработать / SEO…" />
            </label>
            <button className="btn" type="submit">
              Отправить
            </button>
            <p className="muted" style={{ fontSize: "0.9rem" }}>
              Форма открывает почтовый клиент. Можно сразу написать на {site.email}.
            </p>
          </form>
          <div>
            <p className="footer-label">Почта</p>
            <p style={{ marginTop: 8 }}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className="muted" style={{ marginTop: 16 }}>
              {site.city} · работаем удалённо по России
            </p>
            <p className="footer-label" style={{ marginTop: 22 }}>
              Мессенджеры
            </p>
            <MessengerIcons size="lg" className="contacts-messengers-side" />
          </div>
        </div>
      </section>
    </>
  );
}
