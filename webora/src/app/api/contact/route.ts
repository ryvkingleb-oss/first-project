import { NextResponse } from "next/server";
import { site } from "@/lib/site";

type Body = {
  name?: string;
  contact?: string;
  message?: string;
  source?: string;
  consent?: boolean;
  website?: string; // honeypot
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

  // Honeypot: bots fill this, humans don't
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const contact = String(body.contact ?? "").trim();
  const message = String(body.message ?? "").trim();
  const source = String(body.source ?? "").trim();

  if (!body.consent || !name || !contact || !message) {
    return NextResponse.json({ ok: false, error: "Заполните все поля и согласие" }, { status: 400 });
  }

  if (name.length > 120 || contact.length > 200 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: "Слишком длинные данные" }, { status: 400 });
  }

  const subject = `Заявка с ${site.domain}${source ? ` · ${source}` : ""}`;

  try {
    const upstream = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        contact,
        message,
        source: source || "сайт",
        _subject: subject,
        _template: "table",
        _captcha: "false",
        _replyto: contact.includes("@") ? contact : site.email,
      }),
      cache: "no-store",
    });

    const payload = (await upstream.json().catch(() => ({}))) as {
      success?: string | boolean;
      message?: string;
      error?: string;
    };

    if (!upstream.ok) {
      const hint =
        payload.message ||
        payload.error ||
        "Не удалось отправить. Проверьте почту info@cignalpro.ru — возможно, нужно подтвердить FormSubmit.";
      return NextResponse.json({ ok: false, error: hint }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Сервис отправки временно недоступен. Напишите на info@cignalpro.ru" },
      { status: 502 },
    );
  }
}
