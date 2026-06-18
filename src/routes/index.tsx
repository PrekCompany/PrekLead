import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problem, Solution, HowItWorks, Features } from "@/components/landing/Sections";
import { DemoPreview } from "@/components/landing/DemoPreview";
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
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <DemoPreview />
      <Integrations />
      <Pricing />
      <FAQ />
      <Footer />
      <CookieBanner />
    </div>
  );
}
