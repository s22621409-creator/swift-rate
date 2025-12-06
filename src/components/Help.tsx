import { useState } from "react";
import { 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Video,
  Download,
  Clock,
  TrendingUp,
  Settings,
  Star,
  Calendar,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string[]>([]);

  const faqCategories = [
    {
      category: "Начало на работа",
      icon: Book,
      questions: [
        {
          id: "faq-1",
          question: "Как да започна да използвам SwiftRate?",
          answer: "След регистрация можете директно да започнете да конвертирате валути. Използвайте главния конвертор от началната страница или навигирайте до секцията 'Конвертор' от менюто."
        },
        {
          id: "faq-2",
          question: "Колко струва използването на приложението?",
          answer: "SwiftRate е напълно безплатно приложение. Всички функции са достъпни без допълнителни такси."
        },
        {
          id: "faq-3",
          question: "Как да добавя любими валутни двойки?",
          answer: "В конвертора, след избор на валути, натиснете иконата с звезда. Любимите двойки се запазват автоматично и можете да ги преглеждате в секцията 'Любими'."
        }
      ]
    },
    {
      category: "Валутни курсове",
      icon: TrendingUp,
      questions: [
        {
          id: "faq-4",
          question: "Откъде идват валутните курсове?",
          answer: "Курсовете се обновяват в реално време от международни финансови източници. За демонстрационни цели, в момента използваме симулирани данни."
        },
        {
          id: "faq-5",
          question: "Колко често се обновяват курсовете?",
          answer: "Курсовете се обновяват автоматично на всеки 3 секунди на началната страница. В други секции можете да ги опреснявате ръчно."
        },
        {
          id: "faq-6",
          question: "Защо курсовете се различават от банката ми?",
          answer: "Банките добавят такси и маржове към официалните курсове. Нашите данни показват междубанковите курсове без допълнителни такси."
        }
      ]
    },
    {
      category: "Функционалност",
      icon: FileText,
      questions: [
        {
          id: "faq-7",
          question: "Как работи календарът на събития?",
          answer: "Календарът ви позволява да запазвате бележки за важни валутни събития - например когато дадена валута се покачва или спада значително. Можете да добавяте събития с дата, валута и описание."
        },
        {
          id: "faq-8",
          question: "Как да видя историята на конвертациите си?",
          answer: "Всички конвертации, които правите, се запазват автоматично в секцията 'История'. Можете да прегледате дата, час, валути и суми."
        },
        {
          id: "faq-9",
          question: "Мога ли да сравнявам курсове във времето?",
          answer: "Да! В секцията 'Графики' можете да визуализирате промените в курсовете за различни времеви периоди."
        }
      ]
    },
    {
      category: "Настройки и сигурност",
      icon: Settings,
      questions: [
        {
          id: "faq-10",
          question: "Как да променя настройките си?",
          answer: "Отворете секцията 'Настройки' от менюто. Там можете да промените профилната си информация, език, валута по подразбиране и други предпочитания."
        },
        {
          id: "faq-11",
          question: "Безопасни ли са моите данни?",
          answer: "Да, всички данни се съхраняват локално във вашия браузър. Не събираме лична информация или финансови данни."
        },
        {
          id: "faq-12",
          question: "Как да изтрия акаунта си?",
          answer: "В секцията 'Настройки' → 'Опасна зона' можете да изтриете напълно акаунта си и всички свързани данни."
        }
      ]
    }
  ];

  const tutorials = [
    {
      title: "Конвертиране на валути",
      description: "Научете как бързо и лесно да конвертирате между различни валути",
      duration: "2 мин",
      icon: Video,
      steps: [
        "Изберете валутата, която искате да конвертирате",
        "Въведете сумата",
        "Изберете целевата валута",
        "Резултатът се показва автоматично"
      ]
    },
    {
      title: "Работа с любими валутни двойки",
      description: "Запазете често използваните валутни двойки за бърз достъп",
      duration: "1 мин",
      icon: Star,
      steps: [
        "Изберете валутна двойка в конвертора",
        "Натиснете иконата със звезда",
        "Отворете секцията 'Любими' за да видите запазените двойки",
        "Натиснете на двойка за бързо зареждане"
      ]
    },
    {
      title: "Използване на календара",
      description: "Проследявайте важни валутни събития и промени",
      duration: "3 мин",
      icon: Calendar,
      steps: [
        "Отворете секцията 'Календар'",
        "Натиснете 'Добави събитие'",
        "Изберете дата и валута",
        "Добавете описание (напр. 'EUR се покачи с 2%')",
        "Запазете събитието"
      ]
    },
    {
      title: "Анализ на графики",
      description: "Визуализирайте промените в валутните курсове",
      duration: "2 мин",
      icon: BarChart3,
      steps: [
        "Отворете секцията 'Графики'",
        "Изберете валутна двойка",
        "Изберете времеви период (7д, 30д, 90д)",
        "Анализирайте тренда"
      ]
    }
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: "Имейл поддръжка",
      description: "Свържете се с нас по имейл",
      contact: "support@swiftrate.bg",
      action: "Изпрати имейл"
    },
    {
      icon: MessageCircle,
      title: "Чат на живо",
      description: "Незабавна помощ от нашия екип",
      contact: "Достъпен: Пон-Пет, 9:00-18:00",
      action: "Стартирай чат"
    },
    {
      icon: Phone,
      title: "Телефон",
      description: "Обадете се за спешна помощ",
      contact: "+359 2 123 4567",
      action: "Обади се"
    }
  ];

  const resources = [
    {
      title: "Ръководство за потребителя",
      description: "Пълно PDF ръководство със снимки и инструкции",
      icon: FileText,
      size: "2.4 MB"
    },
    {
      title: "Видео уроци",
      description: "Гледайте видео демонстрации на всички функции",
      icon: Video,
      size: "Плейлист"
    },
    {
      title: "Бележки за версията",
      description: "Вижте новостите в последната версия",
      icon: Download,
      size: "v2.1.0"
    }
  ];

  const filteredFaqCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      searchQuery === "" ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl">Център за помощ</h1>
            <p className="text-muted-foreground">Как можем да ви помогнем днес?</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">
            <HelpCircle className="w-4 h-4 mr-2" />
            Често задавани
          </TabsTrigger>
          <TabsTrigger value="tutorials">
            <Book className="w-4 h-4 mr-2" />
            Ръководства
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageCircle className="w-4 h-4 mr-2" />
            Контакти
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText className="w-4 h-4 mr-2" />
            Ресурси
          </TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Потърсете отговор на въпроса си..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Categories */}
          {filteredFaqCategories.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Не са намерени резултати за "{searchQuery}"
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFaqCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <Card key={idx}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle>{category.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="w-full">
                      {category.questions.map((q) => (
                        <AccordionItem key={q.id} value={q.id}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            {q.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {q.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        {/* Tutorials Tab */}
        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {tutorials.map((tutorial, idx) => {
              const Icon = tutorial.icon;
              return (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {tutorial.duration}
                      </div>
                    </div>
                    <CardTitle>{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Стъпки:</p>
                      <ol className="space-y-2">
                        {tutorial.steps.map((step, stepIdx) => (
                          <li key={stepIdx} className="flex gap-3 text-sm text-muted-foreground">
                            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-medium">
                              {stepIdx + 1}
                            </span>
                            <span className="pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Свържете се с нас</CardTitle>
              <CardDescription>
                Изберете предпочитания начин за контакт
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {contactOptions.map((option, idx) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{option.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {option.description}
                      </p>
                      <p className="text-sm font-medium mb-4">{option.contact}</p>
                      <Button variant="outline" className="w-full">
                        {option.action}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Изпратете съобщение</CardTitle>
              <CardDescription>
                Попълнете формата и ще ви отговорим в рамките на 24 часа
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Име</label>
                    <Input placeholder="Вашето име" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Имейл</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Тема</label>
                  <Input placeholder="Относно какво е въпросът?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Съобщение</label>
                  <textarea
                    className="w-full min-h-[150px] px-3 py-2 rounded-md border border-input bg-background"
                    placeholder="Опишете вашия въпрос или проблем..."
                  />
                </div>
                <Button className="w-full md:w-auto">
                  Изпрати съобщение
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Документация и ресурси</CardTitle>
              <CardDescription>
                Изтеглете ръководства и допълнителни материали
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resources.map((resource, idx) => {
                  const Icon = resource.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {resource.size}
                        </span>
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Бързи връзки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="text-left">
                    <div className="font-semibold mb-1">API документация</div>
                    <div className="text-sm text-muted-foreground">
                      За разработчици
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="text-left">
                    <div className="font-semibold mb-1">Общи условия</div>
                    <div className="text-sm text-muted-foreground">
                      Условия за ползване
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="text-left">
                    <div className="font-semibold mb-1">Политика за поверителност</div>
                    <div className="text-sm text-muted-foreground">
                      Как пазим вашите данни
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto py-4">
                  <div className="text-left">
                    <div className="font-semibold mb-1">Съобщи за проблем</div>
                    <div className="text-sm text-muted-foreground">
                      Намерихте бъг?
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}