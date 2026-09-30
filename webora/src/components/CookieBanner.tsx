"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cignal_cookie_ok";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Уведомление о cookies">
      <p>
        Сайт использует cookies и похожие технологии для работы и аналитики. Продолжая пользоваться сайтом, вы
        соглашаетесь с{" "}
        <Link href="/politika-konfidencialnosti">политикой конфиденциальности</Link>.
      </p>
      <button type="button" className="btn btn-compact" onClick={accept}>
        Понятно
      </button>
    </div>
  );
}
