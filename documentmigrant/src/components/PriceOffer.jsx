import React from "react";
import { Link } from "react-router-dom";

export function PriceOffer({ compact = false }) {
  return (
    <section className={`offer${compact ? " offer--compact" : ""}`} aria-label="Что продаём">
      <p className="kicker">Что продаём</p>
      <p className="offer-price">
        <strong>490 ₽</strong>
        <span>готовый файл одного бланка с вашими ответами</span>
      </p>
      <ul className="offer-list">
        <li>Пустой бланк и список документов — бесплатно.</li>
        <li>Сейчас оплата тестовая: деньги не списываются.</li>
        <li>Это плата сервиса, не госпошлина. В МВД файл сам не уходит.</li>
      </ul>
      {compact ? null : (
        <Link className="btn-quiet" to="/ceny">
          Подробнее о цене
        </Link>
      )}
    </section>
  );
}
