import { AlertTriangle, Clock, TrendingDown, MessageSquareOff, Sparkles, Zap, Target, BarChart3, Send, Brain, Inbox, Users, LineChart, Plug } from "lucide-react";

export function Problem() {
  const items = [
    { icon: Clock, t: "Долгий ответ", d: "Клиент уходит к конкурентам, если ждёт ответ дольше 5 минут." },
    { icon: MessageSquareOff, t: "Потеря сообщений", d: "Менеджеры физически не успевают обрабатывать поток." },
    { icon: TrendingDown, t: "Низкая конверсия", d: "Хорошие лиды теряются между мессенджерами и CRM." },
    { icon: AlertTriangle, t: "Ночью продажи стоят", d: "В нерабочее время бизнес не зарабатывает." },
  ];
  return (
    <Section eyebrow="Проблема" title="Каждое непрочитанное сообщение — потерянный клиент">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((i, idx) => (
          <div key={idx} className="glass rounded-2xl p-5 hover:bg-white/5 transition-colors group">
            <div className="size-10 rounded-xl bg-destructive/15 grid place-items-center mb-3 group-hover:scale-110 transition-transform">
              <i.icon size={18} className="text-destructive" />
            </div>
            <h3 className="font-semibold">{i.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Solution() {
  const items = [
    { icon: Sparkles, t: "AI отвечает мгновенно", d: "За 2 секунды на любом языке. Понимает контекст и тон." },
    { icon: Target, t: "Квалифицирует лидов", d: "Сам определяет HOT / WARM / COLD и считает score 0–100." },
    { icon: Zap, t: "Запоминает каждого", d: "Полная история клиента в CRM с заметками AI." },
    { icon: BarChart3, t: "Растит выручку", d: "Аналитика и инсайты, какие сценарии лучше конвертируют." },
  ];
  return (
    <Section eyebrow="Решение" title="PREKLEAD — AI, который продаёт за вас">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((i, idx) => (
          <div
            key={idx}
            className="relative glass rounded-2xl p-5 hover:glow-primary hover:border-primary/40 transition-all group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="size-10 rounded-xl bg-primary/15 grid place-items-center mb-3 group-hover:scale-110 transition-transform">
                <i.icon size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold">{i.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function HowItWorks() {
  const steps = [
    { n: "01", icon: Plug, t: "Подключаете канал", d: "Telegram, Instagram, WhatsApp — за минуту." },
    { n: "02", icon: Brain, t: "AI обучается", d: "Указываете сайт или загружаете FAQ — AI готов." },
    { n: "03", icon: Send, t: "Отвечает клиентам", d: "Мгновенно, на любом языке, 24/7." },
    { n: "04", icon: LineChart, t: "Растит выручку", d: "Лиды попадают в CRM, вы видите рост в аналитике." },
  ];
  return (
    <Section eyebrow="Как работает" title="Запуск за 5 минут">
      <div className="relative grid md:grid-cols-4 gap-4">
        <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {steps.map((s, idx) => (
          <div key={idx} className="relative glass rounded-2xl p-5 animate-fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div className="size-10 rounded-xl bg-primary/15 grid place-items-center glow-primary">
                <s.icon size={18} className="text-primary" />
              </div>
              <span className="font-display text-2xl text-muted-foreground/40 font-semibold">{s.n}</span>
            </div>
            <h3 className="font-semibold">{s.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Features() {
  const items = [
    { icon: Inbox, t: "Единый Inbox", d: "Все каналы в одном окне." },
    { icon: Brain, t: "AI Intent Detection", d: "Распознаёт намерения клиента и тон сообщения." },
    { icon: Users, t: "CRM с историей", d: "Карточка клиента со всей перепиской и заметками AI." },
    { icon: Target, t: "Lead scoring", d: "Автоматическая оценка качества лида 0–100." },
    { icon: BarChart3, t: "Realtime аналитика", d: "Конверсия, источники, выручка — в реальном времени." },
    { icon: Zap, t: "Auto-replies", d: "Готовые сценарии под ваш бизнес." },
  ];
  return (
    <Section eyebrow="Возможности" title="Всё, что нужно для роста продаж">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((i, idx) => (
          <div key={idx} className="glass rounded-2xl p-5 hover:border-primary/40 transition-colors">
            <i.icon size={20} className="text-primary mb-3" />
            <h3 className="font-semibold">{i.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">{eyebrow}</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient leading-tight">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
