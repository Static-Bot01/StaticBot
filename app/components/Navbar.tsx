"use client";

import Link from "next/link";
import { Bell, Globe } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();

  const menu = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.features, href: "/#features" },
    { label: t.nav.dashboard, href: "/dashboard" },
    { label: t.nav.statistics, href: "/#statistiken" },
    { label: t.nav.pricing, href: "/#preise" },
    { label: t.nav.team, href: "/team" },
    { label: t.nav.faq, href: "/faq" },
    { label: "Datenbank", href: "/datenbank" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("discord_user");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-center px-4 pt-6">
      <div className="flex items-center justify-between w-full max-w-6xl gap-4 px-4 py-3 border border-border bg-card/70 rounded-2xl backdrop-blur-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 border border-border rounded-xl bg-muted">
            <img
              src="/staticbots-logo.png"
              alt="StaticBots"
              width={28}
              height={28}
              className="rounded-sm"
            />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-bold text-foreground">StaticBots</h1>
            <p className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground">
              {t.nav.tagline}
            </p>
          </div>
        </Link>

        {/* Center menu */}
        <div className="hidden md:flex items-center gap-1 p-1 border border-border rounded-xl bg-muted/40">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-1.5 text-sm text-muted-foreground rounded-lg transition hover:text-foreground hover:bg-accent/40"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label={t.nav.notifications}
            className="hidden sm:flex text-muted-foreground transition hover:text-foreground"
          >
            <Bell className="w-5 h-5" />
          </button>
          <div
            role="group"
            aria-label={t.nav.chooseLanguage}
            className="flex items-center gap-1 p-1 border border-border rounded-lg bg-muted/40"
          >
            <Globe className="w-4 h-4 ml-1 text-muted-foreground" aria-hidden="true" />
            <button
              onClick={() => setLang("de")}
              aria-pressed={lang === "de"}
              aria-label="Deutsch"
              className={`px-1.5 py-1 rounded-md transition ${
                lang === "de"
                  ? "bg-primary opacity-100"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src="https://flagcdn.com/24x18/de.png"
                srcSet="https://flagcdn.com/48x36/de.png 2x"
                width={22}
                height={16}
                alt=""
                aria-hidden="true"
                className="rounded-sm"
              />
            </button>
            <button
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              aria-label="English"
              className={`px-1.5 py-1 rounded-md transition ${
                lang === "en"
                  ? "bg-primary opacity-100"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src="https://flagcdn.com/24x18/gb.png"
                srcSet="https://flagcdn.com/48x36/gb.png 2x"
                width={22}
                height={16}
                alt=""
                aria-hidden="true"
                className="rounded-sm"
              />
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-accent/40 text-muted-foreground hover:text-foreground transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
