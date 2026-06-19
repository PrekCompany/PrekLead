import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus, X, Check, Shield, User, Eye, MagnifyingGlass } from "../components/PhosphorIcons";
import * as Dialog from "@radix-ui/react-dialog";

export const Route = createFileRoute("/app/team")({
  head: () => ({ meta: [{ title: "Команда — PREKLEAD" }] }),
  component: TeamPage,
});

type Role = "owner" | "manager" | "operator" | "custom";

interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  customRole?: string;
  status: "active" | "pending";
}

const ROLE_LABELS: Record<string, string> = {
  owner: "Владелец",
  manager: "Менеджер",
  operator: "Оператор",
};

const ROLE_DESCRIPTIONS: Record<string, string> = {
  owner: "Полный доступ ко всем разделам",
  manager: "Диалоги, лиды, ответы клиентам",
  operator: "Просмотр чатов и ответы",
};

const ROLE_ICONS: Record<string, typeof Shield> = {
  owner: Shield,
  manager: User,
  operator: Eye,
};

const INITIAL_MEMBERS: Member[] = [
  { id: "1", name: "Алексей Петров", email: "alexey@preklead.com", role: "owner", status: "active" },
];

function TeamPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("manager");
  const [customRoleName, setCustomRoleName] = useState("");
  const [search, setSearch] = useState("");
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<string | null>(null);

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
      role: inviteRole === "custom" ? "custom" : inviteRole,
      customRole: inviteRole === "custom" ? customRoleName : undefined,
      status: "pending",
    };
    setMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    setCustomRoleName("");
    setInviteOpen(false);
  };

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setConfirmRemove(null);
  };

  const changeRole = (id: string, role: Role, customRole?: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role, customRole: role === "custom" ? customRole : undefined } : m))
    );
    setEditingRole(null);
  };

  const getRoleDisplay = (m: Member) => {
    if (m.role === "custom" && m.customRole) return m.customRole;
    return ROLE_LABELS[m.role] || m.role;
  };

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Команда</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {members.filter((m) => m.status === "active").length} участников
          </p>
        </div>
        <Dialog.Root open={inviteOpen} onOpenChange={setInviteOpen}>
          <Dialog.Trigger asChild>
            <button className="btn btn-primary">
              <UserPlus size={15} /> Пригласить
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md card p-6 z-50 shadow-xl">
              <Dialog.Title className="font-semibold mb-1">Пригласить сотрудника</Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground mb-5">
                Приглашение придёт на email
              </Dialog.Description>

              <div className="space-y-4">
                <div>
                  <label className="label">Email</label>
                  <input
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="partner@company.com"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Роль</label>
                  <div className="space-y-1.5">
                    {(["owner", "manager", "operator", "custom"] as Role[]).map((role) => {
                      const Icon = ROLE_ICONS[role] || User;
                      return (
                        <button
                          key={role}
                          onClick={() => setInviteRole(role)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm border transition-all ${
                            inviteRole === role
                              ? "bg-primary/10 border-primary/40"
                              : "bg-surface border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon size={15} />
                          <span className="flex-1 text-left">
                            <span className="font-medium">{ROLE_LABELS[role] || "Своя роль"}</span>
                            <span className="text-xs text-muted-foreground ml-2">{ROLE_DESCRIPTIONS[role] || "Пользовательская роль"}</span>
                          </span>
                          {inviteRole === role && <Check size={14} className="text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                  {inviteRole === "custom" && (
                    <input
                      value={customRoleName}
                      onChange={(e) => setCustomRoleName(e.target.value.slice(0, 12))}
                      placeholder="Название роли (до 12 символов)"
                      maxLength={12}
                      className="input-field mt-2"
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <Dialog.Close asChild>
                  <button className="btn btn-secondary flex-1">Отмена</button>
                </Dialog.Close>
                <button
                  onClick={handleInvite}
                  disabled={!inviteEmail || (inviteRole === "custom" && !customRoleName)}
                  className="btn btn-primary flex-1"
                >
                  Отправить
                </button>
              </div>

              <Dialog.Close asChild>
                <button className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Search */}
      <div className="relative max-w-xs mb-5">
        <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск..."
          className="input-field pl-9"
        />
      </div>

      {/* Team list */}
      <div className="card divide-y divide-border overflow-hidden">
        {filtered.map((member) => {
          const RoleIcon = ROLE_ICONS[member.role] || User;
          return (
            <div key={member.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-accent/50 transition-colors group">
              <div className="size-9 rounded-full bg-primary/15 grid place-items-center text-xs font-semibold text-primary shrink-0">
                {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{member.name}</div>
                <div className="text-xs text-muted-foreground truncate">{member.email}</div>
              </div>
              <span className={`tag text-[11px] ${
                member.status === "active" ? "tag-success" : "tag-warning"
              }`}>
                {member.status === "active" ? "Активен" : "Ожидает"}
              </span>

              {/* Role */}
              {member.role === "owner" ? (
                <span className="tag tag-primary text-[11px] flex items-center gap-1">
                  <Shield size={10} /> {getRoleDisplay(member)}
                </span>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setEditingRole(editingRole === member.id ? null : member.id)}
                    className="tag bg-surface border border-border text-[11px] flex items-center gap-1 hover:bg-accent transition-all"
                  >
                    <RoleIcon size={10} />
                    {getRoleDisplay(member)}
                  </button>
                  {editingRole === member.id && (
                    <div className="absolute right-0 top-full mt-1 card p-1.5 shadow-lg z-10 min-w-[140px]">
                      {(["manager", "operator", "custom"] as Role[]).map((role) => (
                        <div key={role}>
                          <button
                            onClick={() => {
                              if (role === "custom") {
                                const customName = prompt("Название роли (до 12 символов):", member.customRole || "");
                                if (customName && customName.length <= 12) {
                                  changeRole(member.id, "custom", customName);
                                }
                              } else {
                                changeRole(member.id, role);
                              }
                            }}
                            className="w-full text-left px-3 py-1.5 rounded text-sm hover:bg-accent transition-colors"
                          >
                            {ROLE_LABELS[role] || "Своя роль"}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {member.role !== "owner" && (
                <button
                  onClick={() => setConfirmRemove(member.id)}
                  className="size-7 rounded grid place-items-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirm remove */}
      <Dialog.Root open={!!confirmRemove} onOpenChange={(o) => !o && setConfirmRemove(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm card p-6 z-50 shadow-xl">
            <Dialog.Title className="font-semibold mb-1">Удалить сотрудника?</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground mb-5">
              Сотрудник потеряет доступ к аккаунту.
            </Dialog.Description>
            <div className="flex items-center gap-2">
              <button onClick={() => setConfirmRemove(null)} className="btn btn-secondary flex-1">Отмена</button>
              <button onClick={() => confirmRemove && handleRemove(confirmRemove)} className="btn btn-destructive flex-1">Удалить</button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
