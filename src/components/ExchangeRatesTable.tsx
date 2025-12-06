import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { exchangeRates, currencySymbols, currencyNames } from "./CurrencyConverter";
import { TrendingUp, TrendingDown } from "lucide-react";

export function ExchangeRatesTable() {
  const tableData = Object.entries(exchangeRates).map(([currency, rate]) => {
    // Генериране на случайна промяна за демонстрация
    const change = (Math.random() - 0.5) * 2;
    const isPositive = change > 0;
    
    return {
      currency,
      name: currencyNames[currency],
      symbol: currencySymbols[currency],
      rate,
      change: change.toFixed(2),
      isPositive,
    };
  });

  return (
    <div className="py-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Валутни курсове</CardTitle>
          <CardDescription>
            Актуални курсове спрямо EUR
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Валута</TableHead>
                <TableHead>Име</TableHead>
                <TableHead className="text-right">Курс (EUR)</TableHead>
                <TableHead className="text-right">Промяна %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((item) => (
                <TableRow key={item.currency}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.symbol}</span>
                      <span>{item.currency}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">
                    {item.rate.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant={item.isPositive ? "default" : "destructive"}
                      className="flex items-center gap-1 w-fit ml-auto"
                    >
                      {item.isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {item.change}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}