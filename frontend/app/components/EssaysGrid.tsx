import SitePhoto from "./SitePhoto";

const essays = [
  { tag: "#PROCESS", title: "Designing Before Coding", desc: "Start with structure, not syntax.", date: "JUL 04, 2026", read: "12 MIN READ" },
  { tag: "#TYPOGRAPHY", title: "Typography Is a UX Decision", desc: "How type shapes trust and clarity.", date: "JUN 28, 2026", read: "8 MIN READ" },
  { tag: "#SYSTEMS", title: "Building a Design System", desc: "The foundation that scales with your product.", date: "JUN 21, 2026", read: "10 MIN READ" },
  { tag: "#FIELD NOTES", title: "Small Details, Big Impact", desc: "Little decisions shape the entire experience.", date: "JUN 14, 2026", read: "6 MIN READ" },
];

export default function EssaysGrid() {
  return (
    <section className="relative px-10 py-16 border-b border-line">
      <span className="hidden lg:block absolute left-3 top-16 font-mono text-[10px] text-ink-faint">
        03
      </span>

      <div className="flex items-baseline justify-between mb-8">
        <p className="font-mono text-[11px] tracking-[0.04em] text-blueprint">
          LATEST ESSAYS
        </p>
        <a href="#" className="font-mono text-[11px] text-blueprint hover:opacity-70 transition-opacity">
          View all essays →
        </a>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        {essays.map((essay) => (
          <article key={essay.title}>
            <SitePhoto seed={`essay-${essay.tag}`} className="h-32 rounded-sm mb-4" />
            <p className="font-mono text-[10px] text-blueprint mb-2">{essay.tag}</p>
            <h3 className="font-display text-[1rem] text-ink mb-2 leading-snug">{essay.title}</h3>
            <p className="font-body text-xs text-ink-soft mb-3 leading-relaxed">{essay.desc}</p>
            <p className="font-mono text-[10px] text-ink-faint">
              {essay.date} &middot; {essay.read}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
