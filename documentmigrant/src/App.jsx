import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth.jsx";
import { PortalPage } from "./components/PortalPage.jsx";
import { PriceOffer } from "./components/PriceOffer.jsx";
import {
  AuthPage,
  DocumentPage,
  HomePage,
  KabinetPage,
  PaymentPage,
  RequireAuth,
  SimplePublicPage,
  WizardPage,
} from "./pages.jsx";
import { Shell } from "./ui.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registraciya" element={<AuthPage mode="register" />} />
            <Route path="/vhod" element={<AuthPage mode="login" />} />
            <Route
              path="/kabinet"
              element={
                <RequireAuth>
                  <KabinetPage />
                </RequireAuth>
              }
            />
            <Route path="/dokument/:procedureId" element={<DocumentPage />} />
            <Route
              path="/zayavlenie/:id"
              element={
                <RequireAuth>
                  <WizardPage />
                </RequireAuth>
              }
            />
            <Route
              path="/zayavlenie/:id/oplata"
              element={
                <RequireAuth>
                  <PaymentPage />
                </RequireAuth>
              }
            />
            <Route path="/uslugi" element={<PortalPage path="/uslugi" />} />
            <Route path="/blanki" element={<PortalPage path="/blanki" />} />
            <Route
              path="/ceny"
              element={
                <div className="stack-lg">
                  <header className="stack">
                    <p className="kicker">Цены</p>
                    <h1>Готовый файл бланка — 490 ₽</h1>
                    <p className="lead">
                      Мы продаём заполненный бланк: ваши ответы уже стоят в форме, файл можно скачать и распечатать.
                    </p>
                  </header>
                  <PriceOffer />
                  <section className="stack">
                    <h2>Что входит в 490 ₽</h2>
                    <ul className="list">
                      <li>Один бланк с вашими ответами: прибытие, убытие, патент, РВП, ВНЖ, подтверждение проживания или гражданство.</li>
                      <li>Файл хранится в кабинете, его можно скачать снова.</li>
                    </ul>
                  </section>
                  <section className="stack">
                    <h2>Что бесплатно</h2>
                    <ul className="list">
                      <li>Пустой бланк без ваших данных.</li>
                      <li>Список документов и короткие инструкции.</li>
                    </ul>
                  </section>
                  <section className="stack">
                    <h2>Чего в цене нет</h2>
                    <ul className="list">
                      <li>Госпошлина и платежи в казну — их платят отдельно, если они нужны.</li>
                      <li>Подача в МВД, МФЦ или на Госуслуги. Документ несёте сами.</li>
                      <li>Подпись и отметка подразделения.</li>
                    </ul>
                  </section>
                  <p>
                    <a className="btn" href="/#dokumenty">
                      Выбрать документ
                    </a>
                  </p>
                </div>
              }
            />
            <Route
              path="/kak-eto-rabotaet"
              element={
                <SimplePublicPage
                  title="Как заполнить бланк онлайн"
                  lead="Сервис не заменяет приём в подразделении и не подаёт заявление в МВД."
                  blocks={[
                    {
                      items: [
                        "Создаёте кабинет.",
                        "Заполняете поля бланка.",
                        "Подтверждаете тестовую оплату без списания.",
                        "Скачиваете PDF, подписываете от руки и несёте сами.",
                      ],
                    },
                  ]}
                />
              }
            />
            <Route
              path="/kontakty"
              element={
                <SimplePublicPage
                  title="Контакты"
                  lead="Это не подразделение МВД и не МФЦ."
                  blocks={[
                    {
                      paragraphs: [
                        "Офиса приёма документов нет. Файл печатаете и подаёте сами.",
                        "Юридические страницы — заглушки «для юриста».",
                      ],
                    },
                  ]}
                />
              }
            />
            <Route
              path="/oferta"
              element={
                <SimplePublicPage
                  title="Оферта не действует: оплата тестовая"
                  lead="Публичный договор не опубликован. Кнопка оплаты не списывает деньги."
                  blocks={[
                    {
                      warn: "Живая касса не подключена. Текст — заглушка «для юриста».",
                      paragraphs: ["Сервис не оказывает юридическую помощь и не подаёт документы в госорганы."],
                    },
                  ]}
                />
              }
            />
            <Route
              path="/politika"
              element={
                <SimplePublicPage
                  title="Данные кабинета"
                  lead="Это короткая памятка, не полноценная политика оператора."
                  blocks={[
                    {
                      paragraphs: [
                        "В кабинете хранятся почта, имя, хеш пароля и ответы анкеты, чтобы собрать PDF. В МВД они не отправляются.",
                      ],
                    },
                  ]}
                />
              }
            />
            <Route path="/migracionnyj-uchet" element={<PortalPage path="/migracionnyj-uchet" />} />
            <Route
              path="/registraciya-inostrannogo-grazhdanina"
              element={<PortalPage path="/registraciya-inostrannogo-grazhdanina" />}
            />
            <Route path="/statyi" element={<PortalPage path="/statyi" />} />
            <Route path="/statyi/:slug" element={<PortalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </AuthProvider>
  );
}
