"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || "";
const DISCORD_REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || "";
const DISCORD_SCOPE = "identify";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("access_token");
    if (!token) {
      setStatus("error");
      setError("Kein Access Token erhalten.");
      return;
    }

    fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Fehler beim Abrufen der User-Daten.");
        return res.json();
      })
      .then((user) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("discord_user", JSON.stringify(user));
        }
        setStatus("success");
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      })
      .catch((err) => {
        setStatus("error");
        setError(err.message || "Login fehlgeschlagen.");
      });
  }, [router, searchParams]);

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
