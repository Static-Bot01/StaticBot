"use client";

import { Check } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export function PricingSection() {
  const { t } = useLanguage();

  return (
    <section id="preise" className="scroll-mt-28 relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
          {t.pricing.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          {t.pricing.subtitle}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-6 transition ${
                plan.highlighted
                  ? "border-primary bg-accent/30"
                  : "border-border bg-card/50 hover:bg-accent/20"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://discord.gg/static-bots"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center justify-center px-5 py-3 text-sm font-medium rounded-xl border transition ${
                  plan.highlighted
                    ? "border-primary bg-primary text-primary-foreground hover:opacity-90"
                    : "border-border text-foreground hover:bg-accent/40"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
