import {
  Award,
  BadgeCheck,
  Building2,
  ChevronDown,
  ChevronRight,
  Coffee,
  CreditCard,
  FileBadge,
  Gift,
  GraduationCap,
  Heart,
  Image,
  KeyRound,
  Layers,
  Medal,
  Menu,
  MessageCircle,
  PanelsTopLeft,
  Palette,
  PenTool,
  Printer,
  ScanLine,
  Search,
  Shirt,
  Shapes,
  Sticker,
  Trophy,
  X,
} from "lucide-react";

const icons = {
  Award,
  BadgeCheck,
  Building2,
  ChevronDown,
  ChevronRight,
  Coffee,
  CreditCard,
  FileBadge,
  Gift,
  GraduationCap,
  Heart,
  Image,
  KeyRound,
  Layers,
  Medal,
  Menu,
  MessageCircle,
  PanelsTopLeft,
  Palette,
  PenTool,
  Printer,
  ScanLine,
  Search,
  Shirt,
  Shapes,
  Sticker,
  Trophy,
  X,
};

export default function Icon({
  name,
  size = 18,
  strokeWidth = 1.8,
  ...props
}) {
  const IconComponent =
    icons[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      size={size}
      strokeWidth={
        strokeWidth
      }
      {...props}
    />
  );
}