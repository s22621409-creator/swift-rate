import { useState, useEffect } from "react";
import { ArrowRight, Shield, Clock, Info, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const COUNTRIES = [
  { code: "FR", name: "Франция", flag: "🇫🇷" },
  { code: "DE", name: "Германия", flag: "🇩🇪" },
  { code: "GB", name: "Великобритания", flag: "🇬🇧" },
  { code: "US", name: "САЩ", flag: "🇺🇸" },
  { code: "IT", name: "Италия", flag: "🇮🇹" },
  { code: "ES", name: "Испания", flag: "🇪🇸" },
  { code: "CH", name: "Швейцария", flag: "🇨🇭" },
  { code: "TR", name: "Турция", flag: "🇹🇷" },
];

const CURRENCIES = [
  { code: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "BGN", symbol: "лв", flag: "🇧🇬" },
  { code: "CHF", symbol: "Fr", flag: "🇨🇭" },
  { code: "TRY", symbol: "₺", flag: "🇹🇷" },
];

const PAYMENT_METHODS = [
  { id: "bank", name: "Банков превод", icon: "🏦" },
  { id: "card", name: "Дебитна/Кредитна карта", icon: "💳" },
  { id: "wallet", name: "Дигитален портфейл", icon: "👛" },
];

// Симулирани курсове
const EXCHANGE_RATES: Record<string, Record<string, number>> = {
  USD: { EUR: 0.93, GBP: 0.79, BGN: 1.82, CHF: 0.88, TRY: 34.5, USD: 1 },
  EUR: { USD: 1.08, GBP: 0.85, BGN: 1.96, CHF: 0.95, TRY: 37.2, EUR: 1 },
  GBP: { USD: 1.27, EUR: 1.18, BGN: 2.31, CHF: 1.12, TRY: 43.8, GBP: 1 },
  BGN: { USD: 0.55, EUR: 0.51, GBP: 0.43, CHF: 0.48, TRY: 18.95, BGN: 1 },
  CHF: { USD: 1.14, EUR: 1.05, GBP: 0.89, BGN: 2.08, TRY: 39.2, CHF: 1 },
  TRY: { USD: 0.029, EUR: 0.027, GBP: 0.023, BGN: 0.053, CHF: 0.026, TRY: 1 },
};

export function MoneyTransfer() {
  const [destinationCountry, setDestinationCountry] = useState("FR");
  const [sendAmount, setSendAmount] = useState("10000.00");
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("EUR");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [receiveAmount, setReceiveAmount] = useState("0.00");
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const rate = EXCHANGE_RATES[sendCurrency]?.[receiveCurrency] || 1;
    setExchangeRate(rate);
    const amount = parseFloat(sendAmount.replace(/,/g, "")) || 0;
    const converted = amount * rate;
    setReceiveAmount(converted.toFixed(2));
  }, [sendAmount, sendCurrency, receiveCurrency]);

  const handleSendAmountChange = (value: string) => {
    // Позволяваме само цифри и десетична точка
    const cleaned = value.replace(/[^\d.]/g, "");
    setSendAmount(cleaned);
  };

  const getFee = () => {
    if (paymentMethod === "bank") return 0;
    if (paymentMethod === "card") return parseFloat(sendAmount) * 0.015; // 1.5%
    return parseFloat(sendAmount) * 0.01; // 1%
  };

  const getDeliveryTime = () => {
    if (paymentMethod === "bank") return "Обикновено до 24 часа";
    if (paymentMethod === "card") return "Обикновено до 2 часа";
    return "Незабавно";
  };

  const fee = getFee();
  const total = parseFloat(sendAmount.replace(/,/g, "")) + fee;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Section - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                Международни преводи
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Бързият и <span className="text-primary">сигурен</span> начин за изпращане на пари
              </h1>
              <p className="text-xl text-muted-foreground">
                Милиони хора проверяват нашите международни курсове и изпращат пари онлайн към <span className="text-primary font-semibold">160+ държави</span> в <span className="text-primary font-semibold">130+ валути</span>.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <Card className="px-6 py-3 bg-card/50 backdrop-blur border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-500 text-lg">★</span>
                    ))}
                  </div>
                  <span className="font-semibold">Trustpilot</span>
                </div>
              </Card>

              <Card className="px-6 py-3 bg-card/50 backdrop-blur border-primary/20">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Сигурни преводи</span>
                </div>
              </Card>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Бързи преводи</h3>
                  <p className="text-sm text-muted-foreground">Повечето преводи пристигат за часове</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">100% сигурно</h3>
                  <p className="text-sm text-muted-foreground">Криптирана защита на данните</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Най-добри курсове</h3>
                  <p className="text-sm text-muted-foreground">Конкурентни обменни курсове</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Без скрити такси</h3>
                  <p className="text-sm text-muted-foreground">Прозрачно ценообразуване</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Transfer Form */}
          <Card className="p-8 bg-card/80 backdrop-blur border-primary/20 shadow-2xl">
            <div className="space-y-6">
              {/* Destination Country */}
              <div className="space-y-2">
                <Label htmlFor="destination">Дестинация</Label>
                <Select value={destinationCountry} onValueChange={setDestinationCountry}>
                  <SelectTrigger id="destination" className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>Изпращате към {country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* You Send */}
              <div className="space-y-2">
                <Label htmlFor="sendAmount">Вие изпращате</Label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      id="sendAmount"
                      type="text"
                      value={sendAmount}
                      onChange={(e) => handleSendAmountChange(e.target.value)}
                      className="h-12 pr-4 text-lg"
                    />
                  </div>
                  <Select value={sendCurrency} onValueChange={setSendCurrency}>
                    <SelectTrigger className="w-32 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span>{currency.flag}</span>
                            <span>{currency.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Exchange Rate Display */}
              <div className="flex items-center justify-center py-2">
                <Badge variant="secondary" className="text-primary bg-primary/10">
                  <Info className="w-3 h-3 mr-1" />
                  1 {sendCurrency} = {exchangeRate.toFixed(4)} {receiveCurrency}
                </Badge>
              </div>

              {/* Recipient Gets */}
              <div className="space-y-2">
                <Label htmlFor="receiveAmount">Получателят получава</Label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      id="receiveAmount"
                      type="text"
                      value={receiveAmount}
                      readOnly
                      className="h-12 text-lg bg-muted"
                    />
                  </div>
                  <Select value={receiveCurrency} onValueChange={setReceiveCurrency}>
                    <SelectTrigger className="w-32 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span>{currency.flag}</span>
                            <span>{currency.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label htmlFor="payment">Метод на плащане</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="payment" className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_METHODS.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center gap-2">
                          <span>{method.icon}</span>
                          <span>{method.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fee & Delivery Info */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    Такса за изпращане
                    <Info className="w-3 h-3" />
                  </span>
                  <span className="font-semibold">${fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="font-semibold">{getDeliveryTime()}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-semibold">Общо</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>

              {/* CTA Button */}
              <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg" size="lg">
                Влезте и изпратете
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Изпращайки пари, вие приемате нашите{" "}
                <a href="#" className="text-primary hover:underline">
                  Условия за ползване
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}