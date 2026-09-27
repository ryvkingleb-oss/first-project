import React from "react";

/** Ads only on hubs/articles. Never mount inside wizard/cabinet/payment. */
const adsEnabled =
  String(import.meta.env.VITE_ADS_ENABLED || import.meta.env.ADS_ENABLED || "false").toLowerCase() ===
  "true";

export function AdSlot({ placement = "aside", label = "Реклама" }) {
  return (
    <aside
      className={`ad-slot ad-slot--${placement}${adsEnabled ? "" : " ad-slot--off"}`}
      data-ad-slot={placement}
      data-ads-enabled={adsEnabled ? "true" : "false"}
      aria-hidden={adsEnabled ? undefined : "true"}
    >
      {adsEnabled ? <span className="ad-slot__label">{label}</span> : null}
    </aside>
  );
}
