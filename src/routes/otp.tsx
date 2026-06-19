import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Brand";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/otp")({
  head: () => ({ meta: [{ title: "Подтверждение — PREKLEAD" }] }),
  component: OtpPage,
});

function OtpPage() {
  const nav = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  useEffect(() => {
    if (code.every((c) => c !== "")) {
      setTimeout(() => nav({ to: "/app" }), 400);
    }
  }, [code, nav]);

  const setDigit = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 3) refs.current[i + 1]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <a href="/"><Logo /></a>
        </div>
        <h1 className="text-xl font-semibold tracking-tight mb-1">Введите код</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Мы отправили 4-значный код на вашу почту
        </p>

        <div className="flex gap-3 justify-center mb-8">
          {code.map((v, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={v}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => e.key === "Backspace" && !v && i > 0 && refs.current[i - 1]?.focus()}
              maxLength={1}
              inputMode="numeric"
              autoComplete="one-time-code"
              className="w-12 h-12 text-center text-lg font-semibold bg-surface border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {timer > 0 ? (
            <>Отправить повторно через <span className="font-medium text-foreground">0:{String(timer).padStart(2, "0")}</span></>
          ) : (
            <button onClick={() => setTimer(45)} className="text-primary hover:underline font-medium">
              Отправить код повторно
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
