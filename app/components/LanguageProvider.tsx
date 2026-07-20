"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Lang = "de" | "en";

type Translations = {
  nav: {
    home: string;
    features: string;
    statistics: string;
    partner: string;
    faq: string;
    tagline: string;
    notifications: string;
    chooseLanguage: string;
  };
  hero: {
    badge: string;
    titleBefore: string;
    titleMiddle: string;
    titleAfter: string;
    description: string;
    invite: string;
    support: string;
    availableOn: string;
  };
  cards: {
    botTools: string;
    commandCreator: string;
    afkRoom: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  features: {
    title: string;
    subtitle: string;
    eyebrow: string;
    coreLabel: string;
    coreCount: string;
    items: { title: string; description: string }[];
  };
  partner: {
    title: string;
    subtitle: string;
    items: { name: string; desc: string }[];
  };
  statistics: {
    title: string;
    subtitle: string;
    items: { label: string; value: string }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    plans: {
      name: string;
      price: string;
      period: string;
      features: string[];
      cta: string;
      highlighted: boolean;
    }[];
  };
  languages: { key: string; code: string }[];
};

const dictionaries: Record<Lang, Translations> = {
  de: {
    nav: {
      home: "Home",
      features: "Features",
      statistics: "Statistiken",
      partner: "Partner",
      pricing: "Preise",
      faq: "FAQ",
      tagline: "ALL-IN-ONE",
      notifications: "Benachrichtigungen",
      chooseLanguage: "Sprache wählen",
    },
    hero: {
      badge: "ALL-IN-ONE DISCORD BOT",
      titleBefore: "StaticBots",
      titleMiddle: "ist Discords ultimativer",
      titleAfter: "All-in-One Bot",
      description:
        "StaticBots vereint alles in einem Bot: Moderation, Tickets, Verifizierung, Logging, Giveaways und vieles mehr. Schluss mit mehreren Bots – einer reicht.",
      invite: "Jetzt einladen",
      support: "Support Server",
      availableOn: "VERFÜGBAR AUF",
    },
    cards: {
      botTools: "Bot Tools",
      commandCreator: "Command Creator",
      afkRoom: "AFK Room",
    },
    faq: {
      title: "FAQ",
      subtitle: "Häufig gestellte Fragen zu StaticBots.",
      items: [
        {
          q: "Was ist StaticBots?",
          a: "StaticBots ist eine All-in-One Automation Suite, die wiederkehrende Aufgaben auf deinem Discord-Server übernimmt.",
        },
        {
          q: "Ist StaticBots kostenlos?",
          a: "Es gibt einen kostenlosen Einstieg. Erweiterte Features sind in Plänen verfügbar.",
        },
        {
          q: "Wie lade ich den Bot ein?",
          a: "Über den Button „Jetzt einladen“ in der Navigation oben rechts.",
        },
        {
          q: "Wo finde ich Hilfe?",
          a: "Im Support Server oder über den Support-Bereich eines Partners.",
        },
      ],
    },
    features: {
      title: "Features",
      subtitle: "Entdecke, was StaticBots für deinen Server leisten kann.",
      eyebrow: "Alle Features",
      coreLabel: "Kern-Features",
      coreCount: "6 Features",
      items: [
        {
          title: "Ticket System",
          description:
            "Kategorie Auswahl, Ticket Panel, Claim/Unclaim durch Team, Logs und optionales Bewertungs System.",
        },
        {
          title: "Verifizierung",
          description:
            "Verifizierungs Button mit Rollenvergabe, optionaler externer Link, Zähler Reset möglich.",
        },
        {
          title: "Moderation",
          description:
            "Warnen, Muten/Entmuten, Kicken, Bannen/Entbannen, Nachrichten löschen, inkl. Log Kanal.",
        },
        {
          title: "Custom Bot Avatar",
          description:
            "Ersetze den Standard Bot Avatar durch einen eigenen für ein individuelles Erscheinungsbild auf deinem Server.",
        },
        {
          title: "Custom Bot Bio",
          description:
            "Passe die Biografie des Bots individuell an für ein persönlicheres Erscheinungsbild.",
        },
        {
          title: "Custom Bot Banner",
          description:
            "Ersetze den Standard Bot Banner durch ein eigenes Bild für einen einzigartigen Look.",
        },
      ],
    },
    partner: {
      title: "Partner",
      subtitle: "Unternehmen, die StaticBots vertrauen.",
      items: [
        { name: "Acme Corp", desc: "Cloud-Infrastruktur" },
        { name: "Nova Labs", desc: "Datenanalyse" },
        { name: "Orbit GmbH", desc: "Integrationen" },
        { name: "Pulse AG", desc: "Support" },
      ],
    },
    statistics: {
      title: "Statistiken",
      subtitle: "Zahlen, die zeigen, was StaticBots täglich leistet.",
      items: [
        { label: "Aktive Bots", value: "50" },
        { label: "Uptime", value: "99,9 %" },
        { label: "Zufriedene Nutzer", value: "4,5 / 5" },
      ],
    },
    pricing: {
      title: "Preise",
      subtitle: "Wähle den passenden Plan für deinen Server.",
      plans: [
        {
          name: "Free",
          price: "0 €",
          period: "pro Monat",
          features: [
            "Bis zu 3 Server",
            "Basis Moderation",
            "Ticket System",
            "Community Support",
          ],
          cta: "Jetzt starten",
          highlighted: false,
        },
        {
          name: "Pro",
          price: "4,99 €",
          period: "pro Monat",
          features: [
            "Unbegrenzte Server",
            "Alle Features",
            "Custom Bot Avatar & Bio",
            "Priorisierter Support",
          ],
          cta: "Pro wählen",
          highlighted: true,
        },
        {
          name: "Enterprise",
          price: "Auf Anfrage",
          period: "",
          features: [
            "Alles aus Pro",
            "Eigener Bot Host",
            "Individuelle Anpassungen",
            "Dedizierter Support",
          ],
          cta: "Kontakt aufnehmen",
          highlighted: false,
        },
      ],
    },
    languages: [
      { key: "Deutsch", code: "de" },
      { key: "Englisch", code: "us" },
      { key: "Arabisch", code: "ae" },
      { key: "Türkisch", code: "tr" },
      { key: "Spanisch", code: "es" },
      { key: "Niederländisch", code: "nl" },
      { key: "Französisch", code: "fr" },
    ],
  },
  en: {
    nav: {
      home: "Home",
      features: "Features",
      statistics: "Statistics",
      partner: "Partners",
      pricing: "Pricing",
      faq: "FAQ",
      tagline: "ALL-IN-ONE",
      notifications: "Notifications",
      chooseLanguage: "Choose language",
    },
    hero: {
      badge: "ALL-IN-ONE DISCORD BOT",
      titleBefore: "StaticBots",
      titleMiddle: "is Discord's ultimate",
      titleAfter: "All-in-One Bot",
      description:
        "StaticBots combines everything in one bot: moderation, tickets, verification, logging, giveaways and much more. No more juggling multiple bots – one is enough.",
      invite: "Invite now",
      support: "Support Server",
      availableOn: "AVAILABLE IN",
    },
    cards: {
      botTools: "Bot Tools",
      commandCreator: "Command Creator",
      afkRoom: "AFK Room",
    },
    faq: {
      title: "FAQ",
      subtitle: "Frequently asked questions about StaticBots.",
      items: [
        {
          q: "What is StaticBots?",
          a: "StaticBots is an all-in-one automation suite that handles recurring tasks on your Discord server.",
        },
        {
          q: "Is StaticBots free?",
          a: "There is a free entry level. Advanced features are available in plans.",
        },
        {
          q: "How do I invite the bot?",
          a: "Use the „Invite now“ button in the navigation at the top right.",
        },
        {
          q: "Where do I find help?",
          a: "In the support server or via the support area of a partner.",
        },
      ],
    },
    features: {
      title: "Features",
      subtitle: "Discover what StaticBots can do for your server.",
      eyebrow: "All Features",
      coreLabel: "Core Features",
      coreCount: "6 Features",
      items: [
        {
          title: "Ticket System",
          description:
            "Category selection, ticket panel, claim/unclaim by team, logs and an optional rating system.",
        },
        {
          title: "Verification",
          description:
            "Verification button with role assignment, optional external link, counter reset possible.",
        },
        {
          title: "Moderation",
          description:
            "Warn, mute/unmute, kick, ban/unban, delete messages, including log channel.",
        },
        {
          title: "Custom Bot Avatar",
          description:
            "Replace the default bot avatar with your own for a personalized look on your server.",
        },
        {
          title: "Custom Bot Bio",
          description:
            "Customize the bot's biography individually for a more personal appearance.",
        },
        {
          title: "Custom Bot Banner",
          description:
            "Replace the default bot banner with your own image for a unique look.",
        },
      ],
    },
    partner: {
      title: "Partners",
      subtitle: "Companies that trust StaticBots.",
      items: [
        { name: "Acme Corp", desc: "Cloud Infrastructure" },
        { name: "Nova Labs", desc: "Data Analysis" },
        { name: "Orbit GmbH", desc: "Integrations" },
        { name: "Pulse AG", desc: "Support" },
      ],
    },
    statistics: {
      title: "Statistics",
      subtitle: "Numbers that show what StaticBots delivers every day.",
      items: [
        { label: "Aktive Bots", value: "50" },
        { label: "Uptime", value: "99.9 %" },
        { label: "Satisfied Users", value: "4.5 / 5" },
      ],
    },
    pricing: {
      title: "Pricing",
      subtitle: "Choose the plan that fits your server.",
      plans: [
        {
          name: "Free",
          price: "0 €",
          period: "per month",
          features: [
            "Up to 3 servers",
            "Basic moderation",
            "Ticket system",
            "Community support",
          ],
          cta: "Get started",
          highlighted: false,
        },
        {
          name: "Pro",
          price: "4.99 €",
          period: "per month",
          features: [
            "Unlimited servers",
            "All features",
            "Custom bot avatar & bio",
            "Priority support",
          ],
          cta: "Choose Pro",
          highlighted: true,
        },
        {
          name: "Enterprise",
          price: "On request",
          period: "",
          features: [
            "Everything from Pro",
            "Own bot host",
            "Custom adaptations",
            "Dedicated support",
          ],
          cta: "Contact us",
          highlighted: false,
        },
      ],
    },
    languages: [
      { key: "German", code: "de" },
      { key: "English", code: "us" },
      { key: "Arabic", code: "ae" },
      { key: "Turkish", code: "tr" },
      { key: "Spanish", code: "es" },
      { key: "Dutch", code: "nl" },
      { key: "French", code: "fr" },
    ],
  },
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("de");

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
