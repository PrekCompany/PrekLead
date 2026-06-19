import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Brand";
import { ArrowRight, ChatCircle, RevenueSparkIcon, Shield, SignalFlowIcon, TrustGridIcon } from "../components/PhosphorIcons";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Вход — PREKLEAD" }] }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  return (
    <AuthLayout title="С возвращением" subtitle="Войдите в свой AI Revenue Room">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          nav({ to: "/app" });
        }}
      >
        <Field label="Email" type="email" placeholder="you@company.com" />
        <Field label="Пароль" type="password" placeholder="••••••••" />
        <div className="flex items-center justify-between rounded-2xl border border-success/20 bg-success/10 px-3.5 py-3 text-xs text-success/90">
          <span className="inline-flex items-center gap-2"><Shield size={14} /> Защищённый вход</span>
          <span className="text-success/60">SSL · 2FA ready</span>
        </div>
        <button className="group w-full mt-2 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-all glow-primary flex items-center justify-center gap-2 overflow-hidden relative">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative flex items-center gap-2">
          Войти <ArrowRight size={14} />
          </span>
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Нет аккаунта?{" "}
        <Link to="/register" className="text-primary hover:underline">Создать</Link>
      </p>
    </AuthLayout>
  );
}

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const metrics = [
    { icon: SignalFlowIcon, value: "2с", label: "средний ответ AI" },
    { icon: RevenueSparkIcon, value: "+340%", label: "рост конверсии" },
    { icon: TrustGridIcon, value: "24/7", label: "продажи без пауз" },
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.08fr_0.92fr] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_15%_10%,oklch(0.62_0.24_258/0.22),transparent_65%),radial-gradient(ellipse_50%_40%_at_95%_85%,oklch(0.70_0.18_178/0.12),transparent_70%)]" />
      <div className="absolute inset-0 diagonal-grid opacity-[0.08]" />

      <div className="hidden lg:flex relative overflow-hidden border-r border-border/40">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute -left-24 top-24 size-80 rounded-full bg-primary/10 blur-[110px]" />
        <div className="relative z-10 p-12 flex flex-col justify-between w-full">
          <Link to="/" className="w-fit"><Logo /></Link>
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs text-primary mb-7">
              <ChatCircle size={14} /> AI Inbox · CRM · Sales automation
            </div>
            <h2 className="font-display text-5xl font-bold aurora-text leading-tight">
              Вход в систему,<br />которая продаёт<br />пока команда спит
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
              PREKLEAD собирает сообщения из каналов, квалифицирует лидов и создаёт ощущение, что у бизнеса всегда онлайн лучшая команда продаж.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="premium-card rounded-2xl p-4">
                  <m.icon size={22} className="text-primary" />
                  <div className="mt-3 font-display text-2xl font-bold text-gradient-primary">{m.value}</div>
                  <div className="mt-1 text-[11px] leading-tight text-muted-foreground/70">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground/55">
            <span>© 2026 PREKLEAD</span>
            <span>Secure AI Business OS</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md premium-card rounded-[2rem] p-6 sm:p-8">
          <div className="lg:hidden mb-8"><Link to="/"><Logo /></Link></div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[11px] text-primary">
            <SignalFlowIcon size={14} /> Revenue access
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold aurora-text">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label, type = "text", placeholder, textarea, options,
}: {
  label: string; type?: string; placeholder?: string; textarea?: boolean; options?: string[];
}) {
  const cls = "w-full px-4 py-3 text-sm bg-black/20 border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all placeholder:text-muted-foreground/35";
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1.5">
        {textarea ? (
          <textarea placeholder={placeholder} rows={3} className={cls} />
        ) : options ? (
          <select className={cls}>
            {options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ) : (
          <input type={type} placeholder={placeholder} required className={cls} />
        )}
      </div>
    </label>
  );
}
