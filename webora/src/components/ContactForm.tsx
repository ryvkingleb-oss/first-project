"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { site } from "@/lib/site";

type Props = {
  className?: string;
  compact?: boolean;
  source?: string;
};

export function ContactForm({ className = "", compact = false, source }: Props) {
  const id = useId();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [sentHint, setSentHint] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) return;
    const subject = encodeURIComponent(
      `Заявка с ${site.domain}${source ? ` · ${source}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Имя: ${name}`,
        `Контакт: ${contact}`,
        source ? `Страница: ${source}` : null,
        "",
        "Задача:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSentHint(true);
  }

  return (
    <form className={`contact-form ${compact ? "contact-form-compact" : ""} ${className}`.trim()} onSubmit={onSubmit}>
      <label htmlFor={`${id}-name`}>
        Имя
        <input
          id={`${id}-name`}
          name="name"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor={`${id}-contact`}>
        Telegram / WhatsApp / Max / почта
        <input
          id={`${id}-contact`}
          name="contact"
          required
          placeholder="@username или номер"
          autoComplete="off"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </label>
      <label htmlFor={`${id}-message`}>
        Задача
        <textarea
          id={`${id}-message`}
          name="message"
          required
          placeholder="Создать сайт / доработать / SEO…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <label className="consent-row" htmlFor={`${id}-consent`}>
        <input
          id={`${id}-consent`}
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          Согласен с{" "}
          <Link href="/politika-konfidencialnosti">политикой конфиденциальности</Link> и обработкой
          персональных данных
        </span>
      </label>
      <button className="btn" type="submit">
        Оставить заявку
      </button>
      <p className="muted" style={{ fontSize: "0.9rem" }}>
        Заявка уйдёт на{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
        {sentHint ? ". Если почтовый клиент не открылся — напишите на этот адрес вручную." : "."}
      </p>
    </form>
  );
}
