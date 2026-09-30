import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

type Body = {
  name?: string;
  contact?: string;
  message?: string;
  source?: string;
  consent?: boolean;
  website?: string;
};

function smtpConfig() {
  const host = process.env.SMTP_HOST || "smtp.beget.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || site.email;
  const pass = process.env.SMTP_PASS || "";
  const to = process.env.CONTACT_TO || site.email;
  return { host, port, user, pass, to, secure: port === 465 };
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос" }, { status: 400 });
  }

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

  const smtp = smtpConfig();
  if (!smtp.pass) {
    return NextResponse.json(
      { ok: false, error: "Почта на сервере не настроена. Напишите на info@cignalpro.ru" },
      { status: 503 },
    );
  }

  const subject = `Заявка с ${site.domain}${source ? ` · ${source}` : ""}`;
  const text = [
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    `Страница: ${source || "сайт"}`,
    "",
    "Задача:",
    message,
  ].join("\n");

  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user, pass: smtp.pass },
    });

    await transporter.sendMail({
      from: `"Сигнал — сайт" <${smtp.user}>`,
      to: smtp.to,
      replyTo: contact.includes("@") ? contact : smtp.user,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact mail error", err);
    return NextResponse.json(
      { ok: false, error: "Не удалось отправить письмо. Попробуйте ещё раз или напишите в мессенджер." },
      { status: 502 },
    );
  }
}
