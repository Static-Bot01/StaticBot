"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function setCookie(name: string, value: string, maxAgeSec: number): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSec}; samesite=lax`;
}

export default function AuthCallbackClient() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (typeof window === "undefined") return;

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

        if (!accessToken) {
          setStatus("error");
          setError(`Kein Access Token im Hash gefunden. URL-Hash: ${hash.substring(0, 200)}`);
          return;
        }

        if (tokenType !== "Bearer") {
          setStatus("error");
          setError(`Falscher Token-Typ: ${tokenType}`);
          return;
        }

        const userRes = await fetch("https://discord.com/api/users/@me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!userRes.ok) {
          setStatus("error");
          setError(`Discord API Fehler: ${userRes.status} ${userRes.statusText}`);
          return;
        }

        const user = await userRes.json();
        localStorage.setItem("discord_user", JSON.stringify(user));
        setCookie("discord_user", JSON.stringify(user), 86400);
        setStatus("success");
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } catch (err) {
        setStatus("error");
        setError("Login fehlgeschlagen: " + (err instanceof Error ? err.message : String(err)));
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
            <p className="text-sm text-muted-foreground break-all whitespace-pre-wrap">{error}</p>
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
