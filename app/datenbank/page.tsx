"use client";

import { useEffect, useState } from "react";

type Row = { [key: string]: any }[];

export default function DatenbankPage() {
  const [table, setTable] = useState("stats");
  const [rows, setRows] = useState<Row>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async (t: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/db/mysql?table=${encodeURIComponent(t)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fehler");
      setRows(data);
      setTable(t);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Datenbank</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">
          MySQL-Datenbank anzeigen und verwalten.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {["stats", "users", "servers"].map((t) => (
            <button
              key={t}
              onClick={() => load(t)}
              className={`px-4 py-2 text-sm font-medium rounded-xl border transition ${
                table === t
                  ? "border-primary bg-accent/40"
                  : "border-border bg-card/50 hover:bg-accent/20"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {error && <p className="mt-4 text-destructive">{error}</p>}
        {loading && <p className="mt-4 text-muted-foreground">Lade…</p>}

        {!loading && rows.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm text-left border border-border rounded-2xl overflow-hidden">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  {Object.keys(rows[0]).map((key) => (
                    <th key={key} className="px-4 py-3 border-b border-border">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    {Object.values(row).map((value, j) => (
                      <td key={j} className="px-4 py-3">
                        {String(value ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
