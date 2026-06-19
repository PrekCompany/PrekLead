import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { Pricing as PricingSection } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Тарифы — PREKLEAD" },
      { name: "description", content: "Прозрачные тарифы PREKLEAD: Starter, Pro, Business. Отмена в один клик." },
    ],
  }),
  component: () => (
    <div className="min-h-screen">
      <Nav />
      <PricingSection standalone />
      <FAQ />
      <Footer />
    </div>
  ),
});
