export const rvpPodtverzhdenie = {
  id: "rvp-podtverzhdenie",
  shortTitle: "Подтверждение проживания по РВП",
  title: "Уведомление о подтверждении проживания в Российской Федерации по разрешению на временное проживание",
  summary: "Подтверждение проживания для обладателя РВП. Файл для печати, в МВД сам не уходит.",
  status: "ready",
  official: {
    pageUrl: "https://мвд.рф",
    pageTitle: "Бланки МВД",
    blankTitle: "Уведомление о подтверждении проживания по РВП",
    blankPageUrl: "https://мвд.рф",
    checkedOn: "2026-09-27",
  },
  about: [
    "Уведомление подаёт иностранец с РВП, чтобы подтвердить проживание в России.",
    "Срок и канал подачи сверьте в подразделении. Сервис только готовит файл для печати.",
    "Юридические тексты — заглушки «для юриста».",
  ],
  whereTitle: "Куда подают",
  where: [
    "В территориальный орган МВД по месту разрешения на временное проживание.",
    "Иные способы — только если они прямо предусмотрены для вашей ситуации; сервис их не выполняет.",
  ],
  timing: [
    "Ориентир по сроку — ежегодно в пределах срока, установленного законом. Точную дату сверьте в подразделении.",
  ],
  blank: {
    title: "Уведомление о подтверждении проживания по РВП",
    sourceUrl: "https://мвд.рф",
    blankNote: "Сверьте пустой бланк с актуальной формой МВД.",
  },
  sources: [
    {
      title: "Официальный сайт МВД России",
      url: "https://мвд.рф",
      note: "Актуальный бланк подтверждения проживания по РВП.",
    },
  ],
  checkedOn: "2026-09-27",
  checklist: [
    {
      id: "form",
      title: "Сам бланк",
      items: [
        {
          id: "blank",
          title: "Уведомление о подтверждении проживания по РВП",
          what: "Форма для обладателя разрешения на временное проживание.",
          who: "Владелец РВП или представитель — по регламенту.",
          exceptions: "Для ВНЖ — отдельный бланк.",
          need: "always",
        },
      ],
    },
  ],
  steps: [
    {
      id: "who",
      title: "1. Орган и РВП",
      groups: [
        {
          id: "who-main",
          fields: [
            { id: "authority", label: "Территориальный орган МВД", type: "text", required: true },
            { id: "rvpSeries", label: "Серия / номер отметки РВП", type: "text", required: true },
            { id: "rvpIssued", label: "Когда и кем проставлено РВП", type: "textarea", required: true },
            { id: "rvpUntil", label: "Срок действия РВП", type: "text", required: true },
          ],
        },
      ],
    },
    {
      id: "person",
      title: "2. Сведения о проживающем",
      groups: [
        {
          id: "person-main",
          fields: [
            { id: "lastName", label: "Фамилия", type: "text", required: true },
            { id: "firstName", label: "Имя", type: "text", required: true },
            { id: "middleName", label: "Отчество", type: "text", required: true, hint: "Если нет — «нет»." },
            { id: "citizenship", label: "Гражданство", type: "text", required: true },
            { id: "birthDate", label: "Дата рождения", type: "date", required: true },
            {
              id: "sex",
              label: "Пол",
              type: "radio",
              required: true,
              options: [
                { value: "m", label: "Мужской" },
                { value: "f", label: "Женский" },
              ],
            },
            { id: "docType", label: "Документ личности", type: "text", required: true },
            { id: "docSeries", label: "Серия", type: "text", required: true },
            { id: "docNumber", label: "Номер", type: "text", required: true },
            { id: "docIssued", label: "Кем и когда выдан", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      id: "stay",
      title: "3. Проживание и доходы",
      groups: [
        {
          id: "stay-main",
          fields: [
            { id: "address", label: "Адрес проживания", type: "textarea", required: true },
            { id: "periodFrom", label: "Период подтверждения с", type: "date", required: true },
            { id: "periodTo", label: "Период подтверждения по", type: "date", required: true },
            { id: "work", label: "Работа / учёба / иной источник средств", type: "textarea", required: true },
            { id: "income", label: "Сведения о доходах за период", type: "textarea", required: true },
            {
              id: "trips",
              label: "Выезды за пределы России",
              type: "textarea",
              required: true,
              hint: "Если не выезжали — «нет».",
            },
            { id: "phone", label: "Телефон", type: "text", required: true },
            {
              id: "ack",
              label:
                "Понимаю: файл в МВД сам не уходит. Сверю с бланком и подпишу от руки.",
              type: "checkbox",
              required: true,
            },
          ],
        },
      ],
    },
  ],
  pdf: {
    fileName: "podtverzhdenie-rvp.pdf",
    draftTitle: "Уведомление о подтверждении проживания по РВП",
    formReference: "Макет уведомления. Сверьте с официальным бланком МВД.",
    authorityNote: "Отметку ставит орган. Печать не изображается.",
    signatureCaption: "Подпись (от руки):",
    closingLines: [],
  },
};
