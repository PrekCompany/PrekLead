import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function createIcon(children: React.ReactNode): React.FC<IconProps> {
  const C: React.FC<IconProps> = ({ size = 20, ...props }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
  C.displayName = "Icon";
  return C;
}

export const Sparkles = createIcon(<><path d="M12 2l1.2 3.6a4 4 0 0 0 2.4 2.4L19 9l-3.4 1a4 4 0 0 0-2.4 2.4L12 16l-1.2-3.6a4 4 0 0 0-2.4-2.4L5 9l3.4-1a4 4 0 0 0 2.4-2.4L12 2z" /><path d="M12 18v4" /><path d="M16 20H8" /></>);
export const ArrowRight = createIcon(<><path d="M5 12h14" /><path d="m15 16 4-4-4-4" /></>);
export const Clock = createIcon(<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>);
export const AlertTriangle = createIcon(<><path d="M12 2 2 19a1 1 0 0 0 .9 1.4h18.2a1 1 0 0 0 .9-1.4L12 2z" /><path d="M12 9v4" /><path d="M12 16.5v.5" /></>);
export const TrendingDown = createIcon(<><path d="m22 17-5-5-4 4-4-4-5 5" /><path d="M22 11v6h-6" /></>);
export const MessageSquareOff = createIcon(<><path d="M3 3l18 18" /><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h10" /></>);
export const Zap = createIcon(<><path d="M13 2 3 14h8l-2 8 10-12h-8l2-8z" /></>);
export const Target = createIcon(<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>);
export const BarChart3 = createIcon(<><path d="M3 20V4" /><path d="M9 20v-8" /><path d="M15 20V8" /><path d="M21 20v-4" /></>);
export const Send = createIcon(<><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7z" /></>);
export const Brain = createIcon(<><path d="M12 4a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V14" /><path d="M12 4a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5V14" /><path d="M10 14h4" /><path d="M12 18v3" /><path d="M9 21h6" /></>);
export const Inbox = createIcon(<><path d="M22 12h-4l-2 3H8l-2-3H2" /><path d="M5.5 5h13A2.5 2.5 0 0 1 21 7.5V12l-3 5H6l-3-5V7.5A2.5 2.5 0 0 1 5.5 5z" /></>);
export const Users = createIcon(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>);
export const LineChart = createIcon(<><path d="M3 20V4" /><path d="M7 16 12 9l4 4 5-6" /></>);
export const Plug = createIcon(<><path d="M12 22v-5" /><path d="M9 10V2" /><path d="M15 10V2" /><path d="M4 10h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-4z" /></>);
export const Bot = createIcon(<><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="16" r="1" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M8 21v-3" /><path d="M16 21v-3" /></>);
export const MessageCircle = createIcon(<><path d="M21 12a9 9 0 1 0-8.5 9l3.5 2v-3.5" /></>);
export const Check = createIcon(<path d="M5 13l4 4L19 7" />);
export const ChevronDown = createIcon(<path d="m6 9 6 6 6-6" />);
export const Menu = createIcon(<><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>);
export const X = createIcon(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>);
export const Cookie = createIcon(<><circle cx="12" cy="12" r="10" /><path d="M12 5a3 3 0 0 1 3 3c0 .8-.3 1.5-.8 2" /><circle cx="8" cy="9" r="1" /><circle cx="15" cy="15" r="1" /></>);
export const Activity = createIcon(<><path d="M22 12h-4l-3 8-4-16-3 8H2" /></>);
export const MessageSquare = createIcon(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>);
export const TrendingUp = createIcon(<><path d="m22 7-5-5-4 4-4-4-5 5" /><path d="M22 13V7h-6" /></>);
export const Settings2 = createIcon(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>);
export const CheckCircle = createIcon(<><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></>);
export const Star = createIcon(<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>);
export const Shield = createIcon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>);
export const Globe = createIcon(<><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>);
export const Infinity = createIcon(<><path d="M12 12c-2-2.5-4-3-6-3-3 0-5 2-5 5s2 5 5 5c2 0 4-1 6-3" /><path d="M12 12c2 2.5 4 3 6 3 3 0 5-2 5-5s-2-5-5-5c-2 0-4 1-6 3" /></>);
export const Rocket = createIcon(<><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2" /><path d="M15 9c-2.5-2-6-3-9-3C4 6 3 8 3 10c0 2 1 4 2.5 5.5" /><path d="M15 9c2.5-2 6-3 9-3 0 3-1 7-3 9" /><path d="M12 21v-5" /><path d="M12 14v-3" /><circle cx="12" cy="5" r="2" /></>);
export const Database = createIcon(<><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>);
export const Cpu = createIcon(<><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M15 2v2" /><path d="M15 20v2" /><path d="M9 2v2" /><path d="M9 20v2" /><path d="M2 9h2" /><path d="M20 9h2" /><path d="M2 15h2" /><path d="M20 15h2" /></>);
export const ZapOff = createIcon(<><path d="M13 2 9 8.5" /><path d="M16.5 10.5 21 14h-4" /><path d="M3 3l18 18" /><path d="M11 14l-3 8 5-4" /></>);
export const RefreshCw = createIcon(<><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /></>);
export const Link2 = createIcon(<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>);

// Brand logo
export function BrandLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brand-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(0.62 0.24 258)" />
          <stop offset="1" stopColor="oklch(0.70 0.22 280)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#brand-grad)" />
      <path d="M7 17V7l10 5-10 5z" fill="#fff" />
    </svg>
  );
}

// Social icons
export function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#0088CC" />
      <path d="M6.5 12.5l3.5 1.5 1.5 4.5 6-9-11 3z" fill="#fff" />
    </svg>
  );
}

export function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig-g" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F58529" />
          <stop offset=".5" stopColor="#DD2A7B" />
          <stop offset="1" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" fill="url(#ig-g)" />
      <rect x="5" y="5" width="14" height="14" rx="3.5" stroke="#fff" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="3.5" stroke="#fff" strokeWidth="1.5" fill="none" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="#fff" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path d="M7 18l1-4a5 5 0 1 1 3 3l-4 1z" fill="#fff" />
    </svg>
  );
}
