import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Calendar as CalendarIcon, Plus, Trash2, TrendingUp, TrendingDown, StickyNote, ArrowRightLeft } from "lucide-react";
import { exchangeRates, currencySymbols } from "./CurrencyConverter";
import { Alert, AlertDescription } from "./ui/alert";

interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  description?: string;
  type: "note" | "rate_increase" | "rate_decrease" | "conversion";
  currency?: string;
  rate?: number;
  userId?: string;
}


interface CurrencyCalendarProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
  onRemoveEvent: (eventId: string) => void;
  userId: string;
}

export function CurrencyCalendar({ events, onAddEvent, onRemoveEvent, userId }: CurrencyCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState<"note" | "rate_increase" | "rate_decrease" | "conversion">("note");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [rateValue, setRateValue] = useState("");

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const handleAddEvent = () => {
    if (!eventTitle || !selectedDate) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      date: selectedDate,
      title: eventTitle,
      description: eventDescription,
      type: eventType,
      currency: eventType !== "note" ? selectedCurrency : undefined,
      rate: eventType !== "note" && rateValue ? parseFloat(rateValue) : undefined,
      userId,
    };

    onAddEvent(newEvent);
    
    // Reset form
    setEventTitle("");
    setEventDescription("");
    setEventType("note");
    setRateValue("");
    setIsDialogOpen(false);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "rate_increase":
        return <TrendingUp className="w-4 h-4" />;
      case "rate_decrease":
        return <TrendingDown className="w-4 h-4" />;
      case "conversion":
        return <ArrowRightLeft className="w-4 h-4" />;
      default:
        return <StickyNote className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "rate_increase":
        return "bg-green-100 border-green-300 text-green-900";
      case "rate_decrease":
        return "bg-red-100 border-red-300 text-red-900";
      case "conversion":
        return "bg-blue-100 border-blue-300 text-blue-900";
      default:
        return "bg-gray-100 border-gray-300 text-gray-900";
    }
  };

  const getEventTypeName = (type: string) => {
    switch (type) {
      case "rate_increase":
        return "Покачване на курс";
      case "rate_decrease":
        return "Спадане на курс";
      case "conversion":
        return "Конвертация";
      default:
        return "Бележка";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('bg-BG', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  // Highlight dates with events
  const datesWithEvents = events.map(event => new Date(event.date).toDateString());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-8">
      {/* Calendar Card */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-indigo-600" />
            Календар на валутите
          </CardTitle>
          <CardDescription>
            Отбелязвайте събития и промени в курсовете
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: (date) => datesWithEvents.includes(date.toDateString())
            }}
            modifiersStyles={{
              hasEvent: {
                fontWeight: 'bold',
                textDecoration: 'underline',
                color: '#4f46e5'
              }
            }}
          />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Добави събитие
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ново събитие</DialogTitle>
                <DialogDescription>
                  Добавете бележка или отбележете промяна в курса
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="event-type">Тип събитие</Label>
                  <Select value={eventType} onValueChange={(value: any) => setEventType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="note">
                        <div className="flex items-center gap-2">
                          <StickyNote className="w-4 h-4" />
                          Бележка
                        </div>
                      </SelectItem>
                      <SelectItem value="rate_increase">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Покачване на курс
                        </div>
                      </SelectItem>
                      <SelectItem value="rate_decrease">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4" />
                          Спадане на курс
                        </div>
                      </SelectItem>
                      <SelectItem value="conversion">
                        <div className="flex items-center gap-2">
                          <ArrowRightLeft className="w-4 h-4" />
                          Важна конвертация
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-title">Заглавие</Label>
                  <Input
                    id="event-title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Въведете заглавие"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-description">Описание (опционално)</Label>
                  <Textarea
                    id="event-description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Допълнителна информация..."
                    rows={3}
                  />
                </div>

                {eventType !== "note" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Валута</Label>
                      <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                        <SelectTrigger>
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

                    <div className="space-y-2">
                      <Label htmlFor="rate">Курс (опционално)</Label>
                      <Input
                        id="rate"
                        type="number"
                        step="0.0001"
                        value={rateValue}
                        onChange={(e) => setRateValue(e.target.value)}
                        placeholder="Въведете курс"
                      />
                    </div>
                  </>
                )}

                <Button onClick={handleAddEvent} className="w-full">
                  Добави
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Events List Card */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>
            {selectedDate ? formatDate(selectedDate) : "Избери дата"}
          </CardTitle>
          <CardDescription>
            {selectedDateEvents.length > 0 
              ? `${selectedDateEvents.length} ${selectedDateEvents.length === 1 ? 'събитие' : 'събития'}`
              : "Няма събития за тази дата"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            {selectedDateEvents.length === 0 ? (
              <Alert>
                <CalendarIcon className="h-4 w-4" />
                <AlertDescription>
                  Няма събития за избраната дата. Използвайте бутона "Добави събитие" за да създадете ново.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <Card key={event.id} className={`border-2 ${getEventColor(event.type)}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getEventIcon(event.type)}
                          <Badge variant="outline">
                            {getEventTypeName(event.type)}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveEvent(event.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      
                      {event.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.description}
                        </p>
                      )}
                      
                      {event.currency && (
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="secondary">
                            {event.currency} {currencySymbols[event.currency]}
                          </Badge>
                          {event.rate && (
                            <span className="text-muted-foreground">
                              Курс: {event.rate.toFixed(4)}
                            </span>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}