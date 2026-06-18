import { useEffect, useState } from "react";
import { Bot, MessageCircle, Send } from "lucide-react";

const SCRIPT = [
  { from: "client", text: "Привет! У вас есть скидки на годовой тариф?" },
  { from: "ai", text: "Привет! Да — при оплате за год экономия 17%. Pro выйдет $790 вместо $948." },
  { from: "client", text: "А что входит в Pro?" },
  { from: "ai", text: "40 000 ответов AI, все каналы, API, приоритетная поддержка." },
  { from: "client", text: "Беру. Куда платить?" },
];

export function DemoPreview() {
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (step >= SCRIPT.length) {
      const r = setTimeout(() => setStep(0), 3000);
      return () => clearTimeout(r);
    }
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setStep((s) => s + 1);
    }, 1400);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Demo</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient leading-tight">
            Посмотрите AI вживую
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
          {/* Chat */}
          <div className="glass-strong rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-primary" />
                <span className="text-sm font-semibold">Telegram · Алексей</span>
              </div>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-success animate-pulse" /> live
              </span>
            </div>
            <div className="p-4 space-y-2 min-h-[340px]">
              {SCRIPT.slice(0, step).map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "ai" ? "justify-end" : "justify-start"} animate-fade-up`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                      m.from === "ai"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-surface-elevated rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && step < SCRIPT.length && (
                <div className={`flex ${SCRIPT[step].from === "ai" ? "justify-end" : "justify-start"}`}>
                  <div className="px-3 py-2 rounded-2xl bg-surface-elevated flex gap-1">
                    <Dot /> <Dot d={150} /> <Dot d={300} />
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-border/60 p-3 flex items-center gap-2">
              <div className="flex-1 px-3 py-2 rounded-lg bg-input/50 text-xs text-muted-foreground">
                AI печатает ответ<span className="animate-blink-caret">|</span>
              </div>
              <button className="size-9 rounded-lg bg-primary grid place-items-center">
                <Send size={14} className="text-primary-foreground" />
              </button>
            </div>
          </div>

          {/* AI Panel */}
          <div className="space-y-3">
            <div className="glass-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Bot size={16} className="text-primary" />
                <span className="text-sm font-semibold">AI Insights</span>
                <span className="ml-auto text-[10px] text-success flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-success animate-pulse" /> анализ
                </span>
              </div>
              <Row label="Intent" val="Покупка / годовой тариф" />
              <Row label="Score" val={<ScoreBar v={Math.min(60 + step * 8, 94)} />} />
              <Row label="Status" val={<Badge>HOT</Badge>} />
              <Row label="Канал" val="Telegram" />
              <Row label="Язык" val="RU" />
            </div>

            <div className="glass-strong rounded-2xl p-5">
              <div className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                Рекомендованный ответ
              </div>
              <div className="text-sm leading-relaxed">
                «Отлично! Отправляю защищённую ссылку на оплату Pro yearly — $790.
                После оплаты автоматически активирую интеграции и FAQ.»
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return <span className="size-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${d}ms` }} />;
}
function Row({ label, val }: { label: string; val: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border/40 last:border-0 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{val}</span>
    </div>
  );
}
function ScoreBar({ v }: { v: number }) {
  return (
    <div className="flex items-center gap-2 w-32">
      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-700" style={{ width: `${v}%` }} />
      </div>
      <span className="text-xs font-mono">{v}</span>
    </div>
  );
}
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 rounded-md bg-warning/15 text-warning text-xs font-semibold">
      {children}
    </span>
  );
}
