import { TelegramIcon, InstagramIcon, WhatsAppIcon } from "./PhosphorIcons";

export { TelegramIcon, InstagramIcon, WhatsAppIcon };

export const SOCIAL_LINKS = {
  telegram: { href: "https://t.me/preklead", label: "Telegram", Icon: TelegramIcon },
  instagram: { href: "https://instagram.com/preklead", label: "Instagram", Icon: InstagramIcon },
  whatsapp: { href: "https://wa.me/preklead", label: "WhatsApp", Icon: WhatsAppIcon },
} as const;
