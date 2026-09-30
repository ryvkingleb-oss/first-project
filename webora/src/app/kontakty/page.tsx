import type { Metadata } from "next";
import { MessengerIcons } from "@/components/Messengers";
import { ContactForm } from "@/components/ContactForm";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Контакты — Сигнал",
  description: `Связаться с Сигнал в ${site.city}: Telegram, WhatsApp, Max или заявка на ${site.email}. Создание сайтов, доработка и SEO.`,
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
          Напишите в удобный мессенджер или оставьте заявку — отвечу с вопросами и ориентиром по работам.
        </p>

        <MessengerIcons size="lg" className="contacts-messengers" />

        <div className="contact-grid" style={{ marginTop: 36 }}>
          <ContactForm source="/kontakty" />
          <div>
            <p className="footer-label">Почта</p>
            <p style={{ marginTop: 8 }}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className="muted" style={{ marginTop: 16 }}>
              {site.city} · работаю удалённо по России
            </p>
            <p className="footer-label" style={{ marginTop: 22 }}>
              Исполнитель
            </p>
            <p className="muted" style={{ marginTop: 8 }}>
              {site.legal.note}
            </p>
            <p style={{ marginTop: 8 }}>
              ИНН {site.legal.inn}
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
