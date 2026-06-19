import { createFileRoute } from "@tanstack/react-router";
import { messages } from "@/lib/mock-data";
import { useState } from "react";
import { PaperPlaneRight, Sparkle } from "phosphor-react";

export const Route = createFileRoute("/app/inbox")({
  head: () => ({ meta: [{ title: "Inbox — PREKLEAD" }] }),
  component: InboxPage,
});

function InboxPage() {
  const [active, setActive] = useState(messages[0]);
  return (
    <div className="grid md:grid-cols-[320px_1fr_320px] h-[calc(100vh-57px)] divide-x divide-border/50">
      {/* List */}
      <div className="overflow-auto">
        <div className="px-4 py-3 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur z-10">
          <h2 className="font-display text-lg font-semibold">Inbox</h2>
          <p className="text-xs text-muted-foreground">{messages.length} диалогов · 3 новых</p>
        </div>
        <div className="divide-y divide-border/40">
          {messages.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m)}
              className={`w-full text-left p-4 hover:bg-white/5 transition-colors ${
                active.id === m.id ? "bg-primary/10 border-l-2 border-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm truncate">{m.client}</span>
                <span className="text-[10px] text-muted-foreground">{m.time}</span>
              </div>
              <div className="text-xs text-muted-foreground truncate mt-1">{m.preview}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{m.channel}</span>
                <StatusDot status={m.status} />
                {m.unread && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Thread */}
      <div className="flex flex-col">
        <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between">
          <div>
            <div className="font-semibold">{active.client}</div>
            <div className="text-[10px] text-muted-foreground capitalize">{active.channel} · {active.intent}</div>
          </div>
          <StatusBadge status={active.status} />
        </div>
        <div className="flex-1 overflow-auto p-5 space-y-3">
          {active.thread.map((t, i) => (
            <div key={i} className={`flex ${t.from === "ai" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                t.from === "ai" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-surface-elevated rounded-bl-sm"
              }`}>
                {t.text}
                <div className="text-[10px] opacity-60 mt-0.5">{t.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border/50 p-3 flex gap-2">
          <input
            placeholder="Введите сообщение или используйте AI suggest..."
            className="flex-1 px-3 py-2 text-sm bg-input/40 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <button className="px-3 rounded-lg glass-strong hover:bg-white/5 flex items-center gap-1.5 text-sm">
            <Sparkle size={14} className="text-primary" /> AI
          </button>
          <button className="size-9 rounded-lg bg-primary grid place-items-center">
            <PaperPlaneRight size={14} className="text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* AI Panel */}
      <div className="hidden md:block overflow-auto p-5 space-y-4 bg-surface/20">
        <div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">AI Analysis</div>
          <Row label="Intent" val={active.intent} />
          <Row label="Score" val={<ScoreBar v={active.score} />} />
          <Row label="Status" val={<StatusBadge status={active.status} />} />
          <Row label="Канал" val={<span className="capitalize">{active.channel}</span>} />
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkle size={14} className="text-primary" />
            <span className="text-xs font-semibold">Suggested reply</span>
          </div>
          <p className="text-sm leading-relaxed">{active.suggested}</p>
          <button className="mt-3 w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-glow transition-colors">
            Отправить ответ
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, val }: { label: string; val: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/40 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{val}</span>
    </div>
  );
}
function ScoreBar({ v }: { v: number }) {
  return (
    <div className="flex items-center gap-2 w-28">
      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${v}%` }} />
      </div>
      <span className="text-xs font-mono">{v}</span>
    </div>
  );
}
function StatusDot({ status }: { status: string }) {
  const c = status === "hot" ? "bg-destructive" : status === "warm" ? "bg-warning" : "bg-muted-foreground";
  return <span className={`size-1.5 rounded-full ${c}`} />;
}
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    hot: "bg-destructive/15 text-destructive",
    warm: "bg-warning/15 text-warning",
    cold: "bg-muted-foreground/15 text-muted-foreground",
  };
  return <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase ${map[status]}`}>{status}</span>;
}
