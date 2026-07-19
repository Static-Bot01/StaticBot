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
  languages: { key: string; code: string }[];
};

const dictionaries: Record<Lang, Translations> = {
  de: {
    nav: {
      home: "Home",
      features: "Features",
      statistics: "Statistiken",
      partner: "Partner",
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
