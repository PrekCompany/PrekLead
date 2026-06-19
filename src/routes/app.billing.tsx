import { createFileRoute } from "@tanstack/react-router";
import { Check } from "../components/PhosphorIcons";

export const Route = createFileRoute("/app/billing")({
  head: () => ({ meta: [{ title: "Оплата — PREKLEAD" }] }),
  component: BillingPage,
});

const PLANS = [
  {
    name: "Starter",
    price: "$29",
    period: "/мес",
    features: ["1 000 AI ответов", "1 пользователь", "1 канал", "Базовая аналитика"],
    current: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/мес",
    features: ["10 000 AI ответов", "5 пользователей", "Все каналы", "Полная аналитика", "Приоритетная поддержка"],
    current: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/мес",
    features: ["100 000 AI ответов", "Неограничено пользователей", "Все каналы", "API доступ", "Персональный менеджер"],
    current: false,
  },
];

const PAYMENT_HISTORY = [
  { date: "15 мая 2026", plan: "Pro", amount: "$79", status: "paid" as const },
  { date: "15 апр 2026", plan: "Pro", amount: "$79", status: "paid" as const },
  { date: "15 мар 2026", plan: "Starter", amount: "$29", status: "paid" as const },
];

function BillingPage() {
  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Оплата и план</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Управление подпиской и платежами
        </p>
      </div>

      {/* Current plan */}
      <div className="card p-5 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Текущий план</div>
            <div className="text-xl font-semibold">Pro</div>
            <div className="text-sm text-muted-foreground mt-1">$79/месяц</div>
            <div className="text-xs text-muted-foreground mt-3">Следующее списание: 15 июня 2026</div>
          </div>
          <button className="btn btn-ghost text-sm text-destructive hover:bg-destructive/10">
            Отменить подписку
          </button>
        </div>
      </div>

      {/* Plans comparison */}
      <h2 className="text-sm font-semibold mb-4">Доступные тарифы</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`card p-5 ${plan.current ? "ring-1 ring-primary/40" : ""}`}>
            {plan.current && (
              <span className="tag tag-primary text-[10px] mb-3 inline-flex">Текущий план</span>
            )}
            <div className="text-lg font-semibold">{plan.name}</div>
            <div className="mt-1">
              <span className="text-2xl font-semibold">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={12} className="text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`btn w-full mt-5 ${plan.current ? "btn-secondary" : "btn-primary"}`}
              disabled={plan.current}
            >
              {plan.current ? "Текущий" : "Выбрать"}
            </button>
          </div>
        ))}
      </div>

      {/* Payment history */}
      <h2 className="text-sm font-semibold mb-4">История платежей</h2>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Дата</th>
              <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">План</th>
              <th className="text-left px-5 py-3 font-medium text-muted-foreground text-xs">Сумма</th>
              <th className="text-right px-5 py-3 font-medium text-muted-foreground text-xs">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {PAYMENT_HISTORY.map((p, i) => (
              <tr key={i}>
                <td className="px-5 py-3">{p.date}</td>
                <td className="px-5 py-3">{p.plan}</td>
                <td className="px-5 py-3">{p.amount}</td>
                <td className="px-5 py-3 text-right">
                  <span className="tag tag-success text-[10px]">Оплачено</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
