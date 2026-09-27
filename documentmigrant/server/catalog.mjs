/**
 * Единый каталог документов documentmigrant.ru.
 * Витрина, sitemap-приоритеты и меню должны опираться на этот файл.
 *
 * status:
 * - ready  — мастер + тестовая оплата + PDF + пустой бланк
 * - stub   — страница «Скоро», мастер не открыт
 *
 * pdfMode:
 * - official — заполнение скана/бланка МВД из server/blanks/
 * - layout   — макет полей (сверьте с актуальной формой МВД перед подачей)
 */

export const DOCUMENTS = [
  {
    id: "pribytie",
    shortTitle: "Уведомление о прибытии",
    status: "ready",
    pdfMode: "official",
    blankFile: "pribytie-blank.pdf",
    childMode: true,
    priority: "0.95",
  },
  {
    id: "ubytie",
    shortTitle: "Уведомление об убытии",
    status: "ready",
    pdfMode: "layout",
    blankFile: "ubytie-blank.pdf",
    priority: "0.9",
  },
  {
    id: "patent",
    shortTitle: "Заявление на патент",
    status: "ready",
    pdfMode: "official",
    blankFile: "patent-blank.pdf",
    priority: "0.85",
    note: "Патент на работу иностранца, не патент ИП",
  },
  {
    id: "rvp",
    shortTitle: "Заявление на РВП",
    status: "ready",
    pdfMode: "layout",
    blankFile: "rvp-blank.pdf",
    priority: "0.85",
    note: "Взрослый; РВП ребёнку — отдельно (скоро)",
  },
  {
    id: "vnzh",
    shortTitle: "Заявление на ВНЖ",
    status: "ready",
    pdfMode: "official",
    blankFile: "vnzh-blank.pdf",
    priority: "0.8",
  },
  {
    id: "vnzh-podtverzhdenie",
    shortTitle: "Подтверждение проживания по ВНЖ",
    status: "ready",
    pdfMode: "layout",
    blankFile: "vnzh-podtverzhdenie-blank.pdf",
    priority: "0.8",
  },
  {
    id: "rvp-podtverzhdenie",
    shortTitle: "Подтверждение проживания по РВП",
    status: "ready",
    pdfMode: "layout",
    blankFile: "rvp-podtverzhdenie-blank.pdf",
    priority: "0.8",
  },
  {
    id: "grazhdanstvo",
    shortTitle: "Заявление на гражданство",
    status: "ready",
    pdfMode: "official",
    blankFile: "grazhdanstvo-blank.pdf",
    priority: "0.75",
  },
  // Волна B — stub
  {
    id: "rabotodatel-td-zaklyuchenie",
    shortTitle: "Уведомление работодателя: заключение ТД",
    status: "stub",
    priority: "0.25",
  },
  {
    id: "rabotodatel-td-rastorzhenie",
    shortTitle: "Уведомление работодателя: расторжение ТД",
    status: "stub",
    priority: "0.25",
  },
  {
    id: "patent-prodlenie",
    shortTitle: "Продление / переоформление патента",
    status: "stub",
    priority: "0.25",
  },
  {
    id: "rvp-rebenok",
    shortTitle: "РВП ребёнку",
    status: "stub",
    priority: "0.25",
  },
  {
    id: "vnzh-rebenok",
    shortTitle: "ВНЖ ребёнку",
    status: "stub",
    priority: "0.25",
  },
  {
    id: "grazhdanstvo-rebenok",
    shortTitle: "Гражданство ребёнку",
    status: "stub",
    priority: "0.25",
  },
];

export const READY_IDS = new Set(DOCUMENTS.filter((d) => d.status === "ready").map((d) => d.id));
export const STUB_IDS = new Set(DOCUMENTS.filter((d) => d.status === "stub").map((d) => d.id));

export function documentById(id) {
  return DOCUMENTS.find((d) => d.id === id) || null;
}

/** Короткие и старые URL → /dokument/{id} */
export const USLUGI_REDIRECTS = {
  "/uslugi/pribytie": "/dokument/pribytie",
  "/uslugi/uvedomlenie-o-pribytii": "/dokument/pribytie",
  "/uslugi/ubytie": "/dokument/ubytie",
  "/uslugi/uvedomlenie-ob-ubytii": "/dokument/ubytie",
  "/uslugi/patent": "/dokument/patent",
  "/uslugi/rvp": "/dokument/rvp",
  "/uslugi/vnzh": "/dokument/vnzh",
  "/uslugi/vnzh-podtverzhdenie": "/dokument/vnzh-podtverzhdenie",
  "/uslugi/rvp-podtverzhdenie": "/dokument/rvp-podtverzhdenie",
  "/uslugi/grazhdanstvo": "/dokument/grazhdanstvo",
  "/uslugi/rabotodatel-td-zaklyuchenie": "/dokument/rabotodatel-td-zaklyuchenie",
  "/uslugi/rabotodatel-td-rastorzhenie": "/dokument/rabotodatel-td-rastorzhenie",
  "/uslugi/patent-prodlenie": "/dokument/patent-prodlenie",
  "/uslugi/rvp-rebenok": "/dokument/rvp-rebenok",
  "/uslugi/vnzh-rebenok": "/dokument/vnzh-rebenok",
  "/uslugi/grazhdanstvo-rebenok": "/dokument/grazhdanstvo-rebenok",
  "/uslugi/rabotodatelyam": "/dokument/rabotodatel-td-zaklyuchenie",
};
