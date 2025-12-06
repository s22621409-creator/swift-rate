import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { ConversionRecord } from "./CurrencyConverter";
import { currencySymbols } from "./CurrencyConverter";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowRight } from "lucide-react";

interface ConversionHistoryProps {
  history: ConversionRecord[];
}

export function ConversionHistory({ history }: ConversionHistoryProps) {
  if (!history || history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>История на конвертациите</CardTitle>
          <CardDescription>
            Все още няма запазени конвертации. Направете първата си конвертация,
            за да я видите тук.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>История на конвертациите</CardTitle>
        <CardDescription>
          Последните транзакции, които сте запазили.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm"
              >
                <div>
                  <div className="font-medium flex items-center gap-2">
                    <span>
                      {item.fromAmount.toFixed(2)} {item.fromCurrency}{" "}
                      {currencySymbols[item.fromCurrency]}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {item.toAmount.toFixed(2)} {item.toCurrency}{" "}
                      {currencySymbols[item.toCurrency]}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Курс: {item.rate.toFixed(4)} •{" "}
                    {item.timestamp.toLocaleString("bg-BG")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
