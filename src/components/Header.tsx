import { TrendingUp, LogOut, User, Mail, Calendar, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { User as UserType } from "../App";
import { SwiftRateLogo } from "./SwiftRateLogo";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
  onNavigateToSettings?: () => void;
}

export function Header({ user, onLogout, onNavigateToSettings }: HeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [leaveTimeout, setLeaveTimeout] = useState<NodeJS.Timeout | null>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getJoinedDate = () => {
    // Симулираме дата на регистрация
    const joinDate = new Date();
    joinDate.setMonth(joinDate.getMonth() - 3); // 3 месеца назад
    return new Intl.DateTimeFormat("bg-BG", {
      year: "numeric",
      month: "long",
    }).format(joinDate);
  };

  const handleMouseEnter = () => {
    // Отменяме всички pending timeouts
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
    }
    
    const timeout = setTimeout(() => {
      setIsHovered(true);
    }, 300);
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    // Добавяме по-дълъг delay преди да затворим картата
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, 500);
    setLeaveTimeout(timeout);
  };

  const handleCardMouseEnter = () => {
    // Отменяме затварянето ако мишката е над картата
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
    }
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    // Затваряме след delay
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, 300);
    setLeaveTimeout(timeout);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950 border-b border-white/10 shadow-sm">

      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2 absolute left-4 z-50">
            <SwiftRateLogo size="lg" variant="full" />
          </div>

          <div className="flex items-center gap-4 absolute right-4 z-50">
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:bg-sidebar-accent"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p>{user.name}</p>
                      <p className="text-muted-foreground text-xs">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onNavigateToSettings}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Профил</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Изход</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Custom Hover Card */}
              {isHovered && (
                <div
                  className="absolute top-12 right-0 w-80 bg-popover text-popover-foreground rounded-lg border shadow-lg p-4 z-[100] animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="space-y-4">
                    {/* Header с аватар */}
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-semibold">{user.name}</h4>
                        <p className="text-sm text-muted-foreground">Активен потребител</p>
                      </div>
                    </div>

                    {/* Информация за акаунта */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Член от {getJoinedDate()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">ID: {user.id.slice(0, 8)}</span>
                      </div>
                    </div>

                    {/* Статистика */}
                    <div className="pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2">Бърза статистика</p>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded-lg bg-muted/50">
                          <p className="text-lg font-semibold">24</p>
                          <p className="text-xs text-muted-foreground">Конвертации</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50">
                          <p className="text-lg font-semibold">5</p>
                          <p className="text-xs text-muted-foreground">Любими</p>
                        </div>
                        <div className="p-2 rounded-lg bg-muted/50">
                          <p className="text-lg font-semibold">12</p>
                          <p className="text-xs text-muted-foreground">Събития</p>
                        </div>
                      </div>
                    </div>

                    {/* Бързи действия */}
                    <div className="pt-2 space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          setIsHovered(false);
                          onNavigateToSettings?.();
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Виж профила
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}