"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoginPage from "../login/page";

type DiscordUser = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
};

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = (await res.json()) as { user: DiscordUser };
          setIsAuthed(true);
        } else {
          setIsAuthed(false);
        }
      } catch {
        setIsAuthed(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Lade…
      </div>
    );
  }

  if (!isAuthed && pathname !== "/login" && pathname !== "/auth/callback") {
    return <LoginPage />;
  }

  return <>{children}</>;
}
