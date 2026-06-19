import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { BackLink } from "@/components/BackLink";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О нас — PREKLEAD" },
      { name: "description", content: "PREKLEAD строит AI Business OS, чтобы предприниматели зарабатывали больше с меньшими усилиями." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-6"><BackLink to="/" /></div>
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">О нас</div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Мы строим AI, который продаёт за вас
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              PREKLEAD — это AI Business OS. Мы объединяем все каналы коммуникации
              бизнеса с клиентами в единую систему, где AI отвечает мгновенно,
              квалифицирует лидов и доводит сделки до оплаты.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-12">
            {[
              { v: "12k+", l: "бизнесов используют PREKLEAD" },
              { v: "2.4M", l: "сообщений обработано AI" },
              { v: "34%", l: "средний рост конверсии" },
            ].map((s) => (
              <div key={s.l} className="card p-5 text-center">
                <div className="text-2xl font-semibold text-primary">{s.v}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
