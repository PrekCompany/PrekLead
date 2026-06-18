import { Link } from "@tanstack/react-router";
import { Logo } from "../Brand";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/30">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/"><Logo /></Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
            <Link to="/support" className="hover:text-foreground transition-colors">Support</Link>
          </nav>

          <div className="text-[10px] text-muted-foreground/60">
            © 2025 PREKLEAD.
          </div>
        </div>
      </div>
    </footer>
  );
}
