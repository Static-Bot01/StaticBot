"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import LoginPage from "../login/page";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthed] = useState<boolean>(() => {
    const user = getCookie("discord_user");
    return !!user;
  });

  if (!isAuthed && pathname !== "/login" && pathname !== "/auth/callback") {
    return <LoginPage />;
  }

  return <>{children}</>;
}
