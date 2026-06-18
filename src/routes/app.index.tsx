import { createFileRoute } from "@tanstack/react-router";
import { AICore } from "@/components/app/AICore";
import { Activity, MessageSquare, TrendingUp, Zap, ArrowUp, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/app/")({
  component: AppHome,
});

function AppHome() {
  return (
    <div className="p-6 md:p-10">
      <div className="mb-8 animate-fade-up">
        <div className="text-xs uppercase tracking-widest text-primary mb-1 flex items-center gap-2">
          <Sparkles size={12} className="text-primary" />
          AI Control Center
        </div>
        <h1 className="font-display text-3xl font-semibold text-gradient">С возвращением, Алексей</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          AI обработал 247 сообщений и сгенерировал 18 новых лидов за сегодня.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="glass rounded-3xl p-6 md:p-10 min-h-[560px] grid place-items-center relative overflow-hidden group">
          <div className="absolute inset-0 grid-pattern opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
          <div className="absolute -top-40 -right-40 size-80 bg-primary/5 blur-[120px] rounded-full group-hover:bg-primary/10 transition-all duration-700" />
          <div className="absolute -bottom-40 -left-40 size-80 bg-accent/5 blur-[120px] rounded-full group-hover:bg-accent/10 transition-all duration-700" />
          <div className="relative">
            <AICore />
          </div>
        </div>

        <div className="space-y-3">
          <AnimatedStat icon={MessageSquare} label="Сообщений сегодня" value={247} suffix="" trend="+18%" tone="primary" />
          <AnimatedStat icon={Zap} label="Лиды" value={18} suffix="" trend="+22%" tone="success" />
          <AnimatedStat icon={TrendingUp} label="Конверсия" value={34} suffix="%" trend="+4%" tone="primary" />
          <AnimatedStat icon={Activity} label="Аптайм AI" value={99.98} suffix="%" tone="success" />

          <div className="glass rounded-2xl p-4 mt-4 group hover:border-primary/30 transition-all duration-300">
            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Activity size={12} className="text-primary" />
              Live поток
            </div>
            <LiveFeed />
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedStat({
  icon: I,
  label,
  value,
  suffix,
  trend,
  tone,
}: {
  icon: any;
  label: string;
  value: number;
  suffix: string;
  trend?: string;
  tone: "primary" | "success";
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step = value / 30;
    const t = setInterval(() => {
      cur += step;
      if (cur >= value) { cur = value; clearInterval(t); }
      setV(cur);
    }, 25);
    return () => clearInterval(t);
  }, [value]);

  const display = suffix === "%" ? v.toFixed(1) + "%" : Math.round(v).toLocaleString();

  return (
    <div className="glass rounded-2xl p-4 hover:-translate-y-0.5 hover:border-primary/40 transition-all duration-300 group relative overflow-hidden">
      <div className={`absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[80px] pointer-events-none ${
        tone === "success" ? "bg-success/5" : "bg-primary/5"
      }`} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className={`size-9 rounded-xl grid place-items-center transition-all duration-300 group-hover:scale-110 ${
            tone === "success" ? "bg-success/15 text-success group-hover:bg-success/25" : "bg-primary/15 text-primary group-hover:bg-primary/25"
          }`}>
            <I size={16} />
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-[10px] text-success font-medium">
              <ArrowUp size={10} />
              {trend}
            </div>
          )}
        </div>
        <div className="mt-3 font-display text-2xl font-semibold tabular-nums">{display}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function LiveFeed() {
  const events = [
    "Telegram: Алексей → HOT 92",
    "AI ответил Maria за 1.8с",
    "Иван оплатил Pro $79",
    "Sarah → WARM 64",
    "Дмитрий открыл сделку",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % events.length), 2500);
    return () => clearInterval(t);
  });
  return (
    <div className="space-y-2">
      {events.map((e, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-2 text-xs transition-all duration-500 ${
            idx === i ? "text-foreground" : "text-muted-foreground/60"
          }`}
        >
          <span className={`size-1.5 rounded-full transition-all duration-300 ${
            idx === i ? "bg-success shadow-lg shadow-success/50 scale-125" : "bg-muted-foreground/40"
          }`} />
          <span className={idx === i ? "font-medium" : ""}>{e}</span>
        </div>
      ))}
    </div>
  );
}
