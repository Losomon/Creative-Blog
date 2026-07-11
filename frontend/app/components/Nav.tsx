export default function Nav() {
  return (
    <header className="flex items-center justify-between px-10 py-6 border-b border-line">
      <span className="font-mono text-[13px] font-medium tracking-[0.08em] text-ink">
        SOLO DESIGN
      </span>
      <nav className="hidden md:flex gap-6 font-mono text-xs text-ink-faint">
        <a href="#" className="hover:text-ink transition-colors">JOURNAL</a>
        <a href="#" className="hover:text-ink transition-colors">BUILDS</a>
        <a href="#" className="hover:text-ink transition-colors">ABOUT</a>
      </nav>
      <span className="font-mono text-[11px] text-ink-faint">VOL. 01 &middot; ISSUE 001</span>
    </header>
  );
}
