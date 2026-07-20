import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./components/LanguageProvider";

export const metadata: Metadata = {
  title: "StaticBots – Discords ultimativer All-in-One Bot",
  description:
    "StaticBots vereint alles in einem Bot: Moderation, Tickets, Verifizierung, Logging, Giveaways und vieles mehr. Schluss mit mehreren Bots – einer reicht.",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className="min-h-screen antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          {process.env.NODE_ENV === "production" && <Analytics />}
        </LanguageProvider>
      </body>
    </html>
  );
}
