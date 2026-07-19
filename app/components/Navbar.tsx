import Link from "next/link";
import { Bell, Globe, LayoutGrid, ArrowUpRight, Bot } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-center px-4 pt-6">
      <div className="flex items-center justify-between w-full max-w-6xl gap-4 px-4 py-3 border border-border bg-card/70 rounded-2xl backdrop-blur-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 border border-border rounded-xl bg-muted">
            <Bot className="w-5 h-5 text-foreground" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-bold text-foreground">StaticBots</h1>
            <p className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground">
              ALL-IN-ONE
            </p>
          </div>
        </Link>

        {/* Center menu */}
        <div className="hidden md:flex items-center gap-1 p-1 border border-border rounded-xl bg-muted/40">
          {[
            { label: "Home", href: "/" },
            { label: "Features", href: "/features" },
            { label: "Statistiken", href: "/statistiken" },
            { label: "Partner", href: "/partner" },
            { label: "FAQ", href: "/faq" },
          ].map((item) => (
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
            aria-label="Benachrichtigungen"
            className="hidden sm:flex text-muted-foreground transition hover:text-foreground"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            aria-label="Sprache wählen"
            className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <Globe className="w-4 h-4" />
            DE
          </button>
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-foreground border border-border rounded-lg transition hover:bg-accent/40">
            <LayoutGrid className="w-4 h-4" />
            Panel
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg transition hover:opacity-90">
            Bot Einladen
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
