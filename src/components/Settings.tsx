import { useState, useEffect } from "react";
import { User, Bell, Globe, Moon, Sun, Shield, CreditCard, Mail, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import type { User as UserType } from "../App";

interface SettingsProps {
  user: UserType;
  onUpdateUser: (user: UserType) => void;
}

export function Settings({ user, onUpdateUser }: SettingsProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [language, setLanguage] = useState("bg");
  const [currency, setCurrency] = useState("BGN");
  
  const handleSaveProfile = () => {
    const updatedUser = { ...user, name, email };
    onUpdateUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    toast.success("Профилът е актуализиран успешно!");
  };

  const handleSavePreferences = () => {
    const preferences = {
      darkMode,
      emailNotifications,
      priceAlerts,
      language,
      currency,
    };
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    toast.success("Настройките са запазени успешно!");
  };

  useEffect(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setDarkMode(prefs.darkMode ?? true);
      setEmailNotifications(prefs.emailNotifications ?? true);
      setPriceAlerts(prefs.priceAlerts ?? false);
      setLanguage(prefs.language ?? "bg");
      setCurrency(prefs.currency ?? "BGN");
    }
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Настройки</h1>
        <p className="text-muted-foreground">
          Управлявайте профила си и предпочитанията на приложението
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Профилна информация</CardTitle>
            </div>
            <CardDescription>
              Актуализирайте личните си данни
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Име</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Вашето име"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Имейл адрес</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <Button onClick={handleSaveProfile} className="w-full sm:w-auto">
              Запази промените
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" />
              <CardTitle>Изглед</CardTitle>
            </div>
            <CardDescription>
              Персонализирайте изгледа на приложението
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Тъмен режим</Label>
                <p className="text-sm text-muted-foreground">
                  Активирайте тъмна тема за по-добра видимост
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="language">Език</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bg">🇧🇬 Български</SelectItem>
                  <SelectItem value="en">🇬🇧 English</SelectItem>
                  <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-currency">Валута по подразбиране</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="default-currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BGN">BGN - Български лев</SelectItem>
                  <SelectItem value="EUR">EUR - Евро</SelectItem>
                  <SelectItem value="USD">USD - Американски долар</SelectItem>
                  <SelectItem value="GBP">GBP - Британски паунд</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSavePreferences} className="w-full sm:w-auto">
              Запази настройките
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Известия</CardTitle>
            </div>
            <CardDescription>
              Управлявайте как получавате известия
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Имейл известия</Label>
                <p className="text-sm text-muted-foreground">
                  Получавайте актуализации по имейл
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Ценови алерти</Label>
                <p className="text-sm text-muted-foreground">
                  Известия при промяна в курсовете
                </p>
              </div>
              <Switch
                checked={priceAlerts}
                onCheckedChange={setPriceAlerts}
              />
            </div>
            <Button onClick={handleSavePreferences} className="w-full sm:w-auto">
              Запази настройките
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Сигурност</CardTitle>
            </div>
            <CardDescription>
              Управлявайте сигурността на акаунта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Промяна на паролата</Label>
                <p className="text-sm text-muted-foreground">
                  Актуализирайте паролата си
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Lock className="mr-2 h-4 w-4" />
                Промени
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Двуфакторна автентикация</Label>
                <p className="text-sm text-muted-foreground">
                  Добавете допълнителен слой защита
                </p>
              </div>
              <Button variant="outline" size="sm">
                Активирай
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Опасна зона</CardTitle>
            <CardDescription>
              Необратими действия
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Изтрий акаунта</Label>
                <p className="text-sm text-muted-foreground">
                  Перманентно изтриване на акаунта и всички данни
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Изтрий акаунт
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}