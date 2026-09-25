import {
  addCall,
  addItem,
  addRoom,
  blankIncident,
  clearState,
  exampleIncident,
  formatPhone,
  hasDraft,
  loadState,
  normalizeRuDate,
  normalizeTime,
  saveState,
  validateStep,
} from "./model.js";
import { TITLES, render } from "./view.js";

const app = document.querySelector("#app");
const loaded = loadState();
let state = loaded.state;
let corrupt = loaded.corrupt;
let saveError = "";
let errors = {};

const ROUTES = {
  "#/": "home",
  "#/opis": "facts",
  "#/zvonki": "calls",
  "#/pomeshcheniya": "rooms",
  "#/dokument": "document",
  "#/oplata": "pay",
};

function currentRoute() {
  return ROUTES[location.hash] || (location.hash ? "home" : "home");
}

function guardedRoute() {
  const route = currentRoute();
  if (corrupt) return "home";
  if (route !== "home" && !hasDraft(state)) return "home";
  return route;
}

function persist() {
  saveError = saveState(state);
}

function paint() {
  const route = guardedRoute();
  if (!corrupt && currentRoute() !== "home" && !hasDraft(state) && location.hash && location.hash !== "#/") {
    location.hash = "#/";
    return;
  }
  document.title = TITLES[corrupt ? "home" : route];
  app.innerHTML = render({ state, route: corrupt ? "home" : route, errors, saveError, corrupt });
  const bad = app.querySelector(".is-error, .empty .error, .error");
  if (bad && Object.keys(errors).length) bad.scrollIntoView({ block: "center", behavior: "smooth" });
}

function go(hash) {
  errors = {};
  if ((location.hash || "#/") === hash) paint();
  else location.hash = hash;
}

function confirmReplace(message) {
  if (!hasDraft(state)) return true;
  return window.confirm(message);
}

function setBind(bind, value) {
  const parts = bind.split(".");
  if (parts.length === 1) {
    if (Object.prototype.hasOwnProperty.call(state, parts[0])) state[parts[0]] = value;
    return;
  }
  if (parts[0] === "call") {
    const call = state.calls.find((item) => item.id === parts[1]);
    if (call && parts[2] in call) call[parts[2]] = value;
  } else if (parts[0] === "room") {
    const room = state.rooms.find((item) => item.id === parts[1]);
    if (room && parts[2] in room) room[parts[2]] = value;
  } else if (parts[0] === "item") {
    const room = state.rooms.find((item) => item.id === parts[1]);
    const thing = room?.items.find((item) => item.id === parts[2]);
    if (thing && parts[3] in thing) thing[parts[3]] = value;
  }
}

function startBlank() {
  if (!confirmReplace("Начать опись заново? Текущий черновик в этом браузере сотрётся.")) return;
  state = blankIncident();
  state.createdAt = new Date().toISOString();
  corrupt = false;
  persist();
  go("#/opis");
}

function openExample() {
  if (!confirmReplace("Открыть учебный образец? Текущий черновик сотрётся.")) return;
  state = exampleIncident();
  corrupt = false;
  persist();
  go("#/dokument");
}

function next(step, hash) {
  errors = validateStep(step, state);
  if (Object.keys(errors).length) {
    paint();
    return;
  }
  if (step === "rooms") {
    state.rooms.forEach((room) => {
      room.items = room.items.filter((item) => item.name.trim() || item.condition.trim());
    });
    persist();
  }
  go(hash);
}

app.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "start") startBlank();
  if (action === "example") openExample();
  if (action === "clear-corrupt") {
    clearState();
    state = blankIncident();
    corrupt = false;
    saveError = "";
    go("#/");
  }
  if (action === "add-call") {
    addCall(state);
    errors = {};
    persist();
    paint();
  }
  if (action === "remove-call") {
    state.calls = state.calls.filter((call) => call.id !== button.dataset.id);
    persist();
    paint();
  }
  if (action === "add-room" || action === "add-preset") {
    const id = addRoom(state, action === "add-preset" ? button.dataset.name : "");
    if (!id) {
      errors = { rooms: "Для одной описи хватит 20 помещений." };
    } else {
      errors = {};
    }
    persist();
    paint();
    if (id) document.getElementById(`room-${id}`)?.querySelector("input")?.focus();
  }
  if (action === "remove-room") {
    state.rooms = state.rooms.filter((room) => room.id !== button.dataset.id);
    persist();
    paint();
  }
  if (action === "add-item") {
    const room = state.rooms.find((item) => item.id === button.dataset.room);
    if (room) addItem(room);
    persist();
    paint();
  }
  if (action === "remove-item") {
    const room = state.rooms.find((item) => item.id === button.dataset.room);
    if (room) room.items = room.items.filter((item) => item.id !== button.dataset.id);
    persist();
    paint();
  }
  if (action === "next-facts") next("facts", "#/zvonki");
  if (action === "next-calls") next("calls", "#/pomeshcheniya");
  if (action === "next-rooms") next("rooms", "#/dokument");
  if (action === "demo") {
    state.access = "demo";
    persist();
    paint();
  }
  if (action === "print") {
    if (state.access !== "demo") {
      go("#/oplata");
      return;
    }
    window.print();
  }
});

app.addEventListener("input", (event) => {
  const input = event.target.closest("[data-bind]");
  if (!input) return;
  setBind(input.dataset.bind, input.value);
  persist();
});

app.addEventListener("change", (event) => {
  const input = event.target.closest("[data-bind]");
  if (!input || input.tagName !== "SELECT") return;
  setBind(input.dataset.bind, input.value);
  persist();
  paint();
});

app.addEventListener("focusout", (event) => {
  const input = event.target.closest("[data-format]");
  if (!input) return;
  const format = input.dataset.format;
  let nextValue = null;
  if (format === "phone") nextValue = input.value.trim() ? formatPhone(input.value) : "";
  if (format === "date") nextValue = normalizeRuDate(input.value);
  if (format === "time") nextValue = normalizeTime(input.value);
  if (!nextValue || nextValue === input.value) return;
  input.value = nextValue;
  setBind(input.dataset.bind, nextValue);
  persist();
});

window.addEventListener("hashchange", () => {
  errors = {};
  paint();
});

if (!location.hash) location.hash = "#/";
paint();
