import { useState, useEffect } from "react";
import { ArrowDownUp, TrendingUp, Star, Calendar, BarChart3, History, Clock, ArrowRight, Menu, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SwiftRateLogo } from "./SwiftRateLogo";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Footer } from "./Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
//import backgroundImage from "figma:asset/92171f44a10d7bb0d1f7d9573f285f40b077cc69.png";

interface HomePageProps {
  onNavigate: (tab: string) => void;
  user?: { name: string; email: string };
  onLogout?: () => void;
}

const exchangeRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  BGN: 1.80,
  JPY: 149.50,
  CHF: 0.88,
  CAD: 1.36,
  AUD: 1.52,
};

const currencySymbols: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BGN: "лв",
  JPY: "¥",
  CHF: "Fr",
  CAD: "C$",
  AUD: "A$",
};

const currencyNames: { [key: string]: string } = {
  USD: "Американски долар",
  EUR: "Евро",
  GBP: "Британски паунд",
  BGN: "Български лев",
  JPY: "Японска йена",
  CHF: "Швейцарски франк",
  CAD: "Канадски долар",
  AUD: "Австралийски долар",
};

export function HomePage({ onNavigate, user, onLogout }: HomePageProps) {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState("1000");
  const [result, setResult] = useState("0");

  // Live rates simulation
  const [liveRates, setLiveRates] = useState(exchangeRates);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRates(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          if (key !== "USD") {
            const fluctuation = (Math.random() - 0.5) * 0.002;
            updated[key] = Number((prev[key] * (1 + fluctuation)).toFixed(4));
          }
        });
        return updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      const fromRate = liveRates[fromCurrency];
      const toRate = liveRates[toCurrency];
      const converted = (parseFloat(amount) / fromRate) * toRate;
      setResult(converted.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, liveRates]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const trendingPairs = [
    { from: "USD", to: "EUR", change: "+0.25%", trend: "up" },
    { from: "EUR", to: "BGN", change: "+0.12%", trend: "up" },
    { from: "GBP", to: "USD", change: "-0.18%", trend: "down" },
    { from: "USD", to: "JPY", change: "+0.45%", trend: "up" },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Конвертор на валути",
      description: "Конвертирайте бързо и лесно между различни валути с актуални курсове.",
      action: () => onNavigate("converter"),
    },
    {
      icon: Star,
      title: "Любими двойки",
      description: "Запазете често използваните валутни двойки за бърз достъп.",
      action: () => onNavigate("favorites"),
    },
    {
      icon: Calendar,
      title: "Календар на събития",
      description: "Следете важни валутни събития и промени в курсовете.",
      action: () => onNavigate("calendar"),
    },
    {
      icon: BarChart3,
      title: "Графики и анализи",
      description: "Визуализирайте промените в валутните курсове с интерактивни графики.",
      action: () => onNavigate("charts"),
    },
    {
      icon: Clock,
      title: "Таблица с курсве",
      description: "Преглед на актуалните валутни курсове в удобна таблична форма.",
      action: () => onNavigate("rates"),
    },
    {
      icon: History,
      title: "История на конвертации",
      description: "Проследете всички ваши минали конвертации и транзакции.",
      action: () => onNavigate("history"),
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="absolute inset-0 overflow-y-auto">
      {/* Hero Section with Converter */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Background Image with Fade */}
        <div className="absolute inset-0">
          <div className="absolute inset-0">
  {/* Фоновата снимка е махната, оставяме само градиента */}
  <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95"></div>
</div>

          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95"></div>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-48">
          <div className="text-center mb-16">
            {/* Logo - Enlarged and centered with text below */}
            <div className="mb-20 max-w-2xl mx-auto">
              <div className="inline-block transform -translate-x-[24px]">
                <SwiftRateLogo size="xl" variant="full" className="scale-[2.5]" />
              </div>
            </div>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Получавайте актуални курсове в реално време и управлявайте валутните си транзакции професионално
            </p>
          </div>

          {/* Converter Card - Enhanced */}
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-primary/30 shadow-[0_20px_80px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_100px_rgba(37,99,235,0.4)] transition-all duration-500">
            <CardHeader className="text-center pb-6 pt-8">
              <div className="inline-flex items-center justify-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs uppercase tracking-wider text-green-400">Live курсове</span>
              </div>
              <CardTitle className="text-3xl md:text-4xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Конвертор на валути
              </CardTitle>
              <CardDescription className="text-base text-gray-400 mt-2">
                Точни курсове, обновявани всяка секунда
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-6 md:px-10 pb-10">
              {/* From Currency */}
              <div className="space-y-3">
                <label className="text-sm uppercase tracking-wide text-gray-400 font-medium">Изпращате</label>
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <div className="relative">
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-3xl md:text-4xl h-16 md:h-20 bg-slate-800/50 border-slate-700 focus:border-primary pr-4 rounded-xl font-semibold text-white"
                      placeholder="0.00"
                    />
                  </div>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-[160px] h-16 md:h-20 bg-slate-800/50 border-slate-700 hover:border-primary transition-colors rounded-xl text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      {Object.keys(exchangeRates).map((currency) => (
                        <SelectItem key={currency} value={currency} className="text-base">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-lg">{currency}</span>
                            <span className="text-sm text-muted-foreground">{currencySymbols[currency]}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Swap Button - Enhanced */}
              <div className="flex justify-center -my-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-14 w-14 border-2 border-primary bg-primary/20 hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                  onClick={swapCurrencies}
                >
                  <ArrowDownUp className="h-6 w-6" />
                </Button>
              </div>

              {/* To Currency */}
              <div className="space-y-3">
                <label className="text-sm uppercase tracking-wide text-gray-400 font-medium">Получавате</label>
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <div className="bg-gradient-to-br from-primary/10 to-blue-500/5 border border-primary/30 rounded-xl h-16 md:h-20 flex items-center px-4 md:px-6">
                    <span className="text-3xl md:text-4xl font-semibold text-white">{result}</span>
                  </div>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-[160px] h-16 md:h-20 bg-slate-800/50 border-slate-700 hover:border-primary transition-colors rounded-xl text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      {Object.keys(exchangeRates).map((currency) => (
                        <SelectItem key={currency} value={currency} className="text-base">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-lg">{currency}</span>
                            <span className="text-sm text-muted-foreground">{currencySymbols[currency]}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Exchange Rate Info - Enhanced */}
              <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/20 rounded-xl p-5 text-center backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Текущ курс</p>
                <p className="text-2xl md:text-3xl font-semibold text-white">
                  1 {fromCurrency} = <span className="text-primary">{((liveRates[toCurrency] / liveRates[fromCurrency])).toFixed(4)}</span> {toCurrency}
                </p>
              </div>

              {/* CTA Button - Enhanced */}
              <Button
                onClick={() => onNavigate("converter")}
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Към пълния конвертор
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Реални курсове</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>Безопасни транзакции</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <span>Безплатно използване</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Pairs Section */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-2">Популярни валутни двойки</h2>
            <p className="text-muted-foreground">Най-търсените курсове днес</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {trendingPairs.map((pair, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all cursor-pointer border-border"
                onClick={() => {
                  setFromCurrency(pair.from);
                  setToCurrency(pair.to);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{pair.from}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-lg">{pair.to}</span>
                    </div>
                    <TrendingUp className={`h-5 w-5 ${pair.trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
                  </div>
                  <div className="text-2xl mb-1">
                    {((liveRates[pair.to] / liveRates[pair.from])).toFixed(4)}
                  </div>
                  <div className={`text-sm ${pair.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {pair.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Rates Table */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-2">Валутни курсове на живо</h2>
            <p className="text-muted-foreground">Обновяват се всяка секунда</p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="space-y-3">
                {Object.entries(liveRates)
                  .filter(([currency]) => currency !== "USD")
                  .map(([currency, rate]) => (
                    <div
                      key={currency}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => {
                        setFromCurrency("USD");
                        setToCurrency(currency);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xl">{currencySymbols[currency]}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{currency}</div>
                          <div className="text-sm text-muted-foreground">{currencyNames[currency]}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-semibold">{rate.toFixed(4)}</div>
                        <div className="text-sm text-muted-foreground">USD</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">
              Всичко за управление на валути
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              SwiftRate предлага пълен набор от инструменти за управление на валутни операции.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-border"
                  onClick={feature.action}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                    <Button
                      variant="link"
                      className="mt-4 p-0 h-auto text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        feature.action();
                      }}
                    >
                      Отвори →
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}