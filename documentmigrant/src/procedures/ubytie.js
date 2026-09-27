export const ubytie = {
  id: "ubytie",
  shortTitle: "Уведомление об убытии",
  title: "Уведомление об убытии иностранного гражданина или лица без гражданства из места пребывания",
  summary: "Снятие с миграционного учёта по месту пребывания, когда иностранец уехал с адреса.",
  status: "ready",
  official: {
    pageUrl: "https://тосно.78.мвд.рф/folder/18280070",
    pageTitle: "Образцы бланков ГУ МВД",
    blankTitle: "Форма уведомления об убытии",
    blankPageUrl: "https://тосно.78.мвд.рф/folder/18280070",
    checkedOn: "2026-09-27",
  },
  about: [
    "Уведомление об убытии сообщают, что иностранный гражданин или лицо без гражданства больше не находится по адресу, где его ставили на учёт.",
    "Обычно уведомление подаёт принимающая сторона. Сервис только собирает файл для печати: в МВД и на Госуслуги он сам не уходит.",
    "Подпись ставите от руки на бумаге. Отметку о приёме ставит орган, МФЦ или почта — не этот сайт.",
  ],
  whereTitle: "Куда подают",
  where: [
    "В подразделение по вопросам миграции МВД России.",
    "В МФЦ, если принимают такие уведомления.",
    "Почтой через организацию федеральной почтовой связи.",
  ],
  timing: [
    "Срок и комплект сверьте в подразделении по вашей ситуации: закон № 109-ФЗ и регламент МВД.",
    "Этот сервис сроки и госпошлину не назначает и не принимает.",
  ],
  blank: {
    title: "Форма уведомления об убытии",
    sourceUrl: "https://тосно.78.мвд.рф/folder/18280070",
    blankNote:
      "Пустой бланк отдаётся как макет полей для печати. Перед подачей сверьте форму с актуальной страницей образцов МВД. Дата сверки указана на странице документа.",
  },
  sources: [
    {
      title: "Образцы бланков ГУ МВД по Санкт-Петербургу и Ленинградской области",
      url: "https://тосно.78.мвд.рф/folder/18280070",
      note: "Сверьте актуальный бланк убытия перед подачей.",
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
          title: "Уведомление об убытии",
          what: "Бланк уведомления об убытии из места пребывания. Заполняется на русском языке.",
          who: "Обычно принимающая сторона.",
          exceptions: "Сверьте, кто именно должен подать уведомление в вашем случае.",
          need: "always",
        },
      ],
    },
  ],
  steps: [
    {
      id: "who",
      title: "1. Кто подаёт",
      lead: "От ответа зависит, чью подпись ставить на бланке.",
      groups: [
        {
          id: "who-main",
          fields: [
            {
              id: "filer",
              label: "Кто относит уведомление",
              type: "radio",
              required: true,
              options: [
                { value: "host", label: "Принимающая сторона" },
                { value: "self", label: "Сам иностранный гражданин" },
                { value: "other", label: "Иное лицо (уточните в подразделении)" },
              ],
            },
            {
              id: "office",
              label: "Куда понесёте бланк",
              type: "text",
              required: true,
              placeholder: "Отдел миграции МВД, город",
            },
          ],
        },
      ],
    },
    {
      id: "person",
      title: "2. Кто убывает",
      lead: "Сведения об иностранном гражданине или лице без гражданства.",
      groups: [
        {
          id: "person-main",
          fields: [
            { id: "lastName", label: "Фамилия", type: "text", required: true },
            { id: "firstName", label: "Имя", type: "text", required: true },
            {
              id: "middleName",
              label: "Отчество",
              hint: "Если нет — «нет».",
              type: "text",
              required: true,
            },
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
            {
              id: "docType",
              label: "Документ, вид",
              type: "text",
              required: true,
              placeholder: "Паспорт",
            },
            { id: "docSeries", label: "Серия", type: "text", required: true },
            { id: "docNumber", label: "Номер", type: "text", required: true },
            { id: "docIssued", label: "Кем и когда выдан", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      id: "place",
      title: "3. Адрес и даты",
      lead: "Адрес, с которого убывает, и дата убытия.",
      groups: [
        {
          id: "place-main",
          fields: [
            {
              id: "address",
              label: "Адрес места пребывания, с которого убывает",
              type: "textarea",
              required: true,
            },
            { id: "departDate", label: "Дата убытия", type: "date", required: true },
            {
              id: "stayUntilWas",
              label: "На какой срок был поставлен на учёт (по)",
              type: "date",
              required: false,
            },
            {
              id: "reason",
              label: "Причина убытия",
              hint: "Кратко: выезд, смена адреса, иное — как принято у вас в подразделении.",
              type: "textarea",
              required: true,
            },
          ],
        },
      ],
    },
    {
      id: "host",
      title: "4. Принимающая сторона",
      lead: "Кто принимал иностранца по этому адресу.",
      groups: [
        {
          id: "host-main",
          fields: [
            {
              id: "hostKind",
              label: "Кто принимающая сторона",
              type: "radio",
              required: true,
              options: [
                { value: "person", label: "Человек" },
                { value: "org", label: "Организация" },
              ],
            },
            {
              id: "hostName",
              label: "ФИО или название организации",
              type: "text",
              required: true,
            },
            {
              id: "hostDoc",
              label: "Документ принимающей стороны",
              type: "textarea",
              required: true,
            },
            { id: "hostAddress", label: "Адрес принимающей стороны", type: "textarea", required: true },
            { id: "hostPhone", label: "Телефон", type: "text" },
            {
              id: "ack",
              label:
                "Понимаю: файл в МВД сам не уходит. Перед подачей сверю с бланком. Подпись поставлю от руки.",
              type: "checkbox",
              required: true,
            },
          ],
        },
      ],
    },
  ],
  pdf: {
    fileName: "uvedomlenie-ob-ubytii.pdf",
    draftTitle: "Уведомление об убытии",
    formReference: "Макет полей уведомления об убытии. Сверьте с актуальным бланком МВД.",
    authorityNote: "Отметку о приёме ставит орган. Печать здесь не изображается.",
    signatureCaption: "Подпись лица, подающего уведомление (от руки):",
    closingLines: [],
  },
};
