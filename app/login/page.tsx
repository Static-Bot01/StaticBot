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
      {/* Gleicher Ambient-Glow wie Home */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] [background-size:32px_32px] opacity-40" />
      </div>

      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          {/* Gleiches Logo wie Home/Navbar */}
          <div className="mx-auto flex items-center justify-center w-20 h-20 border border-border rounded-2xl bg-muted">
            <img
              src="/staticbots-logo.png"
              alt="StaticBots"
              width={40}
              height={40}
              className="rounded-sm"
            />
          </div>

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-balance">
            StaticBots
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-sm mx-auto">
            Melde dich mit deinem Discord-Account an, um die Seite zu sehen.
          </p>

          <a
            href={discordLoginUrl}
            className="mt-10 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium border border-border rounded-xl bg-card/50 transition hover:bg-accent/40"
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
