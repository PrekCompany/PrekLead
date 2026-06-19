import { useState } from "react";
import { ChevronDown } from "../PhosphorIcons";
import { faq } from "@/lib/mock-data";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, inView } = useScrollReveal();

  return (
    <section id="faq" className="relative py-16 md:py-20" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,oklch(0.62_0.24_258/0.06),transparent_70%)] pointer-events-none" />
      <div className="mx-auto max-w-3xl px-4">
        <div className={`text-center mb-8 md:mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">FAQ</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient">
            Частые вопросы
          </h2>
          <p className="mt-2 md:mt-3 text-sm text-muted-foreground">Всё, что нужно знать перед стартом</p>
        </div>
        <div className="space-y-2">
          {faq.map((f, i) => (
            <div
              key={i}
              className={`glass rounded-2xl overflow-hidden border border-border/20 hover:border-primary/20 transition-all duration-300 ${
                open === i ? "border-primary/30" : ""
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-medium">{f.q}</span>
                <div className={`size-7 rounded-lg bg-primary/10 grid place-items-center text-primary transition-all duration-300 ${
                  open === i ? "rotate-180 bg-primary/20" : ""
                }`}>
                  <ChevronDown size={14} />
                </div>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground/80 leading-relaxed animate-fade-up">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
