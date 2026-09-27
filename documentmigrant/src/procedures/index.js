import { pribytie } from "./pribytie.js";
import { patent } from "./patent.js";
import { vnzh } from "./vnzh.js";
import { grazhdanstvo } from "./grazhdanstvo.js";
import { ubytie } from "./ubytie.js";
import { rvp } from "./rvp.js";
import { vnzhPodtverzhdenie } from "./vnzh-podtverzhdenie.js";
import { rvpPodtverzhdenie } from "./rvp-podtverzhdenie.js";
import { comingSoon, comingSoonById } from "./coming-soon.js";

export const procedures = [
  pribytie,
  ubytie,
  patent,
  rvp,
  vnzh,
  vnzhPodtverzhdenie,
  rvpPodtverzhdenie,
  grazhdanstvo,
];

export const homeBlurbs = {
  pribytie: "Готовое уведомление о прибытии для печати и подачи",
  ubytie: "Готовое уведомление об убытии для печати и подачи",
  patent: "Готовое заявление об оформлении патента для печати и подачи",
  rvp: "Готовое заявление на РВП (взрослый) для печати и подачи",
  vnzh: "Готовое заявление на вид на жительство для печати и подачи",
  "vnzh-podtverzhdenie": "Подтверждение проживания по ВНЖ — файл для печати",
  "rvp-podtverzhdenie": "Подтверждение проживания по РВП — файл для печати",
  grazhdanstvo: "Готовое заявление о приёме в гражданство для печати и подачи",
};

export function getProcedure(id) {
  return procedures.find((item) => item.id === id) || null;
}

export { comingSoon, comingSoonById };
