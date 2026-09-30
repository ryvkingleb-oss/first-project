import { NextResponse } from "next/server";

/** Клиентская форма шлёт напрямую в FormSubmit; маршрут оставлен как заглушка. */
export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "Используйте форму на сайте — отправка идёт с браузера на info@cignalpro.ru",
    },
    { status: 405 },
  );
}
