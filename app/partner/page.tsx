export default function PartnerPage() {
  const partners = [
    { name: "Acme Corp", desc: "Cloud-Infrastruktur" },
    { name: "Nova Labs", desc: "Datenanalyse" },
    { name: "Orbit GmbH", desc: "Integrationen" },
    { name: "Pulse AG", desc: "Support" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-4">Partner</h1>
      <p className="text-neutral-400 mb-12 max-w-xl">
        Unternehmen, die StaticBot vertrauen.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {partners.map((p) => (
          <div
            key={p.name}
            className="border border-neutral-800 bg-neutral-950/50 rounded-2xl p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center text-white font-bold">
              {p.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-white font-semibold">{p.name}</h2>
              <p className="text-neutral-400 text-sm">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
