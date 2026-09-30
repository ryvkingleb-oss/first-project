"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { nav } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        type="button"
        className={`menu-toggle${open ? " is-open" : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
          />
          <nav id={panelId} className="mobile-menu-panel" aria-label="Мобильная навигация">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link className="mobile-menu-cta" href="/kontakty" onClick={() => setOpen(false)}>
              Оставить заявку
            </Link>
          </nav>
        </>
      )}
    </div>
  );
}
