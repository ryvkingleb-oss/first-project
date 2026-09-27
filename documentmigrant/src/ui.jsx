import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api } from "./api.js";
import { useAuth } from "./auth.jsx";

export function Shell({ children }) {
  return (
    <div className="shell">
      <a className="skip" href="#content">
        К содержанию
      </a>
      <header className="top">
        <Link className="brand" to="/">
          Бланки
        </Link>
        <TopNav />
      </header>
      <main className="main" id="content">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav className="foot-links" aria-label="Подвал">
        <Link to="/statyi">Статьи</Link>
        <Link to="/migracionnyj-uchet">Миграционный учёт</Link>
        <Link to="/registraciya-inostrannogo-grazhdanina">Регистрация иностранного гражданина</Link>
        <Link to="/ceny">Цены</Link>
        <Link to="/kontakty">Контакты</Link>
        <Link to="/oferta">Оферта</Link>
        <Link to="/politika">Политика</Link>
      </nav>
      <p className="muted">Сервис готовит файл бланка МВД для печати и не подаёт документы в ведомство.</p>
    </footer>
  );
}

function TopNav() {
  const { user, ready, setUser } = useAuth();
  const navigate = useNavigate();
  if (!ready) return null;
  if (user) {
    return (
      <nav className="nav" aria-label="Кабинет">
        <Link to="/#dokumenty">Документы</Link>
        <Link to="/uslugi">Услуги</Link>
        <Link to="/blanki">Бланки</Link>
        <Link to="/statyi">Статьи</Link>
        <Link to="/ceny">Цены</Link>
        <Link to="/kabinet">{user.name}</Link>
        <button
          className="text-btn"
          type="button"
          onClick={() => {
            api.logout().finally(() => {
              setUser(null);
              navigate("/");
            });
          }}
        >
          Выйти
        </button>
      </nav>
    );
  }
  return (
    <nav className="nav" aria-label="Вход">
      <Link to="/#dokumenty">Документы</Link>
      <Link to="/uslugi">Услуги</Link>
      <Link to="/blanki">Бланки</Link>
      <Link to="/statyi">Статьи</Link>
      <Link to="/ceny">Цены</Link>
      <Link to="/vhod">Войти</Link>
    </nav>
  );
}

export function RequireAuth({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return <p>Загрузка…</p>;
  if (!user) return <Navigate to="/vhod" replace />;
  return children;
}

export function visibleField(showIf, values) {
  if (!showIf) return true;
  return String(values[showIf.field] ?? "") === String(showIf.equals);
}

export function Field({ field, value, error, onChange }) {
  const id = `f-${field.id}`;
  if (field.type === "radio") {
    return (
      <fieldset className="field">
        <legend>{field.label}</legend>
        {field.hint ? <p className="hint">{field.hint}</p> : null}
        <div className="choices">
          {(field.options || []).map((opt) => (
            <label key={opt.value} className="check">
              <input
                type="radio"
                name={field.id}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {error ? <p className="error">{error}</p> : null}
      </fieldset>
    );
  }
  if (field.type === "checkbox") {
    return (
      <label className="field check">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        <span>{field.label}</span>
        {error ? <p className="error">{error}</p> : null}
      </label>
    );
  }
  if (field.type === "select") {
    return (
      <label className="field" htmlFor={id}>
        <span>{field.label}</span>
        {field.hint ? <span className="hint">{field.hint}</span> : null}
        <select id={id} value={value || ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">Выберите</option>
          {(field.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? <p className="error">{error}</p> : null}
      </label>
    );
  }
  if (field.type === "textarea") {
    return (
      <label className="field" htmlFor={id}>
        <span>{field.label}</span>
        {field.hint ? <span className="hint">{field.hint}</span> : null}
        <textarea
          id={id}
          rows={3}
          value={value || ""}
          placeholder={field.placeholder || ""}
          onChange={(e) => onChange(e.target.value)}
        />
        {error ? <p className="error">{error}</p> : null}
      </label>
    );
  }
  return (
    <label className="field" htmlFor={id}>
      <span>{field.label}</span>
      {field.hint ? <span className="hint">{field.hint}</span> : null}
      <input
        id={id}
        type={field.type === "date" ? "date" : "text"}
        value={value || ""}
        placeholder={field.placeholder || ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? <p className="error">{error}</p> : null}
    </label>
  );
}
