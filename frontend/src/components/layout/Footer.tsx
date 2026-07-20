export default function Footer() {
  return (
    <footer className="flex items-center justify-between bg-ink px-6 py-6 text-sm text-white/40 md:px-12">
      <span>© 2026 Solo Design</span>
      <span className="hidden sm:inline">Built in public. Always learning.</span>
      <div className="flex gap-5">
        <a href="#" className="hover:text-white">Twitter</a>
        <a href="#" className="hover:text-white">GitHub</a>
        <a href="#" className="hover:text-white">RSS</a>
      </div>
    </footer>
  );
}
