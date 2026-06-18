import { createFileRoute } from "@tanstack/react-router";
import { analytics } from "@/lib/mock-data";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — PREKLEAD" }] }),
  component: AnalyticsPage,
});

const COLORS = ["oklch(0.62 0.24 258)", "oklch(0.70 0.22 280)", "oklch(0.55 0.22 220)"];

function AnalyticsPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-gradient">Аналитика</h1>
        <p className="mt-1 text-sm text-muted-foreground">Realtime срез по выручке, лидам и каналам</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPI label="Выручка" v="$16 300" t="+24%" />
        <KPI label="Лиды" v="281" t="+18%" />
        <KPI label="Конверсия" v="34%" t="+4%" />
        <KPI label="MRR" v="$4 920" t="+12%" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <ChartCard title="Выручка по дням" cls="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={analytics.revenue}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.24 258)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.62 0.24 258)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(0.4 0.04 265 / 0.2)" vertical={false} />
              <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.68 0.02 260)", fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "oklch(0.68 0.02 260)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "oklch(0.22 0.03 265)", border: "1px solid oklch(0.4 0.04 265)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="v" stroke="oklch(0.62 0.24 258)" strokeWidth={2} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Источники лидов">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={analytics.sources} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                {analytics.sources.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "oklch(0.22 0.03 265)", border: "1px solid oklch(0.4 0.04 265)", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {analytics.sources.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="size-2 rounded-full" style={{ background: COLORS[i] }} />
                <span className="flex-1 text-muted-foreground">{s.name}</span>
                <span className="font-mono">{s.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Лиды по дням" cls="lg:col-span-3">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analytics.leads}>
              <CartesianGrid stroke="oklch(0.4 0.04 265 / 0.2)" vertical={false} />
              <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.68 0.02 260)", fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "oklch(0.68 0.02 260)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "oklch(0.22 0.03 265)", border: "1px solid oklch(0.4 0.04 265)", borderRadius: 12 }} />
              <Bar dataKey="v" fill="oklch(0.62 0.24 258)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function KPI({ label, v, t }: { label: string; v: string; t?: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-3xl font-semibold">{v}</div>
      {t && <div className="text-xs text-success mt-1">{t} за неделю</div>}
    </div>
  );
}
function ChartCard({ title, children, cls = "" }: { title: string; children: React.ReactNode; cls?: string }) {
  return (
    <div className={`glass rounded-2xl p-5 ${cls}`}>
      <div className="text-sm font-semibold mb-4">{title}</div>
      {children}
    </div>
  );
}
