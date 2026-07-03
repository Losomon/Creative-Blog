"use client";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useToast } from "@/components/Toast";
import Newsletter from "@/components/Newsletter";
import { categories } from "@/lib/data";

export default function CategoriesPage() {
  useRevealOnScroll();
  const showToast = useToast();

  return (
    <>
      <section className="page-hero centered">
        <div className="container">
          <div className="eyebrow" style={{ justifyContent: "center" }}>TOPICS</div>
          <h1>Browse by <span>category.</span></h1>
          <p>Eight focus areas, updated constantly. Pick a lane, or explore them all.</p>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="cat-photo-grid">
            {categories.map((c) => (
              <div key={c.name} className="cat-photo-card" onClick={() => showToast(`Showing ${c.name} articles`, "info")}>
                <img src={c.img} alt={`${c.name} category`} />
                <div className="cat-photo-overlay"></div>
                <div className="cat-photo-icon" style={{ background: `linear-gradient(135deg,${c.color},#A855F7)` }}>{c.icon}</div>
                <div className="cat-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
                <div className="cat-photo-content">
                  <h3>{c.name}</h3>
                  <span>{c.count}</span>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <div><h2>Learning Paths</h2><p>Structured roadmaps that string categories together into a plan</p></div>
          </div>
          <div className="path-grid">
            <div className="path-card">
              <div className="path-head"><div><h3>Become a Frontend Developer</h3><div className="path-meta">12 Modules · Beginner to Advanced</div></div></div>
              <div className="roadmap">
                <div className="road-step"><span className="ico" style={{ background: "#e34c26" }}>H</span>HTML</div><span className="road-arrow">→</span>
                <div className="road-step"><span className="ico" style={{ background: "#264de4" }}>C</span>CSS</div><span className="road-arrow">→</span>
                <div className="road-step"><span className="ico" style={{ background: "#f0db4f", color: "#222" }}>JS</span>JavaScript</div><span className="road-arrow">→</span>
                <div className="road-step"><span className="ico" style={{ background: "#20232a" }}>⚛</span>React</div><span className="road-arrow">→</span>
                <div className="road-step"><span className="ico" style={{ background: "#000" }}>N</span>Next.js</div>
              </div>
              <div className="progress-row"><div className="progress-bar"><div className="progress-fill" style={{ width: "25%" }}></div></div><span>25%</span></div>
            </div>
            <div className="path-card">
              <div className="path-head"><div><h3>Backend Developer Roadmap</h3><div className="path-meta">10 Modules · Beginner to Advanced</div></div></div>
              <div className="roadmap">
                <div className="road-step"><span className="ico" style={{ background: "#3c873a" }}>N</span>Node</div><span className="road-arrow">→</span>
                <div className="road-step"><span className="ico" style={{ background: "#000" }}>E</span>Express</div><span className="road-arrow">→</span>
                <div className="road-step"><span className="ico" style={{ background: "#13aa52" }}>M</span>MongoDB</div><span className="road-arrow">→</span>
                <div className="road-step"><span className="ico" style={{ background: "#6C4DF6" }}>A</span>Auth</div><span className="road-arrow">→</span>
                <div className="road-step"><span className="ico" style={{ background: "#3b82f6" }}>D</span>Deployment</div>
              </div>
              <div className="progress-row"><div className="progress-bar"><div className="progress-fill" style={{ width: "30%" }}></div></div><span>30%</span></div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter
        heading={<>Follow a category.<br />Get only what you need.</>}
        body="Subscribe and tell us which categories matter to you — we'll route the right tutorials your way."
      />
    </>
  );
}
