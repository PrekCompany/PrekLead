import { useEffect, useRef, useState } from "react";

/**
 * Trigger a CSS class when element scrolls into view.
 * Usage: <div ref={ref} className={inView ? 'animate-fade-up' : 'opacity-0'} />
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null!);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}
