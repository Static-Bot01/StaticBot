"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoginPage from "../login/page";

type DiscordUser = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
};

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("discord_user");
    setIsAuthed(!!user);
  }, []);

  if (isAuthed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Lade…
      </div>
    );
  }

  if (!isAuthed && pathname !== "/login") {
    return <LoginPage />;
  }

  return <>{children}</>;
}
