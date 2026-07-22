"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

type Stat = {
  id: number;
  label: string;
  value: string;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const { data, error } = await supabase
        .from("dashboard_stats")
        .select("*")
        .order("id");

      if (error) {
        console.error("Fehler beim Laden der Stats:", error);
        setStats([]);
      } else if (data) {
        setStats(data);
      }

      setLoading(false);
    };

    loadStats();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        {loading && (
          <p className="text-lg text-muted-foreground text-center">Lade…</p>
        )}

        {!loading && stats.length === 0 && (
          <p className="text-lg text-muted-foreground text-center">
            Keine Daten gefunden.
          </p>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="border border-border bg-card/50 rounded-2xl p-6 text-center transition hover:bg-accent/20"
            >
              <p className="text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
