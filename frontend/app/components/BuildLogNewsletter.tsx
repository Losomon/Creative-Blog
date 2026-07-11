import SitePhoto from "./SitePhoto";

const logs = [
  { date: "JUL 06", entry: "Refined article layout and margin notes", active: true },
  { date: "JUL 04", entry: "Improved typographic scale and line length", active: false },
  { date: "JUL 01", entry: "Initial release of the new homepage", active: false },
  { date: "JUN 28", entry: "Designed the process interaction", active: false },
];

export default function BuildLogNewsletter() {
  return (
    <section className="px-10 py-14 bg-bg-alt grid md:grid-cols-[1.1fr_1fr_0.7fr] gap-10">
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <p className="font-mono text-[11px] text-blueprint">BUILD LOG</p>
          <a href="#" className="font-mono text-[10px] text-blueprint hover:opacity-70 transition-opacity">
            View full log →
          </a>
        </div>
        <ul className="font-mono text-xs text-ink-soft space-y-3">
          {logs.map((log) => (
            <li key={log.date} className="flex items-center gap-3">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  log.active ? "bg-ink" : "border border-line"
                }`}
              />
              <span className="text-ink-faint w-14">{log.date}</span>
              <span>{log.entry}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-mono text-[11px] text-blueprint mb-4">WEEKLY FIELD NOTES</p>
        <p className="font-body text-sm text-ink-soft leading-relaxed mb-4">
          One thoughtful email a week about designing and building better
          digital experiences.
        </p>
        <form className="flex gap-2">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 border border-line rounded-sm bg-bg px-3 py-2 text-sm font-body text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-blueprint"
          />
          <button
            type="submit"
            className="bg-ink text-bg font-body text-sm px-4 py-2 rounded-sm hover:opacity-90 transition-opacity"
          >
            Subscribe
          </button>
        </form>
        <p className="font-mono text-[10px] text-ink-faint mt-2">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      <div className="hidden md:block">
        <div className="border border-line rounded-sm bg-bg p-3 w-20 text-center">
          <p className="font-mono text-[9px] text-blueprint tracking-wide">JUL</p>
          <p className="font-display text-lg text-ink leading-none my-1">20</p>
          <p className="font-mono text-[9px] text-ink-faint">26</p>
        </div>
        <SitePhoto seed="newsletter-note" className="h-24 w-20 rounded-sm mt-3" />
      </div>
    </section>
  );
}
