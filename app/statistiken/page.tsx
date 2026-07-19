"use client";

import { useLanguage } from "../components/LanguageProvider";

export default function StatistikenPage() {
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
          {t.statistics.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          {t.statistics.subtitle}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.statistics.items.map((s) => (
            <div
              key={s.label}
              className="border border-border bg-card/50 rounded-2xl p-6 text-center transition hover:bg-accent/20"
            >
              <p className="text-3xl font-bold text-foreground mb-2">
                {s.value}
              </p>
              <p className="text-muted-foreground text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
