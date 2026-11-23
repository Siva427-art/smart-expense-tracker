import React from 'react';
import {
  Utensils,
  Home,
  Car,
  ShoppingBag,
  Film,
  Zap,
  HeartPulse,
  GraduationCap,
  Plane,
  TrendingUp,
  HelpCircle,
  Briefcase,
  Laptop,
  LineChart,
  Building2,
  Gift,
  Coins,
  CreditCard,
  Wallet,
  PiggyBank,
  CircleDollarSign
} from 'lucide-react';

const ICON_MAP = {
  Utensils,
  Home,
  Car,
  ShoppingBag,
  Film,
  Zap,
  HeartPulse,
  GraduationCap,
  Plane,
  TrendingUp,
  HelpCircle,
  Briefcase,
  Laptop,
  LineChart,
  Building2,
  Gift,
  Coins,
  CreditCard,
  Wallet,
  PiggyBank,
  CircleDollarSign
};

export default function CategoryIcon({ iconName, className = "w-5 h-5" }) {
  const IconComponent = ICON_MAP[iconName] || CircleDollarSign;
  return <IconComponent className={className} />;
}

