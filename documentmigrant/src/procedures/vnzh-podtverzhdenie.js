export const vnzhPodtverzhdenie = {
  id: "vnzh-podtverzhdenie",
  shortTitle: "Подтверждение проживания по ВНЖ",
  title: "Уведомление о подтверждении проживания в Российской Федерации по виду на жительство",
  summary: "Ежегодное подтверждение проживания для обладателя ВНЖ. Файл для печати, в МВД сам не уходит.",
  status: "ready",
  pdfMode: "layout",
  official: {
    pageUrl: "https://мвд.рф",
    pageTitle: "Бланки МВД",
    blankTitle: "Уведомление о подтверждении проживания по ВНЖ",
    blankPageUrl: "https://мвд.рф",
    checkedOn: "2026-09-27",
  },
  about: [
    "Уведомление подаёт иностранец с видом на жительство, чтобы подтвердить проживание в России.",
    "Срок и способ подачи (лично, почтой, электронно) сверьте в подразделении и на сайте МВД. Этот сервис электронную подачу не выполняет.",
    "Юридические тексты на странице — заглушки «для юриста».",
  ],
  whereTitle: "Куда подают",
  where: [
    "В территориальный орган МВД по месту жительства.",
    "В части случаев — почтой или через Госуслуги. Сервис эти каналы не заменяет.",
  ],
  timing: [
    "Обычный ориентир — ежегодно, в срок, установленный законом о правовом положении иностранных граждан. Точную дату отсчёта сверьте в подразделении.",
  ],
  blank: {
    title: "Уведомление о подтверждении проживания по ВНЖ",
    sourceUrl: "https://мвд.рф",
    blankNote: "Сверьте пустой бланк с актуальной формой МВД перед подачей.",
  },
  sources: [
    {
      title: "Официальный сайт МВД России",
      url: "https://мвд.рф",
      note: "Актуальный бланк и порядок подтверждения проживания.",
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
          title: "Уведомление о подтверждении проживания",
          what: "Форма уведомления для обладателя ВНЖ.",
          who: "Владелец вида на жительство или законный представитель — как указано в регламенте.",
          exceptions: "Для РВП — отдельный бланк подтверждения.",
          need: "always",
        },
      ],
    },
  ],
  steps: [
    {
      id: "who",
      title: "1. Орган и документ",
      lead: "Куда несёте уведомление и данные ВНЖ.",
      groups: [
        {
          id: "who-main",
          fields: [
            {
              id: "authority",
              label: "Территориальный орган МВД",
              type: "text",
              required: true,
            },
            { id: "vnzhSeries", label: "Серия ВНЖ", type: "text", required: true },
            { id: "vnzhNumber", label: "Номер ВНЖ", type: "text", required: true },
            { id: "vnzhIssued", label: "Когда и кем выдан ВНЖ", type: "textarea", required: true },
            { id: "vnzhUntil", label: "Срок действия ВНЖ", type: "text", required: true },
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
            {
              id: "address",
              label: "Адрес места жительства",
              type: "textarea",
              required: true,
            },
            {
              id: "periodFrom",
              label: "Период подтверждения с",
              type: "date",
              required: true,
            },
            {
              id: "periodTo",
              label: "Период подтверждения по",
              type: "date",
              required: true,
            },
            {
              id: "work",
              label: "Работа / учёба / иной источник средств",
              type: "textarea",
              required: true,
            },
            {
              id: "income",
              label: "Сведения о доходах за период",
              type: "textarea",
              required: true,
              hint: "Суммы и источники — как просит ваш бланк. Если пункта нет, напишите «нет» и сверьте форму.",
            },
            {
              id: "trips",
              label: "Выезды за пределы России за период",
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
    fileName: "podtverzhdenie-vnzh.pdf",
    draftTitle: "Уведомление о подтверждении проживания по ВНЖ",
    formReference: "Макет уведомления. Сверьте с официальным бланком МВД.",
    authorityNote: "Отметку ставит орган. Печать не изображается.",
    signatureCaption: "Подпись (от руки):",
    closingLines: [],
  },
};
