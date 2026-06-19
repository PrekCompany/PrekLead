import { createFileRoute, Link } from "@tanstack/react-router";
import { messages } from "@/lib/mock-data";
import { Tray, Target, Robot, Plug, ChatCircle, ArrowRight } from "../components/PhosphorIcons";

export const Route = createFileRoute("/app/")({
  component: AppHome,
});

function AppHome() {
  const today = new Date().toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Дашборд</h1>
        <p className="text-sm text-muted-foreground mt-1">{today}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-4">
          <div className="size-9 rounded-lg bg-primary/10 grid place-items-center mb-3">
            <Tray size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-semibold tabular-nums">247</div>
          <div className="text-xs text-muted-foreground mt-0.5">Сообщений сегодня</div>
        </div>
        <div className="card p-4">
          <div className="size-9 rounded-lg bg-primary/10 grid place-items-center mb-3">
            <Target size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-semibold tabular-nums">18</div>
          <div className="text-xs text-muted-foreground mt-0.5">Активных лидов</div>
        </div>
        <div className="card p-4">
          <div className="size-9 rounded-lg bg-success/10 grid place-items-center mb-3">
            <Robot size={16} className="text-success" />
          </div>
          <div className="text-2xl font-semibold tabular-nums">89%</div>
          <div className="text-xs text-muted-foreground mt-0.5">AI ответов</div>
        </div>
        <div className="card p-4">
          <div className="size-9 rounded-lg bg-primary/10 grid place-items-center mb-3">
            <Plug size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-semibold tabular-nums">2</div>
          <div className="text-xs text-muted-foreground mt-0.5">Канала подключено</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Recent chats */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Последние сообщения</h2>
            <Link to="/app/inbox" className="text-xs text-primary hover:underline flex items-center gap-1">
              Все чаты <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-1">
            {messages.slice(0, 4).map((m) => (
              <Link
                key={m.id}
                to="/app/inbox"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="size-8 rounded-full bg-primary/15 grid place-items-center text-[10px] font-semibold text-primary shrink-0">
                  {m.client.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{m.client}</div>
                  <div className="text-xs text-muted-foreground truncate">{m.preview}</div>
                </div>
                <div className="flex items-center gap-2">
                  {m.unread && <span className="size-1.5 rounded-full bg-primary" />}
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-4">Быстрые действия</h2>
          <div className="space-y-2">
            <Link
              to="/app/integrations"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-sm"
            >
              <Plug size={15} className="text-muted-foreground" />
              <span>Подключить канал</span>
            </Link>
            <Link
              to="/app/ai-settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-sm"
            >
              <Robot size={15} className="text-muted-foreground" />
              <span>Настроить AI</span>
            </Link>
            <Link
              to="/app/team"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-sm"
            >
              <Target size={15} className="text-muted-foreground" />
              <span>Пригласить команду</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
