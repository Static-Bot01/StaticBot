"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const tokenType = params.get("token_type");
        const discordError = params.get("error");
        const errorDescription = params.get("error_description");

        if (discordError) {
          setStatus("error");
          setError(errorDescription || discordError);
          return;
        }

        if (!accessToken || tokenType !== "Bearer") {
          setStatus("error");
          setError("Kein Access Token erhalten.");
          return;
        }

        const userRes = await fetch("https://discord.com/api/users/@me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!userRes.ok) {
          setStatus("error");
          setError("Fehler beim Abrufen der User-Daten.");
          return;
        }

        const user = await userRes.json();
        localStorage.setItem("discord_user", JSON.stringify(user));
        setStatus("success");
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } catch {
        setStatus("error");
        setError("Login fehlgeschlagen.");
      }
    };

    handleCallback();
  }, [router]);

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
