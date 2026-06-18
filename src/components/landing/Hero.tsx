import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Send, Bot, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 h-[600px] [background:var(--gradient-glow)] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-6">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              <Sparkles size={12} className="text-primary" />
              AI Business OS — новая версия
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-gradient">
              Превращайте каждое сообщение
              <br />
              <span className="text-gradient-primary">в клиента</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              AI автоматически отвечает клиентам в Telegram, Instagram и WhatsApp —
              квалифицирует лиды, ведёт CRM и увеличивает продажи 24/7.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-glow transition-all glow-primary hover:glow-strong"
              >
                Начать бесплатно
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-strong font-medium hover:bg-white/5 transition-colors"
              >
                Войти
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <Stat n="2.4×" l="рост конверсии" />
              <div className="h-8 w-px bg-border" />
              <Stat n="< 2с" l="ответ AI" />
              <div className="h-8 w-px bg-border" />
              <Stat n="98%" l="точность" />
            </div>
          </div>

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-lg text-foreground font-semibold">{n}</div>
      <div>{l}</div>
    </div>
  );
}

function HeroPreview() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c + 7) % 999), 80);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative animate-fade-up [animation-delay:200ms]">
      <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full" />
      <div className="relative glass-strong rounded-2xl p-5 shadow-elevated">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-gradient-to-br from-primary to-primary-glow grid place-items-center">
              <Bot size={14} className="text-white" />
            </div>
            <div>
              <div className="text-xs font-semibold">AI Inbox</div>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                <span className="size-1 rounded-full bg-success" /> онлайн
              </div>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground font-mono">
            {String(count).padStart(3, "0")} msg/мин
          </div>
        </div>

        {/* Message flow */}
        <div className="space-y-2.5">
          <MsgBubble side="client" text="Здравствуйте! Сколько стоит интеграция?" delay={0} />
          <AIAnalysis />
          <MsgBubble side="ai" text="Интеграция занимает 5 минут и входит в подписку. Подключим?" delay={600} />
          <MsgBubble side="client" text="Да, давайте!" delay={1200} />
        </div>

        {/* Bottom metrics */}
        <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-border/60">
          <Metric label="Intent" value="Покупка" tone="primary" />
          <Metric label="Score" value="94" tone="success" />
          <Metric label="Status" value="HOT" tone="warning" />
        </div>
      </div>

      {/* Floating chips */}
      <div className="hidden md:block absolute -left-6 top-10 glass rounded-xl p-3 animate-float shadow-elevated">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-primary" />
          <span className="text-xs font-medium">Auto-reply</span>
        </div>
      </div>
      <div className="hidden md:block absolute -right-4 bottom-12 glass rounded-xl p-3 animate-float [animation-delay:1.5s] shadow-elevated">
        <div className="flex items-center gap-2">
          <Send size={14} className="text-primary" />
          <span className="text-xs font-medium">+128 leads</span>
        </div>
      </div>
    </div>
  );
}

function MsgBubble({ side, text, delay }: { side: "client" | "ai"; text: string; delay: number }) {
  return (
    <div
      className={`flex ${side === "ai" ? "justify-end" : "justify-start"} animate-fade-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
          side === "ai"
            ? "bg-primary/20 border border-primary/30 text-foreground rounded-br-sm"
            : "bg-surface-elevated border border-border text-muted-foreground rounded-bl-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function AIAnalysis() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(94), 300);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 border border-primary/20">
      <Sparkles size={12} className="text-primary shrink-0" />
      <span className="text-[10px] text-muted-foreground shrink-0">AI анализ:</span>
      <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-1000"
          style={{ width: `${w}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-primary">{w}%</span>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: "primary" | "success" | "warning" }) {
  const colors = {
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
  };
  return (
    <div className="text-center">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className={`text-sm font-semibold mt-0.5 ${colors[tone]}`}>{value}</div>
    </div>
  );
}
