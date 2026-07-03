"use client";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useToast } from "@/components/Toast";
import Newsletter from "@/components/Newsletter";
import { cheatSheets, designResources, ossResources, learnResources } from "@/lib/data";
import type { Resource } from "@/lib/types";

function ResourceGrid({ items }: { items: Resource[] }) {
  const showToast = useToast();
  return (
    <div className="res-grid res-grid-4">
      {items.map((r) => (
        <div key={r.title} className="res-card">
          <div className="res-icon" style={{ background: `linear-gradient(135deg,${r.color},var(--accent))` }}>{r.icon}</div>
          <h4>{r.title}</h4>
          <p>{r.desc}</p>
          <div className="res-meta">
            <span className="res-badge">{r.badge}</span>
            <a href="#" className="res-link" onClick={(e) => { e.preventDefault(); showToast(`Downloading ${r.title}...`, "success"); }}>
              Get it
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ResourcesPage() {
  useRevealOnScroll();

  return (
    <>
      <section className="page-hero centered">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>FREE TOOLS</div>
          <h1>Developer <span>resources.</span></h1>
          <p>Cheat sheets, kits, and curated lists — the practical stuff we reach for constantly, organized so you can too.</p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head"><h2><span className="section-icon" style={{ background: "linear-gradient(135deg,#6C4DF6,#A855F7)" }}>⌥</span>Cheat Sheets</h2></div>
          <ResourceGrid items={cheatSheets} />
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head"><h2><span className="section-icon" style={{ background: "linear-gradient(135deg,#3b82f6,#A855F7)" }}>🎨</span>UI Kits &amp; Design</h2></div>
          <ResourceGrid items={designResources} />
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head"><h2><span className="section-icon" style={{ background: "linear-gradient(135deg,#22c55e,#A855F7)" }}>⚒</span>Open Source</h2></div>
          <ResourceGrid items={ossResources} />
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head"><h2><span className="section-icon" style={{ background: "linear-gradient(135deg,#f59e0b,#A855F7)" }}>🎓</span>Learning Platforms</h2></div>
          <ResourceGrid items={learnResources} />
        </div>
      </section>

      <Newsletter
        heading="New resources, every week."
        body="We add new cheat sheets and tool roundups constantly — get notified the moment they drop."
      />
    </>
  );
}
