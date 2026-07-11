export default function Footer() {
  return (
    <footer className="px-10 py-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-ink-faint">
      <span>© 2026 Solo Design</span>
      <div className="flex gap-5">
        <a href="#" className="hover:text-ink transition-colors">Twitter</a>
        <a href="#" className="hover:text-ink transition-colors">GitHub</a>
        <a href="#" className="hover:text-ink transition-colors">Email</a>
        <a href="#" className="hover:text-ink transition-colors">RSS</a>
      </div>
      <span>Built in public. Always learning.</span>
    </footer>
  );
}
