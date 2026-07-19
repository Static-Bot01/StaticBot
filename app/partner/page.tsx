"use client";

import { useLanguage } from "../components/LanguageProvider";

export default function PartnerPage() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
          {t.partner.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          {t.partner.subtitle}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {t.partner.items.map((p) => (
            <div
              key={p.name}
              className="border border-border bg-card/50 rounded-2xl p-6 flex items-center gap-4 transition hover:bg-accent/20"
            >
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-foreground font-bold">
                {p.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-foreground font-semibold">{p.name}</h2>
                <p className="text-muted-foreground text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
