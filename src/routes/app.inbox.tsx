import { createFileRoute } from "@tanstack/react-router";
import { messages } from "@/lib/mock-data";
import { useState } from "react";
import {
  PaperPlaneRight,
  Sparkle,
  TelegramLogo,
  InstagramLogo,
  WhatsappLogo,
  MagnifyingGlass,
  SlidersHorizontal,
  Robot,
  Prohibit,
} from "../components/PhosphorIcons";

export const Route = createFileRoute("/app/inbox")({
  head: () => ({ meta: [{ title: "Сообщения — PREKLEAD" }] }),
  component: InboxPage,
});

type ChannelFilter = "all" | "telegram" | "instagram" | "whatsapp";

function InboxPage() {
  const [active, setActive] = useState(messages[0]);
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");
  const [aiDisabled, setAiDisabled] = useState<Set<string>>(new Set());

  const filtered = messages.filter((m) => {
    if (channelFilter !== "all" && m.channel !== channelFilter) return false;
    if (search && !m.client.toLowerCase().includes(search.toLowerCase()) && !m.preview.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleAi = (id: string) => {
    setAiDisabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const CHANNEL_ICONS: Record<string, typeof TelegramLogo> = {
    telegram: TelegramLogo,
    instagram: InstagramLogo,
    whatsapp: WhatsappLogo,
  };

  const CHANNEL_COLORS: Record<string, string> = {
    telegram: "bg-sky-500/15 text-sky-400",
    instagram: "bg-pink-500/15 text-pink-400",
    whatsapp: "bg-green-500/15 text-green-400",
  };

  return (
    <div className="grid md:grid-cols-[340px_1fr_300px] h-[calc(100vh-57px)] divide-x divide-border/50">
      {/* List */}
      <div className="flex flex-col">
        <div className="px-4 py-3 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur z-10 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Сообщения</h2>
            <span className="text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">
              {messages.length}
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <MagnifyingGlass size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по сообщениям..."
              className="w-full pl-8 pr-2 py-1.5 text-xs bg-white/[0.03] border border-border/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all"
            />
          </div>

          {/* Channel filter */}
          <div className="flex gap-1">
            {(["all", "telegram", "instagram", "whatsapp"] as ChannelFilter[]).map((ch) => {
              const Icon = ch === "all" ? SlidersHorizontal : CHANNEL_ICONS[ch];
              return (
                <button
                  key={ch}
                  onClick={() => setChannelFilter(ch)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                    channelFilter === ch
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {Icon && <Icon size={11} weight="fill" />}
                  <span className="capitalize">{ch === "all" ? "Все" : ch === "telegram" ? "TG" : ch === "instagram" ? "IG" : "WA"}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-auto divide-y divide-border/40">
          {filtered.map((m) => {
            const ChannelIcon = CHANNEL_ICONS[m.channel];
            const aiOff = aiDisabled.has(m.id);
            return (
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
                  <span className={`flex items-center gap-1 text-[10px] uppercase px-1.5 py-0.5 rounded ${CHANNEL_COLORS[m.channel]}`}>
                    <ChannelIcon size={10} weight="fill" />
                    {m.channel === "telegram" ? "Telegram" : m.channel === "instagram" ? "Instagram" : "WhatsApp"}
                  </span>
                  <StatusDot status={m.status} />
                  {aiOff && (
                    <span className="text-[10px] text-warning flex items-center gap-0.5">
                      <Prohibit size={10} /> AI выкл
                    </span>
                  )}
                  {!aiOff && (
                    <span className="text-[10px] text-success flex items-center gap-0.5">
                      <Robot size={10} weight="fill" /> ИИ отвечает
                    </span>
                  )}
                  {m.unread && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thread */}
      <div className="flex flex-col">
        <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between">
          <div>
            <div className="font-semibold">{active.client}</div>
            <div className="text-[10px] text-muted-foreground capitalize">
              {active.channel} · {active.intent}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleAi(active.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                aiDisabled.has(active.id)
                  ? "bg-warning/15 text-warning border border-warning/30"
                  : "bg-success/15 text-success border border-success/30"
              }`}
            >
              {aiDisabled.has(active.id) ? (
                <><Prohibit size={10} /> AI выключен</>
              ) : (
                <><Robot size={10} weight="fill" /> ИИ активен</>
              )}
            </button>
            <StatusBadge status={active.status} />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-5 space-y-3">
          {active.thread.map((t, i) => (
            <div key={i} className={`flex ${t.from === "ai" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                t.from === "ai"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-surface-elevated rounded-bl-sm"
              }`}>
                {t.from === "ai" && (
                  <div className="flex items-center gap-1 mb-1 opacity-60">
                    <Robot size={10} weight="fill" />
                    <span className="text-[9px] font-medium">AI</span>
                  </div>
                )}
                {t.text}
                <div className="text-[10px] opacity-60 mt-0.5">{t.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border/50 p-3 flex gap-2">
          <input
            placeholder="Введите сообщение..."
            className="flex-1 px-3 py-2 text-sm bg-input/40 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          {!aiDisabled.has(active.id) && (
            <button className="px-3 rounded-lg glass-strong hover:bg-white/5 flex items-center gap-1.5 text-sm transition-all">
              <Sparkle size={14} className="text-primary" /> AI
            </button>
          )}
          <button className="size-9 rounded-lg bg-primary grid place-items-center hover:bg-primary-glow transition-all">
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
        {!aiDisabled.has(active.id) && (
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
        )}
        {aiDisabled.has(active.id) && (
          <div className="glass rounded-xl p-4 text-center">
            <Prohibit size={20} className="text-warning mx-auto mb-2" />
            <div className="text-xs text-muted-foreground">AI отключён для этого диалога</div>
          </div>
        )}
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
