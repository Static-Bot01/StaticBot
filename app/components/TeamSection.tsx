"use client";

import { useLanguage } from "./LanguageProvider";

export function TeamSection() {
  const { t } = useLanguage();

  return (
    <section id="team" className="scroll-mt-28 relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
          {t.team.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          {t.team.subtitle}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.team.members.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center rounded-2xl border border-border bg-card/50 p-8 transition hover:bg-accent/20"
            >
              <img
                src={member.image}
                alt={member.name}
                width={96}
                height={96}
                className="size-24 rounded-full object-cover border border-border"
              />
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
