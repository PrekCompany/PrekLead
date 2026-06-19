import { createFileRoute } from "@tanstack/react-router";
import { analytics } from "@/lib/mock-data";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Аналитика — PREKLEAD" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const maxRevenue = Math.max(...analytics.revenue.map((r) => r.v));
  const maxLeads = Math.max(...analytics.leads.map((l) => l.v));

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Аналитика</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Обзор метрик за последние 7 дней
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-4">
          <div className="text-xs text-muted-foreground mb-1">Выручка</div>
          <div className="text-2xl font-semibold tabular-nums">$16,400</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-muted-foreground mb-1">Всего лидов</div>
          <div className="text-2xl font-semibold tabular-nums">281</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-muted-foreground mb-1">Конверсия</div>
          <div className="text-2xl font-semibold tabular-nums">12.4%</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-4">Выручка по дням</h2>
          <div className="flex items-end gap-2 h-40">
            {analytics.revenue.map((r) => (
              <div key={r.d} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[9px] text-muted-foreground">${r.v}</span>
                <div
                  className="w-full bg-primary/80 rounded-t-sm transition-all"
                  style={{ height: `${(r.v / maxRevenue) * 100}%` }}
                />
                <span className="text-[9px] text-muted-foreground">{r.d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leads chart */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold mb-4">Лиды по дням</h2>
          <div className="flex items-end gap-2 h-40">
            {analytics.leads.map((l) => (
              <div key={l.d} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <span className="text-[9px] text-muted-foreground">{l.v}</span>
                <div
                  className="w-full bg-primary/60 rounded-t-sm transition-all"
                  style={{ height: `${(l.v / maxLeads) * 100}%` }}
                />
                <span className="text-[9px] text-muted-foreground">{l.d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="card p-5 md:col-span-2">
          <h2 className="text-sm font-semibold mb-4">Источники лидов</h2>
          <div className="space-y-3">
            {analytics.sources.map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="text-sm w-24">{s.name}</span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${s.value}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-10 text-right">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
