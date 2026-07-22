"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError) {
      setStatus("error");
      setError(urlError);
      return;
    }

    fetch("/api/auth/discord/callback")
      .then((res) => {
        if (!res.ok) throw new Error("Callback fehlgeschlagen.");
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
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
