import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("preklead-cookies")) {
      setTimeout(() => setShow(true), 1500);
    }
  }, []);
  if (!show) return null;
  const accept = (v: string) => {
    localStorage.setItem("preklead-cookies", v);
    setShow(false);
  };
  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:max-w-md z-50 animate-fade-up">
      <div className="glass-strong rounded-2xl p-5 shadow-elevated">
        <div className="flex items-start gap-3">
          <div className="size-9 rounded-lg bg-primary/15 grid place-items-center shrink-0">
            <Cookie size={18} className="text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold">Мы используем cookies</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Для аналитики и улучшения работы сервиса. Подробнее в{" "}
              <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a>.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => accept("all")}
                className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary-glow transition-colors"
              >
                Принять все
              </button>
              <button
                onClick={() => accept("essential")}
                className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-md hover:bg-accent transition-colors"
              >
                Только нужные
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
