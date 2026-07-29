"use client";

import dynamic from "next/dynamic";

const AuthCallbackClient = dynamic(() => import("./AuthCallbackClient"), {
  ssr: false,
  loading: () => (
    <div className="max-w-md mx-auto px-6 py-32 text-center">
      <p className="text-lg text-muted-foreground">Anmeldung läuft…</p>
    </div>
  ),
});

export default function AuthCallbackPage() {
  return <AuthCallbackClient />;
}
