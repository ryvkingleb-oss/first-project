export const rvp = {
  id: "rvp",
  shortTitle: "Заявление на РВП",
  title: "Заявление о выдаче разрешения на временное проживание",
  summary: "Бланк заявления на РВП для взрослого. Заявление на ребёнка здесь пока не собирается — смотрите раздел «Скоро».",
  status: "ready",
  pdfMode: "layout",
  official: {
    pageUrl: "https://мвд.рф",
    pageTitle: "Страница бланков МВД",
    blankTitle: "Заявление о выдаче РВП",
    blankPageUrl: "https://мвд.рф",
    checkedOn: "2026-09-27",
  },
  about: [
    "РВП — разрешение на временное проживание. Этот мастер заполняет заявление взрослого.",
    "Файл предназначен для печати. В МВД и на Госуслуги он сам не отправляется. Подпись ставите при сотруднике, как требует бланк.",
    "Юридические формулировки ниже — заглушки «для юриста»: перед подачей сверьте текст и комплект документов с актуальной страницей МВД и регламентом.",
  ],
  whereTitle: "Куда подают",
  where: [
    "В территориальный орган МВД России по вопросам миграции.",
    "В части случаев — через консульское учреждение за рубежом. Этот сервис консульскую подачу не заменяет.",
  ],
  timing: [
    "Сроки рассмотрения и квоты зависят от основания и региона. Здесь сроки не утверждаются.",
    "Госпошлину платите отдельно в казну, не через этот сервис.",
  ],
  blank: {
    title: "Заявление о выдаче РВП",
    sourceUrl: "https://мвд.рф",
    blankNote:
      "Пустой и заполненный файлы — макеты клеток для печати. Перед подачей сверьте бланк с официальной формой МВД.",
  },
  sources: [
    {
      title: "Официальный сайт МВД России",
      url: "https://мвд.рф",
      note: "Найдите актуальный бланк РВП и регламент. Текст здесь — помощник, не замена страницы ведомства.",
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
          title: "Заявление о выдаче РВП",
          what: "Заявление взрослого. Фотографию 35×45 мм наклеивают на бланк, если это требуется вашей формой.",
          who: "Заявитель или его представитель — как указано в регламенте.",
          exceptions: "Заявление на ребёнка — отдельный бланк, в этом мастере его нет.",
          need: "always",
        },
      ],
    },
  ],
  steps: [
    {
      id: "basis",
      title: "1. Орган и основание",
      lead: "Шапка заявления. Название органа напишите полностью.",
      groups: [
        {
          id: "basis-main",
          fields: [
            {
              id: "authority",
              label: "Орган, куда подаёте",
              type: "text",
              required: true,
              placeholder: "УВМ ГУ МВД России по …",
            },
            {
              id: "basis",
              label: "Основание обращения",
              type: "text",
              required: true,
              hint: "Кратко: квота, брак, ребёнок-гражданин РФ, иное — как в вашем случае. Сверьте формулировку с бланком.",
            },
            {
              id: "motive",
              label: "Мотивы обращения",
              type: "textarea",
              required: true,
            },
          ],
        },
      ],
    },
    {
      id: "person",
      title: "2. Сведения о заявителе",
      lead: "ФИО и данные документа. Пишите как в паспорте.",
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
            {
              id: "previousNames",
              label: "Прежние ФИО",
              hint: "Если не меняли — «нет».",
              type: "textarea",
              required: true,
            },
            { id: "citizenship", label: "Гражданство", type: "text", required: true },
            { id: "birthDate", label: "Дата рождения", type: "date", required: true },
            { id: "birthPlace", label: "Место рождения", type: "text", required: true },
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
              id: "marital",
              label: "Семейное положение",
              type: "select",
              required: true,
              options: [
                { value: "single", label: "Холост / не замужем" },
                { value: "married", label: "Женат / замужем" },
                { value: "divorced", label: "Разведён(а)" },
                { value: "widowed", label: "Вдовец / вдова" },
              ],
            },
          ],
        },
        {
          id: "person-doc",
          title: "Документ личности",
          fields: [
            { id: "docType", label: "Вид документа", type: "text", required: true, placeholder: "Паспорт" },
            { id: "docSeries", label: "Серия", type: "text", required: true },
            { id: "docNumber", label: "Номер", type: "text", required: true },
            { id: "docIssued", label: "Кем и когда выдан", type: "textarea", required: true },
            { id: "docUntil", label: "Срок действия", type: "text", required: true },
          ],
        },
      ],
    },
    {
      id: "address",
      title: "3. Адрес и контакты",
      lead: "Где живёте и как с вами связаться.",
      groups: [
        {
          id: "address-main",
          fields: [
            {
              id: "homeAbroad",
              label: "Адрес постоянного проживания за рубежом",
              type: "textarea",
              required: true,
            },
            {
              id: "addressRu",
              label: "Адрес пребывания / проживания в России",
              type: "textarea",
              required: true,
            },
            { id: "phone", label: "Телефон", type: "text", required: true },
            { id: "email", label: "Электронная почта", type: "text", required: false },
            {
              id: "workStudy",
              label: "Работа или учёба",
              hint: "Если нет — «нет».",
              type: "textarea",
              required: true,
            },
          ],
        },
      ],
    },
    {
      id: "extra",
      title: "4. Дополнительные сведения",
      lead: "Краткие ответы. Если пункта на вашем бланке нет — напишите «нет» или сверьте форму.",
      groups: [
        {
          id: "extra-main",
          fields: [
            {
              id: "criminal",
              label: "Судимость / уголовное преследование",
              type: "textarea",
              required: true,
              hint: "Если нет — «нет».",
            },
            {
              id: "expulsion",
              label: "Выдворение / депортация",
              type: "textarea",
              required: true,
              hint: "Если нет — «нет».",
            },
            {
              id: "familyRu",
              label: "Близкие родственники в России",
              type: "textarea",
              required: true,
              hint: "ФИО, родство, статус. Если нет — «нет».",
            },
            {
              id: "ack",
              label:
                "Понимаю: файл — черновик для печати, в МВД сам не уходит. Подпись поставлю при сотруднике. Текст «для юриста» — заглушка.",
              type: "checkbox",
              required: true,
            },
          ],
        },
      ],
    },
  ],
  pdf: {
    fileName: "zayavlenie-o-rvp.pdf",
    draftTitle: "Заявление о выдаче разрешения на временное проживание",
    formReference: "Макет заявления на РВП (взрослый). Сверьте с официальным бланком МВД.",
    photoCaption: "Место для фотографии",
    authorityNote: "Служебный блок заполняет сотрудник. Печать не изображается.",
    signatureCaption: "Подпись заявителя (при сотруднике):",
    closingLines: [],
  },
};
