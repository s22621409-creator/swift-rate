import { useState } from "react";
import {
  TrendingUp,
  BarChart3,
  History,
  Star,
  Calendar,
  Settings,
  HelpCircle,
  Home,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: "home", label: "Начало", icon: Home },
    { id: "converter", label: "Конвертор", icon: TrendingUp },
    { id: "transfer", label: "Изпращане на пари", icon: Send },
    { id: "favorites", label: "Любими", icon: Star },
    { id: "calendar", label: "Календар", icon: Calendar },
    { id: "charts", label: "Графики", icon: BarChart3 },
    { id: "rates", label: "Курсове", icon: TrendingUp },
    { id: "history", label: "История", icon: History },
  ];

  const bottomItems = [
    { id: "settings", label: "Настройки", icon: Settings },
    { id: "help", label: "Помощ", icon: HelpCircle },
  ];

  const renderItem = (item: (typeof menuItems)[number]) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;

    return (
      <Button
        key={item.id}
        type="button"
        variant={isActive ? "default" : "ghost"}
        onClick={() => onTabChange(item.id)}
   className={
  "mb-1 flex w-full items-center justify-start gap-3 px-3 py-2 rounded-2xl transition-colors " +
  (isActive
    ? "bg-blue-600 text-white hover:bg-blue-500"
    : "text-slate-300 hover:bg-slate-800 hover:text-white")
}


      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {isExpanded && (
  <span className="whitespace-nowrap text-sm font-medium text-left">
    {item.label}
  </span>
)}

      </Button>
    );
  };

  return (
    <aside
      className={`
        fixed left-0 top-16 z-40
        h-[calc(100vh-4rem)]
        border-r border-white/10
        bg-slate-950
        py-4
        flex flex-col justify-between
        transition-[width] duration-300
        ${isExpanded ? "w-64" : "w-16"}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* горна част */}
      <nav className="flex flex-col px-2">
        {menuItems.map(renderItem)}
      </nav>

      {/* долна част */}
      <nav className="mt-4 border-t border-white/10 px-2 pt-3">
        {bottomItems.map(renderItem)}
      </nav>
    </aside>
  );
}
