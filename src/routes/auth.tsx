import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Brand";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Вход — PREKLEAD" }] }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  return (
    <AuthLayout title="С возвращением" subtitle="Войдите в свой AI Control Center">
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          nav({ to: "/app" });
        }}
      >
        <Field label="Email" type="email" placeholder="you@company.com" />
        <Field label="Пароль" type="password" placeholder="••••••••" />
        <button className="w-full mt-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-glow transition-all glow-primary flex items-center justify-center gap-2">
          Войти <ArrowRight size={14} />
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
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden bg-surface/30 border-r border-border/50">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 [background:var(--gradient-glow)]" />
        <div className="relative z-10 p-12 flex flex-col justify-between w-full">
          <Link to="/"><Logo /></Link>
          <div>
            <h2 className="font-display text-4xl font-semibold text-gradient leading-tight">
              AI, который превращает<br />сообщения в выручку
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Подключите Telegram за 60 секунд и смотрите как AI квалифицирует
              лидов и закрывает сделки.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">© 2026 PREKLEAD</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8"><Link to="/"><Logo /></Link></div>
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
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
  const cls = "w-full px-3 py-2.5 text-sm bg-input/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all";
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
