import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import type { FavoritePair } from "./CurrencyConverter";
import { currencySymbols, currencyNames } from "./CurrencyConverter";

interface FavoritePairsProps {
  favoritePairs: FavoritePair[];
  onLoadPair: (pair: FavoritePair) => void;
  onRemovePair: (id: string) => void;
}

export function FavoritePairs({
  favoritePairs,
  onLoadPair,
  onRemovePair,
}: FavoritePairsProps) {
  if (!favoritePairs || favoritePairs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Любими валутни двойки</CardTitle>
          <CardDescription>
            Все още няма добавени любими двойки. Маркирайте често използвана
            конвертация със звездичката, за да я виждате тук.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Любими валутни двойки</CardTitle>
        <CardDescription>
          Бърз достъп до валутните двойки, които използвате най-често.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {favoritePairs.map((pair) => (
          <div
            key={pair.id}
            className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm"
          >
            <div>
              <div className="font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>
                  {pair.fromCurrency} {currencySymbols[pair.fromCurrency]} →{" "}
                  {pair.toCurrency} {currencySymbols[pair.toCurrency]}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {currencyNames[pair.fromCurrency]} →{" "}
                {currencyNames[pair.toCurrency]}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onLoadPair(pair)}
              >
                Зареди
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemovePair(pair.id)}
              >
                Премахни
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
