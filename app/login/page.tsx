"use client";

import { useLanguage } from "../components/LanguageProvider";

export default function LoginPage() {
  const { t } = useLanguage();

  const discordLoginUrl =
    process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID &&
    process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI
      ? `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI)}&response_type=token&scope=identify`
      : "#";

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <img
            src="/staticbots-logo.png"
            alt="StaticBots"
            width={80}
            height={80}
            className="mx-auto rounded-2xl"
          />
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            StaticBots
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Melde dich mit Discord an, um fortzufahren.
          </p>

          <a
            href={discordLoginUrl}
            className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 text-sm font-medium transition hover:bg-accent/40"
          >
            Mit Discord anmelden
          </a>

          {(!process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ||
            !process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI) && (
            <p className="mt-4 text-xs text-muted-foreground">
              Discord-OAuth2 ist noch nicht konfiguriert.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
