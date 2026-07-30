"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Server, Users, Settings, Trash2, ExternalLink } from "lucide-react";

interface Server {
  id: string;
  name: string;
  icon: string;
  members: string;
  addedAt: number;
}

const DISCORD_INVITE_URL =
  "https://discord.com/api/oauth2/authorize?client_id=1528771501975929000&permissions=8&scope=bot";

export default function DashboardPage() {
  const [user, setUser] = useState<{ id: string; username: string; discriminator: string; avatar: string } | null>(null);
  const [servers, setServers] = useState<Server[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newServerName, setNewServerName] = useState("");
  const [newServerMembers, setNewServerMembers] = useState("");

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

    const stored = localStorage.getItem("dashboard_servers");
    if (stored) {
      try {
        setServers(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleInvite = () => {
    window.open(DISCORD_INVITE_URL, "_blank");
  };

  const handleAddServer = () => {
    if (!newServerName.trim()) return;

    const newServer: Server = {
      id: Date.now().toString(),
      name: newServerName.trim(),
      icon: "/Static-Logos.gif",
      members: newServerMembers.trim() || "0",
      addedAt: Date.now(),
    };

    const updated = [...servers, newServer];
    setServers(updated);
    localStorage.setItem("dashboard_servers", JSON.stringify(updated));
    setNewServerName("");
    setNewServerMembers("");
    setShowAddForm(false);
  };

  const handleRemoveServer = (id: string) => {
    const updated = servers.filter((s) => s.id !== id);
    setServers(updated);
    localStorage.setItem("dashboard_servers", JSON.stringify(updated));
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
            <div className="relative size-14 rounded-full border-2 border-border overflow-hidden">
              <Image
                src={getAvatarUrl()}
                alt={user?.username || "User"}
                fill
                className="object-cover"
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

          <button
            onClick={handleInvite}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-xl bg-card/50 hover:bg-accent/40 transition"
          >
            <Plus className="w-4 h-4" />
            Bot einladen
          </button>
        </div>

        {/* Servers Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Server className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Deine Server</h2>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-accent/40 transition"
            >
              <Plus className="w-4 h-4" />
              Server hinzufügen
            </button>
          </div>

          {/* Add Server Form */}
          {showAddForm && (
            <div className="mb-6 p-5 border border-border rounded-2xl bg-card/50">
              <h3 className="text-sm font-semibold text-foreground mb-4">Neuen Server hinzufügen</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Server Name"
                  value={newServerName}
                  onChange={(e) => setNewServerName(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Mitglieder (z.B. 1.2k)"
                  value={newServerMembers}
                  onChange={(e) => setNewServerMembers(e.target.value)}
                  className="w-full sm:w-40 px-4 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleAddServer}
                  className="px-5 py-2 text-sm font-medium border border-border rounded-lg hover:bg-accent/40 transition"
                >
                  Hinzufügen
                </button>
              </div>
            </div>
          )}

          {/* Server Grid */}
          {servers.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl">
              <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Noch keine Server hinzugefügt</p>
              <button
                onClick={handleInvite}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-border rounded-xl bg-card/50 hover:bg-accent/40 transition"
              >
                <ExternalLink className="w-4 h-4" />
                Bot zuerst einladen
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servers.map((server) => (
                <div
                  key={server.id}
                  className="group relative flex items-center gap-4 p-5 border border-border rounded-2xl bg-card/50 hover:bg-accent/20 transition"
                >
                  <div className="relative size-14 rounded-xl border border-border overflow-hidden shrink-0">
                    <Image
                      src={server.icon}
                      alt={server.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {server.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {server.members} Mitglieder
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button
                      className="p-2 border border-border rounded-lg hover:bg-accent/40 transition"
                      title="Einstellungen"
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleRemoveServer(server.id)}
                      className="p-2 border border-border rounded-lg hover:bg-destructive/20 transition"
                      title="Entfernen"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
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
