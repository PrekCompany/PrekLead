import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Brand";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Регистрация — PREKLEAD" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    businessName: "",
    referrer: "",
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr]">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-surface/50 border-r border-border">
        <Link to="/" className="w-fit"><Logo /></Link>
        <div className="max-w-md">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            Начните бесплатно
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            14 дней бесплатно. Без привязки карты. 
            Настройте AI-ассистента за 5 минут.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          &copy; 2026 PREKLEAD
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8"><Link to="/"><Logo /></Link></div>
          <h1 className="text-xl font-semibold tracking-tight mb-1">Создать аккаунт</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Заполните данные для регистрации
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/otp" });
            }}
          >
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@company.com"
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Пароль</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="Минимум 8 символов"
                required
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Имя</label>
                <input
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="Алексей"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Фамилия</label>
                <input
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Петров"
                  required
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="label">Название бизнеса</label>
              <input
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                placeholder="Название компании"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Как узнали о сервисе?</label>
              <select
                value={form.referrer}
                onChange={(e) => update("referrer", e.target.value)}
                className="input-field appearance-none"
              >
                <option value="" disabled className="bg-surface text-muted-foreground">Выберите вариант</option>
                <option value="search" className="bg-surface text-foreground">Поиск</option>
                <option value="telegram" className="bg-surface text-foreground">Telegram</option>
                <option value="instagram" className="bg-surface text-foreground">Instagram</option>
                <option value="friend" className="bg-surface text-foreground">Друг</option>
                <option value="ads" className="bg-surface text-foreground">Реклама</option>
                <option value="other" className="bg-surface text-foreground">Другое</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Создать аккаунт
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link to="/auth" className="text-primary hover:underline font-medium">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
