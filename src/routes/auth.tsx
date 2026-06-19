import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Brand";
import { useState } from "react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Вход — PREKLEAD" }] }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr]">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-surface/50 border-r border-border">
        <Link to="/" className="w-fit"><Logo /></Link>
        <div className="max-w-md">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            Добро пожаловать в PREKLEAD
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI-ассистент для вашего бизнеса. Отвечайте клиентам в Telegram, 
            Instagram и WhatsApp автоматически.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          &copy; 2026 PREKLEAD
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8"><Link to="/"><Logo /></Link></div>
          <h1 className="text-xl font-semibold tracking-tight mb-1">Войти</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Войдите в свой аккаунт
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/app" });
            }}
          >
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input-field"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                Запомнить меня
              </label>
              <button type="button" className="text-primary text-sm hover:underline">
                Забыли пароль?
              </button>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Войти
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Создать
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
