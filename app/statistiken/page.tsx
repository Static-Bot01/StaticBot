export default function StatistikenPage() {
  const stats = [
    { label: "Aktive Bots", value: "1.248" },
    { label: "Automatisierte Tasks", value: "38.512" },
    { label: "Uptime", value: "99,9 %" },
    { label: "Zufriedene Nutzer", value: "4.7 / 5" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-4">Statistiken</h1>
      <p className="text-neutral-400 mb-12 max-w-xl">
        Zahlen, die zeigen, was StaticBot täglich leistet.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="border border-neutral-800 bg-neutral-950/50 rounded-2xl p-6 text-center"
          >
            <p className="text-3xl font-bold text-white mb-2">{s.value}</p>
            <p className="text-neutral-400 text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
