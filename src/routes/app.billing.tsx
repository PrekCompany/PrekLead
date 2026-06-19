import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkle, Check, CreditCard, FileText, ArrowRight } from "../components/PhosphorIcons";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/billing")({
  head: () => ({ meta: [{ title: "Оплата — PREKLEAD" }] }),
  component: BillingPage,
});

const PLANS = [
  { name: "Starter", price: 15, features: ["500 AI-ответов", "Telegram + Instagram", "Базовая аналитика"] },
  { name: "Pro", price: 39, features: ["10 000 AI-ответов", "Все каналы", "Полная CRM", "Приоритетная поддержка"], popular: true },
  { name: "Business", price: 89, features: ["40 000 AI-ответов", "Команда до 5 чел", "API доступ", "Расширенная аналитика"] },
];

const PAYMENT_HISTORY = [
  { date: "15 мая 2026", amount: "$39", plan: "Pro", status: "paid" },
  { date: "15 апр 2026", amount: "$39", plan: "Pro", status: "paid" },
  { date: "15 мар 2026", amount: "$39", plan: "Starter", status: "paid" },
];

function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("Pro");

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-gradient">Оплата и тариф</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Текущий тариф: <span className="text-primary font-medium">{currentPlan}</span>
        </p>
      </div>

      {/* Current plan card */}
      <div className="glass rounded-3xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 size-40 bg-primary/5 blur-[80px] rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Sparkle size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Текущий план</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-display text-4xl font-semibold">${PLANS.find((p) => p.name === currentPlan)?.price}</span>
            <span className="text-muted-foreground">/ мес</span>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-2">
            {PLANS.find((p) => p.name === currentPlan)?.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check size={12} className="text-primary" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Switch plan */}
      <h2 className="font-display text-xl font-semibold mb-4">Сменить тариф</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {PLANS.map((plan) => {
          const isCurrent = plan.name === currentPlan;
          return (
            <button
              key={plan.name}
              onClick={() => setCurrentPlan(plan.name)}
              disabled={isCurrent}
              className={`relative rounded-2xl p-5 text-left transition-all border ${
                plan.popular
                  ? "border-primary/40 glass-strong"
                  : "glass border-border/40 hover:border-primary/30"
              } ${isCurrent ? "ring-2 ring-primary/50 opacity-80" : "hover:-translate-y-0.5"}`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{plan.name}</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-display text-2xl font-semibold">${plan.price}</span>
                <span className="text-xs text-muted-foreground">/ мес</span>
              </div>
              {isCurrent && (
                <div className="mt-3 text-xs text-primary font-medium">Текущий тариф</div>
              )}
              {!isCurrent && (
                <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium">
                  Перейти <ArrowRight size={10} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Payment method */}
      <div className="glass rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-9 rounded-xl bg-primary/15 grid place-items-center"><CreditCard size={16} className="text-primary" /></div>
          <div>
            <div className="text-sm font-semibold">Способ оплаты</div>
            <div className="text-xs text-muted-foreground">Карта привязана</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-border/40">
          <div className="size-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 grid place-items-center text-white text-[10px] font-bold">
            VISA
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Visa •••• 4242</div>
            <div className="text-xs text-muted-foreground">Истекает 12/27</div>
          </div>
          <button className="text-xs text-primary hover:text-primary-glow transition-colors">Изменить</button>
        </div>
      </div>

      {/* Payment history */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-9 rounded-xl bg-primary/15 grid place-items-center"><FileText size={16} className="text-primary" /></div>
          <div>
            <div className="text-sm font-semibold">История платежей</div>
          </div>
        </div>
        <div className="space-y-2">
          {PAYMENT_HISTORY.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-border/30">
              <div>
                <div className="text-sm font-medium">{p.plan}</div>
                <div className="text-xs text-muted-foreground">{p.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">{p.amount}</div>
                <div className="text-[10px] text-success">Оплачено</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
