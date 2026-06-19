import { Logo } from "../Brand";
import { SOCIAL_LINKS } from "../SocialIcons";
import { ArrowRight, CheckCircle, RevenueSparkIcon, Shield, SignalFlowIcon } from "../PhosphorIcons";

interface FooterLink {
  label: string;
  to?: string;
  hash?: string;
  href?: string;
}

const COMPANY_LINKS: FooterLink[] = [
  { to: "/about", label: "О нас" },
  { to: "/support", label: "Контакты" },
];

const PRODUCT_LINKS: FooterLink[] = [
  { to: "/", hash: "features", label: "Возможности" },
  { to: "/pricing", label: "Тарифы" },
  { to: "/", hash: "integrations", label: "Интеграции" },
];

const SUPPORT_LINKS: FooterLink[] = [
  { to: "/", hash: "faq", label: "FAQ" },
  { to: "/support", label: "Центр поддержки" },
  { to: "/support", label: "Связаться с нами" },
  { href: "https://t.me/preklead_support", label: "Telegram Support" },
];

const LEGAL_LINKS: FooterLink[] = [
  { to: "/privacy", label: "Политика конфиденциальности" },
  { to: "/terms", label: "Условия использования" },
  { to: "/cookies", label: "Cookie Policy" },
];

function hrefFor(link: FooterLink) {
  if (link.href) return link.href;
  return `${link.to ?? "/"}${link.hash ? `#${link.hash}` : ""}`;
}

function FooterAnchor({ link }: { link: FooterLink }) {
  return (
    <a
      href={hrefFor(link)}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex w-fit items-center gap-2 text-sm text-muted-foreground/72 transition-colors duration-200 hover:text-foreground"
    >
      <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
      {link.label}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/30">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute inset-0 diagonal-grid opacity-[0.06]" />
      <div className="absolute left-1/2 top-0 size-[520px] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="premium-card mb-10 overflow-hidden rounded-[2rem] p-5 md:p-7">
          <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr] md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 text-xs text-success">
                <CheckCircle size={14} /> Production-ready AI sales stack
              </div>
              <h3 className="font-display text-2xl md:text-4xl font-bold aurora-text">
                Хотите, чтобы AI отвечал клиентам уже сегодня?
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground/75">
                Запустите PREKLEAD, подключите первый канал и проверьте, как система ведёт клиента от сообщения до сделки.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-stretch">
              <a href="/register" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-glow hover:glow-primary">
                Начать бесплатно <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="https://t.me/preklead_support" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/40 bg-white/[0.04] px-5 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/35 hover:bg-primary/10">
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Logo />
            </a>
            <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-xs">
              AI Business OS для роста продаж. Объединяем Telegram, Instagram и WhatsApp
              в единую систему с AI-автоответами, CRM и аналитикой.
            </p>
            <div className="grid max-w-xs grid-cols-2 gap-2">
              <div className="rounded-2xl border border-primary/15 bg-primary/10 p-3">
                <SignalFlowIcon size={20} className="text-primary" />
                <div className="mt-2 text-xs font-semibold">Omnichannel</div>
              </div>
              <div className="rounded-2xl border border-success/15 bg-success/10 p-3">
                <RevenueSparkIcon size={20} className="text-success" />
                <div className="mt-2 text-xs font-semibold">Revenue AI</div>
              </div>
            </div>
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
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
                Компания
              </h4>
              <nav className="flex flex-col gap-2.5">
                {COMPANY_LINKS.map((l) => <FooterAnchor key={l.label} link={l} />)}
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
                Продукт
              </h4>
              <nav className="flex flex-col gap-2.5">
                {PRODUCT_LINKS.map((l) => <FooterAnchor key={l.label} link={l} />)}
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
                Поддержка
              </h4>
              <nav className="flex flex-col gap-2.5">
                {SUPPORT_LINKS.map((l) => <FooterAnchor key={l.label} link={l} />)}
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-4">
                Правовое
              </h4>
              <nav className="flex flex-col gap-2.5">
                {LEGAL_LINKS.map((l) => <FooterAnchor key={l.label} link={l} />)}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground/40">
            © 2026 PREKLEAD.
            <div>All links open in a new tab.</div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 text-xs text-success/80">
            <Shield size={13} /> Secure by design
          </div>
        </div>
      </div>
    </footer>
  );
}
