const KEY = "pokomnatno.v1";

export const PRICE_LABEL = "1\u00a0490\u00a0₽";
export const PRICE_RUB = 1490;

export const CALL_KINDS = [
  ["ads", "Аварийно-диспетчерская"],
  ["uk", "Управляющая организация"],
  ["neighbor", "Сосед"],
  ["other", "Другое"],
];

export const ROOM_PRESETS = [
  "Кухня",
  "Комната",
  "Спальня",
  "Ванная",
  "Туалет",
  "Коридор",
  "Балкон",
];

export function newId() {
  if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function blankIncident() {
  return {
    version: 1,
    createdAt: null,
    example: false,
    access: null,
    ownerName: "",
    phone: "",
    address: "",
    apartment: "",
    floor: "",
    discoveredDate: "",
    discoveredTime: "",
    observation: "",
    witnesses: "",
    calls: [],
    rooms: [],
  };
}

function callBlank() {
  return { id: newId(), kind: "ads", date: "", time: "", phone: "", request: "", comment: "" };
}

function roomBlank(name = "") {
  return {
    id: newId(),
    name,
    ceiling: "",
    walls: "",
    floor: "",
    photos: "",
    items: [],
  };
}

function itemBlank() {
  return { id: newId(), name: "", condition: "" };
}

export function addCall(state) {
  state.calls.push(callBlank());
}

export function addRoom(state, name = "") {
  if (state.rooms.length >= 20) return null;
  const room = roomBlank(uniqueRoomName(state, name));
  state.rooms.push(room);
  return room.id;
}

export function addItem(room) {
  room.items.push(itemBlank());
}

function uniqueRoomName(state, name) {
  const trimmed = name.trim();
  if (!trimmed) return "";
  const names = new Set(state.rooms.map((room) => room.name.trim()));
  if (!names.has(trimmed)) return trimmed;
  let n = 2;
  while (names.has(`${trimmed} ${n}`)) n += 1;
  return `${trimmed} ${n}`;
}

export function kindLabel(kind) {
  return CALL_KINDS.find(([value]) => value === kind)?.[1] || "Звонок";
}

export function parseRuDate(value) {
  const match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(String(value).trim());
  if (!match) return null;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

export function normalizeRuDate(value) {
  const date = parseRuDate(value);
  if (!date) return null;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${date.getFullYear()}`;
}

export function normalizeTime(value) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(value).trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function formatPhone(value) {
  let digits = String(value).replace(/\D/g, "");
  if (digits.length === 10) digits = `7${digits}`;
  if (digits.length === 11 && digits[0] === "8") digits = `7${digits.slice(1)}`;
  if (digits.length !== 11 || digits[0] !== "7") return String(value).trim();
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
}

export function isRuPhone(value) {
  const digits = String(value).replace(/\D/g, "");
  return (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) || (digits.length === 10);
}

function startOfTomorrow() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 1);
  return date;
}

function dateError(value, label) {
  if (!String(value).trim()) return `Укажите дату: ${label}. Формат 18.03.2026.`;
  const date = parseRuDate(value);
  if (!date) return "Дата в формате ДД.ММ.ГГГГ, например 18.03.2026.";
  if (date >= startOfTomorrow()) return "Эта дата ещё не наступила.";
  if (date.getFullYear() < 2000) return "Проверьте год.";
  return "";
}

export function validateStep(step, state) {
  const errors = {};
  if (step === "facts") validateFacts(state, errors);
  if (step === "calls") validateCalls(state, errors);
  if (step === "rooms") validateRooms(state, errors);
  return errors;
}

function validateFacts(state, errors) {
  if (state.ownerName.trim().length < 2) errors.ownerName = "Напишите, кто заполняет опись.";
  if (!state.phone.trim()) errors.phone = "Нужен телефон, чтобы комиссия понимала, с кем говорить.";
  else if (!isRuPhone(state.phone)) errors.phone = "Телефон в формате +7 (900) 000-00-00.";
  if (state.address.trim().length < 6) errors.address = "Напишите адрес дома: город, улица, дом.";
  if (!state.apartment.trim()) errors.apartment = "Укажите номер квартиры.";
  const discovered = dateError(state.discoveredDate, "когда заметили воду");
  if (discovered) errors.discoveredDate = discovered;
  if (!normalizeTime(state.discoveredTime)) errors.discoveredTime = "Время в формате ЧЧ:ММ, например 07:40.";
  if (state.observation.trim().length < 10) {
    errors.observation = "Опишите, что видели: где мокро и откуда течёт. Это наблюдение, не вывод о виновнике.";
  }
}

function validateCalls(state, errors) {
  state.calls.forEach((call) => {
    const when = dateError(call.date, "звонка");
    if (when) errors[`call.${call.id}.date`] = when;
    if (!normalizeTime(call.time)) errors[`call.${call.id}.time`] = "Время звонка в формате ЧЧ:ММ.";
    if (call.phone.trim() && !isRuPhone(call.phone)) {
      errors[`call.${call.id}.phone`] = "Если указываете телефон, нужен формат +7 (900) 000-00-00.";
    }
    if (call.request.trim().length + call.comment.trim().length < 3) {
      errors[`call.${call.id}.comment`] = "Запишите номер заявки или что ответили.";
    }
  });
}

function validateRooms(state, errors) {
  if (state.rooms.length === 0) {
    errors.rooms = "Добавьте хотя бы одно помещение — то, где вода видна сильнее всего.";
    return;
  }
  state.rooms.forEach((room) => {
    if (!room.name.trim()) errors[`room.${room.id}.name`] = "Назовите помещение: кухня, ванная, комната.";
    const hasSurface = [room.ceiling, room.walls, room.floor, room.photos].some((part) => part.trim().length > 0);
    const filledItems = room.items.filter((item) => item.name.trim() || item.condition.trim());
    if (!hasSurface && filledItems.length === 0) {
      errors[`room.${room.id}.ceiling`] = "Опишите потолок, стены, пол или хотя бы одну вещь.";
    }
    room.items.forEach((item) => {
      const hasName = item.name.trim().length > 0;
      const hasCondition = item.condition.trim().length > 0;
      if (hasName !== hasCondition) {
        errors[`item.${room.id}.${item.id}`] = "У вещи напишите и название, и что с ней видно.";
      }
    });
  });
}

export function hasDraft(state) {
  return Boolean(state.createdAt);
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { state: blankIncident(), corrupt: false };
    const data = JSON.parse(raw);
    if (!data || data.version !== 1 || !Array.isArray(data.rooms) || !Array.isArray(data.calls)) {
      return { state: blankIncident(), corrupt: true };
    }
    return { state: { ...blankIncident(), ...data, calls: data.calls, rooms: data.rooms }, corrupt: false };
  } catch {
    return { state: blankIncident(), corrupt: true };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return "";
  } catch {
    return "Не удалось сохранить опись в этом браузере. Освободите место или разрешите локальное хранение.";
  }
}

export function clearState() {
  localStorage.removeItem(KEY);
}

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${date.getFullYear()}`;
}

export function exampleIncident() {
  const state = blankIncident();
  state.createdAt = new Date().toISOString();
  state.example = true;
  state.ownerName = "Марина Соколова";
  state.phone = "+7 (900) 111-22-33";
  state.address = "г. Казань, ул. Примерная, д. 10";
  state.apartment = "47";
  state.floor = "6";
  state.discoveredDate = daysAgo(0);
  state.discoveredTime = "07:40";
  state.observation = "На потолке кухни у стояка мокрое пятно, с него капает на пол. В ванной сосед сверху сказал, что сорвало гибкую подводку.";
  state.witnesses = "Сосед сверху, кв. 51, был на площадке около 08:00.";
  state.calls = [
    {
      id: newId(),
      kind: "ads",
      date: daysAgo(0),
      time: "07:52",
      phone: "+7 (900) 000-00-00",
      request: "18421",
      comment: "Приняли заявку, назвали окно до 12:00.",
    },
  ];
  state.rooms = [
    {
      id: newId(),
      name: "Кухня",
      ceiling: "Пятно примерно 40×60 см у стояка, краска пузырится, капает.",
      walls: "Потёк по стене у стояка шириной около 15 см, обои отошли внизу.",
      floor: "Лужа у стояка, ламинат уже приподнят на стыке.",
      photos: "1. Потолок у стояка, 07:44. 2. Стык пола и стены, 07:46.",
      items: [
        { id: newId(), name: "Холодильник", condition: "Снизу мокро, не включали." },
      ],
    },
    {
      id: newId(),
      name: "Коридор",
      ceiling: "Сухой.",
      walls: "Сухие.",
      floor: "Дорожка воды от кухни до ванной, коврик мокрый.",
      photos: "3. Коврик у ванной, 07:48.",
      items: [],
    },
  ];
  return state;
}

export function previewIncident() {
  const state = exampleIncident();
  state.rooms = state.rooms.slice(0, 1);
  return state;
}
