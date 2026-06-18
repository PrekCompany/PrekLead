import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/mock-data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">FAQ</div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-gradient">
            Частые вопросы
          </h2>
        </div>
        <div className="space-y-2">
          {faq.map((f, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground animate-fade-up">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
