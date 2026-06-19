import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Bell, Lock, SignOut, Eye, EyeSlash } from "../components/PhosphorIcons";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Настройки — PREKLEAD" }] }),
  component: SettingsPage,
});

type TabId = "profile" | "notifications" | "security";

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: "profile", label: "Профиль", icon: User },
  { id: "notifications", label: "Уведомления", icon: Bell },
  { id: "security", label: "Безопасность", icon: Lock },
];

function SettingsPage() {
  const [tab, setTab] = useState<TabId>("profile");
  const [name, setName] = useState("Алексей Петров");
  const [email, setEmail] = useState("alexey@preklead.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    telegram: true,
    browser: false,
  });
  const [saved, setSaved] = useState(false);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">Настройки</h1>
        <p className="text-sm text-muted-foreground mt-1">Управление аккаунтом</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 card w-fit mb-6">
        {TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                tab === t.id
                  ? "bg-primary text-primary-foreground"
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
        <div className="card p-5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-full bg-primary/20 grid place-items-center text-lg font-semibold text-primary">
              АП
            </div>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-xs text-muted-foreground">Pro план</div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Имя</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {tab === "notifications" && (
        <div className="card p-5 space-y-3">
          {[
            { key: "email" as const, label: "Email уведомления", desc: "О новых лидах и сообщениях" },
            { key: "telegram" as const, label: "Telegram уведомления", desc: "Мгновенные оповещения в Telegram" },
            { key: "browser" as const, label: "Браузерные уведомления", desc: "Push-уведомления в браузере" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated">
              <div>
                <div className="text-sm font-medium">{n.label}</div>
                <div className="text-xs text-muted-foreground">{n.desc}</div>
              </div>
              <button
                onClick={() => toggleNotification(n.key)}
                className={`relative w-9 h-5 rounded-full transition-all ${
                  notifications[n.key] ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-all ${
                    notifications[n.key] ? "left-4" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Security */}
      {tab === "security" && (
        <div className="card p-5 space-y-4">
          <div>
            <label className="label">Текущий пароль</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input-field pr-10"
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
            <label className="label">Новый пароль</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label">Подтвердите пароль</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" />
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-6">
        <button onClick={handleSave} className="btn btn-primary">
          {saved ? "Сохранено" : "Сохранить"}
        </button>
        <Link to="/" className="btn btn-ghost text-sm flex items-center gap-2">
          <SignOut size={14} /> Выйти
        </Link>
      </div>
    </div>
  );
}
