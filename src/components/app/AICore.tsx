import { Link } from "@tanstack/react-router";
import {
  Brain,
  Inbox,
  Target,
  Users,
  BarChart3,
  Plug,
  Sparkles,
  Activity,
  Zap,
  Shield,
  Orbit,
} from "lucide-react";
import { useEffect, useState } from "react";

const NODES = [
  { id: "inbox", label: "Inbox", to: "/app/inbox", icon: Inbox, angle: 0, color: "from-blue-500/20 to-blue-600/10" },
  { id: "leads", label: "Leads", to: "/app/leads", icon: Target, angle: 60, color: "from-amber-500/20 to-amber-600/10" },
  { id: "crm", label: "CRM", to: "/app/crm", icon: Users, angle: 120, color: "from-emerald-500/20 to-emerald-600/10" },
  { id: "analytics", label: "Analytics", to: "/app/analytics", icon: BarChart3, angle: 180, color: "from-violet-500/20 to-violet-600/10" },
  { id: "integrations", label: "Integrations", to: "/app/integrations", icon: Plug, angle: 240, color: "from-rose-500/20 to-rose-600/10" },
  { id: "settings", label: "Settings", to: "/app", icon: Brain, angle: 300, color: "from-primary/20 to-primary/10" },
];

const PROCESSING_TEXTS = [
  "Analyzing conversation patterns...",
  "Scoring new leads...",
  "Generating replies...",
  "Syncing Telegram messages...",
  "Updating CRM profiles...",
];

export function AICore() {
  const R = 170;
  const [processingIndex, setProcessingIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProcessingIndex((i) => (i + 1) % PROCESSING_TEXTS.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mx-auto" style={{ width: 500, height: 500, maxWidth: "100%" }}>
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern rounded-3xl opacity-40" />

      {/* Pulse rings - layered */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border animate-pulse-ring"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              borderColor: `oklch(0.62 0.24 258 / ${0.3 - i * 0.05})`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Orbital particle dots */}
      {[0, 1, 2].map((orbit) => (
        <div
          key={`orbit-${orbit}`}
          className="absolute inset-0 grid place-items-center pointer-events-none"
          style={{
            animation: `orbit ${8 + orbit * 4}s linear infinite`,
            animationDelay: `${orbit * 1.5}s`,
            "--orbit-r": `${110 + orbit * 30}px`,
          } as React.CSSProperties}
        >
          <div
            className="size-1.5 rounded-full"
            style={{
              background: `oklch(0.62 0.24 258 / ${0.5 - orbit * 0.15})`,
              boxShadow: `0 0 6px oklch(0.62 0.24 258 / ${0.4 - orbit * 0.1})`,
            }}
          />
        </div>
      ))}

      {/* Data flow lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-260 -260 520 520">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.24 258 / 0.1)" />
            <stop offset="50%" stopColor="oklch(0.62 0.24 258 / 0.5)" />
            <stop offset="100%" stopColor="oklch(0.62 0.24 258 / 0.1)" />
          </linearGradient>
        </defs>
        {NODES.map((n) => {
          const x = Math.cos((n.angle * Math.PI) / 180) * R;
          const y = Math.sin((n.angle * Math.PI) / 180) * R;
          return (
            <g key={n.id}>
              <line
                x1="0" y1="0" x2={x} y2={y}
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                className="animate-data-flow"
                style={{ animationDelay: `${(n.angle / 360) * 3}s` }}
              />
              <circle cx={x} cy={y} r="4" fill="oklch(0.62 0.24 258)" opacity="0.7">
                <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin={`${n.angle * 0.01}s`} />
              </circle>
            </g>
          );
        })}
        <circle cx="0" cy="0" r="60" fill="none" stroke="oklch(0.62 0.24 258 / 0.12)" strokeDasharray="4 10" strokeWidth="1.5" />
        {/* Outer ring */}
        <circle cx="0" cy="0" r="R" fill="none" stroke="oklch(0.62 0.24 258 / 0.06)" strokeDasharray="2 12" strokeWidth="1" />
      </svg>

      {/* Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative size-32 rounded-full bg-gradient-to-br from-primary via-primary to-accent grid place-items-center animate-glow-pulse">
          {/* Inner glow layers */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-sm" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-md" />
          <div className="absolute inset-3 rounded-full bg-background/60 backdrop-blur-xl grid place-items-center">
            <Brain size={40} className="text-white drop-shadow-lg" />
          </div>
          {/* Processing ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
            <circle
              cx="64" cy="64" r="60"
              fill="none"
              stroke="oklch(0.62 0.24 258 / 0.3)"
              strokeWidth="1.5"
              strokeDasharray="377"
              strokeDashoffset="100"
              className="animate-spin"
              style={{ animationDuration: "4s", transformOrigin: "center" }}
            />
          </svg>
        </div>
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center w-48">
          <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium">AI Core</div>
          <div className="text-xs font-mono text-success flex items-center justify-center gap-1.5 mt-1">
            <span className="size-1.5 rounded-full bg-success shadow-lg shadow-success/50 animate-pulse" />
            processing
          </div>
          <div className="mt-1.5 text-[9px] text-muted-foreground/60 truncate transition-all duration-500">
            {PROCESSING_TEXTS[processingIndex]}
          </div>
        </div>
      </div>

      {/* Nodes */}
      {NODES.map((n) => {
        const x = Math.cos((n.angle * Math.PI) / 180) * R;
        const y = Math.sin((n.angle * Math.PI) / 180) * R;
        return (
          <Link
            key={n.id}
            to={n.to}
            className="absolute top-1/2 left-1/2 group"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <div className="glass-strong rounded-2xl p-3 hover:border-primary/50 hover:glow-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1 min-w-[72px]">
              <div className={`size-9 rounded-lg bg-gradient-to-br ${n.color} border border-white/10 grid place-items-center group-hover:scale-110 transition-transform duration-300`}>
                <n.icon size={16} className="text-white drop-shadow-sm" />
              </div>
              <div className="mt-2 text-[10px] font-semibold text-center tracking-wide">{n.label}</div>
            </div>
          </Link>
        );
      })}

      {/* Floating stats */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 animate-float">
        <div className="glass rounded-xl px-5 py-2.5 flex items-center gap-4 shadow-lg shadow-primary/5">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Zap size={11} className="text-warning" />
            <span className="text-foreground font-semibold">284</span> ms
          </div>
          <div className="w-px h-3 bg-gradient-to-b from-transparent via-border/50 to-transparent" />
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Activity size={11} className="text-success" />
            <span className="text-foreground font-semibold">99.9</span>%
          </div>
          <div className="w-px h-3 bg-gradient-to-b from-transparent via-border/50 to-transparent" />
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <Shield size={11} className="text-primary" />
            <span className="text-foreground font-semibold">256</span>bit
          </div>
        </div>
      </div>
    </div>
  );
}
