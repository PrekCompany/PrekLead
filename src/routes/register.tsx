import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout, Field } from "./auth";
import { ArrowRight, Check, Sparkles } from "../components/PhosphorIcons";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Регистрация — PREKLEAD" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const nav = useNavigate();
  return (
    <AuthLayout title="Запустите AI-продажи" subtitle="14 дней бесплатно — без карты и сложной настройки">
      <div className="mb-5 grid grid-cols-3 gap-2">
        {["Telegram за 60с", "CRM внутри", "AI 24/7"].map((item) => (
          <div key={item} className="rounded-2xl border border-primary/15 bg-primary/10 px-2.5 py-2 text-center text-[10px] text-primary/90">
            <Sparkles size={12} className="mx-auto mb-1" />
            {item}
          </div>
        ))}
      </div>
      <form
        className="space-y-4"
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
        <button className="group w-full mt-2 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold hover:bg-primary-glow transition-all glow-primary flex items-center justify-center gap-2 overflow-hidden relative">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative flex items-center gap-2">Создать аккаунт <ArrowRight size={14} /></span>
        </button>
      </form>
      <div className="mt-5 rounded-2xl border border-border/30 bg-white/[0.03] p-3 text-xs text-muted-foreground/75">
        <div className="flex items-center gap-2 text-foreground/85 font-medium mb-2">
          <Check size={14} className="text-success" /> Что будет после регистрации
        </div>
        <div className="grid gap-1.5">
          <span>• подключение первого канала</span>
          <span>• обучение AI на описании бизнеса</span>
          <span>• тестовый inbox с демо-лидами</span>
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Уже есть аккаунт?{" "}
        <Link to="/auth" className="text-primary hover:underline">Войти</Link>
      </p>
    </AuthLayout>
  );
}
