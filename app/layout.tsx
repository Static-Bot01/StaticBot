import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./components/LanguageProvider";

export const metadata: Metadata = {
  title: "StaticBots – Discords ultimativer All-in-One Bot",
  description:
    "StaticBots vereint alles in einem Bot: Moderation, Tickets, Verifizierung, Logging, Giveaways und vieles mehr. Schluss mit mehreren Bots – einer reicht.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className="h-full antialiased bg-background"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
