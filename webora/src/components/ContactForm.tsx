"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { site } from "@/lib/site";

type Props = {
  className?: string;
  compact?: boolean;
  source?: string;
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ className = "", compact = false, source }: Props) {
  const id = useId();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent || status === "sending") return;

    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const honey = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          message,
          source,
          consent,
          website: honey,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
        return;
      }

      setStatus("success");
      setName("");
      setContact("");
      setMessage("");
      setConsent(false);
    } catch {
      setStatus("error");
      setError("Нет связи с сервером. Напишите напрямую на info@cignalpro.ru");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`form-success ${compact ? "form-success-compact" : ""} ${className}`.trim()}
        role="status"
        aria-live="polite"
      >
        <div className="form-success-icon" aria-hidden>
          ✓
        </div>
        <h3 className="form-success-title">Заявка отправлена</h3>
        <p className="form-success-text">
          Спасибо! Сообщение ушло на <strong>{site.email}</strong>. Отвечу в ближайшее время.
        </p>
        <button type="button" className="btn" onClick={() => setStatus("idle")}>
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form
      className={`contact-form ${compact ? "contact-form-compact" : ""} ${className}`.trim()}
      onSubmit={onSubmit}
      noValidate={false}
    >
      <label htmlFor={`${id}-name`}>
        Имя
        <input
          id={`${id}-name`}
          name="name"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "sending"}
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
          disabled={status === "sending"}
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
          disabled={status === "sending"}
        />
      </label>

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hp-field"
        aria-hidden="true"
      />

      <label className="consent-row" htmlFor={`${id}-consent`}>
        <input
          id={`${id}-consent`}
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={status === "sending"}
        />
        <span>
          Согласен с{" "}
          <Link href="/politika-konfidencialnosti">политикой конфиденциальности</Link> и обработкой
          персональных данных
        </span>
      </label>

      {status === "error" ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Отправляем…" : "Оставить заявку"}
      </button>
      <p className="muted form-hint">
        Заявка придёт на <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </form>
  );
}
