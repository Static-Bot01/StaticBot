import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <section className="flex flex-col items-center text-center gap-6">
        <span className="px-4 py-1.5 text-sm text-neutral-300 border border-neutral-800 rounded-full bg-neutral-950/50">
          ⚡ Automation Suite
        </span>
        <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl">
          Automatisiere deinen Workflow mit{" "}
          <span className="text-neutral-400">StaticBot</span>
        </h1>
        <p className="text-lg text-neutral-400 max-w-xl">
          Wiederkehrende Aufgaben erledigen sich ab jetzt von selbst. Plane,
          verbinde und überwache alles an einem Ort.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/features"
            className="px-6 py-3 text-sm font-semibold bg-white text-black rounded-lg hover:bg-neutral-200 transition"
          >
            Features ansehen
          </Link>
          <Link
            href="/faq"
            className="px-6 py-3 text-sm font-medium text-neutral-300 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition"
          >
            Mehr erfahren
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3 mt-24">
        {[
          { title: "Schnell", desc: "In wenigen Minuten einsatzbereit." },
          { title: "Zuverlässig", desc: "99,9 % Uptime für deine Abläufe." },
          { title: "Flexibel", desc: "Anbindung an deine bestehenden Tools." },
        ].map((c) => (
          <div
            key={c.title}
            className="border border-neutral-800 bg-neutral-950/50 rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-2">{c.title}</h2>
            <p className="text-neutral-400">{c.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
