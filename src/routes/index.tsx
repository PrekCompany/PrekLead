import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problem, Solution, RevenueRoom, HowItWorks, Features, StatsBar } from "@/components/landing/Sections";
import { Integrations } from "@/components/landing/Integrations";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { CookieBanner } from "@/components/landing/CookieBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PREKLEAD — AI Business OS, превращает сообщения в клиентов" },
      { name: "description", content: "AI отвечает клиентам в Telegram, Instagram и WhatsApp. Inbox, CRM и аналитика в одной системе." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <div className="section-glow-divider" />
      <Problem />
      <Solution />
      <RevenueRoom />
      <div className="section-glow-divider" />
      <HowItWorks />
      <div className="section-glow-divider" />
      <Features />
      <StatsBar />
      <Integrations />
      <div className="section-glow-divider" />
      <Pricing />
      <FAQ />
      <Footer />
      <CookieBanner />
    </div>
  );
}
