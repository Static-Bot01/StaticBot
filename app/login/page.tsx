"use client";

import { useLanguage } from "../components/LanguageProvider";

function generateRandomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const values = crypto.getRandomValues(new Uint8Array(length));
  for (let i = 0; i < length; i++) {
    result += chars[values[i] % chars.length];
  }
  return result;
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  return crypto.subtle.digest("SHA-256", encoder.encode(plain));
}

function base64urlencode(input: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function LoginPage() {
  const { t } = useLanguage();

  const handleDiscordLogin = async () => {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;

    if (!clientId || !redirectUri) return;

    const codeVerifier = generateRandomString(64);
    const codeChallenge = base64urlencode(await sha256(codeVerifier));

    sessionStorage.setItem("discord_code_verifier", codeVerifier);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "identify",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });

    window.location.href = `https://discord.com/api/oauth2/authorize?${params.toString()}`;
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground overflow-hidden">
      {/* Hintergrund-Rastermuster in Border-Farbe */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"
      />

      {/* Ambient-Glow wie Home */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      {/* Haupt-Container */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        
        {/* Untertitel */}
        <p className="max-w-sm text-sm text-muted-foreground mb-8 leading-relaxed">
          Melde dich mit deinem Discord-Account an, um die Seite zu sehen.
        </p>

        {/* Sektion: Authentication */}
        <div className="w-full mb-8">
          <span className="block text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-3">
            Authentication
          </span>

          <button
            onClick={handleDiscordLogin}
            className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card/50 px-6 py-3.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-accent/40 active:scale-[0.98]"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.1 13.1 0 01-1.872-.902.077.077 0 01-.008-.128 10.2 10.2 0 00.42-.317.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.136.1.276.204.42.317a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.902.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.96 19.96 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
            </svg>
            <span>Mit Discord anmelden</span>
          </button>
        </div>

        {/* Sektion: Information */}
        <div className="w-full">
          <span className="block text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mb-3 text-left">
            Information
          </span>

          <div className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-4 text-left text-xs text-muted-foreground">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="leading-relaxed">
              Mit der Anmeldung stimmst du den Nutzungsbedingungen zu. Weitere
              Informationen findest du in unserer{" "}
              <span className="text-foreground underline underline-offset-2">
                Datenschutzerklärung
              </span>{" "}
              und unseren{" "}
              <span className="text-foreground underline underline-offset-2">
                Terms of Service
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
