import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout, Field } from "./auth";
import { ArrowRight } from "../components/PhosphorIcons";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Регистрация — PREKLEAD" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const nav = useNavigate();
  return (
    <AuthLayout title="Создайте аккаунт" subtitle="Бесплатно, без карты, на 14 дней">
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          nav({ to: "/otp" });
        }}
      >
        <Field label="Email" type="email" placeholder="you@company.com" />
        <Field label="Пароль" type="password" placeholder="••••••••" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Имя" placeholder="Алексей" />
          <Field label="Фамилия" placeholder="Петров" />
        </div>
        <Field label="Название бизнеса" placeholder="Northstar Co" />
        <Field label="Чем занимается бизнес" textarea placeholder="Например: продажа онлайн-курсов по дизайну" />
        <Field label="Как узнали о сервисе?" options={["Поиск", "Telegram", "Instagram", "Друг", "Реклама", "Другое"]} />
        <button className="w-full mt-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-glow transition-all glow-primary flex items-center justify-center gap-2">
          Создать аккаунт <ArrowRight size={14} />
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Уже есть аккаунт?{" "}
        <Link to="/auth" className="text-primary hover:underline">Войти</Link>
      </p>
    </AuthLayout>
  );
}
