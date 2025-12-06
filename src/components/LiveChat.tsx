import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Bot, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface LiveChatProps {
  userName?: string;
}

export function LiveChat({ userName = "Потребител" }: LiveChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Здравейте! Добре дошли в SwiftRate. Как мога да ви помогна днес?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses: Record<string, string> = {
    здравей: "Здравейте! Радвам се да ви помогна. Какъв въпрос имате?",
    помощ: "Разбира се! Мога да ви помогна с:\n• Конвертиране на валути\n• Любими валутни двойки\n• Календар на събития\n• Графики и курсове\n• Настройки на профила\n\nЗа какво искате да научите повече?",
    курс: "Можете да видите актуални курсове в:\n• Началната страница (обновяват се на всеки 3 сек)\n• Секцията 'Курсове'\n• Конвертора при избор на валути",
    конвертор: "За да конвертирате валута:\n1. Отворете секцията 'Конвертор'\n2. Въведете сума\n3. Изберете валути\n4. Резултатът се показва автоматично\n5. Натиснете 'Запази' за история",
    календар: "В календара можете да:\n• Добавяте събития за валутни промени\n• Отбелязвате когато валута се качва/спада\n• Преглеждате планирани събития\n\nОтворете секцията 'Календар' от менюто!",
    любими: "За да добавите любима валутна двойка:\n1. Изберете валути в конвертора\n2. Натиснете иконата със звезда ⭐\n3. Двойката се запазва в 'Любими'\n\nМожете да заредите двойка с едно кликване от секцията 'Любими'.",
    графики: "В секцията 'Графики' можете:\n• Визуализирате промени в курсовете\n• Избирате времеви период (7д, 30д, 90д)\n• Сравнявате различни валутни двойки\n• Анализирате тренда",
    история: "Всички ваши конвертации се запазват автоматично в секцията 'История'. Там можете да видите:\n• Дата и час\n• Валути и суми\n• Курс при конвертацията",
    настройки: "В 'Настройки' можете да:\n• Промените профилната информация\n• Изберете език и валута по подразбиране\n• Персонализирате изгледа\n• Управлявате акаунта си",
    благодаря: "Няма защо! Ако имате още въпроси, винаги съм тук да помогна! 😊",
    довиждане: "Довиждане! Хубав ден! Ако имате нужда от помощ, просто отворете чата отново. 👋",
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Проверка за специфични ключови думи
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Проверка за въпроси
    if (lowerMessage.includes("как") || lowerMessage.includes("какво") || lowerMessage.includes("къде")) {
      return "Отличен въпрос! За по-детайлна информация, моля посетете секцията 'Помощ' от менюто, където ще намерите пълни ръководства и FAQ.\n\nМога да ви помогна с базова информация за конвертора, курсовете, календара, любимите и настройките.";
    }

    if (lowerMessage.includes("проблем") || lowerMessage.includes("грешка") || lowerMessage.includes("бъг")) {
      return "Съжалявам за неудобството! За технически проблеми:\n• Имейл: support@swiftrate.bg\n• Телефон: +359 2 123 4567\n• Работно време: Пон-Пет, 9:00-18:00\n\nМоля опишете проблема и нашият екип ще ви помогне.";
    }

    // Default отговор
    return "Благодаря за съобщението! Не съм сигурен как точно да отговоря на този въпрос. Можете да:\n\n• Потърсите в секцията 'Помощ'\n• Свържете се с нашия екип на support@swiftrate.bg\n• Обадите се на +359 2 123 4567\n\nЗа какво друго мога да ви помогна?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Добавяне на съобщение от потребителя
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Симулиране на typing indicator и отговор от бота
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("bg-BG", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const quickActions = [
    { label: "Как да конвертирам?", message: "как да използвам конвертора" },
    { label: "Валутни курсове", message: "къде да видя курсовете" },
    { label: "Любими двойки", message: "как работят любимите" },
    { label: "Календар", message: "как да използвам календара" },
  ];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 transition-all hover:scale-110"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <Card
          className={`fixed bottom-6 right-6 z-50 shadow-2xl transition-all ${
            isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
          } flex flex-col`}
        >
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between py-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base">SwiftRate Помощ</CardTitle>
                <p className="text-xs opacity-90">Онлайн сега</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className={message.sender === "bot" ? "bg-primary text-primary-foreground" : "bg-secondary"}>
                        {message.sender === "bot" ? (
                          <Bot className="w-4 h-4" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`flex flex-col ${
                        message.sender === "user" ? "items-end" : "items-start"
                      } max-w-[75%]`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-background border rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-background border rounded-lg rounded-bl-none px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </CardContent>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="px-4 py-2 border-t bg-background">
                  <p className="text-xs text-muted-foreground mb-2">Бързи въпроси:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setInputMessage(action.message);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="text-xs h-7"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t bg-background rounded-b-lg">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Напишете съобщение..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Натиснете Enter за изпращане
                </p>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
}
