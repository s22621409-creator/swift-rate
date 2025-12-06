import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { exchangeRates, currencySymbols } from "./CurrencyConverter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function CurrencyChart() {
  // Данни за хистограма - курсове спрямо EUR
  const barData = Object.entries(exchangeRates)
    .filter(([currency]) => currency !== "EUR")
    .map(([currency, rate]) => ({
      currency,
      курс: rate,
      symbol: currencySymbols[currency],
    }));

  // Генериране на исторически данни за последните 7 дни
  const generateHistoricalData = () => {
    const data = [];
    const currencies = ["USD", "GBP", "BGN", "CHF"];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('bg-BG', { day: '2-digit', month: '2-digit' });
      
      const dayData: any = { date: dateStr };
      currencies.forEach(currency => {
        const baseRate = exchangeRates[currency];
        // Добавяне на малка случайна вариация
        const variation = (Math.random() - 0.5) * 0.1;
        dayData[currency] = parseFloat((baseRate + variation).toFixed(4));
      });
      
      data.push(dayData);
    }
    
    return data;
  };

  const lineData = generateHistoricalData();

  return (
    <div className="space-y-6 py-8">
      <Tabs defaultValue="bar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bar">Хистограма</TabsTrigger>
          <TabsTrigger value="line">Линейна графика</TabsTrigger>
        </TabsList>

        <TabsContent value="bar">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Валутни курсове спрямо EUR</CardTitle>
              <CardDescription>
                Сравнение на валутните курсове
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="currency" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-semibold">{payload[0].payload.currency} {payload[0].payload.symbol}</p>
                            <p className="text-sm text-indigo-600">
                              Курс: {payload[0].value}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="курс" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Тенденции на валутните курсове</CardTitle>
              <CardDescription>
                Промени в курсовете за последните 7 дни (спрямо EUR)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded-lg shadow-lg">
                            <p className="font-semibold mb-2">{payload[0].payload.date}</p>
                            {payload.map((entry, index) => (
                              <p key={index} className="text-sm" style={{ color: entry.color }}>
                                {entry.name}: {entry.value}
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="USD" stroke="#4f46e5" strokeWidth={2} />
                  <Line type="monotone" dataKey="GBP" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="BGN" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="CHF" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}