import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface BackLinkProps {
  to?: string;
  children?: ReactNode;
}

export function BackLink({ to = "/", children }: BackLinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground transition-colors duration-200 group"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      >
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
      {children || "На главную"}
    </Link>
  );
}
