import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Logo } from "../Brand";
import {
  Tray,
  Target,
  Users,
  ChartBar,
  Plug,
  Bell,
  SignOut,
  Robot,
  CreditCard,
  Settings,
  UserSwitch,
} from "../PhosphorIcons";

const ITEMS = [
  { to: "/app", icon: Tray, label: "Дашборд", exact: true },
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

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border bg-surface/50">
        <div className="px-4 py-5 border-b border-border">
          <Link to="/app" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-auto">
          {ITEMS.map((i) => {
            const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
            return (
              <Link
                key={i.to}
                to={i.to}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <i.icon size={16} />
                <span>{i.label}</span>
                {i.badge && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-medium">
                    {i.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="divider mx-3" />

        <nav className="px-2 py-2 space-y-0.5">
          {BOTTOM_ITEMS.map((i) => {
            const active = pathname.startsWith(i.to);
            return (
              <Link
                key={i.to}
                to={i.to}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <i.icon size={16} />
                <span>{i.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="size-8 rounded-full bg-primary/20 grid place-items-center text-xs font-semibold text-primary">
              АП
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">Алексей Петров</div>
              <div className="text-[10px] text-muted-foreground">Pro план</div>
            </div>
            <Link
              to="/"
              className="size-7 rounded-lg grid place-items-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
            >
              <SignOut size={12} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-lg">
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            <div className="md:hidden">
              <Link to="/app"><Logo /></Link>
            </div>
            <div className="flex-1" />
            <button className="relative size-8 rounded-lg grid place-items-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
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
