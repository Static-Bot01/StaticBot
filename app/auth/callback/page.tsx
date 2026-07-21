"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "";
const DISCORD_REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || "";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const exchangeCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const discordError = params.get("error");
      const errorDescription = params.get("error_description");

      if (discordError) {
        setStatus("error");
        setError(errorDescription || discordError);
        return;
      }

      if (!code) {
        setStatus("error");
        setError("Kein Code erhalten.");
        return;
      }

      const codeVerifier = sessionStorage.getItem("discord_code_verifier");
      if (!codeVerifier) {
        setStatus("error");
        setError("Code Verifier nicht gefunden. Bitte erneut einloggen.");
        return;
      }

      try {
        const body = new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: DISCORD_REDIRECT_URI,
          client_id: DISCORD_CLIENT_ID,
          code_verifier: codeVerifier,
        });

        const res = await fetch("https://discord.com/api/oauth2/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error_description || data.error || "Token-Austausch fehlgeschlagen.");
        }

        const data = await res.json();
        const accessToken = data.access_token;

        const userRes = await fetch("https://discord.com/api/users/@me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!userRes.ok) throw new Error("Fehler beim Abrufen der User-Daten.");

        const user = await userRes.json();
        localStorage.setItem("discord_user", JSON.stringify(user));
        sessionStorage.removeItem("discord_code_verifier");

        setStatus("success");
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } catch (err: any) {
        setStatus("error");
        setError(err.message || "Login fehlgeschlagen.");
      }
    };

    exchangeCode();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="max-w-md mx-auto px-6 py-32 text-center">
        {status === "loading" && (
          <p className="text-lg text-muted-foreground">Anmeldung läuft…</p>
        )}
        {status === "success" && (
          <p className="text-lg text-foreground">Erfolgreich angemeldet!</p>
        )}
        {status === "error" && (
          <div className="space-y-2">
            <p className="text-lg text-destructive">Login fehlgeschlagen</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <p className="text-xs text-muted-foreground break-all">
              Erwartete Redirect URI: {DISCORD_REDIRECT_URI || "(nicht gesetzt)"}
            </p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium border border-border rounded-xl hover:bg-accent/40"
            >
              Zurück zum Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
