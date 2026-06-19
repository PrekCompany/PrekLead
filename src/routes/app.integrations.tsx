import { createFileRoute } from "@tanstack/react-router";
import {
  ChatCircle,
  ImageSquare,
  ChatText,
  Check,
  X,
} from "../components/PhosphorIcons";
import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";

export const Route = createFileRoute("/app/integrations")({
  head: () => ({ meta: [{ title: "Интеграции — PREKLEAD" }] }),
  component: IntegrationsPage,
});

type Integration = {
  id: string;
  name: string;
  description: string;
  status: "connected" | "not_connected" | "coming_soon";
  aiEnabled: boolean;
};

function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: "telegram", name: "Telegram", description: "Подключите Telegram бот для автоматических ответов", status: "not_connected", aiEnabled: true },
    { id: "whatsapp", name: "WhatsApp Business", description: "WhatsApp бизнес-мессенджер", status: "coming_soon", aiEnabled: false },
    { id: "instagram", name: "Instagram", description: "Прямые сообщения и комментарии", status: "coming_soon", aiEnabled: false },
  ]);

  const [showTelegramInstructions, setShowTelegramInstructions] = useState(false);
  const [telegramCode, setTelegramCode] = useState("");

  const connectTelegram = () => {
    setShowTelegramInstructions(true);
  };

  const confirmTelegramCode = () => {
    if (!telegramCode.trim()) return;
    setIntegrations((prev) =>
      prev.map((i) => (i.id === "telegram" ? { ...i, status: "connected" as const } : i))
    );
    setShowTelegramInstructions(false);
    setTelegramCode("");
  };

  const toggleIntegration = (id: string, enabled: boolean) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: enabled ? "connected" as const : "not_connected" as const } : i))
    );
  };

  const toggleAiForChannel = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, aiEnabled: !i.aiEnabled } : i))
    );
  };

  const integrationsList = integrations;

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Интеграции</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Подключите каналы для AI-автоответов
        </p>
      </div>

      <div className="space-y-3">
        {integrationsList.map((int) => (
          <div key={int.id} className="card p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-xl border grid place-items-center ${
                  int.id === "telegram" ? "bg-[#0088cc]/10 border-[#0088cc]/30 text-[#0088cc]" :
                  int.id === "whatsapp" ? "bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366]" :
                  "bg-pink-500/10 border-pink-500/30 text-pink-500"
                }`}>
                  {int.id === "telegram" ? <ChatCircle size={22} /> :
                   int.id === "whatsapp" ? <ChatText size={22} /> :
                   <ImageSquare size={22} />}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{int.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{int.description}</p>
                  {int.status === "connected" && (
                    <span className="tag tag-success mt-1.5 inline-flex text-[10px]">
                      <Check size={10} /> Подключено
                    </span>
                  )}
                  {int.status === "coming_soon" && (
                    <span className="tag tag-warning mt-1.5 inline-flex text-[10px]">
                      В разработке
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {int.status === "connected" && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-muted-foreground">AI</span>
                      <Switch.Root
                        checked={int.aiEnabled}
                        onCheckedChange={() => toggleAiForChannel(int.id)}
                        className="switch"
                      >
                        <Switch.Thumb className="switch-thumb" />
                      </Switch.Root>
                    </div>
                    <button
                      onClick={() => toggleIntegration(int.id, false)}
                      className="btn btn-ghost text-xs"
                    >
                      <X size={12} /> Отключить
                    </button>
                  </>
                )}
                {int.status === "not_connected" && (
                  <button
                    onClick={connectTelegram}
                    className="btn btn-primary text-xs"
                  >
                    Подключить
                  </button>
                )}
                {int.status === "coming_soon" && (
                  <button className="btn btn-secondary text-xs">
                    Уведомить меня
                  </button>
                )}
              </div>
            </div>

            {/* Telegram инструкция */}
            {int.id === "telegram" && showTelegramInstructions && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-sm font-medium mb-3">Подключение Telegram</div>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside mb-4">
                  <li>Откройте Telegram</li>
                  <li>Найдите бота <span className="font-medium text-foreground">@PrekLeadBot</span></li>
                  <li>Нажмите <span className="font-medium text-foreground">Start</span></li>
                  <li>Скопируйте код из бота и вставьте ниже</li>
                </ol>
                <div className="flex items-center gap-2">
                  <input
                    value={telegramCode}
                    onChange={(e) => setTelegramCode(e.target.value)}
                    placeholder="Введите код из Telegram..."
                    className="input-field flex-1"
                  />
                  <button
                    onClick={confirmTelegramCode}
                    disabled={!telegramCode.trim()}
                    className="btn btn-primary"
                  >
                    Подтвердить
                  </button>
                  <button
                    onClick={() => { setShowTelegramInstructions(false); setTelegramCode(""); }}
                    className="btn btn-ghost"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
