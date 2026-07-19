"use client";

import {
  Ticket,
  UserCheck,
  Gavel,
  ImageIcon,
  PenLine,
  LayoutPanelTop,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const icons: LucideIcon[] = [
  Ticket,
  UserCheck,
  Gavel,
  ImageIcon,
  PenLine,
  LayoutPanelTop,
];

export function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section id="features" className="scroll-mt-28 relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-primary/60" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {t.features.eyebrow}
          </span>
        </div>

        <h2 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-balance">
          {t.features.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          {t.features.subtitle}
        </p>

        <div className="mt-16 flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {t.features.coreLabel}
          </span>
          <span className="h-px flex-1 bg-border" aria-hidden="true" />
          <span className="whitespace-nowrap text-xs font-medium tracking-wide text-muted-foreground">
            {t.features.coreCount}
          </span>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((f, i) => {
            const Icon = icons[i];
            return (
              <li
                key={f.title}
                className="group rounded-2xl border border-border bg-card/50 p-6 transition-colors duration-200 hover:border-primary/40 hover:bg-accent/20"
              >
                <div className="flex size-11 items-center justify-center rounded-xl border border-primary/25 bg-accent text-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-base font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
