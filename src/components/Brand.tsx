export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative size-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow grid place-items-center glow-primary">
        <div className="size-3 rounded-sm bg-background/90" />
        <div className="absolute inset-0 rounded-lg ring-1 ring-white/20" />
      </div>
      <span className="font-display text-lg font-semibold tracking-tight">
        PREKLEAD
      </span>
    </div>
  );
}
