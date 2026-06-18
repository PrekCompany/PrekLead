import { createFileRoute } from "@tanstack/react-router";
import { leads } from "@/lib/mock-data";

export const Route = createFileRoute("/app/leads")({
  head: () => ({ meta: [{ title: "Leads — PREKLEAD" }] }),
  component: LeadsPage,
});

function LeadsPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-gradient">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          AI оценил {leads.length} лидов · {leads.filter((l) => l.status === "hot").length} горячих
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {leads.map((l, i) => (
          <LeadOrb key={l.id} l={l} delay={i * 80} />
        ))}
      </div>
    </div>
  );
}

function LeadOrb({ l, delay }: { l: any; delay: number }) {
  const tone =
    l.status === "hot"
      ? { glow: "animate-glow-pulse", ring: "border-destructive/60", core: "from-destructive to-warning", label: "text-destructive" }
      : l.status === "warm"
      ? { glow: "", ring: "border-warning/40", core: "from-warning to-primary", label: "text-warning" }
      : { glow: "", ring: "border-border", core: "from-muted to-secondary", label: "text-muted-foreground" };

  return (
    <div
      className={`relative glass rounded-3xl p-6 hover:-translate-y-1 transition-all animate-fade-up ${tone.ring}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className={`relative size-16 rounded-full bg-gradient-to-br ${tone.core} ${tone.glow} grid place-items-center text-white font-display font-semibold text-lg shrink-0`}>
          {l.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
          {l.status === "hot" && (
            <>
              <span className="absolute inset-0 rounded-full border border-destructive/40 animate-pulse-ring" />
              <span className="absolute inset-0 rounded-full border border-destructive/30 animate-pulse-ring" style={{ animationDelay: "0.7s" }} />
            </>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{l.name}</div>
          <div className="text-xs text-muted-foreground truncate">{l.company}</div>
          <div className={`mt-2 inline-flex items-center gap-1.5 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-current/15 ${tone.label}`}>
            <span className="size-1 rounded-full bg-current" /> {l.status}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-border/40">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">AI Score</span>
          <span className="font-mono font-semibold">{l.score}</span>
        </div>
        <div className="mt-1.5 h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all" style={{ width: `${l.score}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-muted-foreground capitalize">{l.channel}</span>
          <span className="font-semibold text-primary">{l.value}</span>
        </div>
      </div>
    </div>
  );
}
