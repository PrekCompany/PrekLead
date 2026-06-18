import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    tag: "Для старта",
    monthly: 5,
    yearly: 50,
    features: [
      "500 ответов AI в месяц",
      "Telegram + Instagram",
      "3 FAQ для обучения",
      "Базовая аналитика",
    ],
  },
  {
    name: "Medium",
    tag: "Популярный",
    monthly: 29,
    yearly: 290,
    recommended: true,
    features: [
      "10 000 ответов AI в месяц",
      "Telegram + Instagram + WhatsApp",
      "Обучение на сайте",
      "Статистика диалогов",
      "Без watermark",
    ],
  },
  {
    name: "High",
    tag: "Для команд",
    monthly: 79,
    yearly: 790,
    features: [
      "40 000 ответов AI в месяц",
      "Все каналы + API",
      "Приоритетные ответы",
      "Поддержка 3 сотрудников",
      "Личный менеджер",
    ],
  },
];

export function Pricing({ standalone = false }: { standalone?: boolean }) {
  const [year, setYear] = useState(true);
  return (
    <section className={`relative ${standalone ? "pt-32" : ""} py-20`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Тарифы</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient">
            Платите только за результат
          </h2>
          <p className="mt-4 text-muted-foreground">Без скрытых платежей. Отмена в один клик.</p>

          <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-full glass">
            <button
              onClick={() => setYear(false)}
              className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                !year ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setYear(true)}
              className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                year ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Год <span className="text-[10px] opacity-80 ml-1">−17%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 group ${
                p.recommended
                  ? "glass-strong border-primary/50 glow-primary hover:glow-strong"
                  : "glass hover:border-primary/30"
              }`}
            >
              {p.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-primary-glow text-xs font-semibold text-primary-foreground flex items-center gap-1">
                  <Sparkles size={10} /> Рекомендуем
                </div>
              )}
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{p.tag}</div>
              <h3 className="font-display text-2xl font-semibold mt-1">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold">${year ? p.yearly : p.monthly}</span>
                <span className="text-sm text-muted-foreground">/ {year ? "год" : "мес"}</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <div className="size-5 rounded-full bg-primary/15 grid place-items-center shrink-0 mt-0.5">
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
                    ? "bg-primary text-primary-foreground hover:bg-primary-glow"
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
