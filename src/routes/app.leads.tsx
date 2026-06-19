import { createFileRoute } from "@tanstack/react-router";
import { leads } from "@/lib/mock-data";

export const Route = createFileRoute("/app/leads")({
  head: () => ({ meta: [{ title: "Лиды — PREKLEAD" }] }),
  component: LeadsPage,
});

function LeadsPage() {
  return (
    <div className="p-6 md:p-10">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">Лиды</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {leads.length} лидов · {leads.filter((l) => l.status === "hot").length} горячих
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {leads.map((l) => (
          <div key={l.id} className="card p-4">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-full bg-primary/20 grid place-items-center text-xs font-semibold text-primary shrink-0">
                {l.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{l.name}</div>
                <div className="text-xs text-muted-foreground truncate">{l.company}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`tag text-[10px] ${
                    l.status === "hot" ? "tag-destructive" :
                    l.status === "warm" ? "tag-warning" : "tag"
                  }`}>
                    {l.status === "hot" ? "Горячий" : l.status === "warm" ? "Тёплый" : "Холодный"}
                  </span>
                  <span className="text-[10px] text-muted-foreground capitalize">{l.channel}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">AI Score</span>
                <span className="font-mono font-semibold">{l.score}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${l.score}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Потенциал</span>
                <span className="font-semibold text-primary">{l.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
