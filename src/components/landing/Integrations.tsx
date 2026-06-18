import { Send } from "lucide-react";
import { useState } from "react";

const CHANNELS = [
  { id: "telegram", name: "Telegram", status: "available", color: "oklch(0.70 0.18 240)" },
  { id: "instagram", name: "Instagram", status: "soon", color: "oklch(0.65 0.22 25)" },
  { id: "whatsapp", name: "WhatsApp", status: "soon", color: "oklch(0.70 0.18 155)" },
];

export function Integrations({ inline = false }: { inline?: boolean }) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ telegram: true });
  return (
    <section className={inline ? "" : "py-20"}>
      <div className="mx-auto max-w-6xl px-4">
        {!inline && (
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Интеграции</div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient">
              Подключите свои каналы
            </h2>
          </div>
        )}
        <div className="grid sm:grid-cols-3 gap-4">
          {CHANNELS.map((c) => {
            const on = !!enabled[c.id];
            const soon = c.status === "soon";
            return (
              <div
                key={c.id}
                className={`glass rounded-2xl p-5 transition-all ${
                  on ? "border-primary/40 glow-primary" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-xl grid place-items-center"
                      style={{ background: `color-mix(in oklab, ${c.color} 25%, transparent)` }}
                    >
                      <Send size={16} style={{ color: c.color }} />
                    </div>
                    <div>
                      <div className="font-semibold">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <span className={`size-1.5 rounded-full ${on ? "bg-success animate-pulse" : "bg-muted-foreground"}`} />
                        {soon ? "скоро" : on ? "подключено" : "не подключено"}
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={soon}
                    onClick={() => setEnabled((p) => ({ ...p, [c.id]: !p[c.id] }))}
                    className={`relative w-10 h-6 rounded-full transition-colors disabled:opacity-40 ${
                      on ? "bg-primary" : "bg-input"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                        on ? "translate-x-[18px]" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
                {!soon && (
                  <div className="mt-4 pt-4 border-t border-border/40 space-y-2">
                    <Setting label="Автоответ AI" defaultChecked />
                    <Setting label="Уведомления оператору" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Setting({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`w-8 h-5 rounded-full relative transition-colors ${on ? "bg-primary" : "bg-input"}`}
      >
        <span
          className={`absolute top-0.5 size-4 rounded-full bg-white transition-transform ${
            on ? "translate-x-[14px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
