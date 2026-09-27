import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth.jsx";
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

const uslugiBlocks = [
  {
    items: [
      "Уведомление о прибытии — /dokument/pribytie (есть режим на ребёнка).",
      "Уведомление об убытии — /dokument/ubytie.",
      "Заявление на патент — /dokument/patent (патент на работу, не патент ИП).",
      "Заявление на РВП (взрослый) — /dokument/rvp.",
      "Заявление на ВНЖ — /dokument/vnzh.",
      "Подтверждение проживания по ВНЖ — /dokument/vnzh-podtverzhdenie.",
      "Подтверждение проживания по РВП — /dokument/rvp-podtverzhdenie.",
      "Заявление на гражданство — /dokument/grazhdanstvo.",
    ],
  },
  {
    heading: "Скоро",
    items: [
      "Уведомления работодателя о заключении и расторжении ТД.",
      "Продление / переоформление патента.",
      "РВП, ВНЖ и гражданство ребёнку.",
    ],
  },
  {
    warn: "Файл в МВД сам не уходит. Юридические тексты — заглушки «для юриста».",
    paragraphs: [
      "Список и пустой бланк бесплатны. Готовый файл — после тестовой оплаты 490 ₽: деньги не списываются.",
    ],
  },
];

const blankiBlocks = [
  {
    heading: "Скачать пустой бланк",
    items: [
      "Прибытие — /api/blanks/pribytie",
      "Убытие — /api/blanks/ubytie",
      "Патент — /api/blanks/patent",
      "РВП — /api/blanks/rvp",
      "ВНЖ — /api/blanks/vnzh",
      "Подтверждение ВНЖ — /api/blanks/vnzh-podtverzhdenie",
      "Подтверждение РВП — /api/blanks/rvp-podtverzhdenie",
      "Гражданство — /api/blanks/grazhdanstvo",
    ],
  },
  {
    paragraphs: [
      "В пустом файле нет ваших ответов. Заполненный PDF собирается на странице документа после тестовой оплаты.",
    ],
  },
];

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
            <Route
              path="/uslugi"
              element={
                <SimplePublicPage
                  title="Какие бланки можно заполнить"
                  lead="Каждая услуга открывается по адресу /dokument/… Файл в МВД сам не уходит."
                  blocks={uslugiBlocks}
                  cta={{ to: "/#dokumenty", label: "К документам" }}
                />
              }
            />
            <Route
              path="/blanki"
              element={
                <SimplePublicPage
                  title="Пустые бланки МВД"
                  lead="Кнопка скачивает пустой бланк без ваших ответов."
                  blocks={blankiBlocks}
                  cta={{ to: "/dokument/pribytie", label: "Заполнить уведомление" }}
                />
              }
            />
            <Route
              path="/ceny"
              element={
                <SimplePublicPage
                  title="490 ₽ за готовый файл"
                  lead="Сейчас оплата тестовая: деньги не списываются. Это не госпошлина."
                  blocks={[
                    {
                      paragraphs: [
                        "Пустой бланк и чек-лист бесплатны. Платный шаг — скачать бланк с вашими ответами.",
                        "Касса в режиме заглушки. Живая оплата не подключена.",
                      ],
                    },
                  ]}
                  cta={{ to: "/#dokumenty", label: "Выбрать документ" }}
                />
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
            <Route
              path="/statyi"
              element={
                <SimplePublicPage
                  title="Статьи"
                  lead="Короткие инструкции. Это не консультация юриста."
                  blocks={[
                    {
                      items: [
                        "Как заполнить уведомление о прибытии — /statyi/kak-zapolnit-uvedomlenie-o-pribytii",
                        "Сроки миграционного учёта — /statyi/sroki-migracionnogo-ucheta",
                        "Документы на патент — /statyi/dokumenty-na-patent-dlya-inostrannyh-grazhdan",
                        "Уведомление об убытии — /statyi/uvedomlenie-ob-ubytii",
                        "Заявление на РВП — /statyi/zayavlenie-na-rvp",
                        "Подтверждение проживания — /statyi/podtverzhdenie-prozhivaniya",
                      ],
                    },
                  ]}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </AuthProvider>
  );
}
