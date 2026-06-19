import { createFileRoute } from "@tanstack/react-router";
import { leads, messages } from "@/lib/mock-data";
import { useState } from "react";
import { Sparkle, CurrencyDollar, ChatCircle, FileText } from "../components/PhosphorIcons";

export const Route = createFileRoute("/app/crm")({
  head: () => ({ meta: [{ title: "CRM — PREKLEAD" }] }),
  component: CRMPage,
});

function CRMPage() {
  const [active, setActive] = useState(0);
  const client = leads[active];
  const conv = messages[active];

  return (
    <div className="grid md:grid-cols-[260px_1fr] h-[calc(100vh-53px)] divide-x divide-border">
      {/* Client list */}
      <div className="overflow-auto">
        <div className="px-4 py-3 border-b border-border sticky top-0 bg-background/80 backdrop-blur">
          <h2 className="font-semibold text-sm">Клиенты</h2>
        </div>
        {leads.map((l, i) => (
          <button
            key={l.id}
            onClick={() => setActive(i)}
            className={`w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors border-b border-border/50 ${
              active === i ? "bg-primary/5 border-l-2 border-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-primary/15 grid place-items-center text-[10px] font-semibold text-primary shrink-0">
                {l.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{l.name}</div>
                <div className="text-[10px] text-muted-foreground truncate">{l.company}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Client detail */}
      <div className="overflow-auto p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="size-14 rounded-xl bg-primary/20 grid place-items-center text-lg font-semibold text-primary shrink-0">
            {client.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{client.name}</h1>
            <p className="text-sm text-muted-foreground">{client.company} · {client.channel}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className={`tag text-[10px] ${
                client.status === "hot" ? "tag-destructive" :
                client.status === "warm" ? "tag-warning" : "tag"
              }`}>
                {client.status}
              </span>
              <span className="tag tag-primary text-[10px]">Score {client.score}</span>
              <span className="tag tag-success text-[10px]">{client.value}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* AI Notes */}
          <div className="card p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
              <Sparkle size={14} className="text-primary" /> AI заметки
            </h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1 rounded-full bg-primary/40 shrink-0" />
                Высокий интерес к продукту
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1 rounded-full bg-primary/40 shrink-0" />
                {client.status === "hot" ? "Готов к покупке — срочно связаться" :
                 client.status === "warm" ? "Сравнивает тарифы — предложить консультацию" :
                 "Низкая активность — отправить прогретый материал"}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 size-1 rounded-full bg-primary/40 shrink-0" />
                Рекомендуемое время контакта: 12:00–15:00
              </li>
            </ul>
          </div>

          {/* Deals */}
          <div className="card p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
              <CurrencyDollar size={14} className="text-success" /> Сделки
            </h3>
            <div className="space-y-2">
              {[
                { name: "Pro Monthly", status: "В работе", amount: client.value },
                { name: "Onboarding", status: "Завершено", amount: "$0" },
              ].map((deal, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated">
                  <div>
                    <div className="text-sm font-medium">{deal.name}</div>
                    <div className="text-[10px] text-muted-foreground">{deal.status}</div>
                  </div>
                  <div className="font-semibold text-success text-sm">{deal.amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversation history */}
          <div className="card p-4 md:col-span-2">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
              <ChatCircle size={14} className="text-primary" /> История сообщений
            </h3>
            <div className="space-y-2">
              {conv.thread.map((t, i) => (
                <div key={i} className={`flex ${t.from === "ai" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${
                    t.from === "ai" ? "bg-primary/15" : "bg-surface-elevated"
                  }`}>
                    {t.from === "ai" && (
                      <span className="text-[9px] text-primary/60 uppercase font-medium">AI </span>
                    )}
                    {t.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="card p-4 md:col-span-2">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
              <FileText size={14} className="text-muted-foreground" /> Заметки
            </h3>
            <textarea
              placeholder="Добавьте заметку о клиенте..."
              className="input-field resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
