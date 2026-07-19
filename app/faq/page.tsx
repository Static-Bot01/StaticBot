"use client";

import { useLanguage } from "../components/LanguageProvider";

export default function FaqPage() {
  const { t } = useLanguage();

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
          {t.faq.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.faq.subtitle}</p>

        <div className="mt-12 space-y-4">
          {t.faq.items.map((item) => (
            <div
              key={item.q}
              className="border border-border bg-card/50 rounded-2xl p-6 transition hover:bg-accent/20"
            >
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {item.q}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
