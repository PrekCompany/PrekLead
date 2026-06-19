import { TelegramIcon, InstagramIcon, WhatsAppIcon } from "../PhosphorIcons";
import { useScrollReveal } from "@/lib/useScrollReveal";

const CHANNELS = [
  {
    id: "telegram",
    name: "Telegram",
    status: "available" as const,
    color: "#0088CC",
    bgColor: "rgba(0,136,204,0.12)",
    Icon: TelegramIcon,
    features: ["AI-автоответ", "Lead Scoring", "Smart Inbox", "24/7 поддержка"],
    users: "2M+",
  },
  {
    id: "instagram",
    name: "Instagram",
    status: "soon" as const,
    color: "#DD2A7B",
    bgColor: "rgba(221,42,123,0.12)",
    Icon: InstagramIcon,
    features: ["AI-автоответ", "Lead Scoring", "Smart Inbox", "24/7 поддержка"],
    users: "1.5M+",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    status: "soon" as const,
    color: "#25D366",
    bgColor: "rgba(37,211,102,0.12)",
    Icon: WhatsAppIcon,
    features: ["AI-автоответ", "Lead Scoring", "Smart Inbox", "24/7 поддержка"],
    users: "3M+",
  },
];

export function Integrations({ inline = false }: { inline?: boolean }) {
  const { ref, inView } = useScrollReveal();

  return (
    <section id="integrations" className={`relative ${inline ? "" : "py-20"}`} ref={ref}>
      <div className="mx-auto max-w-6xl px-4">
        {!inline && (
          <div className={`max-w-2xl mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Интеграции</div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient">
              Подключите свои каналы
            </h2>
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {CHANNELS.map((c, idx) => {
            const soon = c.status === "soon";
            return (
              <div
                key={c.id}
                className={`glass rounded-2xl p-6 border transition-all duration-500 hover:-translate-y-1 ${
                  soon
                    ? "border-border/20 hover:border-border/40"
                    : "border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="size-12 rounded-xl grid place-items-center shrink-0"
                    style={{ backgroundColor: c.bgColor }}
                  >
                    <c.Icon size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base">{c.name}</div>
                    {soon ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-muted/30 text-muted-foreground mt-0.5">
                        <span className="size-1.5 rounded-full bg-muted-foreground/50" />
                        Скоро
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-success/15 text-success mt-0.5">
                        <span className="size-1.5 rounded-full bg-success animate-pulse" />
                        Активно
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {c.features.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-border/20 text-muted-foreground/80"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
