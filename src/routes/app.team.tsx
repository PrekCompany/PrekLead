import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  UserPlus,
  X,
  Check,
  MagnifyingGlass,
  Spinner,
  Sparkle,
  CaretRight,
  Shield,
  User,
  Eye,
} from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export const Route = createFileRoute("/app/team")({
  head: () => ({ meta: [{ title: "Команда — PREKLEAD" }] }),
  component: TeamPage,
});

type Role = "admin" | "manager" | "analyst";
type MemberStatus = "active" | "pending";

interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: MemberStatus;
  avatar: string;
}

const ROLE_LABELS: Record<Role, string> = {
  admin: "Администратор",
  manager: "Менеджер",
  analyst: "Аналитик",
};

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  admin: "Полный доступ ко всем разделам",
  manager: "Диалоги, лиды, ответы клиентам",
  analyst: "Только просмотр аналитики",
};

const ROLE_ICONS: Record<Role, typeof Shield> = {
  admin: Shield,
  manager: User,
  analyst: Eye,
};

const INITIAL_MEMBERS: Member[] = [
  { id: "1", name: "Алексей Петров", email: "alexey@preklead.com", role: "admin", status: "active", avatar: "АП" },
  { id: "2", name: "Екатерина Смирнова", email: "ekaterina@preklead.com", role: "manager", status: "active", avatar: "ЕС" },
  { id: "3", name: "Дмитрий Иванов", email: "dmitry@preklead.com", role: "analyst", status: "active", avatar: "ДИ" },
  { id: "4", name: "Анна Попова", email: "anna@preklead.com", role: "manager", status: "pending", avatar: "АП" },
];

function TeamPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("manager");
  const [search, setSearch] = useState("");
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const isBusiness = true; // определять реально из подписки

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = () => {
    if (!inviteEmail) return;
    const newMember: Member = {
      id: String(Date.now()),
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      status: "pending",
      avatar: inviteEmail[0].toUpperCase() + inviteEmail[1]?.toUpperCase() || "?",
    };
    setMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviteOpen(false);
  };

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setConfirmRemove(null);
  };

  const handleRoleChange = (id: string, role: Role) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
  };

  if (!isBusiness) {
    return (
      <div className="p-6 md:p-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="size-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center mb-6">
            <Shield size={36} className="text-primary/60" />
          </div>
          <h2 className="font-display text-2xl font-semibold mb-2">Функция доступна на тарифе Business</h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Управляйте командой до 5 сотрудников с разными уровнями доступа.
          </p>
          <a
            href="/pricing"
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-glow transition-all"
          >
            Улучшить план
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-gradient">Команда</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {members.filter((m) => m.status === "active").length} активных сотрудников
          </p>
        </div>
        <Dialog.Root open={inviteOpen} onOpenChange={setInviteOpen}>
          <Dialog.Trigger asChild>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-glow transition-all shadow-lg shadow-primary/20">
              <UserPlus size={16} />
              Пригласить
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md glass-strong rounded-3xl p-6 z-50 border border-border/40 shadow-2xl">
              <Dialog.Title className="font-display text-xl font-semibold mb-1">Пригласить сотрудника</Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground mb-6">
                Приглашение придёт на email со ссылкой для входа.
              </Dialog.Description>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                  <input
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="partner@company.com"
                    className="w-full px-3 py-2.5 text-sm bg-input/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Роль</label>
                  <div className="space-y-2">
                    {(["admin", "manager", "analyst"] as Role[]).map((role) => {
                      const Icon = ROLE_ICONS[role];
                      return (
                        <button
                          key={role}
                          onClick={() => setInviteRole(role)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all border ${
                            inviteRole === role
                              ? "bg-primary/10 border-primary/40 text-foreground"
                              : "bg-white/[0.03] border-border/40 text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                          }`}
                        >
                          <div className={`size-8 rounded-lg grid place-items-center ${
                            inviteRole === role ? "bg-primary/20 text-primary" : "bg-white/5"
                          }`}>
                            <Icon size={15} />
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{ROLE_LABELS[role]}</div>
                            <div className="text-[11px] text-muted-foreground">{ROLE_DESCRIPTIONS[role]}</div>
                          </div>
                          {inviteRole === role && <Check size={14} className="text-primary ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <Dialog.Close asChild>
                  <button className="flex-1 py-2.5 rounded-xl glass-strong text-sm font-medium hover:bg-white/5 transition-all">
                    Отмена
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleInvite}
                  disabled={!inviteEmail}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Отправить приглашение
                </button>
              </div>

              <Dialog.Close asChild>
                <button className="absolute top-4 right-4 size-8 rounded-lg grid place-items-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
                  <X size={14} />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Search */}
      <div className="relative max-w-xs mb-6">
        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск сотрудников..."
          className="w-full pl-9 pr-3 py-2 text-sm bg-white/[0.03] border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
        />
      </div>

      {/* Team list */}
      <div className="glass rounded-3xl divide-y divide-border/40 overflow-hidden">
        {filtered.map((member) => {
          const RoleIcon = ROLE_ICONS[member.role];
          return (
            <div key={member.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors group">
              <div className="relative size-11 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 grid place-items-center text-sm font-bold shrink-0 ring-2 ring-border/30">
                {member.avatar}
                {member.status === "active" && (
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 bg-success rounded-full border-2 border-surface-elevated">
                    <span className="absolute inset-0 rounded-full bg-success animate-pulse-ring" />
                  </span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{member.name}</div>
                <div className="text-xs text-muted-foreground truncate">{member.email}</div>
              </div>

              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium ${
                member.status === "active"
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning"
              }`}>
                <span className={`size-1.5 rounded-full ${member.status === "active" ? "bg-success" : "bg-warning"}`} />
                {member.status === "active" ? "Активен" : "Ожидает"}
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-xs text-muted-foreground">
                <RoleIcon size={12} />
                {ROLE_LABELS[member.role]}
              </div>

              {/* Role changer */}
              {member.role !== "admin" && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {(["manager", "analyst"] as Role[]).map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(member.id, role)}
                      className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all ${
                        member.role === role
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      {ROLE_LABELS[role]}
                    </button>
                  ))}
                </div>
              )}

              {member.role !== "admin" && (
                <button
                  onClick={() => setConfirmRemove(member.id)}
                  className="size-8 rounded-lg grid place-items-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirm remove dialog */}
      <Dialog.Root open={!!confirmRemove} onOpenChange={(o) => !o && setConfirmRemove(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm glass-strong rounded-3xl p-6 z-50 border border-border/40 shadow-2xl">
            <Dialog.Title className="font-display text-lg font-semibold mb-2">Удалить сотрудника?</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground mb-6">
              Сотрудник потеряет доступ к аккаунту. Вы сможете пригласить его снова.
            </Dialog.Description>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirmRemove(null)}
                className="flex-1 py-2.5 rounded-xl glass-strong text-sm font-medium hover:bg-white/5 transition-all"
              >
                Отмена
              </button>
              <button
                onClick={() => confirmRemove && handleRemove(confirmRemove)}
                className="flex-1 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-all"
              >
                Удалить
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Info card */}
      <div className="mt-6 glass rounded-2xl p-5 flex items-start gap-4">
        <div className="size-10 rounded-xl bg-primary/10 grid place-items-center shrink-0">
          <Shield size={18} className="text-primary" />
        </div>
        <div>
          <div className="text-sm font-semibold mb-1">О ролях</div>
          <ul className="space-y-1">
            {(["admin", "manager", "analyst"] as Role[]).map((role) => (
              <li key={role} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{ROLE_LABELS[role]}:</span>
                {ROLE_DESCRIPTIONS[role]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
