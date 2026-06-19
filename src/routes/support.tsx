import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { BackLink } from "@/components/BackLink";
import { ChatCircle, PaperPlaneRight, Envelope } from "phosphor-react";
import { useState } from "react";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Поддержка — PREKLEAD" }] }),
  component: SupportPage,
});

function SupportPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-6"><BackLink to="/" /></div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Поддержка</div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-gradient">Мы рядом 24/7</h1>

          <div className="grid md:grid-cols-[1fr_320px] gap-6 mt-10">
            <form
              className="glass rounded-2xl p-6 space-y-4"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <h2 className="font-display text-xl font-semibold">Напишите нам</h2>
              <input required type="email" placeholder="Email" className="w-full px-3 py-2.5 bg-input/40 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <input required placeholder="Тема" className="w-full px-3 py-2.5 bg-input/40 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <textarea required rows={5} placeholder="Опишите вопрос..." className="w-full px-3 py-2.5 bg-input/40 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-glow flex items-center gap-2">
                <PaperPlaneRight size={14} /> {sent ? "Отправлено ✓" : "Отправить"}
              </button>
            </form>
            <div className="space-y-3">
              <a href="mailto:support@preklead.ai" className="glass rounded-2xl p-5 flex items-center gap-3 hover:border-primary/40 transition-colors">
                <div className="size-10 rounded-xl bg-primary/15 grid place-items-center text-primary"><Envelope size={16} /></div>
                <div>
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-xs text-muted-foreground">support@preklead.ai</div>
                </div>
              </a>
              <a href="https://t.me/prekleadbot" target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center gap-3 hover:border-primary/40 transition-colors">
                <div className="size-10 rounded-xl bg-primary/15 grid place-items-center text-primary"><ChatCircle size={16} /></div>
                <div>
                  <div className="text-sm font-semibold">Telegram bot</div>
                  <div className="text-xs text-muted-foreground">@prekleadbot</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
