import { BrandLogo } from "./PhosphorIcons";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <BrandLogo size={32} />
      <span className="font-display text-lg font-semibold tracking-tight">
        PREKLEAD
      </span>
    </div>
  );
}
