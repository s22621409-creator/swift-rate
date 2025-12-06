import { SwiftRateLogo } from "./SwiftRateLogo";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Продукт",
      links: [
        { label: "Конвертор", href: "#" },
        { label: "Графики", href: "#" },
        { label: "API", href: "#" },
        { label: "Мобилно приложение", href: "#" },
      ],
    },
    {
      title: "Компания",
      links: [
        { label: "За нас", href: "#" },
        { label: "Блог", href: "#" },
        { label: "Кариери", href: "#" },
        { label: "Контакти", href: "#" },
      ],
    },
    {
      title: "Поддръжка",
      links: [
        { label: "Помощ", href: "#" },
        { label: "Документация", href: "#" },
        { label: "Статус", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },
    {
      title: "Правно",
      links: [
        { label: "Поверителност", href: "#" },
        { label: "Условия", href: "#" },
        { label: "Бисквитки", href: "#" },
        { label: "Лицензи", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="bg-sidebar border-t border-sidebar-border bg-slate-950 text-white text-sidebar-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <SwiftRateLogo size="lg" variant="full" />
            <p className="mt-4 text-sm text-sidebar-foreground/70 max-w-xs">
              Бърз и надежден конвертор на валути с актуални курсове и професионални инструменти за анализ.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-sidebar-foreground/70 hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-sidebar-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-sidebar-foreground/70">
            © {currentYear} SwiftRate. Всички права запазени.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-sidebar-foreground/70 hover:text-primary transition-colors">
              Условия за ползване
            </a>
            <a href="#" className="text-sidebar-foreground/70 hover:text-primary transition-colors">
              Поверителност
            </a>
            <a href="#" className="text-sidebar-foreground/70 hover:text-primary transition-colors">
              Бисквитки
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
