const faqs = [
  {
    q: "Was ist StaticBot?",
    a: "StaticBot ist eine Automation Suite, die wiederkehrende Aufgaben für dich übernimmt.",
  },
  {
    q: "Ist StaticBot kostenlos?",
    a: "Es gibt einen kostenlosen Einstieg. Erweiterte Features sind in Plänen verfügbar.",
  },
  {
    q: "Wie lade ich den Bot ein?",
    a: "Über den Button „Bot Einladen“ in der Navigation oben rechts.",
  },
  {
    q: "Wo finde ich Hilfe?",
    a: "Im Panel oder über den Support-Bereich deines Partners.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-white mb-4">FAQ</h1>
      <p className="text-neutral-400 mb-12">
        Häufig gestellte Fragen zu StaticBot.
      </p>
      <div className="space-y-4">
        {faqs.map((item) => (
          <div
            key={item.q}
            className="border border-neutral-800 bg-neutral-950/50 rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-2">{item.q}</h2>
            <p className="text-neutral-400">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
