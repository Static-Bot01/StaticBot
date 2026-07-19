import Link from "next/link";
import { Sparkles, ArrowRight, Terminal, Wrench, Moon } from "lucide-react";

const languages = [
  { label: "Deutsch", flag: "🇩🇪" },
  { label: "Englisch", flag: "🇺🇸" },
  { label: "Arabisch", flag: "🇦🇪" },
  { label: "Türkisch", flag: "🇹🇷" },
  { label: "Spanisch", flag: "🇪🇸" },
  { label: "Niederländisch", flag: "🇳🇱" },
  { label: "Französisch", flag: "🇫🇷" },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] [background-size:32px_32px] opacity-40" />
      </div>

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-32 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* Left: copy */}
        <div className="flex flex-col gap-8">
          <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 text-xs font-mono tracking-wider text-muted-foreground border border-border rounded-full bg-muted/40">
            <Sparkles className="w-3.5 h-3.5" />
            ALL-IN-ONE DISCORD BOT
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
            <span className="text-muted-foreground">StaticBots</span> ist
            Discords ultimativer{" "}
            <span className="text-muted-foreground">All-in-One</span> Bot
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
            StaticBots vereint alles in einem Bot: Moderation, Tickets,
            Verifizierung, Logging, Giveaways und vieles mehr. Schluss mit
            mehreren Bots &ndash; einer reicht.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl transition hover:opacity-90">
              <Sparkles className="w-4 h-4" />
              Jetzt einladen
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-foreground border border-border rounded-xl bg-card/50 transition hover:bg-accent/40"
            >
              Support Server
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-mono tracking-[0.2em] text-muted-foreground">
              VERFÜGBAR AUF
            </p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span
                  key={lang.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-foreground border border-border rounded-lg bg-muted/40"
                >
                  <span aria-hidden="true">{lang.flag}</span>
                  {lang.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: floating feature cards */}
        <div className="relative hidden lg:block h-[440px]">
          <div className="absolute right-24 top-0 flex items-center gap-3 px-4 py-3 border border-border rounded-2xl bg-card/60 backdrop-blur-md">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted">
              <Wrench className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="font-mono text-sm text-muted-foreground">
              Bot Tools
            </span>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-3 px-5 py-4 border border-border rounded-2xl bg-card/80 backdrop-blur-md shadow-2xl shadow-black/40">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
              <Terminal className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-mono text-base font-semibold text-foreground">
              Command Creator
            </span>
          </div>

          <div className="absolute right-28 bottom-0 flex items-center gap-3 px-4 py-3 border border-border rounded-2xl bg-card/60 backdrop-blur-md">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted">
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="font-mono text-sm text-muted-foreground">
              AFK Room
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
