import { createFileRoute } from "@tanstack/react-router";
import { messages, leads } from "@/lib/mock-data";
import { useState } from "react";
import { Sparkles, MessageCircle, FileText, DollarSign } from "lucide-react";

export const Route = createFileRoute("/app/crm")({
  head: () => ({ meta: [{ title: "CRM — PREKLEAD" }] }),
  component: CRMPage,
});

function CRMPage() {
  const [active, setActive] = useState(0);
  const client = leads[active];
  const conv = messages[active];

  return (
    <div className="grid md:grid-cols-[280px_1fr] h-[calc(100vh-57px)] divide-x divide-border/50">
      <div className="overflow-auto">
        <div className="px-4 py-3 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur">
          <h2 className="font-display text-lg font-semibold">Клиенты</h2>
        </div>
        {leads.map((l, i) => (
          <button
            key={l.id}
            onClick={() => setActive(i)}
            className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors border-b border-border/30 ${
              active === i ? "bg-primary/10" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 grid place-items-center text-xs font-semibold">
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

      <div className="overflow-auto p-6 md:p-8">
        <div className="flex items-start gap-5">
          <div className="size-20 rounded-2xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-white font-display text-2xl font-semibold glow-primary">
            {client.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-semibold">{client.name}</h1>
            <p className="text-sm text-muted-foreground">{client.company} · {client.channel}</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <span className="px-2 py-1 rounded-md bg-primary/15 text-primary text-xs font-semibold">Score {client.score}</span>
              <span className="px-2 py-1 rounded-md bg-warning/15 text-warning text-xs font-semibold uppercase">{client.status}</span>
              <span className="px-2 py-1 rounded-md bg-success/15 text-success text-xs font-semibold">Сделка {client.value}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <div className="glass rounded-2xl p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
              <Sparkles size={14} className="text-primary" /> AI заметки
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Высокий интент покупки — клиент сравнивает тарифы</li>
              <li>• Упоминал годовую подписку и API доступ</li>
              <li>• Лучшее окно для контакта: 12:00–14:00</li>
              <li>• Рекомендуем предложить Pro yearly со скидкой 17%</li>
            </ul>
          </div>

          <div className="glass rounded-2xl p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
              <DollarSign size={14} className="text-success" /> Сделки
            </h3>
            <div className="space-y-2">
              <Deal name="Pro yearly" status="В работе" amount={client.value} />
              <Deal name="Onboarding" status="Завершено" amount="$0" />
            </div>
          </div>

          <div className="glass rounded-2xl p-5 md:col-span-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
              <MessageCircle size={14} className="text-primary" /> История сообщений
            </h3>
            <div className="space-y-2">
              {conv.thread.map((t, i) => (
                <div key={i} className={`flex ${t.from === "ai" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${
                    t.from === "ai" ? "bg-primary/20 text-foreground" : "bg-surface-elevated"
                  }`}>{t.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5 md:col-span-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
              <FileText size={14} className="text-muted-foreground" /> Заметки оператора
            </h3>
            <textarea
              placeholder="Добавьте заметку..."
              className="w-full bg-input/40 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Deal({ name, status, amount }: { name: string; status: string; amount: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-surface-elevated">
      <div>
        <div className="text-sm font-medium">{name}</div>
        <div className="text-[10px] text-muted-foreground">{status}</div>
      </div>
      <div className="font-semibold text-success">{amount}</div>
    </div>
  );
}
