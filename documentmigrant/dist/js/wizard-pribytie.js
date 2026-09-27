(function () {
  const root = document.getElementById("wizard");
  const schemaEl = document.getElementById("wizard-schema");
  if (!root || !schemaEl) return;

  const schema = JSON.parse(schemaEl.textContent);
  const price = Number(root.dataset.price || 490);
  const authed = root.dataset.authed === "1";
  const procedureId = root.dataset.procedure || schema.procedureId || "pribytie";
  const slug = root.dataset.slug || schema.slug || "uvedomlenie-o-pribytii";
  const draftKey = "dm_draft_" + procedureId + "_v1";
  const params = new URLSearchParams(location.search);
  let docId = params.get("doc") || "";
  let step = 0;
  let values = {};
  let orderId = "";
  let paid = false;
  let busy = false;

  try {
    const saved = JSON.parse(localStorage.getItem(draftKey) || "null");
    if (saved && saved.values) {
      values = saved.values;
      step = Number(saved.step) || 0;
      if (!docId && saved.docId) docId = saved.docId;
    }
  } catch (_) {}

  function saveLocal() {
    localStorage.setItem(draftKey, JSON.stringify({ values, step, docId }));
  }

  async function api(path, options) {
    const res = await fetch(path, {
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "same-origin",
      ...options,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Не получилось выполнить запрос");
    return data;
  }

  function fieldHtml(field) {
    const val = values[field.id] ?? "";
    const hint = field.hint ? `<span class="hint">${field.hint}</span>` : "";
    if (field.type === "radio") {
      return `<div class="field"><span>${field.label}${field.required ? " *" : ""}</span>${hint}
        <div class="choices">${field.options
          .map(
            (opt) =>
              `<label><input type="radio" name="${field.id}" value="${opt.value}" ${
                val === opt.value ? "checked" : ""
              } /> ${opt.label}</label>`
          )
          .join("")}</div></div>`;
    }
    if (field.type === "select") {
      return `<div class="field"><label for="${field.id}">${field.label}${field.required ? " *" : ""}</label>${hint}
        <select id="${field.id}" name="${field.id}">
          <option value="">Выберите</option>
          ${field.options
            .map((opt) => `<option value="${opt.value}" ${val === opt.value ? "selected" : ""}>${opt.label}</option>`)
            .join("")}
        </select></div>`;
    }
    if (field.type === "textarea") {
      return `<div class="field"><label for="${field.id}">${field.label}${field.required ? " *" : ""}</label>${hint}
        <textarea id="${field.id}" name="${field.id}" placeholder="${field.placeholder || ""}">${val}</textarea></div>`;
    }
    return `<div class="field"><label for="${field.id}">${field.label}${field.required ? " *" : ""}</label>${hint}
      <input id="${field.id}" name="${field.id}" type="${field.type || "text"}" value="${String(val).replace(/"/g, "&quot;")}" placeholder="${
      field.placeholder || ""
    }" /></div>`;
  }

  function collect(form) {
    const next = { ...values };
    schema.steps[step].fields.forEach((field) => {
      if (field.type === "radio") {
        const checked = form.querySelector(`input[name="${field.id}"]:checked`);
        next[field.id] = checked ? checked.value : "";
      } else {
        const el = form.elements[field.id];
        next[field.id] = el ? el.value.trim() : "";
      }
    });
    return next;
  }

  function validate(stepValues) {
    for (const field of schema.steps[step].fields) {
      if (field.required && !stepValues[field.id]) {
        return `Заполните поле «${field.label}»`;
      }
    }
    return "";
  }

  async function ensureDoc() {
    if (!authed) return;
    if (docId) {
      await api(`/api/documents/${docId}`, {
        method: "PUT",
        body: JSON.stringify({ values, step }),
      });
      return;
    }
    const created = await api("/api/documents", {
      method: "POST",
      body: JSON.stringify({ procedureId, values, step }),
    });
    docId = created.document.id;
    paid = Boolean(created.document.paid);
    saveLocal();
  }

  function renderReview() {
    const rows = Object.entries(values)
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><th>${k}</th><td>${String(v)}</td></tr>`)
      .join("");
    root.innerHTML = `
      <h2>Проверьте ответы</h2>
      <p class="muted">Сверьте с паспортом. После оплаты скачаете PDF. Подпись на бумаге — ручкой.</p>
      <p class="price-tag">${price} ₽</p>
      <p class="muted">Это плата за файл на сайте, не пошлина в МВД.${authed ? "" : " Чтобы оплатить — войдите в кабинет."}</p>
      <div style="overflow:auto"><table class="table"><tbody>${rows}</tbody></table></div>
      <div class="wizard-bar">
        <button class="btn-quiet" type="button" data-back>Назад</button>
        ${
          paid
            ? `<a class="btn" href="/api/documents/${docId}/file.pdf">Скачать PDF</a>`
            : authed
              ? `<button class="btn" type="button" data-pay>Оплатить</button>`
              : `<a class="btn" href="/vhod?next=${encodeURIComponent("/zapolnit/" + slug)}">Войти и оплатить</a>`
        }
      </div>
      <p class="error" hidden data-err></p>
      <div data-paybox></div>`;
    root.querySelector("[data-back]").onclick = () => {
      step = schema.steps.length - 1;
      render();
    };
    const payBtn = root.querySelector("[data-pay]");
    if (payBtn) payBtn.onclick = () => startPay();
  }

  async function startPay() {
    if (busy) return;
    busy = true;
    const err = root.querySelector("[data-err]");
    const box = root.querySelector("[data-paybox]");
    try {
      await ensureDoc();
      const data = await api(`/api/documents/${docId}/checkout`, {
        method: "POST",
        body: JSON.stringify({}),
      });
      orderId = data.orderId;
      if (data.mode === "yookassa" && data.confirmationUrl) {
        location.href = data.confirmationUrl;
        return;
      }
      box.innerHTML = `
        <div class="note stack">
          <p><strong>Пока тестовая оплата</strong></p>
          <p class="muted">${data.quote.note}</p>
          <button class="btn" type="button" data-confirm>Подтвердить и скачать файл</button>
        </div>`;
      box.querySelector("[data-confirm]").onclick = async () => {
        const done = await api(`/api/orders/${orderId}/confirm-test`, { method: "POST", body: "{}" });
        paid = true;
        docId = done.document.id;
        localStorage.removeItem(draftKey);
        renderReview();
      };
    } catch (e) {
      err.hidden = false;
      err.textContent = e.message;
    } finally {
      busy = false;
    }
  }

  function render() {
    saveLocal();
    if (step >= schema.steps.length) {
      renderReview();
      return;
    }
    const current = schema.steps[step];
    root.innerHTML = `
      <div class="steps-bar">${schema.steps
        .map((_, i) => `<span class="${i <= step ? "on" : ""}"></span>`)
        .join("")}</div>
      <p class="kicker">Шаг ${step + 1} из ${schema.steps.length}</p>
      <h2>${current.title}</h2>
      <form data-form>
        ${current.fields.map(fieldHtml).join("")}
        <p class="error" hidden data-err></p>
        <div class="wizard-bar">
          <button class="btn-quiet" type="button" data-back ${step === 0 ? "disabled" : ""}>Назад</button>
          <button class="btn" type="submit">${step === schema.steps.length - 1 ? "Проверить ответы" : "Дальше"}</button>
        </div>
      </form>`;
    const form = root.querySelector("[data-form]");
    root.querySelector("[data-back]").onclick = () => {
      if (step > 0) {
        step -= 1;
        render();
      }
    };
    form.onsubmit = async (e) => {
      e.preventDefault();
      const nextValues = collect(form);
      const message = validate(nextValues);
      const err = root.querySelector("[data-err]");
      if (message) {
        err.hidden = false;
        err.textContent = message;
        return;
      }
      values = nextValues;
      step += 1;
      try {
        if (authed) await ensureDoc();
      } catch (ex) {
        err.hidden = false;
        err.textContent = ex.message;
        return;
      }
      render();
    };
  }

  async function boot() {
    if (authed && docId) {
      try {
        const data = await api(`/api/documents/${docId}`);
        values = { ...values, ...(data.document.values || {}) };
        step = Number.isFinite(data.document.step) ? data.document.step : step;
        paid = Boolean(data.document.paid);
      } catch (_) {
        docId = "";
      }
    }
    render();
  }

  boot();
})();
