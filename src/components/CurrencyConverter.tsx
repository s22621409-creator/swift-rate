import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeftRight, Star } from "lucide-react";
import { CurrencyChart } from "./CurrencyChart";
import { ExchangeRatesTable } from "./ExchangeRatesTable";
import { ConversionHistory } from "./ConversionHistory";
import { FavoritePairs } from "./FavoritePairs";
import { CurrencyCalendar } from "./CurrencyCalendar";
import { HomePage } from "./HomePage";
import { Settings } from "./Settings";
import { Help } from "./Help";
import { MoneyTransfer } from "./MoneyTransfer";
import type { User } from "../App";

// Примерни курсове спрямо EUR
export const exchangeRates: Record<string, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.86,
  BGN: 1.96,
  CHF: 0.93,
  JPY: 161.92,
  CNY: 7.85,
  AUD: 1.68,
  CAD: 1.51,
  SEK: 11.28,
  NOK: 11.85,
  DKK: 7.46,
  PLN: 4.33,
  CZK: 25.12,
  HUF: 393.45,
  RON: 4.97,
  TRY: 35.67,
  RUB: 105.23,
};

export const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  BGN: "лв",
  CHF: "Fr",
  JPY: "¥",
  CNY: "¥",
  AUD: "A$",
  CAD: "C$",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  PLN: "zł",
  CZK: "Kč",
  HUF: "Ft",
  RON: "lei",
  TRY: "₺",
  RUB: "₽",
};

export const currencyNames: Record<string, string> = {
  EUR: "Евро",
  USD: "Американски долар",
  GBP: "Британски паунд",
  BGN: "Български лев",
  CHF: "Швейцарски франк",
  JPY: "Японска йена",
  CNY: "Китайски юан",
  AUD: "Австралийски долар",
  CAD: "Канадски долар",
  SEK: "Шведска крона",
  NOK: "Норвежка крона",
  DKK: "Датска крона",
  PLN: "Полска злота",
  CZK: "Чешка крона",
  HUF: "Унгарски форинт",
  RON: "Румънска лея",
  TRY: "Турска лира",
  RUB: "Руска рубла",
};

export interface ConversionRecord {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  timestamp: Date;
  userId: string;
}

export interface FavoritePair {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  userId: string;
}

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  description?: string;
  type: "note" | "rate_increase" | "rate_decrease" | "conversion";
  currency?: string;
  rate?: number;
  userId?: string;
}

interface CurrencyConverterProps {
  userId: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: User;
  onUpdateUser: (user: User) => void;
}

export function CurrencyConverter({ userId, activeTab, onTabChange, user, onUpdateUser }: CurrencyConverterProps) {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("EUR");
  const [toCurrency, setToCurrency] = useState<string>("BGN");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [history, setHistory] = useState<ConversionRecord[]>([]);
  const [favoritePairs, setFavoritePairs] = useState<FavoritePair[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);

  // Зареждане на данни от localStorage при монтиране
  useEffect(() => {
    const savedHistory = localStorage.getItem(`history_${userId}`);
    if (savedHistory) {
      const parsed = JSON.parse(savedHistory);
      setHistory(parsed.map((item: any) => ({ ...item, timestamp: new Date(item.timestamp) })));
    }

    const savedFavorites = localStorage.getItem(`favorites_${userId}`);
    if (savedFavorites) {
      setFavoritePairs(JSON.parse(savedFavorites));
    }

    const savedEvents = localStorage.getItem(`events_${userId}`);
    if (savedEvents) {
      const parsed = JSON.parse(savedEvents);
      setCalendarEvents(parsed.map((item: any) => ({ ...item, date: new Date(item.date) })));
    }
  }, [userId]);

  // Запазване на история в localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(`history_${userId}`, JSON.stringify(history));
    }
  }, [history, userId]);

  // Запазване на любими в localStorage
  useEffect(() => {
    if (favoritePairs.length > 0) {
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favoritePairs));
    }
  }, [favoritePairs, userId]);

  // Запазване на събития в localStorage
  useEffect(() => {
    if (calendarEvents.length > 0) {
      localStorage.setItem(`events_${userId}`, JSON.stringify(calendarEvents));
    }
  }, [calendarEvents, userId]);

  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency]);

  const calculateConversion = () => {
    const amountValue = parseFloat(amount) || 0;
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const conversionRate = toRate / fromRate;
    const result = amountValue * conversionRate;
    
    setConvertedAmount(result);
    setRate(conversionRate);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const saveConversion = () => {
    const newRecord: ConversionRecord = {
      id: Date.now().toString(),
      fromCurrency,
      toCurrency,
      fromAmount: parseFloat(amount) || 0,
      toAmount: convertedAmount,
      rate,
      timestamp: new Date(),
      userId,
    };
    setHistory([newRecord, ...history]);
  };

  const toggleFavorite = () => {
    const pairKey = `${fromCurrency}-${toCurrency}`;
    const existingIndex = favoritePairs.findIndex(
      pair => pair.fromCurrency === fromCurrency && pair.toCurrency === toCurrency
    );

    if (existingIndex >= 0) {
      setFavoritePairs(favoritePairs.filter((_, index) => index !== existingIndex));
    } else {
      const newFavorite: FavoritePair = {
        id: pairKey,
        fromCurrency,
        toCurrency,
        userId,
      };
      setFavoritePairs([...favoritePairs, newFavorite]);
    }
  };

  const isFavorite = () => {
    return favoritePairs.some(
      pair => pair.fromCurrency === fromCurrency && pair.toCurrency === toCurrency
    );
  };

  const loadFavoritePair = (pair: FavoritePair) => {
    setFromCurrency(pair.fromCurrency);
    setToCurrency(pair.toCurrency);
  };

  const removeFavoritePair = (pairId: string) => {
    setFavoritePairs(favoritePairs.filter(pair => pair.id !== pairId));
  };

  const addCalendarEvent = (event: CalendarEvent) => {
    setCalendarEvents([...calendarEvents, event]);
  };

  const removeCalendarEvent = (eventId: string) => {
    setCalendarEvents(calendarEvents.filter(event => event.id !== eventId));
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('bg-BG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  // Render component
  return (
    <div className="max-w-6xl mx-auto py-8">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">{/* No TabsList - navigation is in Sidebar */}
        <TabsContent value="home">
          <HomePage onNavigate={onTabChange} user={user} onLogout={onUpdateUser} />
        </TabsContent>

        <TabsContent value="converter">
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Конвертор на валути</CardTitle>
                  <CardDescription>
                    Конвертирайте между различни валути в реално време
                  </CardDescription>
                </div>
                <Button
                  variant={isFavorite() ? "default" : "outline"}
                  size="icon"
                  onClick={toggleFavorite}
                  className={isFavorite() ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}
                >
                  <Star className={`w-5 h-5 ${isFavorite() ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Сума</Label>
                <div className="flex gap-2">
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Въведете сума"
                    className="flex-1"
                  />
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(exchangeRates).map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency} {currencySymbols[currency]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currencyNames[fromCurrency]}
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapCurrencies}
                  className="rounded-full"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="result">Резултат</Label>
                <div className="flex gap-2">
                  <Input
                    id="result"
                    type="text"
                    value={formatNumber(convertedAmount)}
                    readOnly
                    className="flex-1 bg-muted"
                  />
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(exchangeRates).map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency} {currencySymbols[currency]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currencyNames[toCurrency]}
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-sm text-center text-indigo-900">
                  <span>1 {fromCurrency} = {formatNumber(rate)} {toCurrency}</span>
                </p>
                <p className="text-xs text-center text-indigo-600 mt-1">
                  Примерни курсове за демонстрация
                </p>
              </div>

              <Button onClick={saveConversion} className="w-full">
                Запази конвертацията
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <FavoritePairs
            favoritePairs={favoritePairs}
            onLoadPair={loadFavoritePair}
            onRemovePair={removeFavoritePair}
          />
        </TabsContent>

        <TabsContent value="charts">
          <CurrencyChart />
        </TabsContent>

        <TabsContent value="rates">
          <ExchangeRatesTable />
        </TabsContent>

        <TabsContent value="history">
          <ConversionHistory history={history} />
        </TabsContent>

        <TabsContent value="calendar">
          <CurrencyCalendar
            events={calendarEvents}
            onAddEvent={addCalendarEvent}
            onRemoveEvent={removeCalendarEvent}
            userId={userId}
          />
        </TabsContent>

        <TabsContent value="settings">
          <Settings user={user} onUpdateUser={onUpdateUser} />
        </TabsContent>

        <TabsContent value="help">
          <Help />
        </TabsContent>

        <TabsContent value="transfer">
          <MoneyTransfer />
        </TabsContent>
      </Tabs>
    </div>
  );
}