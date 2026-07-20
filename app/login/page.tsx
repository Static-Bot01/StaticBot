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

      <div className="max-w-md mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Login</h1>
        <p className="mt-4 text-muted-foreground">
          Melde dich mit deinem Discord-Account an, um die Seite zu sehen.
        </p>

        <a
          href={discordLoginUrl}
          className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium border border-border rounded-xl bg-card/50 hover:bg-accent/40"
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
  );
}
