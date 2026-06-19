import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Logo } from "../Brand";
import {
  Brain,
  Tray,
  Target,
  Users,
  ChartBar,
  Plug,
  Bell,
  MagnifyingGlass,
  SignOut,
  CaretRight,
  Sparkle,
  Gear,
  Robot,
  CreditCard,
  UserSwitch,
  Settings,
} from "../PhosphorIcons";
import { useState } from "react";

const ITEMS = [
  { to: "/app", icon: Brain, label: "AI Core", exact: true },
  { to: "/app/inbox", icon: Tray, label: "Сообщения", badge: 3 },
  { to: "/app/leads", icon: Target, label: "Лиды" },
  { to: "/app/crm", icon: Users, label: "CRM" },
  { to: "/app/analytics", icon: ChartBar, label: "Аналитика" },
  { to: "/app/integrations", icon: Plug, label: "Интеграции" },
  { to: "/app/ai-settings", icon: Robot, label: "Настройки ИИ" },
  { to: "/app/team", icon: UserSwitch, label: "Команда" },
];

const BOTTOM_ITEMS = [
  { to: "/app/billing", icon: CreditCard, label: "Оплата" },
  { to: "/app/settings", icon: Settings, label: "Настройки" },
];

export function AppShell() {
  const { pathname } = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[250px] shrink-0 border-r border-border/40 bg-surface/40 backdrop-blur-2xl">
        <div className="px-5 py-6">
          <Link to="/app" className="group flex items-center gap-3">
            <Logo />
            <div className="flex items-center gap-1.5">
              <Sparkle size={12} className="text-primary animate-pulse" />
              <span className="text-[9px] text-primary/80 font-medium tracking-wider uppercase">AI Active</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-0.5 overflow-auto">
          {ITEMS.map((i) => {
            const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
            return (
              <Link
                key={i.to}
                to={i.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group relative ${
                  active
                    ? "bg-primary/12 text-primary border border-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full bg-primary shadow-lg shadow-primary/50" />
                )}
                <div className={`size-8 rounded-lg grid place-items-center transition-all duration-200 ${
                  active
                    ? "bg-primary/20 text-primary shadow-sm shadow-primary/20"
                    : "bg-white/5 text-muted-foreground group-hover:text-foreground group-hover:bg-white/[0.07]"
                }`}>
                  <i.icon size={16} className="transition-transform duration-200 group-hover:scale-110" />
                </div>
                <span className="flex-1 font-medium text-[13px]">{i.label}</span>
                {i.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20 animate-pulse">
                    {i.badge}
                  </span>
                )}
                {active && (
                  <CaretRight size={12} className="text-primary/60" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 mt-1 mb-1">
          <div className="h-px bg-border/40" />
        </div>

        <nav className="px-3 space-y-0.5">
          {BOTTOM_ITEMS.map((i) => {
            const active = pathname.startsWith(i.to);
            return (
              <Link
                key={i.to}
                to={i.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group relative ${
                  active
                    ? "bg-primary/12 text-primary border border-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full bg-primary shadow-lg shadow-primary/50" />
                )}
                <div className={`size-8 rounded-lg grid place-items-center transition-all duration-200 ${
                  active
                    ? "bg-primary/20 text-primary shadow-sm shadow-primary/20"
                    : "bg-white/5 text-muted-foreground group-hover:text-foreground group-hover:bg-white/[0.07]"
                }`}>
                  <i.icon size={16} className="transition-transform duration-200 group-hover:scale-110" />
                </div>
                <span className="flex-1 font-medium text-[13px]">{i.label}</span>
                {active && <CaretRight size={12} className="text-primary/60" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3">
          <div className="glass-strong rounded-2xl p-4 space-y-3 group hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="relative size-10 rounded-full bg-gradient-to-br from-primary via-primary to-accent-foreground/30 grid place-items-center text-xs font-bold text-white ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all">
                АП
                <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-success rounded-full border-2 border-surface-elevated">
                  <span className="absolute inset-0 rounded-full bg-success animate-pulse-ring" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate">Алексей Петров</div>
                <div className="text-[10px] text-primary/80 font-medium flex items-center gap-1">
                  <Sparkle size={10} className="text-primary" />
                  Pro Plan
                </div>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
              >
                <SignOut size={12} />
                Log Out
              </Link>
              <Link
                to="/app/settings"
                className="flex items-center justify-center size-7 rounded-lg text-[10px] text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
              >
                <Settings size={12} />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 border-b border-border/40 bg-background/50 backdrop-blur-2xl">
          <div className="flex items-center gap-3 px-4 md:px-6 py-3.5">
            <div className="md:hidden">
              <Link to="/app"><Logo /></Link>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative group">
                <MagnifyingGlass size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  searchFocused ? "text-primary" : "text-muted-foreground"
                }`} />
                <input
                  placeholder="Поиск клиентов, сделок, сообщений..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`
                    w-full pl-9 pr-3 py-2 text-sm rounded-xl
                    transition-all duration-200
                    ${searchFocused
                      ? "bg-white/[0.06] ring-2 ring-primary/30 border-primary/40"
                      : "bg-white/[0.03] border-border/50 focus:bg-white/[0.05]"
                    }
                    border focus:outline-none
                  `}
                />
              </div>
            </div>
            <button className="relative size-9 rounded-xl glass hover:glow-primary grid place-items-center transition-all duration-200 hover:scale-105 group">
              <Bell size={15} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary shadow-lg shadow-primary/40">
                <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
              </span>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}