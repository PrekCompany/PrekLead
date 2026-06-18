export type Channel = "telegram" | "instagram" | "whatsapp";

export interface Message {
  id: string;
  client: string;
  channel: Channel;
  preview: string;
  time: string;
  unread?: boolean;
  intent: string;
  score: number;
  status: "hot" | "warm" | "cold";
  suggested: string;
  thread: { from: "client" | "ai"; text: string; time: string }[];
}

export const messages: Message[] = [
  {
    id: "1",
    client: "Алексей Петров",
    channel: "telegram",
    preview: "Здравствуйте! Можно узнать стоимость пакета Pro?",
    time: "2 мин",
    unread: true,
    intent: "Запрос цены",
    score: 92,
    status: "hot",
    suggested: "Здравствуйте, Алексей! Пакет Pro — $79/мес. Хотите оформить пробный период?",
    thread: [
      { from: "client", text: "Здравствуйте! Можно узнать стоимость пакета Pro?", time: "12:42" },
      { from: "ai", text: "Здравствуйте! Pro — $79/мес. Включает 40 000 ответов AI.", time: "12:42" },
      { from: "client", text: "А годовая подписка есть?", time: "12:44" },
    ],
  },
  {
    id: "2",
    client: "Maria Gonzalez",
    channel: "instagram",
    preview: "Hi! Do you ship to Spain?",
    time: "8 мин",
    unread: true,
    intent: "Доставка",
    score: 78,
    status: "warm",
    suggested: "Hi Maria! Yes, we deliver to Spain within 3–5 business days.",
    thread: [{ from: "client", text: "Hi! Do you ship to Spain?", time: "12:36" }],
  },
  {
    id: "3",
    client: "Дмитрий К.",
    channel: "whatsapp",
    preview: "Сколько занимает интеграция с CRM?",
    time: "21 мин",
    intent: "Техвопрос",
    score: 65,
    status: "warm",
    suggested: "Интеграция CRM занимает 5–10 минут. Хотите подключим сейчас?",
    thread: [{ from: "client", text: "Сколько занимает интеграция с CRM?", time: "12:23" }],
  },
  {
    id: "4",
    client: "Sarah Lee",
    channel: "instagram",
    preview: "Looks interesting, sending to my team",
    time: "1 ч",
    intent: "Заинтересован",
    score: 41,
    status: "cold",
    suggested: "Thanks Sarah! Want me to send a 1-pager for your team?",
    thread: [{ from: "client", text: "Looks interesting, sending to my team", time: "11:40" }],
  },
  {
    id: "5",
    client: "Иван Сидоров",
    channel: "telegram",
    preview: "Готов оплачивать. Куда отправить реквизиты?",
    time: "1 ч",
    intent: "Готов к оплате",
    score: 98,
    status: "hot",
    suggested: "Отлично! Отправляю ссылку на оплату через защищённый канал.",
    thread: [{ from: "client", text: "Готов оплачивать. Куда отправить реквизиты?", time: "11:32" }],
  },
  {
    id: "6",
    client: "Anna Beck",
    channel: "whatsapp",
    preview: "Maybe later, thanks",
    time: "3 ч",
    intent: "Отложено",
    score: 22,
    status: "cold",
    suggested: "No problem Anna — I'll ping you in 2 weeks with an update.",
    thread: [{ from: "client", text: "Maybe later, thanks", time: "09:48" }],
  },
];

export interface Lead {
  id: string;
  name: string;
  company: string;
  score: number;
  status: "hot" | "warm" | "cold";
  channel: Channel;
  value: string;
}

export const leads: Lead[] = messages.map((m, i) => ({
  id: m.id,
  name: m.client,
  company: ["Northstar Co", "Lumen AI", "Vector Labs", "Pinecone Studio", "Helix Group", "Arc & Co"][i],
  score: m.score,
  status: m.status,
  channel: m.channel,
  value: ["$2 400", "$890", "$5 200", "$320", "$12 400", "$140"][i],
}));

export const analytics = {
  revenue: [
    { d: "Пн", v: 1200 },
    { d: "Вт", v: 1800 },
    { d: "Ср", v: 1500 },
    { d: "Чт", v: 2400 },
    { d: "Пт", v: 2100 },
    { d: "Сб", v: 3200 },
    { d: "Вс", v: 4100 },
  ],
  leads: [
    { d: "Пн", v: 24 },
    { d: "Вт", v: 31 },
    { d: "Ср", v: 28 },
    { d: "Чт", v: 42 },
    { d: "Пт", v: 38 },
    { d: "Сб", v: 51 },
    { d: "Вс", v: 67 },
  ],
  sources: [
    { name: "Telegram", value: 52 },
    { name: "Instagram", value: 31 },
    { name: "WhatsApp", value: 17 },
  ],
};

export const faq = [
  {
    q: "Как быстро AI обучается под мой бизнес?",
    a: "Базовое обучение занимает 2–5 минут. Вы загружаете FAQ или указываете сайт — AI готов отвечать клиентам.",
  },
  {
    q: "Какие каналы поддерживаются?",
    a: "На данный момент Telegram. Instagram и WhatsApp в ближайших релизах.",
  },
  {
    q: "Что происходит, если AI не знает ответ?",
    a: "Сообщение помечается как «требует внимания» и попадает в Inbox для оператора.",
  },
  {
    q: "Можно ли отменить подписку в любой момент?",
    a: "Да. Никаких скрытых условий — отмена в один клик из настроек.",
  },
  {
    q: "Есть ли API?",
    a: "Да, API доступен на тарифе High. Также есть webhooks и интеграции с популярными CRM.",
  },
];
