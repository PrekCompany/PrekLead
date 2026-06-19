import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Sparkles } from "../PhosphorIcons";
import { useScrollReveal } from "@/lib/useScrollReveal";

const PLANS = [
  {
    name: "Starter",
    tag: "Для малого бизнеса",
    monthly: 15,
    yearly: 150,
    features: [
      "До 500 AI-ответов в месяц",
      "Подключение Telegram",
      "Подключение Instagram",
      "Автоматические ответы клиентам 24/7",
      "Обучение AI на 3 частых вопросах",
      "Единый центр сообщений",
      "Базовая аналитика",
      "Определение горячих клиентов (Hot Leads)",
      "Email поддержка",
    ],
  },
  {
    name: "Pro",
    tag: "Для растущего бизнеса",
    monthly: 39,
    yearly: 390,
    recommended: true,
    features: [
      "До 10 000 AI-ответов в месяц",
      "Подключение Telegram",
      "Подключение Instagram",
      "Подключение WhatsApp",
      "Обучение AI на содержимом сайта",
      "Автоматические ответы клиентам",
      "Определение горячих клиентов",
      "Полноценная CRM система",
      "История сообщений",
      "Аналитика лидов и диалогов",
      "Статистика эффективности AI",
      "Управление клиентской базой",
      "Приоритетная поддержка",
    ],
  },
  {
    name: "Business",
    tag: "Для компаний",
    monthly: 89,
    yearly: 890,
    features: [
      "До 40 000 AI-ответов в месяц",
      "Все интеграции — Telegram, Instagram, WhatsApp",
      "Полное обучение AI на сайте и базе знаний",
      "Продвинутая CRM система",
      "Расширенная аналитика",
      "API доступ",
      "Приоритетная обработка запросов",
      "До 5 сотрудников в одном аккаунте",
      "Общая база клиентов и лидов",
      "Роли и права доступа",
      "Командная работа",
      "Расширенные настройки AI",
      "Приоритетная техническая поддержка",
    ],
  },
];

export function Pricing({ standalone = false }: { standalone?: boolean }) {
  const [year, setYear] = useState(true);
  const { ref, inView } = useScrollReveal(0.05);

  return (
    <section id="pricing" className={`relative ${standalone ? "pt-32" : ""} py-20`} ref={ref}>
      {/* Background glow behind recommended */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="size-[600px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className={`text-center mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Тарифы</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient">
            PREKLEAD Pricing
          </h2>
          <p className="mt-4 text-muted-foreground">Без скрытых платежей. Отмена в один клик.</p>

          <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-full glass border border-border/20">
            <button
              onClick={() => setYear(false)}
              className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                !year ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setYear(true)}
              className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                year ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Год <span className="text-[10px] opacity-80 ml-1">−17%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((p, idx) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 group ${
                p.recommended
                  ? "glass-strong border-primary/50 glow-primary hover:glow-strong"
                  : "glass hover:border-primary/30"
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {p.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primary-glow text-xs font-semibold text-primary-foreground flex items-center gap-1 shadow-lg">
                  <Sparkles size={10} /> Most Popular
                </div>
              )}
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{p.tag}</div>
              <h3 className="font-display text-2xl font-semibold mt-1">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold">${year ? p.yearly : p.monthly}</span>
                <span className="text-sm text-muted-foreground">/ {year ? "год" : "мес"}</span>
              </div>

              {/* Feature list */}
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <div className="size-5 rounded-full bg-primary/15 grid place-items-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`mt-7 block text-center py-2.5 rounded-xl font-medium transition-all ${
                  p.recommended
                    ? "bg-primary text-primary-foreground hover:bg-primary-glow shadow-lg shadow-primary/20"
                    : "glass-strong hover:bg-white/5"
                }`}
              >
                Выбрать {p.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
