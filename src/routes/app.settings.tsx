import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Bell, Lock, SignOut, Check, Eye, EyeSlash } from "../components/PhosphorIcons";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Настройки — PREKLEAD" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Алексей Петров");
  const [email, setEmail] = useState("alexey@preklead.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    telegram: true,
    browser: false,
  });
  const [saved, setSaved] = useState(false);

  const TABS = [
    { id: "profile", label: "Профиль", icon: User },
    { id: "notifications", label: "Уведомления", icon: Bell },
    { id: "security", label: "Безопасность", icon: Lock },
  ] as const;

  type TabId = (typeof TABS)[number]["id"];
  const [tab, setTab] = useState<TabId>("profile");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-gradient">Настройки</h1>
        <p className="mt-1 text-sm text-muted-foreground">Управление аккаунтом</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl glass border border-border/20 mb-6 w-fit">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                tab === t.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Profile */}
      {tab === "profile" && (
        <div className="glass rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div className="relative size-16 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-xl font-bold text-white ring-2 ring-primary/30">
              АП
              <span className="absolute -bottom-0.5 -right-0.5 size-4 bg-success rounded-full border-2 border-surface-elevated" />
            </div>
            <div>
              <div className="font-semibold">{name}</div>
              <div className="text-xs text-muted-foreground">Pro Plan</div>
            </div>
            <button className="ml-auto px-3 py-1.5 rounded-lg bg-primary/15 text-primary text-xs font-medium hover:bg-primary/25 transition-all">
              Сменить фото
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Имя</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-input/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-input/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {tab === "notifications" && (
        <div className="glass rounded-2xl p-6 space-y-4">
          {[
            { id: "email", label: "Email уведомления", desc: "О новых лидах и сообщениях" },
            { id: "telegram", label: "Telegram уведомления", desc: "Мгновенные оповещения в Telegram" },
            { id: "browser", label: "Браузерные уведомления", desc: "Push-уведомления в браузере" },
          ].map((n) => (
            <div key={n.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-border/40">
              <div>
                <div className="text-sm font-medium">{n.label}</div>
                <div className="text-xs text-muted-foreground">{n.desc}</div>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    [n.id]: !prev[n.id as keyof typeof prev],
                  }))
                }
                className={`relative w-10 h-6 rounded-full transition-all ${
                  notifications[n.id as keyof typeof notifications]
                    ? "bg-primary"
                    : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white transition-all shadow ${
                    notifications[n.id as keyof typeof notifications]
                      ? "translate-x-4"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Security */}
      {tab === "security" && (
        <div className="glass rounded-2xl p-6 space-y-5">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Текущий пароль</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2.5 pr-10 text-sm bg-input/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeSlash size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Новый пароль</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-input/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>
      )}

      {/* Save */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-glow transition-all shadow-lg shadow-primary/20"
        >
          {saved ? (
            <><Check size={16} /> Сохранено</>
          ) : (
            "Сохранить"
          )}
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <SignOut size={14} />
          Выйти
        </Link>
      </div>
    </div>
  );
}
