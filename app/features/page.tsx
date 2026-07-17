export default function FeaturesPage() {
  const features = [
    { title: "Automatisierung", desc: "Wiederkehrende Aufgaben automatisch erledigen." },
    { title: "Planung", desc: "Zeitgesteuerte Abläufe ohne manuellen Aufwand." },
    { title: "Integrationen", desc: "Verbinde StaticBot mit deinen Tools." },
    { title: "Überwachung", desc: "Behalte alle Prozesse im Blick." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-4">Features</h1>
      <p className="text-neutral-400 mb-12 max-w-xl">
        Entdecke, was StaticBot für deine Automatisierung leisten kann.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="border border-neutral-800 bg-neutral-950/50 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-2">{f.title}</h2>
            <p className="text-neutral-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
