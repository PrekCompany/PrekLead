import { AlertTriangle, Clock, TrendingDown, MessageSquareOff, Sparkles, Zap, Target, BarChart3, Send, Brain, Inbox, Users, LineChart, Plug, Shield, CheckCircle, Rocket, Database, Activity, Star } from "../PhosphorIcons";
import { useScrollReveal } from "@/lib/useScrollReveal";

/* ════════════════════════════════════════
   PROBLEM — каскад проблем (таймлайн-боль)
   ════════════════════════════════════════ */
export function Problem() {
  const { ref, inView } = useScrollReveal();
  const items = [
    { icon: Clock, t: "Долгий ответ", d: "Клиент уходит к конкурентам, если ждёт дольше 5 минут", accent: "destructive" },
    { icon: MessageSquareOff, t: "Потеря сообщений", d: "Менеджеры физически не успевают обрабатывать поток сообщений из 3+ каналов", accent: "destructive" },
    { icon: TrendingDown, t: "Низкая конверсия", d: "Хорошие лиды теряются между мессенджерами и CRM", accent: "destructive" },
    { icon: AlertTriangle, t: "Ночью продажи стоят", d: "В нерабочее время бизнес не зарабатывает, клиенты уходят к конкурентам", accent: "destructive" },
  ];

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-6xl px-4">
        <div className={`max-w-2xl mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-xs font-semibold uppercase tracking-widest text-destructive mb-3">Проблема</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient leading-tight">
            Каждое непрочитанное сообщение — <span className="text-destructive">потерянный клиент</span>
          </h2>
        </div>

        {/* Staggered pain cascade */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-destructive/40 via-destructive/20 to-transparent" />

          <div className="space-y-6 lg:space-y-0">
            {items.map((i, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`lg:flex items-center gap-8 transition-all duration-700 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {/* Content side */}
                  <div className={`lg:w-1/2 ${isLeft ? 'lg:text-right lg:pr-12' : 'lg:text-left lg:pl-12 lg:ml-auto'}`}>
                    <div className={`inline-flex lg:max-w-md glass border border-destructive/20 rounded-2xl p-5 hover:border-destructive/40 transition-all duration-300 hover:-translate-y-0.5`}>
                      <div className="flex gap-4">
                        <div className={`size-12 rounded-xl bg-destructive/15 grid place-items-center shrink-0`}>
                          <i.icon size={20} className="text-destructive" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{i.t}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Dot connector */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-destructive/30 border-2 border-background">
                    <div className="w-2 h-2 m-auto rounded-full bg-destructive animate-pulse" />
                  </div>
                  {/* Empty side */}
                  <div className={`lg:w-1/2 ${isLeft ? '' : 'lg:order-first'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SOLUTION — центральный хаб с орбитами
   ════════════════════════════════════════ */
export function Solution() {
  const { ref, inView } = useScrollReveal();
  const items = [
    { icon: Sparkles, t: "AI отвечает мгновенно", d: "За 2 секунды на любом языке. Понимает контекст и тон." },
    { icon: Target, t: "Квалифицирует лидов", d: "HOT / WARM / COLD + score 0–100." },
    { icon: Zap, t: "Запоминает каждого", d: "Полная история клиента с заметками AI." },
    { icon: BarChart3, t: "Растит выручку", d: "Аналитика и инсайты по конверсии." },
  ];

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="size-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className={`max-w-2xl mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Решение</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient leading-tight">
            PREKLEAD — <span className="text-gradient-primary">AI, который продаёт</span> за вас
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-5 items-center">
          {/* Left column — 2 items */}
          <div className="space-y-5">
            {items.slice(0, 2).map((i, idx) => (
              <div
                key={idx}
                className={`glass rounded-2xl p-5 border border-primary/10 hover:border-primary/30 hover:glow-primary transition-all duration-300 hover:-translate-y-1 ${
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="size-10 rounded-xl bg-primary/15 grid place-items-center mb-3 group-hover:scale-110 transition-transform">
                  <i.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold">{i.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
              </div>
            ))}
          </div>

          {/* Center — hub */}
          <div className={`relative flex items-center justify-center py-10 transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="relative size-48 md:size-56 rounded-full glass-strong border-2 border-primary/20 glow-primary flex items-center justify-center">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-ring" />
              <div className="absolute inset-4 rounded-full border border-primary/5" style={{ animationDelay: '1s' }} />
              <div className="text-center">
                <Brain size={32} className="text-primary mx-auto mb-2" />
                <div className="font-display text-lg font-semibold">AI</div>
                <div className="text-[10px] text-muted-foreground">24/7</div>
              </div>
            </div>
            {/* Orbiting indicators */}
            <span className="absolute top-3 right-3" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <Star size={12} className="text-primary/40" />
            </span>
            <span className="absolute bottom-6 left-4" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '-1s' }}>
              <Star size={10} className="text-primary/30" />
            </span>
          </div>

          {/* Right column — 2 items */}
          <div className="space-y-5">
            {items.slice(2, 4).map((i, idx) => (
              <div
                key={idx}
                className={`glass rounded-2xl p-5 border border-primary/10 hover:border-primary/30 hover:glow-primary transition-all duration-300 hover:-translate-y-1 ${
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${(idx + 2) * 150}ms` }}
              >
                <div className="size-10 rounded-xl bg-primary/15 grid place-items-center mb-3">
                  <i.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold">{i.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   HOW IT WORKS — таймлайн с data-flow
   ════════════════════════════════════════ */
export function HowItWorks() {
  const { ref, inView } = useScrollReveal();
  const steps = [
    { n: "01", icon: Plug, t: "Подключаете канал", d: "Telegram, Instagram или WhatsApp — за 1 минуту через простую интеграцию." },
    { n: "02", icon: Database, t: "AI обучается", d: "Указываете сайт или загружаете FAQ — AI мгновенно изучает ваш бизнес." },
    { n: "03", icon: Send, t: "Отвечает клиентам", d: "Мгновенно, на любом языке, 24/7. С пониманием контекста." },
    { n: "04", icon: LineChart, t: "Растит выручку", d: "Лиды попадают в CRM, вы видите рост конверсии в реальном времени." },
  ];

  return (
    <section className="relative py-20 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-pattern opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="mx-auto max-w-6xl px-4">
        <div className={`max-w-2xl mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Как работает</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient leading-tight">
            Запуск за <span className="text-gradient-primary">5 минут</span>
          </h2>
        </div>

        {/* Desktop: horizontal data-flow pipeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Pipeline path */}
            <svg className="absolute inset-x-0 top-12 h-1 w-full pointer-events-none" viewBox="0 0 1000 2" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pipeline-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.62 0.24 258 / 0.1)" />
                  <stop offset="30%" stopColor="oklch(0.62 0.24 258 / 0.6)" />
                  <stop offset="70%" stopColor="oklch(0.62 0.24 258 / 0.6)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.24 258 / 0.1)" />
                </linearGradient>
              </defs>
              <line x1="0" y1="1" x2="1000" y2="1" stroke="url(#pipeline-grad)" strokeWidth="2" />
            </svg>

            <div className="grid grid-cols-4 gap-5">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className={`relative group transition-all duration-500 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${idx * 200}ms` }}
                >
                  {/* Step circle */}
                  <div className="relative size-24 mx-auto rounded-full glass-strong border-2 border-primary/20 glow-primary flex items-center justify-center group-hover:border-primary/50 group-hover:glow-strong transition-all duration-300">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <s.icon size={24} className="text-primary relative z-10" />
                  </div>
                  {/* Connector dot */}
                  {idx < 3 && (
                    <div className="absolute top-12 -right-2.5 size-2 rounded-full bg-primary/40 animate-pulse" />
                  )}
                  {/* Content */}
                  <div className="mt-5 text-center">
                    <span className="font-display text-xs font-semibold text-muted-foreground/40">{s.n}</span>
                    <h3 className="font-semibold mt-1">{s.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden">
          <div className="relative pl-8 space-y-8">
            <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
            {steps.map((s, idx) => (
              <div
                key={idx}
                className={`relative transition-all duration-500 ${
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="absolute -left-8 size-7 rounded-full glass-strong border border-primary/30 grid place-items-center">
                  <span className="text-[10px] font-bold text-primary">{s.n}</span>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <s.icon size={16} className="text-primary" />
                    <h3 className="font-semibold">{s.t}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   FEATURES — две визуальные группы
   ════════════════════════════════════════ */
export function Features() {
  const commRef = useScrollReveal();
  const growthRef = useScrollReveal();

  const communication = [
    { icon: Inbox, t: "Единый Inbox", d: "Все каналы — Telegram, Instagram, WhatsApp — в одном окне." },
    { icon: Brain, t: "AI Intent Detection", d: "Распознаёт намерения клиента, настроение и срочность." },
    { icon: Zap, t: "Auto-replies", d: "Готовые сценарии под ваш бизнес с AI-генерацией." },
  ];

  const growth = [
    { icon: Users, t: "CRM с историей", d: "Карточка клиента со всей перепиской и AI-заметками." },
    { icon: Target, t: "Lead Scoring", d: "Автооценка лида 0–100. HOT / WARM / COLD." },
    { icon: BarChart3, t: "Realtime аналитика", d: "Конверсия, источники, выручка — онлайн." },
  ];

  return (
    <section id="features" className="relative py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Возможности</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient leading-tight">
            Всё, что нужно для <span className="text-gradient-primary">роста продаж</span>
          </h2>
        </div>

        {/* Communication group — inbox mockup style */}
        <div ref={commRef.ref}>
          <div className={`flex items-center gap-2 mb-5 transition-all duration-500 ${commRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <MessageSquareOff size={16} className="text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60">Коммуникации</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {communication.map((i, idx) => (
              <div
                key={idx}
                className={`glass rounded-2xl p-5 border border-primary/10 hover:border-primary/30 hover:glow-primary transition-all duration-300 hover:-translate-y-0.5 group ${
                  commRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-xl bg-primary/15 grid place-items-center group-hover:scale-110 transition-transform">
                    <i.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold">{i.t}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{i.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Growth group — analytics style */}
        <div ref={growthRef.ref}>
          <div className={`flex items-center gap-2 mb-5 transition-all duration-500 ${growthRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <Activity size={16} className="text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60">Рост и аналитика</span>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {growth.map((i, idx) => (
              <div
                key={idx}
                className={`glass rounded-2xl p-5 border border-primary/10 hover:border-primary/30 hover:glow-primary transition-all duration-300 hover:-translate-y-0.5 group ${
                  growthRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 rounded-xl bg-primary/15 grid place-items-center group-hover:scale-110 transition-transform">
                    <i.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold">{i.t}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
