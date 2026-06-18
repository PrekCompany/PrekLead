import { Link } from "@tanstack/react-router";
import { Logo } from "../Brand";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Главная" },
    { to: "/pricing", label: "Тарифы" },
    { to: "/about", label: "О нас" },
    { to: "/support", label: "Поддержка" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <Link to="/">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/auth"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Войти
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary-glow transition-all hover:glow-primary"
            >
              Начать бесплатно
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-4 animate-fade-up">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-muted-foreground"
              >
                Войти
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground text-center"
              >
                Начать бесплатно
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
