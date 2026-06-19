import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ChatCircle, SignalFlowIcon, RevenueSparkIcon, TrustGridIcon } from "../PhosphorIcons";

const proof = [
  { icon: SignalFlowIcon, label: "3 канала", value: "Telegram · Instagram · WhatsApp" },
  { icon: RevenueSparkIcon, label: "AI-продажи", value: "квалификация + follow-up" },
  { icon: TrustGridIcon, label: "CRM-ready", value: "лиды, теги, история" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,oklch(0.62_0.24_258/0.25),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,oklch(0.55_0.22_290/0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_90%,oklch(0.50_0.22_240/0.12),transparent)]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      <div className="absolute inset-0 diagonal-grid opacity-[0.08] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-[15%] size-72 rounded-full bg-primary/8 blur-[120px] animate-float" />
      <div className="absolute top-1/3 right-[10%] size-56 rounded-full bg-accent/8 blur-[100px] animate-float" style={{ animationDelay: "-2s", animationDuration: "6s" }} />
      <div className="absolute bottom-1/4 left-1/3 size-48 rounded-full bg-primary/5 blur-[80px] animate-float" style={{ animationDelay: "-4s", animationDuration: "5s" }} />

      {/* Decorative floating particles */}
      <div className="absolute top-[15%] right-[5%] size-1.5 rounded-full bg-primary/60 animate-float opacity-70" style={{ animationDuration: "3s" }} />
      <div className="absolute top-[45%] left-[5%] size-1 rounded-full bg-accent/60 animate-float opacity-50" style={{ animationDuration: "4s", animationDelay: "-1s" }} />
      <div className="absolute top-[70%] right-[12%] size-2 rounded-full bg-primary/40 animate-float opacity-60" style={{ animationDuration: "5s", animationDelay: "-3s" }} />

      <div className="relative w-full mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-muted-foreground mb-8 backdrop-blur-sm border border-primary/20 group hover:border-primary/40 transition-all duration-300">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <Sparkles size={12} className="text-primary group-hover:scale-110 transition-transform" />
              AI Business OS — умные продажи 24/7
            </div>

            {/* Headline */}
             <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] aurora-text">
              Превращайте каждое сообщение
              <br />
              <span className="text-gradient-primary">в клиента</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              AI автоматически отвечает клиентам в Telegram, Instagram и WhatsApp —
              квалифицирует лиды, ведёт CRM и увеличивает продажи 24/7.
            </p>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
              {proof.map((item) => (
                <div key={item.label} className="premium-card rounded-2xl p-3.5 group hover:-translate-y-1 transition-all duration-300">
                  <item.icon size={22} className="text-primary group-hover:text-primary-glow transition-colors" />
                  <div className="mt-2 text-xs font-semibold text-foreground">{item.label}</div>
                  <div className="mt-0.5 text-[10px] leading-snug text-muted-foreground/65">{item.value}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium overflow-hidden transition-all duration-300 hover:glow-primary"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  Начать бесплатно
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-strong font-medium hover:bg-white/[0.06] transition-all duration-300 border border-border/50 hover:border-primary/30"
              >
                Войти
              </Link>
            </div>

          </div>

          {/* Right — Demo chat mockup */}
          <div className="relative hidden lg:block">
            {/* Glow behind mockup */}
            <div className="absolute -inset-20 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 blur-[100px] rounded-3xl" />

            <div className="relative premium-card rounded-3xl p-1 shadow-2xl shadow-black/40 group hover:border-primary/40 transition-all duration-500">

              <div className="absolute -bottom-7 -left-6 z-20 hidden xl:flex items-center gap-3 premium-card rounded-2xl p-3 w-48 -rotate-2" style={{ animation: "float 5s ease-in-out infinite", animationDelay: "-2s" }}>
                <SignalFlowIcon size={24} className="text-primary" />
                <div>
                  <div className="text-xs font-semibold">Smart routing</div>
                  <div className="text-[10px] text-muted-foreground/70">лид сразу в CRM</div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-surface-elevated/80 to-surface/60 backdrop-blur-sm">
                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-border/20">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2.5 rounded-full bg-destructive/70" />
                    <div className="size-2.5 rounded-full bg-warning/60" />
                    <div className="size-2.5 rounded-full bg-success/60" />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground/60 font-medium">
                    <ChatCircle size={14} className="text-primary" />
                    AI-ассистент — Telegram / Instagram / WhatsApp
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-[11px] text-success/80 font-medium">online</span>
                  </div>
                </div>
                {/* Chat body */}
                <div className="px-5 py-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="size-7 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 grid place-items-center text-[10px] font-bold text-primary shrink-0">К</div>
                    <div className="max-w-[75%] bg-white/5 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                      <div className="text-xs font-medium text-foreground/80">Клиент</div>
                      <p className="text-sm text-muted-foreground mt-0.5">Здравствуйте! Интересует ваш продукт для онлайн-школы. Есть ли скидка на год?</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 justify-end">
                    <div className="max-w-[75%] bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rounded-tr-sm px-3.5 py-2.5 border border-primary/15">
                      <div className="text-xs font-medium text-primary flex items-center gap-1">
                        <Sparkles size={12} /> AI-ассистент
                        <span className="text-[10px] text-muted-foreground/40">~ 1.2s</span>
                      </div>
                      <p className="text-sm text-foreground/90 mt-0.5">
                        Добрый день! Конечно. При годовой подписке — скидка 17%. Также для онлайн-школ у нас есть специальный тариф с интеграцией платёжных систем. Хотите, расскажу подробнее?
                      </p>
                    </div>
                    <div className="size-7 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-[10px] font-bold text-primary-foreground shrink-0 shadow-lg shadow-primary/30">AI</div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="size-7 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 grid place-items-center text-[10px] font-bold text-primary shrink-0">К</div>
                    <div className="max-w-[75%] bg-white/5 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                      <p className="text-sm text-muted-foreground">Да, расскажите! Какие ещё возможности есть?</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 justify-end">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rounded-tr-sm px-4 py-3 border border-primary/15">
                      <div className="flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-primary/60 animate-blink-caret" />
                        <span className="size-1.5 rounded-full bg-primary/40 animate-blink-caret" style={{ animationDelay: "0.15s" }} />
                        <span className="size-1.5 rounded-full bg-primary/20 animate-blink-caret" style={{ animationDelay: "0.3s" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground/40 mt-4">
              AI отвечает на вопросы, квалифицирует и закрывает сделки — полностью самостоятельно
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
