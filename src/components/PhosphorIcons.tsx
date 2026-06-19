import React from "react";
import {
  Sparkles as SparklesIcon,
  ArrowRight as ArrowRightIcon,
  Clock as ClockIcon,
  TriangleAlert as WarningIcon,
  TrendingDown as TrendingDownIcon,
  MessageCircle as ChatCircleIcon,
  MessageCircleOff as MessageCircleOffIcon,
  Zap as ZapIcon,
  Target as TargetIcon,
  BarChart3 as BarChart3Icon,
  Send as SendIcon,
  Brain as BrainIcon,
  Inbox as InboxIcon,
  Users as UsersIcon,
  LineChart as LineChartIcon,
  Plug as PlugIcon,
  Bot as BotIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  Shield as ShieldIcon,
  Globe as GlobeIcon,
  Infinity as InfinityIcon,
  Rocket as RocketIcon,
  Database as DatabaseIcon,
  Cpu as CpuIcon,
  RotateCcw as RefreshCwIcon,
  Link as LinkSimpleIcon,
  Menu as MenuIcon,
  X as XIcon,
  Cookie as CookieIcon,
  Activity as ActivityIcon,
  MessageSquare as MessageSquareIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
  ChevronDown as ChevronDownIcon,
  Check as CheckIcon,
  Heart as HeartIcon,
  Eye as EyeIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  Bell as BellIcon,
  LogOut as LogOutIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  File as FileIcon,
  Folder as FolderIcon,
  Search as SearchIcon,
  Grid3X3 as GridIcon,
  Maximize2 as MaximizeIcon,
  Minimize2 as MinimizeIcon,
  Copy as CopyIcon,
  Trash2 as TrashIcon,
  Pencil as EditIcon,
  Archive as ArchiveIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Map as MapIcon,
  MapPin as MapPinIcon,
  FolderOpen as FolderOpenIcon,
  Paperclip as PaperclipIcon,
  ArrowUp as ArrowUpIcon,
  FileText as FileTextIcon,
  DollarSign as DollarSignIcon,
  CreditCard as CreditCardIcon,
  EyeOff as EyeOffIcon,
  Lock as LockIcon,
  CircleHelp as CircleHelpIcon,
  User as UserIcon,
  UserRoundCog as UserRoundCogIcon,
  Sparkles as SparkleIcon,
  TrendingUp as TrendUpIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronUp as ChevronUpIcon,
  Ellipsis as EllipsisIcon,
  PanelLeft as PanelLeftIcon,
  Circle as CircleIcon,
  ArrowUp,
  FileText,
  DollarSign,
  CreditCard,
  MessageCircle,
  CircleCheck,
  ArrowRight,
  Sparkles,
  Zap,
  Activity,
  Bot,
  Brain,
  Globe,
  Check,
  CheckCircle,
  User,
  Bell,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Settings,
  Users,
  Inbox,
  Star,
  Mail,
  Clock,
  Target,
  Plug,
  Infinity,
  Rocket,
  Database,
  Heart,
  Shield,
  Search,
  Menu,
  X,
  Plus,
  Minus,
  Download,
  Upload,
  Copy,
  Trash2,
  Pencil,
  Archive,
  Info,
  UserPlus,
  SlidersHorizontal,
  Ban,
  Image,
  LoaderCircle,
  File as FileIconLucide,
} from "lucide-react";

// Type for icon component
interface IconProps {
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  color?: string;
  className?: string;
}

// NAVIGATION ICONS (regular weight)
export const NavSparkles = (props: IconProps) => <SparklesIcon size={props.size ?? 16} className={props.className} />;
export const NavArrowRight = (props: IconProps) => <ArrowRightIcon size={props.size ?? 16} className={props.className} />;
export const NavClock = (props: IconProps) => <ClockIcon size={props.size ?? 16} className={props.className} />;
export const NavAlertTriangle = (props: IconProps) => <WarningIcon size={props.size ?? 16} className={props.className} />;
export const NavTrendingDown = (props: IconProps) => <TrendingDownIcon size={props.size ?? 16} className={props.className} />;
export const NavMessageSquareOff = (props: IconProps) => <MessageCircleOffIcon size={props.size ?? 16} className={props.className} />;
export const NavZap = (props: IconProps) => <ZapIcon size={props.size ?? 16} className={props.className} />;
export const NavTarget = (props: IconProps) => <TargetIcon size={props.size ?? 16} className={props.className} />;
export const NavBarChart3 = (props: IconProps) => <BarChart3Icon size={props.size ?? 16} className={props.className} />;
export const NavSend = (props: IconProps) => <SendIcon size={props.size ?? 16} className={props.className} />;
export const NavBrain = (props: IconProps) => <BrainIcon size={props.size ?? 16} className={props.className} />;
export const NavInbox = (props: IconProps) => <InboxIcon size={props.size ?? 16} className={props.className} />;
export const NavUsers = (props: IconProps) => <UsersIcon size={props.size ?? 16} className={props.className} />;
export const NavLineChart = (props: IconProps) => <LineChartIcon size={props.size ?? 16} className={props.className} />;
export const NavPlug = (props: IconProps) => <PlugIcon size={props.size ?? 16} className={props.className} />;
export const NavBot = (props: IconProps) => <BotIcon size={props.size ?? 16} className={props.className} />;
export const NavMessageCircle = (props: IconProps) => <ChatCircleIcon size={props.size ?? 16} className={props.className} />;
export const NavCheckCircle = (props: IconProps) => <CheckCircleIcon size={props.size ?? 16} className={props.className} />;
export const NavStar = (props: IconProps) => <StarIcon size={props.size ?? 16} className={props.className} />;
export const NavShield = (props: IconProps) => <ShieldIcon size={props.size ?? 16} className={props.className} />;
export const NavGlobe = (props: IconProps) => <GlobeIcon size={props.size ?? 16} className={props.className} />;
export const NavInfinity = (props: IconProps) => <InfinityIcon size={props.size ?? 16} className={props.className} />;
export const NavRocket = (props: IconProps) => <RocketIcon size={props.size ?? 16} className={props.className} />;
export const NavDatabase = (props: IconProps) => <DatabaseIcon size={props.size ?? 16} className={props.className} />;
export const NavCpu = (props: IconProps) => <CpuIcon size={props.size ?? 16} className={props.className} />;
export const NavZapOff = (props: IconProps) => <ZapIcon size={props.size ?? 16} className={props.className} />;
export const NavRefreshCw = (props: IconProps) => <RefreshCwIcon size={props.size ?? 16} className={props.className} />;
export const NavLink2 = (props: IconProps) => <LinkSimpleIcon size={props.size ?? 16} className={props.className} />;
export const NavMenu = (props: IconProps) => <MenuIcon size={props.size ?? 16} className={props.className} />;
export const NavX = (props: IconProps) => <XIcon size={props.size ?? 16} className={props.className} />;
export const NavCookie = (props: IconProps) => <CookieIcon size={props.size ?? 16} className={props.className} />;
export const NavActivity = (props: IconProps) => <ActivityIcon size={props.size ?? 16} className={props.className} />;
export const NavMessageSquare = (props: IconProps) => <MessageSquareIcon size={props.size ?? 16} className={props.className} />;
export const NavTrendingUp = (props: IconProps) => <TrendingUpIcon size={props.size ?? 16} className={props.className} />;
export const NavSettings2 = (props: IconProps) => <SettingsIcon size={props.size ?? 16} className={props.className} />;
export const NavChevronDown = (props: IconProps) => <ChevronDownIcon size={props.size ?? 16} className={props.className} />;
export const NavCheck = (props: IconProps) => <CheckIcon size={props.size ?? 16} className={props.className} />;

// KEY ELEMENTS (just rendered with default lucide style)
export const KeySparkles = (props: IconProps) => <SparklesIcon size={props.size ?? 16} className={props.className} />;
export const KeyBrain = (props: IconProps) => <BrainIcon size={props.size ?? 16} className={props.className} />;
export const KeyBolt = (props: IconProps) => <ZapIcon size={props.size ?? 16} className={props.className} />;
export const KeyActivity = (props: IconProps) => <ActivityIcon size={props.size ?? 16} className={props.className} />;
export const KeyShield = (props: IconProps) => <ShieldIcon size={props.size ?? 16} className={props.className} />;
export const KeyCheckCircle = (props: IconProps) => <CheckCircleIcon size={props.size ?? 16} className={props.className} />;
export const KeyBot = (props: IconProps) => <BotIcon size={props.size ?? 16} className={props.className} />;
export const KeyStar = (props: IconProps) => <StarIcon size={props.size ?? 16} className={props.className} />;
export const KeyMessageCircle = (props: IconProps) => <ChatCircleIcon size={props.size ?? 16} className={props.className} />;

// IMPORTANT ACTIONS (bold weight — lucide renders all at same stroke by default)
export const ActionSend = (props: IconProps) => <SendIcon size={props.size ?? 16} className={props.className} />;
export const ActionCheck = (props: IconProps) => <CheckIcon size={props.size ?? 16} className={props.className} />;
export const ActionCheckFat = (props: IconProps) => <CheckCircleIcon size={props.size ?? 16} className={props.className} />;
export const ActionRocket = (props: IconProps) => <RocketIcon size={props.size ?? 16} className={props.className} />;
export const ActionZap = (props: IconProps) => <ZapIcon size={props.size ?? 16} className={props.className} />;
export const ActionArrowRight = (props: IconProps) => <ArrowRightIcon size={props.size ?? 16} className={props.className} />;
export const ActionPlus = (props: IconProps) => <PlusIcon size={props.size ?? 16} className={props.className} />;
export const ActionMinus = (props: IconProps) => <MinusIcon size={props.size ?? 16} className={props.className} />;
export const ActionTrash = (props: IconProps) => <TrashIcon size={props.size ?? 16} className={props.className} />;
export const ActionDownload = (props: IconProps) => <DownloadIcon size={props.size ?? 16} className={props.className} />;
export const ActionUpload = (props: IconProps) => <UploadIcon size={props.size ?? 16} className={props.className} />;

// SOCIAL & COMMUNICATION ICONS (inline SVG for brand icons)
export function TelegramIcon(props: IconProps) {
  const s = props.size ?? 20;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.127.087.62.087.62l-1.397 6.572c-.1.482-.556.668-.928.54l-3.835-1.604-1.558 1.542c-.293.28-.533.262-.653.082l.362-2.389.088-.08 3.34-3.072c.164-.15.05-.27-.12-.174l-4.233 2.64-1.576-.568c-.477-.175-.488-.477.085-.736l7.62-3.078c.392-.163.763-.038.782.15z" fill="currentColor"/>
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  const s = props.size ?? 20;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" fill="currentColor"/>
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  const s = props.size ?? 20;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" fill="currentColor"/>
    </svg>
  );
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

// UTILITY EXPORTS
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
export const UserSwitch = UserRoundCogIcon;
export const EnvelopeOpen = MailIcon;
export const Gear = SettingsIcon;
export const SignOut = LogOutIcon;
export const MagnifyingGlass = SearchIcon;
export const Trash = TrashIcon;
export const Pencil = EditIcon;
export const WarningCircle = AlertCircleIcon;
export const MapTrifold = MapIcon;
export const Telephone = PhoneIcon;
export const GridFour = GridIcon;
export const ArrowsOut = MaximizeIcon;
export const ArrowsIn = MinimizeIcon;
export const PaperclipHorizontal = PaperclipIcon;
export const CaretDown = ChevronDownIcon;
export const Lightning = ZapIcon;
export const Sparkle = SparklesIcon;
export const List = MenuIcon;
export const TrendUp = TrendUpIcon;
export const ArrowUp = ArrowUpIcon;
export const FileText = FileTextIcon;
export const CurrencyDollar = DollarSignIcon;
export const EyeSlash = EyeOffIcon;
export const Question = CircleHelpIcon;
export const ChatText = MessageSquareIcon;
export const Heart = HeartIcon;
export const Eye = EyeIcon;
export const Plus = PlusIcon;
export const Minus = MinusIcon;
export const Bell = BellIcon;
export const Download = DownloadIcon;
export const Upload = UploadIcon;
export const File = FileIcon;
export const Folder = FolderIcon;
export const Copy = CopyIcon;
export const Archive = ArchiveIcon;
export const Info = InfoIcon;
export const FolderOpen = FolderOpenIcon;
export const Envelope = MailIcon;
export const ChatCircle = MessageCircle;
export const PaperPlaneRight = SendIcon;
export const PaperPlaneTilt = SendIcon;
export const ChartBar = BarChart3Icon;
export const ChartLine = LineChartIcon;
export const ArrowClockwise = RotateCcwIcon;
export const LinkSimple = LinkSimpleIcon;
export const MapPin = MapPinIcon;

// Aliases used by app components
export const Tray = InboxIcon;
export const Planet = GlobeIcon;
export const Spinner = LoaderCircle;
export const ImageSquare = Image;
export const Prohibit = Ban;
export const TelegramLogo = TelegramIcon;
export const InstagramLogo = InstagramIcon;
export const WhatsappLogo = WhatsAppIcon;
export const Robot = BotIcon;
export const Settings = SettingsIcon;
export const UserPlus = UserPlus;
export const SlidersHorizontal = SlidersHorizontal;
export const User = UserIcon;
export const Lock = LockIcon;
export const CreditCard = CreditCardIcon;
export const CaretLeft = ChevronLeftIcon;
export const CaretRight = ChevronRightIcon;
export const CaretUp = ChevronUpIcon;
export const DotsThree = EllipsisIcon;
export const SidebarSimple = PanelLeftIcon;
export const Circle = CircleIcon;
export const CircleDot = CircleIcon;
