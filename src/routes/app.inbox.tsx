import { createFileRoute } from "@tanstack/react-router";
import { messages } from "@/lib/mock-data";
import { useState } from "react";
import {
  PaperPlaneRight,
  Robot,
  Prohibit,
  MagnifyingGlass,
  ChatCircle,
  ImageSquare,
  ChatText,
  Check,
  X,
} from "../components/PhosphorIcons";
import * as Switch from "@radix-ui/react-switch";

export const Route = createFileRoute("/app/inbox")({
  head: () => ({ meta: [{ title: "Сообщения — PREKLEAD" }] }),
  component: InboxPage,
});

type ChannelFilter = "all" | "telegram" | "instagram" | "whatsapp";

const CHANNEL_ICONS: Record<string, any> = {
  telegram: ChatCircle,
  instagram: ImageSquare,
  whatsapp: ChatText,
};

const CHANNEL_STYLES: Record<string, string> = {
  telegram: "text-[#0088cc] bg-[#0088cc]/10",
  instagram: "text-pink-500 bg-pink-500/10",
  whatsapp: "text-[#25D366] bg-[#25D366]/10",
};

function InboxPage() {
  const [active, setActive] = useState(messages[0]);
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");
  const [aiDisabled, setAiDisabled] = useState<Set<string>>(new Set());
  const [autoReply, setAutoReply] = useState<Set<string>>(new Set());
  const [inputText, setInputText] = useState("");

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

  const toggleAutoReply = (id: string) => {
    setAutoReply((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const aiOff = aiDisabled.has(active.id);

  return (
    <div className="grid md:grid-cols-[320px_1fr] h-[calc(100vh-53px)]">
      {/* Chat list */}
      <div className="flex flex-col border-r border-border">
        <div className="px-4 py-3 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">Сообщения</h2>
            <span className="text-[10px] text-muted-foreground bg-surface px-2 py-0.5 rounded-full">{messages.length}</span>
          </div>
          <div className="relative">
            <MagnifyingGlass size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск..."
              className="input-field pl-8 py-1.5 text-xs"
            />
          </div>
          <div className="flex gap-1">
            {(["all", "telegram", "instagram", "whatsapp"] as ChannelFilter[]).map((ch) => (
              <button
                key={ch}
                onClick={() => setChannelFilter(ch)}
                className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                  channelFilter === ch ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                {ch === "all" ? "Все" : ch === "telegram" ? "TG" : ch === "instagram" ? "IG" : "WA"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto divide-y divide-border">
          {filtered.map((m) => {
            const ChannelIcon = CHANNEL_ICONS[m.channel];
            const isAiOff = aiDisabled.has(m.id);
            return (
              <button
                key={m.id}
                onClick={() => setActive(m)}
                className={`w-full text-left px-4 py-3 hover:bg-accent/50 transition-colors ${
                  active.id === m.id ? "bg-primary/5 border-l-2 border-primary" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-primary/15 grid place-items-center text-[10px] font-semibold text-primary shrink-0">
                    {m.client.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium truncate">{m.client}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{m.time}</span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate mt-0.5">{m.preview}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={`text-[9px] uppercase px-1 py-0.5 rounded ${CHANNEL_STYLES[m.channel]}`}>
                        {m.channel}
                      </span>
                      {isAiOff ? (
                        <span className="text-[9px] text-warning flex items-center gap-0.5">
                          <Prohibit size={8} /> AI выкл
                        </span>
                      ) : (
                        <span className="text-[9px] text-success flex items-center gap-0.5">
                          <Robot size={8} /> AI
                        </span>
                      )}
                      {m.unread && <span className="size-1.5 rounded-full bg-primary ml-auto" />}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thread */}
      <div className="flex flex-col">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">{active.client}</div>
            <div className="text-[10px] text-muted-foreground capitalize">{active.channel}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground">AI</span>
              <Switch.Root
                checked={!aiOff}
                onCheckedChange={() => toggleAi(active.id)}
                className="switch scale-75"
              >
                <Switch.Thumb className="switch-thumb" />
              </Switch.Root>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground">Авто</span>
              <Switch.Root
                checked={autoReply.has(active.id)}
                onCheckedChange={() => toggleAutoReply(active.id)}
                className="switch scale-75"
              >
                <Switch.Thumb className="switch-thumb" />
              </Switch.Root>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-5 space-y-3">
          {active.thread.map((t, i) => (
            <div key={i} className={`flex ${t.from === "ai" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                t.from === "ai" ? "bg-primary/15 rounded-br-sm" : "bg-surface-elevated rounded-bl-sm"
              }`}>
                {t.from === "ai" && (
                  <div className="flex items-center gap-1 mb-1 text-primary/60">
                    <Robot size={9} />
                    <span className="text-[8px] font-medium uppercase">AI</span>
                  </div>
                )}
                {t.text}
                <div className="text-[10px] text-muted-foreground mt-1">{t.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-3 flex gap-2">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Введите сообщение..."
            className="input-field flex-1"
          />
          {!aiOff && (
            <button className="btn btn-secondary px-3 text-xs flex items-center gap-1">
              <Robot size={12} /> AI
            </button>
          )}
          <button className="btn btn-primary px-3">
            <PaperPlaneRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
