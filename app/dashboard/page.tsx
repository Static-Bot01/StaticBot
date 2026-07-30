"use client";

import { useEffect, useState } from "react";
import { Plus, Server, Users, Settings, Trash2, ExternalLink, RefreshCw } from "lucide-react";

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
  approximate_member_count?: number;
  inGuild?: boolean;
}

const BOT_CLIENT_ID = "1528771501975929000";
const DISCORD_INVITE_TEMPLATE = `https://discord.com/api/oauth2/authorize?client_id=${BOT_CLIENT_ID}&permissions=8&scope=bot`;

function hasManageGuild(permissions: string): boolean {
  try {
    const perms = Number(permissions);
    return (perms & 32) !== 0;
  } catch {
    return false;
  }
}

function getGuildIconUrl(guild: DiscordGuild): string {
  if (guild.icon) {
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
  }
  return "/Static-Logos.gif";
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; username: string; discriminator: string; avatar: string } | null>(null);
  const [guilds, setGuilds] = useState<DiscordGuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const getAccessToken = (): string | null => {
    try {
      const tokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("discord_access_token="));
      if (tokenCookie) {
        return decodeURIComponent(tokenCookie.split("=")[1]);
      }

      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("discord_user="));
      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        if (userData.access_token) return userData.access_token;
      }

      const localUser = localStorage.getItem("discord_user");
      if (localUser) {
        const userData = JSON.parse(localUser);
        if (userData.access_token) return userData.access_token;
      }

      const token = localStorage.getItem("discord_access_token");
      if (token) return token;
    } catch {
      // ignore
    }
    return null;
  };

  const debugStorage = () => {
    const token = getAccessToken();
    const debug: Record<string, unknown> = {
      hasToken: !!token,
      tokenPrefix: token ? token.substring(0, 10) + "..." : null,
      cookies: document.cookie.split("; ").map((c) => c.split("=")[0]),
      hasLocalUser: !!localStorage.getItem("discord_user"),
      hasLocalToken: !!localStorage.getItem("discord_access_token"),
    };
    return JSON.stringify(debug, null, 2);
  };

  const fetchGuilds = async () => {
    setLoading(true);
    setError(null);

    const token = getAccessToken();
    if (!token) {
      setError("Nicht angemeldet.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://discord.com/api/users/@me/guilds", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setError("Session abgelaufen. Bitte neu anmelden.");
        } else {
          setError(`Fehler: ${res.status}`);
        }
        setLoading(false);
        return;
      }

      const data: DiscordGuild[] = await res.json();
      const manageable = data.filter((g) => hasManageGuild(g.permissions));
      manageable.sort((a, b) => a.name.localeCompare(b.name));
      setGuilds(manageable);

      if (manageable.length > 0) {
        const guildIds = manageable.map((g) => g.id).join(",");
        try {
          const checkRes = await fetch(`/api/bot/guild?guildId=${guildIds}`);
          if (checkRes.ok) {
            const checkData = await checkRes.json();
            // For bulk check, we'd need individual calls - fallback to parallel
            const presencePromises = manageable.map((g) =>
              fetch(`/api/bot/guild?guildId=${g.id}`)
                .then((r) => r.json())
                .then((d) => ({ id: g.id, inGuild: d.inGuild }))
                .catch(() => ({ id: g.id, inGuild: false }))
            );
            const results = await Promise.all(presencePromises);
            const presenceMap = new Map(results.map((r) => [r.id, r.inGuild]));
            setGuilds((prev) => prev.map((g) => ({ ...g, inGuild: presenceMap.get(g.id) ?? false })));
          }
        } catch {
          // ignore presence check errors
        }
      }
    } catch (err) {
      setError("Fehler beim Laden der Server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("discord_user="));

    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        setUser(userData);
      } catch {
        // ignore
      }
    }

    fetchGuilds();
  }, []);

  const handleInvite = (guildId?: string) => {
    const url = guildId
      ? `${DISCORD_INVITE_TEMPLATE}&guild_id=${guildId}`
      : DISCORD_INVITE_TEMPLATE;
    window.open(url, "_blank");
  };

  const getAvatarUrl = () => {
    if (!user) return "/Static-Logos.gif";
    if (user.avatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
    }
    const defaultAvatar = parseInt(user.discriminator || "0") % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] [background-size:32px_32px] opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="relative size-16 rounded-full border-2 border-border overflow-hidden shrink-0 bg-muted">
              <img
                src={getAvatarUrl()}
                alt={user?.username || "User"}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user?.username || "Benutzer"}
                {user?.discriminator && user.discriminator !== "0" && (
                  <span className="text-muted-foreground">#{user.discriminator}</span>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchGuilds}
              disabled={syncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border rounded-xl bg-card/50 hover:bg-accent/40 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
              Aktualisieren
            </button>
            <button
              onClick={() => handleInvite()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-xl bg-card/50 hover:bg-accent/40 transition"
            >
              <Plus className="w-4 h-4" />
              Bot einladen
            </button>
          </div>
        </div>

        {/* Servers Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Server className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-semibold text-foreground">
              Server mit Admin-Rechten ({guilds.length})
            </h2>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <RefreshCw className="w-8 h-8 text-muted-foreground mx-auto mb-4 animate-spin" />
              <p className="text-muted-foreground">Lade Server…</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16 border border-destructive/30 rounded-2xl bg-destructive/5">
              <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-destructive mb-4">{error}</p>
              <details className="text-left text-xs text-muted-foreground mb-4 p-3 border border-border rounded-lg bg-background/50">
                <summary className="cursor-pointer font-mono mb-2">Debug Info</summary>
                <pre className="whitespace-pre-wrap">{debugStorage()}</pre>
              </details>
              {error.includes("neu anmelden") && (
                <button
                  onClick={() => { document.cookie = "discord_user=; path=/; max-age=0"; window.location.href = "/login"; }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-xl bg-card/50 hover:bg-accent/40 transition"
                >
                  Zum Login
                </button>
              )}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && guilds.length === 0 && (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl">
              <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">Keine Server mit Admin-Rechten gefunden</p>
              <p className="text-xs text-muted-foreground mb-4">
                Du benötigst die &quot;Manage Server&quot; Berechtigung auf einem Server, um den Bot einzuladen.
              </p>
              <button
                onClick={() => handleInvite()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-xl bg-card/50 hover:bg-accent/40 transition"
              >
                <ExternalLink className="w-4 h-4" />
                Bot trotzdem einladen
              </button>
            </div>
          )}

          {/* Server Grid */}
          {!loading && !error && guilds.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guilds.map((guild) => (
                <div
                  key={guild.id}
                  className="group relative flex items-center gap-4 p-5 border border-border rounded-2xl bg-card/50 hover:bg-accent/20 transition"
                >
                  <div className="relative size-14 rounded-xl border border-border overflow-hidden shrink-0 bg-muted">
                    <img
                      src={getGuildIconUrl(guild)}
                      alt={guild.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                      guild.inGuild ? "bg-emerald-500" : "bg-red-500"
                    }`}
                    title={guild.inGuild ? "Bot ist auf dem Server" : "Bot ist nicht auf dem Server"}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {guild.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {guild.owner ? (
                        <span className="text-xs text-primary">Owner</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Admin</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleInvite(guild.id)}
                      className="p-2 border border-border rounded-lg hover:bg-accent/40 transition"
                      title="Bot einladen"
                    >
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
