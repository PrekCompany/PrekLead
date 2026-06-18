import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle,
  Image,
  MessageSquare,
  Plug,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import * as Tooltip from "@radix-ui/react-tooltip";

export const Route = createFileRoute("/app/integrations")({
  head: () => ({ meta: [{ title: "Integrations — PREKLEAD" }] }),
  component: IntegrationsPage,
});

type Integration = {
  id: string;
  name: string;
  description: string;
  status: "connected" | "connecting" | "disabled" | "coming-soon";
  icon: typeof MessageCircle;
  color: string;
  iconBg: string;
  phone?: string;
};

function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "telegram",
      name: "Telegram",
      description: "Connect your Telegram account",
      status: "disabled",
      icon: MessageCircle,
      color: "text-[#0088cc]",
      iconBg: "bg-[#0088cc]/15 border-[#0088cc]/30 group-hover:bg-[#0088cc]/25",
    },
    {
      id: "instagram",
      name: "Instagram",
      description: "Direct messages & comments",
      status: "coming-soon",
      icon: Image,
      color: "text-purple-400",
      iconBg: "bg-gradient-to-br from-purple-500/15 to-pink-500/15 border-purple-500/20",
    },
    {
      id: "whatsapp",
      name: "WhatsApp Business",
      description: "Business messaging platform",
      status: "coming-soon",
      icon: MessageSquare,
      color: "text-[#25D366]",
      iconBg: "bg-[#25D366]/15 border-[#25D366]/20",
    },
  ]);

  const toggleIntegration = async (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id
          ? { ...int, status: int.status === "connected" ? "disabled" : "connecting" as const }
          : int
      )
    );

    // Simulate connection delay
    await new Promise((r) => setTimeout(r, 1200));

    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id && int.status === "connecting"
          ? { ...int, status: "connected" as const, phone: "+380XX1234567" }
          : int
      )
    );
  };

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-8">
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold font-display text-gradient">Integrations</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Connect your communication channels to start AI-powered automation.
          </p>
        </div>

        <div className="grid gap-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {integrations.map((int) => (
            <IntegrationCard
              key={int.id}
              integration={int}
              onToggle={toggleIntegration}
            />
          ))}
        </div>
      </div>
    </Tooltip.Provider>
  );
}

function IntegrationCard({
  integration: int,
  onToggle,
}: {
  integration: Integration;
  onToggle: (id: string) => void;
}) {
  const isConnected = int.status === "connected";
  const isConnecting = int.status === "connecting";
  const isComingSoon = int.status === "coming-soon";

  return (
    <div
      className={`
        relative group glass-strong rounded-2xl p-5 md:p-6
        transition-all duration-300
        ${isComingSoon ? "opacity-50" : "hover:-translate-y-0.5"}
        ${isConnected ? "border-success/40 hover:border-success/60" : "hover:border-primary/40"}
        ${!isComingSoon ? "hover:glow-primary" : ""}
      `}
    >
      {/* Shimmer border on hover */}
      {!isComingSoon && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 animate-shimmer rounded-2xl" />
        </div>
      )}

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`
              relative size-14 rounded-xl border grid place-items-center
              transition-all duration-300 group-hover:scale-105
              ${int.iconBg}
              ${isConnected ? "shadow-lg shadow-success/20" : ""}
            `}
          >
            <int.icon size={24} className={`${int.color} transition-transform duration-300 group-hover:scale-110`} />
            {isConnected && (
              <>
                <span className="absolute -top-1 -right-1 size-4 bg-success rounded-full grid place-items-center">
                  <Check size={10} className="text-white" />
                </span>
                <span className="absolute inset-0 rounded-xl border border-success/40 animate-pulse-ring" />
              </>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-sm flex items-center gap-2">
              {int.name}
              {isConnecting && (
                <span className="flex items-center gap-1 text-[10px] text-primary">
                  <Loader2 size={10} className="animate-spin" />
                  Connecting...
                </span>
              )}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isConnected
                ? int.phone || "Connected"
                : isComingSoon
                  ? "Coming soon"
                  : int.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status indicator */}
          {isConnected && (
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-success">
              <span className="size-1.5 rounded-full bg-success shadow-lg shadow-success/50 animate-pulse" />
              Active
            </div>
          )}

          {/* Toggle switch */}
          {!isComingSoon ? (
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="relative">
                  <Switch.Root
                    checked={isConnected}
                    disabled={isConnecting}
                    onCheckedChange={() => onToggle(int.id)}
                    className={`
                      relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center
                      rounded-full border transition-all duration-300
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                      ${isConnected
                        ? "bg-success border-success/50"
                        : "bg-muted/40 border-border/50 group-hover:border-primary/40"
                      }
                      ${isConnecting ? "opacity-60 cursor-wait" : ""}
                    `}
                  >
                    <Switch.Thumb
                      className={`
                        pointer-events-none block size-4 rounded-full bg-white shadow-md
                        transition-transform duration-300
                        ${isConnected ? "translate-x-[22px]" : "translate-x-[3px]"}
                        ${isConnecting ? "animate-pulse" : ""}
                      `}
                    />
                  </Switch.Root>
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="px-2 py-1 rounded-lg text-[10px] bg-surface-elevated border border-border shadow-lg"
                sideOffset={6}
              >
                {isConnected ? "Disconnect" : "Connect"}
                <Tooltip.Arrow className="fill-surface-elevated" />
              </Tooltip.Content>
            </Tooltip.Root>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 text-muted-foreground text-[10px] font-medium border border-border/50">
              <X size={12} />
              Disabled
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
