import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-center p-4">
      <div className="flex items-center justify-between w-full max-w-6xl px-6 py-3 border border-neutral-800 bg-neutral-950/50 rounded-full backdrop-blur-md">
        
        {/* Logo Bereich */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
            {/* Hier kannst du dein Icon einfügen */}
            <span className="text-white text-xl">⚡</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">StaticBot</h1>
            <p className="text-neutral-500 text-xs tracking-wider">AUTOMATION SUITE</p>
          </div>
        </div>

        {/* Menü Links */}
        <div className="flex items-center gap-8 text-neutral-400 text-sm">
          <Link href="/features" className="hover:text-white transition">Features</Link>
          <Link href="/statistiken" className="hover:text-white transition">Statistiken</Link>
          <Link href="/partner" className="hover:text-white transition">Partner</Link>
          <Link href="/faq" className="hover:text-white transition">FAQ</Link>
        </div>

        {/* Rechte Seite: Buttons & Panel */}
        <div className="flex items-center gap-4">
          <button className="text-neutral-400 hover:text-white transition">🔔</button>
          <span className="text-neutral-500 text-sm">DE</span>
          <button className="px-4 py-2 text-sm text-neutral-300 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition">
            Panel
          </button>
          <button className="px-4 py-2 text-sm bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition flex items-center gap-2">
            Bot Einladen ↗
          </button>
        </div>
      </div>
    </nav>
  );
}