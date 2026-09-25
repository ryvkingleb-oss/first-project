import { CALL_KINDS, PRICE_LABEL, ROOM_PRESETS, kindLabel, previewIncident } from "./model.js";

const STEPS = [
  ["facts", "#/opis", "Обстоятельства"],
  ["calls", "#/zvonki", "Звонки"],
  ["rooms", "#/pomeshcheniya", "Помещения"],
  ["document", "#/dokument", "Документ"],
];

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function fid(bind) {
  return `f-${bind.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

function field({ bind, label, control, errors, hint, extraClass = "" }) {
  const error = errors[bind] || "";
  const id = fid(bind);
  return `<div class="field ${extraClass} ${error ? "is-error" : ""}">
    <label for="${id}">${label}</label>
    ${control}
    ${hint ? `<p class="hint">${hint}</p>` : ""}
    ${error ? `<p class="error">${esc(error)}</p>` : ""}
  </div>`;
}

function textInput(bind, value, { placeholder = "", extra = "" } = {}) {
  const id = fid(bind);
  return `<input id="${id}" data-bind="${esc(bind)}" value="${esc(value)}" placeholder="${esc(placeholder)}" ${extra}>`;
}

function textArea(bind, value, placeholder) {
  const id = fid(bind);
  return `<textarea id="${id}" data-bind="${esc(bind)}" placeholder="${esc(placeholder)}">${esc(value)}</textarea>`;
}

function header(route, state) {
  let action = "";
  if (route === "home") {
    action = state?.createdAt
      ? `<a class="btn" href="#/opis">Продолжить</a>`
      : `<button class="btn" type="button" data-action="start">Начать опись</button>`;
  } else if (route !== "document" && route !== "pay") {
    action = `<a class="btn secondary" href="#/dokument">Документ</a>`;
  }
  return `<header class="top no-print">
    <a class="brand" href="#/"><span class="mark" aria-hidden="true"></span>Покомнатно</a>
    <span class="top-price">${PRICE_LABEL} за один залив</span>
    ${action}
  </header>`;
}

function banners(state, saveError) {
  const parts = [];
  if (saveError) parts.push(`<div class="banner is-bad" role="alert"><p>${esc(saveError)}</p></div>`);
  if (state.example) {
    parts.push(`<div class="banner"><p>Учебный пример: квартира на ул. Примерной. Для своего залива начните заново — черновик в этом браузере сотрётся.</p></div>`);
  }
  if (state.access === "demo" && !saveError) {
    parts.push(`<div class="banner no-print"><p>Демо-доступ открыт. Платёж не проводился, деньги не списывались.</p></div>`);
  }
  return parts.join("");
}

function stepNav(current) {
  return `<nav class="steps no-print" aria-label="Шаги описи">${STEPS.map(([id, href, label]) =>
    `<a href="${href}" class="${id === current ? "is-current" : ""}">${label}</a>`).join("")}</nav>`;
}

function dock(backHash, nextLabel, nextAction) {
  return `<div class="dock no-print">
    ${backHash ? `<a class="quiet" href="${backHash}">Назад</a>` : `<span></span>`}
    <button class="btn" type="button" data-action="${nextAction}">${nextLabel}</button>
  </div>`;
}

export function render(vm) {
  if (vm.corrupt) return renderCorrupt();
  const route = vm.route;
  if (route === "home") return renderHome(vm);
  if (route === "pay") return renderPay(vm);
  if (route === "document") return renderDocumentPage(vm);
  if (route === "calls") return renderCalls(vm);
  if (route === "rooms") return renderRooms(vm);
  return renderFacts(vm);
}

function renderCorrupt() {
  return `${header("home")}
    <h1>Черновик не читается</h1>
    <p class="lede">Сохранённая опись в этом браузере повреждена. Её нельзя восстановить отсюда.</p>
    <button class="btn" type="button" data-action="clear-corrupt">Стереть черновик и начать заново</button>`;
}

function renderHome(vm) {
  const actions = vm.state.createdAt
    ? `<a class="btn" href="#/opis">Продолжить черновик</a><button class="btn secondary" type="button" data-action="start">Начать заново</button>`
    : `<button class="btn" type="button" data-action="start">Начать опись</button><button class="btn secondary" type="button" data-action="example">Открыть образец</button>`;
  return `${header("home", vm.state)}
    <section class="hero">
      <div>
        <h1>Пока следы на месте, соберите опись по комнатам.</h1>
        <p class="lede">После залива номер заявки теряется в звонке, а фото остаются без подписи к комнате. Покомнатно собирает адрес, звонки и повреждения по каждому помещению в один лист.</p>
        <p class="note">Пустые бланки из поиска оставляют пустые строчки. Выезд оценщика начинается примерно от 5&nbsp;000&nbsp;₽ и нужен позже: это отчёт о сумме, его делает специалист с допуском. Здесь сумма не считается.</p>
        <div class="btn-row">${actions}</div>
      </div>
      <div>
        <p class="section-label">Так выглядит лист</p>
        ${renderSheet(previewIncident(), { sample: true, draft: false })}
      </div>
    </section>
    <ol class="steps-explain">
      <li><strong>Обстоятельства.</strong> Адрес, время и что видели в месте, откуда идёт вода.</li>
      <li><strong>Звонки.</strong> Кому звонили и какой номер заявки назвали.</li>
      <li><strong>Помещения.</strong> Потолок, стены, пол и вещи — отдельно в каждой комнате.</li>
      <li><strong>Лист.</strong> Одна опись на печать, чтобы взять её на комиссию.</li>
    </ol>
    <section class="band">
      <p class="price">${PRICE_LABEL}</p>
      <p>Платит собственник или наниматель залитой квартиры — один раз за один случай. Опись остаётся в этом браузере и никуда не отправляется.</p>
    </section>
    <p class="foot">Лист составляет тот, кто его заполняет. Это не акт управляющей организации, не вывод о виновнике и не отчёт об оценке ущерба. Официальную оценку по-прежнему делает специалист.</p>`;
}

function renderFacts(vm) {
  const { state, errors } = vm;
  return `${header("facts", state)}
    ${banners(state, vm.saveError)}
    ${stepNav("facts")}
    <h2>Обстоятельства</h2>
    <p class="note">Пишите то, что видели сами. Вывод, кто виноват, в опись не входит.</p>
    <div class="grid-2">
      ${field({
        bind: "ownerName",
        label: "Кто заполняет",
        errors,
        control: textInput("ownerName", state.ownerName, { placeholder: "Марина Соколова", extra: `autocomplete="name"` }),
      })}
      ${field({
        bind: "phone",
        label: "Телефон",
        errors,
        control: textInput("phone", state.phone, { placeholder: "+7 (900) 111-22-33", extra: `autocomplete="tel" inputmode="tel" data-format="phone"` }),
      })}
    </div>
    <div class="grid-addr">
      ${field({
        bind: "address",
        label: "Адрес дома",
        errors,
        extraClass: "span-2",
        control: textInput("address", state.address, { placeholder: "г. Казань, ул. Примерная, д. 10", extra: `autocomplete="street-address"` }),
      })}
      ${field({
        bind: "apartment",
        label: "Квартира",
        errors,
        control: textInput("apartment", state.apartment, { placeholder: "47" }),
      })}
      ${field({
        bind: "floor",
        label: "Этаж",
        errors,
        hint: "Можно не заполнять.",
        control: textInput("floor", state.floor, { placeholder: "6" }),
      })}
    </div>
    <div class="grid-when">
      ${field({
        bind: "discoveredDate",
        label: "Когда заметили воду",
        errors,
        hint: "Формат: 18.03.2026",
        control: textInput("discoveredDate", state.discoveredDate, { placeholder: "18.03.2026", extra: `data-format="date" inputmode="numeric"` }),
      })}
      ${field({
        bind: "discoveredTime",
        label: "Время",
        errors,
        hint: "Формат: 07:40",
        control: textInput("discoveredTime", state.discoveredTime, { placeholder: "07:40", extra: `data-format="time" inputmode="numeric"` }),
      })}
    </div>
    ${field({
      bind: "observation",
      label: "Что видно в месте протечки",
      errors,
      hint: "Где мокро и откуда, на ваш взгляд, течёт. Это наблюдение.",
      control: textArea("observation", state.observation, "На потолке кухни у стояка мокрое пятно, с него капает."),
    })}
    ${field({
      bind: "witnesses",
      label: "Кто ещё это видел",
      errors,
      hint: "Можно не заполнять.",
      control: textInput("witnesses", state.witnesses, { placeholder: "Сосед сверху, кв. 51" }),
    })}
    ${dock("#/", "Дальше: звонки", "next-facts")}`;
}

function renderCalls(vm) {
  const { state, errors } = vm;
  const list = state.calls.length
    ? state.calls.map((call) => renderCall(call, errors)).join("")
    : `<div class="empty">
        <p><strong>Звонков пока нет.</strong></p>
        <p>Если уже звонили в аварийную или управляющую, запишите номер заявки, пока он помнится. Если звонка не было, шаг можно пропустить.</p>
      </div>`;
  return `${header("calls", state)}
    ${banners(state, vm.saveError)}
    ${stepNav("calls")}
    <h2>Звонки</h2>
    <p class="note">Один звонок — одна запись. Номер заявки важнее длинного пересказа.</p>
    ${list}
    <div class="btn-row no-print" style="margin-top: 8px">
      <button class="btn secondary" type="button" data-action="add-call">Добавить звонок</button>
    </div>
    ${dock("#/opis", "Дальше: помещения", "next-calls")}`;
}

function renderCall(call, errors) {
  const options = CALL_KINDS.map(([value, label]) =>
    `<option value="${value}" ${call.kind === value ? "selected" : ""}>${label}</option>`).join("");
  return `<section class="call">
    <div class="call-head">
      <strong>${esc(kindLabel(call.kind))}</strong>
      <button class="quiet alert" type="button" data-action="remove-call" data-id="${esc(call.id)}">Удалить</button>
    </div>
    ${field({
      bind: `call.${call.id}.kind`,
      label: "Куда звонили",
      errors,
      control: `<select id="${fid(`call.${call.id}.kind`)}" data-bind="call.${esc(call.id)}.kind">${options}</select>`,
    })}
    <div class="grid-when">
      ${field({
        bind: `call.${call.id}.date`,
        label: "Дата звонка",
        errors,
        control: textInput(`call.${call.id}.date`, call.date, { placeholder: "18.03.2026", extra: `data-format="date" inputmode="numeric"` }),
      })}
      ${field({
        bind: `call.${call.id}.time`,
        label: "Время",
        errors,
        control: textInput(`call.${call.id}.time`, call.time, { placeholder: "07:52", extra: `data-format="time" inputmode="numeric"` }),
      })}
    </div>
    <div class="grid-2">
      ${field({
        bind: `call.${call.id}.phone`,
        label: "Телефон, по которому звонили",
        errors,
        hint: "Можно не заполнять.",
        control: textInput(`call.${call.id}.phone`, call.phone, { placeholder: "+7 (900) 000-00-00", extra: `data-format="phone" inputmode="tel"` }),
      })}
      ${field({
        bind: `call.${call.id}.request`,
        label: "Номер заявки",
        errors,
        control: textInput(`call.${call.id}.request`, call.request, { placeholder: "18421" }),
      })}
    </div>
    ${field({
      bind: `call.${call.id}.comment`,
      label: "Что ответили",
      errors,
      control: textArea(`call.${call.id}.comment`, call.comment, "Приняли заявку, назвали окно до 12:00."),
    })}
  </section>`;
}

function renderRooms(vm) {
  const { state, errors } = vm;
  const presets = ROOM_PRESETS.map((name) =>
    `<button type="button" data-action="add-preset" data-name="${esc(name)}">${esc(name)}</button>`).join("");
  const roomsError = errors.rooms ? `<p class="error">${esc(errors.rooms)}</p>` : "";
  const list = state.rooms.length
    ? state.rooms.map((room) => renderRoom(room, errors)).join("")
    : `<div class="empty">
        <p><strong>Помещений пока нет.</strong></p>
        <p>Начните с комнаты, где вода видна сильнее всего.</p>
        ${roomsError}
      </div>`;
  return `${header("rooms", state)}
    ${banners(state, vm.saveError)}
    ${stepNav("rooms")}
    <h2>Помещения</h2>
    <p class="note">В каждой комнате отдельно: потолок, стены, пол, вещи. Цены и суммы сюда не входят.</p>
    <p class="section-label">Добавить помещение</p>
    <div class="presets">${presets}<button type="button" data-action="add-room">Своё название</button></div>
    ${state.rooms.length ? roomsError : ""}
    ${list}
    ${dock("#/zvonki", "Дальше: документ", "next-rooms")}`;
}

function renderRoom(room, errors) {
  const items = room.items.map((item) => `<div class="item-row">
      <input data-bind="item.${esc(room.id)}.${esc(item.id)}.name" value="${esc(item.name)}" placeholder="Холодильник" aria-label="Название вещи">
      <input data-bind="item.${esc(room.id)}.${esc(item.id)}.condition" value="${esc(item.condition)}" placeholder="Что видно: снизу мокро, не включали" aria-label="Что видно">
      <button class="quiet alert" type="button" data-action="remove-item" data-room="${esc(room.id)}" data-id="${esc(item.id)}">Удалить</button>
    </div>
    ${errors[`item.${room.id}.${item.id}`] ? `<p class="error">${esc(errors[`item.${room.id}.${item.id}`])}</p>` : ""}`).join("");
  return `<section class="room" id="room-${esc(room.id)}">
    <div class="room-head">
      <strong>${esc(room.name || "Новое помещение")}</strong>
      <button class="quiet alert" type="button" data-action="remove-room" data-id="${esc(room.id)}">Удалить помещение</button>
    </div>
    ${field({
      bind: `room.${room.id}.name`,
      label: "Название",
      errors,
      control: textInput(`room.${room.id}.name`, room.name, { placeholder: "Кухня" }),
    })}
    ${field({
      bind: `room.${room.id}.ceiling`,
      label: "Потолок",
      errors,
      control: textArea(`room.${room.id}.ceiling`, room.ceiling, "Пятно у стояка, краска пузырится, капает."),
    })}
    ${field({
      bind: `room.${room.id}.walls`,
      label: "Стены",
      errors,
      control: textArea(`room.${room.id}.walls`, room.walls, "Потёк у стояка, обои отошли внизу."),
    })}
    ${field({
      bind: `room.${room.id}.floor`,
      label: "Пол",
      errors,
      control: textArea(`room.${room.id}.floor`, room.floor, "Лужа у стояка, ламинат приподнят на стыке."),
    })}
    <p class="section-label">Вещи</p>
    ${items || `<p class="hint">Вещей пока нет. Добавьте то, что намокло: мебель, технику, ковёр.</p>`}
    <button class="quiet" type="button" data-action="add-item" data-room="${esc(room.id)}">Добавить вещь</button>
    ${field({
      bind: `room.${room.id}.photos`,
      label: "Какие фото сняли в этой комнате",
      errors,
      hint: "Сами снимки остаются в телефоне. Здесь — подпись, чтобы не перепутать комнаты.",
      control: textArea(`room.${room.id}.photos`, room.photos, "1. Потолок у стояка, 07:44."),
    })}
  </section>`;
}

function renderDocumentPage(vm) {
  const { state } = vm;
  const locked = state.access !== "demo";
  return `${header("document", state)}
    ${banners(state, vm.saveError)}
    ${stepNav("document")}
    <div class="btn-row no-print tight">
      ${locked
        ? `<a class="btn" href="#/oplata">Печать за ${PRICE_LABEL}</a>`
        : `<button class="btn" type="button" data-action="print">Печать или PDF</button>`}
      <a class="quiet" href="#/pomeshcheniya">Править помещения</a>
    </div>
    ${renderSheet(state, { draft: locked, sample: false })}
    <p class="foot no-print">В диалоге печати браузера выберите «Сохранить как PDF», если бумага не нужна. Опись по-прежнему лежит только в этом браузере: если очистить данные сайта, черновик исчезнет.</p>`;
}

function renderPay(vm) {
  const { state } = vm;
  const place = [state.address, state.apartment ? `кв. ${state.apartment}` : ""].filter(Boolean).join(", ");
  const unlocked = state.access === "demo";
  return `${header("pay", state)}
    ${banners(state, vm.saveError)}
    <section class="pay">
      <div>
        <h1>Один лист, один залив.</h1>
        <p class="lede">Печать без строки «черновик», все помещения, вещи и журнал звонков. Сумма ущерба не считается, акт управляющей организации не составляется.</p>
        <p class="note">Кнопка демо-доступа не списывает деньги: живой кассы нет. Печать открывается только в этом браузере. Настоящие 1&nbsp;490&nbsp;₽ позже принимает ЮKassa или Robokassa, и доступ включается после подтверждения платежа, а не по нажатию.</p>
      </div>
      <aside class="receipt">
        <p class="doc-kicker">К оплате</p>
        <strong>Опись последствий залива</strong>
        <p class="hint">${place ? esc(place) : "Адрес появится здесь, когда заполните обстоятельства."}</p>
        <div class="receipt-row"><span>Итого</span><span>${PRICE_LABEL}</span></div>
        ${unlocked
          ? `<p class="status-line">Демо-доступ открыт. Платёж не проводился.</p>
             <a class="btn wide" href="#/dokument">Перейти к печати</a>`
          : `<button class="btn wide" type="button" data-action="demo">Открыть демо-доступ без оплаты</button>`}
        <a class="quiet" href="#/dokument">Вернуться к документу</a>
      </aside>
    </section>`;
}

function renderSheet(state, { draft, sample }) {
  const floor = state.floor ? `, этаж ${esc(state.floor)}` : "";
  const calls = state.calls.length
    ? `<ol>${state.calls.map((call) => `<li><strong>${esc(kindLabel(call.kind))}</strong>, ${esc(call.date)} ${esc(call.time)}${call.phone ? `, тел. ${esc(call.phone)}` : ""}${call.request ? `, заявка ${esc(call.request)}` : ""}. ${esc(call.comment)}</li>`).join("")}</ol>`
    : `<p>Звонки не записаны.</p>`;
  const rooms = state.rooms.length
    ? state.rooms.map((room, index) => renderRoomBlock(room, index)).join("")
    : `<p>Помещения ещё не описаны.</p>`;
  return `<article class="doc ${sample ? "sample" : ""}">
    ${draft ? `<p class="draft-line">Черновик. Строка исчезнет с листа после оплаты. Сейчас платёж не подключён.</p>` : ""}
    <p class="doc-kicker">${sample ? "Образец" : "Личная опись"}</p>
    <h2 class="doc-title">Опись последствий залива</h2>
    <p class="doc-lead">Составил человек, чью квартиру залило. Это не акт управляющей организации и не отчёт об оценке.</p>
    <dl>
      <dt>Кто заполняет</dt><dd>${esc(state.ownerName) || "—"}</dd>
      <dt>Телефон</dt><dd>${esc(state.phone) || "—"}</dd>
      <dt>Адрес</dt><dd>${esc(state.address) || "—"}${state.apartment ? `, кв. ${esc(state.apartment)}` : ""}${floor}</dd>
      <dt>Когда заметили воду</dt><dd>${esc(state.discoveredDate) || "—"}, ${esc(state.discoveredTime) || "—"}</dd>
      <dt>Что видно в месте протечки</dt><dd>${esc(state.observation) || "—"}</dd>
      ${state.witnesses ? `<dt>Кто ещё видел</dt><dd>${esc(state.witnesses)}</dd>` : ""}
    </dl>
    <h3>Звонки</h3>
    ${calls}
    <h3>Помещения</h3>
    ${rooms}
    <p class="doc-lead" style="margin-top:24px">Сумма ущерба в этой описи намеренно отсутствует. Её определяет специалист по оценке, если она понадобится.</p>
  </article>`;
}

function renderRoomBlock(room, index) {
  const items = room.items.filter((item) => item.name.trim() || item.condition.trim());
  const bits = [
    room.ceiling.trim() ? `<p><strong>Потолок.</strong> ${esc(room.ceiling)}</p>` : "",
    room.walls.trim() ? `<p><strong>Стены.</strong> ${esc(room.walls)}</p>` : "",
    room.floor.trim() ? `<p><strong>Пол.</strong> ${esc(room.floor)}</p>` : "",
    items.length ? `<p><strong>Вещи.</strong></p><ul>${items.map((item) => `<li>${esc(item.name)} — ${esc(item.condition)}</li>`).join("")}</ul>` : "",
    room.photos.trim() ? `<p><strong>Фото в телефоне.</strong> ${esc(room.photos)}</p>` : "",
  ].join("");
  return `<section class="room-block">
    <h3>${index + 1}. ${esc(room.name || "Помещение")}</h3>
    ${bits || "<p>Повреждения не описаны.</p>"}
  </section>`;
}

export const TITLES = {
  home: "Покомнатно — опись залива по комнатам",
  facts: "Обстоятельства — Покомнатно",
  calls: "Звонки — Покомнатно",
  rooms: "Помещения — Покомнатно",
  document: "Документ — Покомнатно",
  pay: "Оплата — Покомнатно",
};
