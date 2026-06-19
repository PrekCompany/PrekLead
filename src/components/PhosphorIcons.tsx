import React from "react";
import {
  Sparkle as SparkleIcon,
  ArrowRight as ArrowRightIcon,
  Clock as ClockIcon,
  Warning as WarningIcon,
  TrendDown as TrendingDownIcon,
  ChatCircle as ChatCircleSlashIcon,
  Lightning as ZapIcon,
  Target as TargetIcon,
  ChartBar as BarChartIcon,
  PaperPlaneTilt as PaperPlaneTiltIcon,
  Brain as BrainIcon,
  Tray as InboxIcon,
  Users as UsersIcon,
  ChartLine as LineChartIcon,
  Plug as PlugIcon,
  Robot as RobotIcon,
  ChatCircle as ChatCircleIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Shield as ShieldIcon,
  Globe as GlobeIcon,
  Infinity as InfinityIcon,
  Rocket as RocketIcon,
  Database as DatabaseIcon,
  Cpu as CpuIcon,
  Lightning as LightningIcon,
  ArrowClockwise as RefreshCwIcon,
  LinkSimple as LinkSimpleIcon,
  List as MenuIcon,
  X as XIcon,
  Cookie as CookieIcon,
  Activity as ActivityIcon,
  ChatText as MessageSquareIcon,
  TrendUp as TrendingUpIcon,
  Gear as GearIcon,
  CaretDown as ChevronDownIcon,
  Check as CheckIcon,
  PaperPlaneRight as SendIcon,
  Heart as HeartIcon,
  Eye as EyeIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  Gear as SettingsIcon,
  Bell as BellIcon,
  SignOut as LogOutIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  File as FileIcon,
  Folder as FolderIcon,
  MagnifyingGlass as SearchIcon,
  GridFour as GridIcon,
  List as ListIcon,
  ArrowsOut as MaximizeIcon,
  ArrowsIn as MinimizeIcon,
  Copy as CopyIcon,
  Trash as TrashIcon,
  Pencil as EditIcon,
  Archive as ArchiveIcon,
  WarningCircle as AlertCircleIcon,
  Info as InfoIcon,
  CheckCircle as CheckFatIcon,
  Phone as TelephoneIcon,
  EnvelopeOpen as EnvelopeOpenIcon,
  PaperclipHorizontal as PaperclipHorizontalIcon,
  MapTrifold as MapIcon,
  MapPin as MapPinIcon,
  FolderOpen as FolderOpenIcon,
  TelegramLogo,
  InstagramLogo,
  WhatsappLogo,
} from "phosphor-react";

// Type for icon component
interface IconProps {
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  color?: string;
  className?: string;
}

// NAVIGATION ICONS (regular weight)
export const NavSparkles = (props: IconProps) => <SparkleIcon weight="regular" {...props} />;
export const NavArrowRight = (props: IconProps) => <ArrowRightIcon weight="regular" {...props} />;
export const NavClock = (props: IconProps) => <ClockIcon weight="regular" {...props} />;
export const NavAlertTriangle = (props: IconProps) => <WarningIcon weight="regular" {...props} />;
export const NavTrendingDown = (props: IconProps) => <TrendingDownIcon weight="regular" {...props} />;
export const NavMessageSquareOff = (props: IconProps) => <ChatCircleSlashIcon weight="regular" {...props} />;
export const NavZap = (props: IconProps) => <ZapIcon weight="regular" {...props} />;
export const NavTarget = (props: IconProps) => <TargetIcon weight="regular" {...props} />;
export const NavBarChart3 = (props: IconProps) => <BarChartIcon weight="regular" {...props} />;
export const NavSend = (props: IconProps) => <PaperPlaneTiltIcon weight="regular" {...props} />;
export const NavBrain = (props: IconProps) => <BrainIcon weight="regular" {...props} />;
export const NavInbox = (props: IconProps) => <InboxIcon weight="regular" {...props} />;
export const NavUsers = (props: IconProps) => <UsersIcon weight="regular" {...props} />;
export const NavLineChart = (props: IconProps) => <LineChartIcon weight="regular" {...props} />;
export const NavPlug = (props: IconProps) => <PlugIcon weight="regular" {...props} />;
export const NavBot = (props: IconProps) => <RobotIcon weight="regular" {...props} />;
export const NavMessageCircle = (props: IconProps) => <ChatCircleIcon weight="regular" {...props} />;
export const NavCheckCircle = (props: IconProps) => <CheckCircleIcon weight="regular" {...props} />;
export const NavStar = (props: IconProps) => <StarIcon weight="regular" {...props} />;
export const NavShield = (props: IconProps) => <ShieldIcon weight="regular" {...props} />;
export const NavGlobe = (props: IconProps) => <GlobeIcon weight="regular" {...props} />;
export const NavInfinity = (props: IconProps) => <InfinityIcon weight="regular" {...props} />;
export const NavRocket = (props: IconProps) => <RocketIcon weight="regular" {...props} />;
export const NavDatabase = (props: IconProps) => <DatabaseIcon weight="regular" {...props} />;
export const NavCpu = (props: IconProps) => <CpuIcon weight="regular" {...props} />;
export const NavZapOff = (props: IconProps) => <LightningIcon weight="regular" {...props} />;
export const NavRefreshCw = (props: IconProps) => <RefreshCwIcon weight="regular" {...props} />;
export const NavLink2 = (props: IconProps) => <LinkSimpleIcon weight="regular" {...props} />;
export const NavMenu = (props: IconProps) => <MenuIcon weight="regular" {...props} />;
export const NavX = (props: IconProps) => <XIcon weight="regular" {...props} />;
export const NavCookie = (props: IconProps) => <CookieIcon weight="regular" {...props} />;
export const NavActivity = (props: IconProps) => <ActivityIcon weight="regular" {...props} />;
export const NavMessageSquare = (props: IconProps) => <MessageSquareIcon weight="regular" {...props} />;
export const NavTrendingUp = (props: IconProps) => <TrendingUpIcon weight="regular" {...props} />;
export const NavSettings2 = (props: IconProps) => <GearIcon weight="regular" {...props} />;
export const NavChevronDown = (props: IconProps) => <ChevronDownIcon weight="regular" {...props} />;
export const NavCheck = (props: IconProps) => <CheckIcon weight="regular" {...props} />;

// KEY ELEMENTS (duotone weight)
export const KeySparkles = (props: IconProps) => <SparkleIcon weight="duotone" {...props} />;
export const KeyBrain = (props: IconProps) => <BrainIcon weight="duotone" {...props} />;
export const KeyBolt = (props: IconProps) => <ZapIcon weight="duotone" {...props} />;
export const KeyActivity = (props: IconProps) => <ActivityIcon weight="duotone" {...props} />;
export const KeyShield = (props: IconProps) => <ShieldIcon weight="duotone" {...props} />;
export const KeyCheckCircle = (props: IconProps) => <CheckCircleIcon weight="duotone" {...props} />;
export const KeyBot = (props: IconProps) => <RobotIcon weight="duotone" {...props} />;
export const KeyStar = (props: IconProps) => <StarIcon weight="duotone" {...props} />;
export const KeyMessageCircle = (props: IconProps) => <ChatCircleIcon weight="duotone" {...props} />;

// IMPORTANT ACTIONS (bold weight)
export const ActionSend = (props: IconProps) => <PaperPlaneTiltIcon weight="bold" {...props} />;
export const ActionCheck = (props: IconProps) => <CheckIcon weight="bold" {...props} />;
export const ActionCheckFat = (props: IconProps) => <CheckFatIcon weight="bold" {...props} />;
export const ActionRocket = (props: IconProps) => <RocketIcon weight="bold" {...props} />;
export const ActionZap = (props: IconProps) => <ZapIcon weight="bold" {...props} />;
export const ActionArrowRight = (props: IconProps) => <ArrowRightIcon weight="bold" {...props} />;
export const ActionPlus = (props: IconProps) => <PlusIcon weight="bold" {...props} />;
export const ActionMinus = (props: IconProps) => <MinusIcon weight="bold" {...props} />;
export const ActionTrash = (props: IconProps) => <TrashIcon weight="bold" {...props} />;
export const ActionDownload = (props: IconProps) => <DownloadIcon weight="bold" {...props} />;
export const ActionUpload = (props: IconProps) => <UploadIcon weight="bold" {...props} />;

// SOCIAL & COMMUNICATION ICONS (only Phosphor)
export function TelegramIcon(props: IconProps) {
  return <TelegramLogo weight="fill" {...props} />;
}

export function InstagramIcon(props: IconProps) {
  return <InstagramLogo weight="fill" {...props} />;
}

export function WhatsAppIcon(props: IconProps) {
  return <WhatsappLogo weight="fill" {...props} />;
}

// BRAND LOGO
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

// UTILITY EXPORTS (keep for backward compatibility but use Phosphor icons)
export const Sparkles = NavSparkles;
export const AlertTriangle = NavAlertTriangle;
export const MessageSquareOff = NavMessageSquareOff;
export const BarChart3 = NavBarChart3;
export const Bot = NavBot;
export const MessageCircle = NavMessageCircle;
export const Globe = NavGlobe;
export const Infinity = NavInfinity;
export const Rocket = NavRocket;
export const Database = NavDatabase;
export const Cpu = NavCpu;
export const ZapOff = NavZapOff;
export const RefreshCw = NavRefreshCw;
export const Link2 = NavLink2;

export const Menu = NavMenu;
export const X = NavX;
export const Cookie = NavCookie;
export const Activity = NavActivity;
export const MessageSquare = NavMessageSquare;
export const TrendingUp = NavTrendingUp;
export const Settings2 = NavSettings2;
export const ChevronDown = NavChevronDown;
export const Check = NavCheck;

// ADDITIONAL RE-EXPORTS — used by landing components, etc.
export const ArrowRight = NavArrowRight;
export const Clock = NavClock;
export const TrendingDown = NavTrendingDown;
export const Zap = NavZap;
export const Target = NavTarget;
export const Send = NavSend;
export const Brain = NavBrain;
export const Inbox = NavInbox;
export const Users = NavUsers;
export const Plug = NavPlug;
export const Shield = NavShield;
export const CheckCircle = NavCheckCircle;
export const Star = NavStar;
export const LineChart = NavLineChart;

// NOTE: We intentionally DO NOT re-export Nav* symbols with the same names as imports
// (ArrowRight, Clock, TrendingDown, etc.) to avoid TS merged-declaration conflicts.
