import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "./auth";
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
      setTimeout(() => nav({ to: "/app" }), 600);
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
    <AuthLayout title="Введите код" subtitle="Мы отправили 4-значный код на вашу почту">
      <div className="flex gap-3 justify-center">
        {code.map((v, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            value={v}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => e.key === "Backspace" && !v && i > 0 && refs.current[i - 1]?.focus()}
            maxLength={1}
            inputMode="numeric"
            className="size-14 text-center text-2xl font-display font-semibold bg-input/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        ))}
      </div>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        {timer > 0 ? (
          <>Отправить повторно через <span className="font-mono text-foreground">0:{String(timer).padStart(2, "0")}</span></>
        ) : (
          <button onClick={() => setTimer(45)} className="text-primary hover:underline">Отправить код повторно</button>
        )}
      </div>
    </AuthLayout>
  );
}
