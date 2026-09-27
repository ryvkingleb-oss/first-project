import React, { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api } from "./api.js";
import { useAuth } from "./auth.jsx";
import { comingSoon, getProcedure, homeBlurbs, procedures } from "./procedures/index.js";
import { Field, RequireAuth, visibleField } from "./ui.jsx";

const needLabel = { always: "Обычно нужно", if: "Не всем", check: "Нужна сверка" };

const processSteps = [
  { title: "Регистрация", text: "Создаёте кабинет. Без него список можно читать, а свой файл — нет." },
  { title: "Заполнение", text: "Вписываете те же поля, что на бланке МВД. Пустой бланк можно скачать сразу." },
  { title: "Проверка", text: "Сверяете ответы и сразу скачиваете готовый файл для печати." },
  { title: "Скачивание и печать", text: "Получаете бланк с вашими ответами. Подпись ставите от руки и несёте сами." },
];

export function HomePage() {
  const checkedOn = procedures[0]?.official?.checkedOn || "";
  const [y, m, d] = checkedOn.split("-");
  const dateLabel = d && m && y ? `${d}.${m}.${y}` : checkedOn;
  return (
    <div className="home">
      <section className="hero">
        <p className="kicker">Помощник, не портал МВД</p>
        <h1>Выберите документ, заполните форму и скачайте официальный бланк для печати</h1>
        <div className="hero-actions">
          <a className="btn" href="#dokumenty">
            Выбрать документ
          </a>
          <Link className="btn-quiet" to="/vhod">
            Войти
          </Link>
        </div>
        <p className="note">
          <strong>Сейчас</strong> доступны списки, чек-листы, пустые бланки и готовый файл. В подразделение несёте сами — подпись от руки.
          Файл в МВД сам не уходит. Патент на работу ≠ патент ИП.
        </p>
      </section>

      <section id="dokumenty" className="home-block" aria-labelledby="docs-title">
        <h2 id="docs-title">Документы для заполнения</h2>
        <div className="cards">
          {procedures.map((p) => (
            <Link key={p.id} className="card" to={`/dokument/${p.id}`}>
              <h3>{p.shortTitle}</h3>
              <p>{homeBlurbs[p.id] ?? p.summary}</p>
              <span className="card-go">Открыть список и бланк</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-block" aria-labelledby="soon-title">
        <h2 id="soon-title">Скоро</h2>
        <div className="cards">
          {comingSoon.map((p) => (
            <Link key={p.id} className="card" to={`/dokument/${p.id}`}>
              <h3>{p.shortTitle}</h3>
              <p>{p.summary}</p>
              <span className="card-go">Открыть страницу</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-block" aria-labelledby="steps-title">
        <h2 id="steps-title">Как это проходит</h2>
        <ol className="process">
          {processSteps.map((step, i) => (
            <li key={step.title}>
              <span className="num">{i + 1}</span>
              <div>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className="home-foot muted">
        Сверка бланков: {dateLabel || "—"}. Сервис не подаёт документы в МВД и не гарантирует приём файла.
      </p>
    </div>
  );
}

export function DocumentPage() {
  const { procedureId } = useParams();
  const procedure = getProcedure(procedureId);
  const soon = !procedure ? comingSoon.find((x) => x.id === procedureId) : null;
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const childPrefill = search.get("mode") === "child";

  if (soon) {
    return (
      <div className="stack-lg">
        <header className="stack">
          <p className="kicker">Скоро</p>
          <h1>{soon.title}</h1>
          <p className="lead">{soon.summary}</p>
        </header>
        <p className="note">Скоро. Мастер заполнения ещё не открыт — это заглушка волны B без кнопки заполнения.</p>
        <p className="warn">
          Файл в МВД сам не уходит. Юридические тексты — заглушки «для юриста». Не обещаем одобрение ведомства.
        </p>
        <div className="row">
          <Link className="btn-quiet" to="/#dokumenty">
            К доступным бланкам
          </Link>
          <Link className="btn-quiet" to="/uslugi">
            Услуги
          </Link>
        </div>
      </div>
    );
  }

  if (!procedure) return <p className="error">Такого бланка нет.</p>;

  async function start(mode) {
    if (!user) {
      navigate(`/registraciya?next=${encodeURIComponent(`/dokument/${procedure.id}${mode === "child" ? "?mode=child" : ""}`)}`);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const created = await api.createDocument(procedure.id);
      if (mode === "child" || (procedure.id === "pribytie" && childPrefill)) {
        await api.saveDocument(created.document.id, { personKind: "child" }, 0);
      } else if (procedure.id === "pribytie") {
        await api.saveDocument(created.document.id, { personKind: "adult" }, 0);
      }
      navigate(`/zayavlenie/${created.document.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось начать");
      setBusy(false);
    }
  }

  return (
    <div className="stack-lg">
      <header className="stack">
        <p className="kicker">Бланк МВД</p>
        <h1>{procedure.title}</h1>
        <p className="lead">{procedure.summary}</p>
      </header>

      <section className="sample">
        <a className="btn-quiet" href={`/api/blanks/${procedure.id}`}>
          Скачать бланк
        </a>
        <p>Пустой образец бланка МВД. Ваших ответов в этом файле нет.</p>
        <p className="muted">Заполненный файл скачивается после тестовой оплаты на шаге оплаты.</p>
      </section>

      {(procedure.about || []).map((p) => (
        <p key={p}>{p}</p>
      ))}

      <p className="warn">
        Файл в МВД и на Госуслуги сам не уходит. Подпись — от руки. Мы не гарантируем, что подразделение примет файл без замечаний.
        {procedure.id === "patent" ? " Патент на работу иностранца — не патент для ИП." : ""}
        {procedure.pdfMode === "layout"
          ? " PDF собран по макету полей сервиса: перед подачей сверьте с актуальной формой на сайте МВД."
          : " PDF заполняется на бланке из комплекта МВД, который лежит на сервере."}
      </p>

      {procedure.whereTitle ? (
        <section>
          <h2>{procedure.whereTitle}</h2>
          <ul className="list">
            {(procedure.where || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h2>Сроки</h2>
        <ul className="list">
          {(procedure.timing || []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {procedure.checklist?.length ? (
        <section className="stack">
          <h2>Что приложить</h2>
          <p className="muted">Короткий чек-лист. Полный перечень сверьте в регламенте МВД.</p>
          {procedure.checklist.map((block) => (
            <div key={block.id} className="sheet stack">
              <h3>{block.title}</h3>
              {block.items.map((item) => (
                <div key={item.id} className="item">
                  <strong>{item.title}</strong>
                  <p>{item.what}</p>
                  <p className="muted">Кто: {item.who}</p>
                  {item.exceptions ? <p className="muted">Исключения: {item.exceptions}</p> : null}
                  <p className="muted">{needLabel[item.need] || item.need}</p>
                </div>
              ))}
            </div>
          ))}
        </section>
      ) : null}

      <div className="row">
        <button className="btn" type="button" disabled={busy} onClick={() => start("adult")}>
          {busy ? "Открываю…" : "Заполнить онлайн"}
        </button>
        {procedure.id === "pribytie" ? (
          <button className="btn-quiet" type="button" disabled={busy} onClick={() => start("child")}>
            Заполнить на ребёнка
          </button>
        ) : null}
        <Link className="btn-quiet" to="/blanki">
          Все бланки
        </Link>
      </div>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}

function validateStep(step, values) {
  const errors = {};
  for (const group of step.groups || []) {
    if (!visibleField(group.showIf, values)) continue;
    for (const field of group.fields || []) {
      if (!visibleField(field.showIf, values)) continue;
      if (!field.required) continue;
      const raw = values[field.id];
      const empty =
        field.type === "checkbox" ? !raw : String(raw ?? "").trim() === "";
      if (empty) errors[field.id] = "Заполните поле";
    }
  }
  return errors;
}

export function WizardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [values, setValues] = useState({});
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  React.useEffect(() => {
    if (!id) return;
    api
      .document(id)
      .then((data) => {
        setDoc(data.document);
        setValues(data.document.values || {});
        setStep(data.document.step || 0);
      })
      .catch((e) => setMessage(e instanceof Error ? e.message : "Документ не найден"));
  }, [id]);

  const procedure = getProcedure(doc?.procedureId);
  if (message && !doc) return <p className="error">{message}</p>;
  if (!doc || !procedure) return <p>Открываю бланк…</p>;

  const done = step >= procedure.steps.length;
  const current = procedure.steps[Math.min(step, procedure.steps.length - 1)];

  function setValue(fieldId, value) {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  }

  async function save(nextStep, nextValues) {
    setBusy(true);
    setMessage("");
    try {
      const data = await api.saveDocument(id, nextValues, nextStep);
      setDoc(data.document);
      setValues(data.document.values || nextValues);
      setStep(data.document.step ?? nextStep);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Не удалось сохранить");
    } finally {
      setBusy(false);
    }
  }

  async function next() {
    const errs = validateStep(current, values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    await save(step + 1, values);
  }

  async function back() {
    await save(Math.max(0, step - 1), values);
  }

  if (done) {
    return (
      <div className="stack-lg">
        <header className="stack">
          <p className="kicker">Черновик готов</p>
          <h1>{procedure.shortTitle}</h1>
          <p className="lead">Сверьте ответы. Дальше — тестовая оплата и скачивание PDF.</p>
        </header>
        <div className="sheet stack">
          {Object.entries(values)
            .filter(([, v]) => v !== "" && v !== false && v != null)
            .map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {String(value)}
              </p>
            ))}
        </div>
        <div className="row">
          <button className="btn-quiet" type="button" disabled={busy} onClick={() => save(procedure.steps.length - 1, values)}>
            Вернуться к полям
          </button>
          <button className="btn" type="button" onClick={() => navigate(`/zayavlenie/${id}/oplata`)}>
            К оплате и скачиванию
          </button>
        </div>
        {message ? <p className="error">{message}</p> : null}
      </div>
    );
  }

  return (
    <div className="stack-lg">
      <header className="stack">
        <p className="kicker">
          Шаг {step + 1} из {procedure.steps.length}
        </p>
        <h1>{current.title}</h1>
        {current.lead ? <p className="lead">{current.lead}</p> : null}
      </header>

      {(current.groups || []).map((group) => {
        if (!visibleField(group.showIf, values)) return null;
        const fields = (group.fields || []).filter((f) => visibleField(f.showIf, values));
        if (!fields.length) return null;
        return (
          <section key={group.id} className="sheet stack">
            {group.title ? <h2 className="group-title">{group.title}</h2> : null}
            {group.hint ? <p className="hint">{group.hint}</p> : null}
            {fields.map((field) => (
              <Field
                key={field.id}
                field={field}
                value={values[field.id]}
                error={errors[field.id]}
                onChange={(v) => setValue(field.id, v)}
              />
            ))}
          </section>
        );
      })}

      <div className="row">
        <button className="btn-quiet" type="button" disabled={busy || step === 0} onClick={back}>
          Назад
        </button>
        <button className="btn" type="button" disabled={busy} onClick={next}>
          {step + 1 === procedure.steps.length ? "К проверке" : "Далее"}
        </button>
      </div>
      {message ? <p className="error">{message}</p> : null}
    </div>
  );
}

export function PaymentPage() {
  const { id = "" } = useParams();
  const [doc, setDoc] = useState(null);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [emailNote, setEmailNote] = useState("");

  React.useEffect(() => {
    Promise.all([api.document(id), api.quote(id)])
      .then(([d, q]) => {
        setDoc(d.document);
        setQuote(q);
        setEmail(d.document.emails?.at?.(-1)?.to || "");
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Не открылось"));
  }, [id]);

  async function pay() {
    setBusy(true);
    setError("");
    try {
      const data = await api.checkout(id);
      setDoc(data.document);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось открыть файл");
    } finally {
      setBusy(false);
    }
  }

  async function sendEmail(e) {
    e.preventDefault();
    setBusy(true);
    setEmailNote("");
    setError("");
    try {
      await api.email(id, email);
      setEmailNote("Запись о письме сохранена в кабинете (наружу тестовое письмо не уходит).");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось");
    } finally {
      setBusy(false);
    }
  }

  if (!doc || !quote) return <p>{error || "Загрузка…"}</p>;
  const procedure = getProcedure(doc.procedureId);

  return (
    <div className="stack-lg">
      <header className="stack">
        <p className="kicker">После оплаты — скачать</p>
        <h1>{procedure?.shortTitle || doc.title}</h1>
        <p className="lead">
          Касса тестовая: деньги не списываются. Это плата сервиса за файл, не госпошлина и не платёж в МВД.
        </p>
      </header>
      <p className="price">{quote.amountRub} ₽</p>
      <p className="muted">{quote.note}</p>
      <p className="warn">Файл в МВД сам не уходит. Подпись ставите от руки.</p>

      {!doc.paid ? (
        <button className="btn" type="button" disabled={busy} onClick={pay}>
          {busy ? "Открываю…" : "Подтвердить тестовую оплату и скачать"}
        </button>
      ) : (
        <div className="stack">
          <a className="btn" href={`/api/documents/${id}/file.pdf`}>
            Скачать PDF
          </a>
          <a className="btn-quiet" href={`/api/documents/${id}/file.pdf?disposition=inline`} target="_blank" rel="noreferrer">
            Открыть в браузере
          </a>
          <form className="stack" onSubmit={sendEmail}>
            <label className="field">
              <span>Отправить себе копию (запись в кабинете)</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </label>
            <button className="btn-quiet" type="submit" disabled={busy}>
              Сохранить отправку
            </button>
          </form>
          {emailNote ? <p className="muted">{emailNote}</p> : null}
        </div>
      )}
      {error ? <p className="error">{error}</p> : null}
      <Link className="btn-quiet" to={`/zayavlenie/${id}`}>
        Вернуться к черновику
      </Link>
    </div>
  );
}

export function AuthPage({ mode }) {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const next = search.get("next") || "/kabinet";

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data =
        mode === "register"
          ? await api.register({ email, name, password })
          : await api.login({ email, password });
      setUser(data.user);
      navigate(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="stack-lg">
      <header className="stack">
        <p className="kicker">Кабинет</p>
        <h1>{mode === "register" ? "Регистрация" : "Вход"}</h1>
      </header>
      <form className="stack" onSubmit={submit}>
        {mode === "register" ? (
          <label className="field">
            <span>Как к вам обращаться</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        ) : null}
        <label className="field">
          <span>Почта</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="field">
          <span>Пароль</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        </label>
        <button className="btn" type="submit" disabled={busy}>
          {mode === "register" ? "Создать кабинет" : "Войти"}
        </button>
      </form>
      {error ? <p className="error">{error}</p> : null}
      <p className="muted">
        {mode === "register" ? (
          <>
            Уже есть кабинет? <Link to="/vhod">Войти</Link>
          </>
        ) : (
          <>
            Нет кабинета? <Link to="/registraciya">Зарегистрироваться</Link>
          </>
        )}
      </p>
    </div>
  );
}

export function KabinetPage() {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState("");
  React.useEffect(() => {
    api
      .documents()
      .then((data) => setDocs(data.documents || []))
      .catch((e) => setError(e instanceof Error ? e.message : "Ошибка"));
  }, []);
  return (
    <div className="stack-lg">
      <header className="stack">
        <p className="kicker">Кабинет</p>
        <h1>Ваши черновики</h1>
      </header>
      {error ? <p className="error">{error}</p> : null}
      {!docs.length ? <p className="muted">Пока пусто. Выберите документ на главной.</p> : null}
      <ul className="list">
        {docs.map((d) => (
          <li key={d.id}>
            <Link to={d.paid ? `/zayavlenie/${d.id}/oplata` : `/zayavlenie/${d.id}`}>
              {d.title} — {d.paid ? "скачать" : "продолжить"}
            </Link>
          </li>
        ))}
      </ul>
      <Link className="btn" to="/#dokumenty">
        Новый документ
      </Link>
    </div>
  );
}

export function SimplePublicPage({ title, lead, blocks, cta }) {
  return (
    <div className="stack-lg">
      <header className="stack">
        <p className="kicker">Справка</p>
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
      </header>
      {(blocks || []).map((block, i) => (
        <section key={i} className="stack">
          {block.heading ? <h2>{block.heading}</h2> : null}
          {block.warn ? <p className="warn">{block.warn}</p> : null}
          {(block.paragraphs || []).map((p) => (
            <p key={p}>{p}</p>
          ))}
          {block.items?.length ? (
            <ul className="list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      {cta ? (
        <Link className="btn" to={cta.to}>
          {cta.label}
        </Link>
      ) : null}
    </div>
  );
}

export { RequireAuth };
