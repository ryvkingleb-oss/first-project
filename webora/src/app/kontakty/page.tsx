import type { Metadata } from "next";
import { Breadcrumbs, JsonLd } from "@/components/ui";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Контакты студии Вебора",
  description: "Связаться со студией Вебора: создание сайтов, доработка и SEO-продвижение.",
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
        <p className="lead">Коротко опишите сайт и цель — ответим с вопросами и ориентиром по формату работ.</p>

        <div className="contact-grid" style={{ marginTop: 28 }}>
          <form className="contact-form" action={`mailto:${site.email}`} method="post" encType="text/plain">
            <label>
              Имя
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              Телефон или Telegram
              <input name="contact" required autoComplete="tel" />
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
            <p className="footer-label">Связь</p>
            <p style={{ marginTop: 10 }}>
              <a href={site.phoneHref}>{site.phone}</a>
            </p>
            <p style={{ marginTop: 8 }}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className="muted" style={{ marginTop: 16 }}>
              {site.city} · работаем удалённо по России
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
