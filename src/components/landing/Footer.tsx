import { Link } from "@tanstack/react-router";
import { Logo } from "../Brand";
import { SOCIAL_LINKS } from "../SocialIcons";

const COMPANY_LINKS = [
  { to: "/", label: "Компания" },
  { to: "/about", label: "О нас" },
  { to: "/blog", label: "Блог" },
  { to: "/contact", label: "Контакты" },
];

const PRODUCT_LINKS = [
  { to: "/product", label: "Продукт" },
  { to: "/features", label: "Возможности" },
  { to: "/pricing", label: "Тарифы" },
  { to: "/integrations", label: "Интеграции" },
];

const SUPPORT_LINKS = [
  { to: "/faq", label: "FAQ" },
  { to: "/support", label: "Поддержка" },
  { to: "/support/center", label: "Центр поддержки" },
  { to: "/support/contact", label: "Связаться с нами" },
  { href: "https://t.me/preklead_support", label: "Telegram Support" },
];

const LEGAL_LINKS = [
  { to: "/legal", label: "Правовая информация" },
  { to: "/privacy", label: "Политика конфиденциальности" },
  { to: "/terms", label: "Условия использования" },
  { to: "/cookies", label: "Cookie Policy" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/30">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link to="/">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xs">
              AI Business OS для роста продаж. Объединяем Telegram, Instagram и WhatsApp
              в единую систему с AI-автоответами, CRM и аналитикой.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {Object.values(SOCIAL_LINKS).map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-9 rounded-xl bg-white/[0.04] border border-border/30 flex items-center justify-center
                    text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10
                    transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
                Компания
              </h4>
              <nav className="flex flex-col gap-2.5">
                {COMPANY_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-200 w-fit"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
                Продукт
              </h4>
              <nav className="flex flex-col gap-2.5">
                {PRODUCT_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-200 w-fit"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
                Поддержка
              </h4>
              <nav className="flex flex-col gap-2.5">
                {SUPPORT_LINKS.map((l) => (
                  l.href ? (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-200 w-fit"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      key={l.label}
                      to={l.to}
                      className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-200 w-fit"
                    >
                      {l.label}
                    </Link>
                  )
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
                Правовое
              </h4>
              <nav className="flex flex-col gap-2.5">
                {LEGAL_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="text-sm text-muted-foreground/70 hover:text-foreground transition-colors duration-200 w-fit"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground/40">
            © 2026 PREKLEAD.
            <div>All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
