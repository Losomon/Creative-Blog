"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useToast } from "@/components/Toast";
import Newsletter from "@/components/Newsletter";
import FaqAccordion from "@/components/FaqAccordion";
import { articles, categories, homeResources, homeFaqs, stats } from "@/lib/data";

const WORDS = ["developers", "engineers", "creators", "innovators", "problem solvers"];

function TypingHeadline() {
  const [text, setText] = useState("");
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = WORDS[wordIndex];
      if (deleting) {
        charIndex--;
        setText(word.substring(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % WORDS.length;
          timeout = setTimeout(tick, 800);
          return;
        }
        timeout = setTimeout(tick, 40);
      } else {
        charIndex++;
        setText(word.substring(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timeout = setTimeout(tick, 2000);
          return;
        }
        timeout = setTimeout(tick, 80);
      }
    };
    timeout = setTimeout(tick, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {text}
      <span className="typing-cursor" />
    </>
  );
}

function StatsCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !counted) {
            setCounted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [counted]);

  return (
    <div className="stats-card" ref={ref}>
      {stats.map((s) => (
        <StatItem key={s.label} stat={s} start={counted} />
      ))}
    </div>
  );
}

function StatItem({ stat, start }: { stat: (typeof stats)[number]; start: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const step = Math.max(1, Math.ceil(stat.count / 40));
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= stat.count) {
        cur = stat.count;
        clearInterval(t);
      }
      setValue(cur);
    }, 30);
    return () => clearInterval(t);
  }, [start, stat.count]);

  const icons: Record<string, React.ReactNode> = {
    Tutorials: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    ),
    Projects: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    Subscribers: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    "Monthly Readers": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
    ),
  };

  return (
    <div className="stat">
      <div className="stat-icon">{icons[stat.label]}</div>
      <div>
        <div className="stat-num">{value}{stat.suffix}</div>
        <div className="stat-label">{stat.label}</div>
        <div className="stat-sub">{stat.sub}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  useRevealOnScroll();
  const showToast = useToast();
  const [playingFeatured, setPlayingFeatured] = useState(false);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  const trendVideoRef = useRef<HTMLVideoElement>(null);

  const trending = articles.slice(0, 5);
  const tutorials = articles.slice(5, 10);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">WELCOME TO THE CODING LEDGER</div>
            <h1>
              Insights that<br />empower <TypingHeadline />
            </h1>
            <p>Modern tutorials, real-world projects, career advice, and everything you need to grow in software engineering.</p>
            <div className="hero-cta">
              <Link href="/articles" className="btn-lg primary">
                Explore Articles
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <Link href="/categories" className="btn-lg outline">Browse Categories</Link>
            </div>
            <div className="trust-row">
              <div className="avatars">
                <img src="https://i.pravatar.cc/72?img=12" alt="Developer avatar" loading="lazy" />
                <img src="https://i.pravatar.cc/72?img=32" alt="Developer avatar" loading="lazy" />
                <img src="https://i.pravatar.cc/72?img=47" alt="Developer avatar" loading="lazy" />
              </div>
              <div>
                <div className="stars">★★★★★</div>
                <div className="trust-text">Trusted by 12,000+ developers</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="float-card vscode-win">
              <div className="vscode-bar"><span></span><span></span><span></span></div>
              <div className="vscode-body">
                <div><span className="kw">const</span> developer = {"{"}</div>
                <div>&nbsp;&nbsp;problemSolving: <span className="kw">true</span>,</div>
                <div>&nbsp;&nbsp;coffee: <span className="str">&apos;always&apos;</span>,</div>
                <div>&nbsp;&nbsp;<span className="prop">code</span>: <span className="str">&apos;everyday&apos;</span></div>
                <div>{"}"};</div>
              </div>
            </div>
            <div className="float-card laptop">
              <div className="laptop-frame">
                <div className="laptop-screen">
                  <video className="laptop-video" autoPlay muted loop playsInline poster="https://picsum.photos/id/60/300/170">
                    <source src="https://assets.mixkit.co/videos/41646/41646-720.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="laptop-base"></div>
            </div>
            <div className="float-card mug"></div>
            <div className="float-card plant">
              <svg width="90" height="100" viewBox="0 0 90 100"><rect x="28" y="70" width="34" height="28" rx="6" fill="#3a2d6b"/><path d="M45 70 Q20 50 25 20 Q45 35 45 70" fill="#7c5cf0"/><path d="M45 70 Q70 50 65 20 Q45 35 45 70" fill="#A855F7"/></svg>
            </div>
            <div className="float-card notebook">
              <div style={{ width: 34, height: 3, background: "#A855F7", borderRadius: 2, marginBottom: 8 }}></div>
              <div style={{ width: 50, height: 3, background: "rgba(255,255,255,.3)", borderRadius: 2, marginBottom: 6 }}></div>
              <div style={{ width: 40, height: 3, background: "rgba(255,255,255,.3)", borderRadius: 2 }}></div>
            </div>
            <div className="icon-chip chip-react">⚛</div>
            <div className="icon-chip chip-node">⬡</div>
            <div className="icon-chip chip-git">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#171029"><path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 1 1-1.103 1.103l-2.48-2.48v6.526a1.837 1.837 0 1 1-1.51-.054V8.978a1.838 1.838 0 0 1-.998-2.41L7.687 3.892.452 11.128a1.55 1.55 0 0 0 0 2.188l10.479 10.478a1.55 1.55 0 0 0 2.188 0l10.427-10.427a1.55 1.55 0 0 0 0-2.188"/></svg>
            </div>
            <div className="phone">
              <video className="phone-screen" autoPlay muted loop playsInline poster="https://picsum.photos/id/1/80/160">
                <source src="https://assets.mixkit.co/videos/41659/41659-720.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="float-dot" style={{ top: 60, right: 120, animationDelay: ".5s" }}></div>
            <div className="float-dot" style={{ top: 220, left: 60, animationDelay: "1.5s" }}></div>
            <div className="float-dot" style={{ bottom: 80, right: 200, animationDelay: "2s" }}></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <StatsCard />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><h2>Featured Article</h2></div>
          <div className="featured-card">
            <div className={`featured-img${playingFeatured ? " playing" : ""}`}>
              <img className="featured-photo" src="https://picsum.photos/id/180/900/700" alt="Developer's dual-monitor coding setup" loading="lazy" />
              <video ref={featuredVideoRef} className="featured-video" muted loop playsInline onEnded={() => setPlayingFeatured(false)}>
                <source src="https://assets.mixkit.co/videos/41659/41659-720.mp4" type="video/mp4" />
              </video>
              <button
                className="play-btn"
                aria-label="Play preview"
                onClick={() => {
                  setPlayingFeatured(true);
                  if (featuredVideoRef.current) {
                    featuredVideoRef.current.currentTime = 0;
                    featuredVideoRef.current.play().catch(() => {});
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <div className="featured-body">
              <div className="tag-pill">FEATURED ARTICLE</div>
              <h3>How I Built a Scalable Blog Platform with Next.js</h3>
              <p>A behind-the-scenes look at the architecture, features, and lessons learned while building The Coding Ledger from the ground up.</p>
              <div className="author-row">
                <img src="https://i.pravatar.cc/72?img=51" alt="Solomon Mboni" loading="lazy" />
                <div>
                  <div className="author-name">Solomon Mboni</div>
                  <div className="author-meta">May 20, 2024 · 12 min read</div>
                </div>
              </div>
              <a
                href="#"
                className="read-more"
                onClick={(e) => { e.preventDefault(); showToast("Article loaded successfully!", "success"); }}
              >
                Continue Reading
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="trending">
        <div className="container">
          <div className="section-head">
            <div><h2>Trending Articles</h2><p>What developers are reading right now</p></div>
            <Link href="/articles" className="view-all">
              View all articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="trend-grid">
            {trending.map((a, i) => (
              <div
                key={a.title}
                className={`trend-card ${i === 0 ? "span-2-2 hover-video" : "span-1-1"}`}
                onClick={() => showToast(`Article: ${a.title}`, "info")}
                onMouseEnter={() => { if (i === 0 && trendVideoRef.current) { trendVideoRef.current.currentTime = 0; trendVideoRef.current.play().catch(() => {}); } }}
                onMouseLeave={() => { if (i === 0 && trendVideoRef.current) trendVideoRef.current.pause(); }}
              >
                <img className="t-img" src={a.img} alt={a.title} loading="lazy" />
                {i === 0 && (
                  <video ref={trendVideoRef} className="t-video" muted loop playsInline preload="none">
                    <source src="https://assets.mixkit.co/videos/41646/41646-720.mp4" type="video/mp4" />
                  </video>
                )}
                <div className="t-overlay"></div>
                <div className="bookmark" onClick={(e) => { e.stopPropagation(); showToast("Saved to your reading list", "success"); }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div className="t-content">
                  <span className="t-cat">{a.cat}</span>
                  <div className="t-title">{a.title}</div>
                  <div className="t-meta">{a.time} · {i === 0 ? "hover to preview" : a.views}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="container">
          <div className="section-head">
            <div><h2>Browse Categories</h2><p>Find the topics that matter to you</p></div>
            <Link href="/categories" className="view-all">
              View all categories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="cat-grid">
            {categories.map((c) => (
              <div key={c.name} className="cat-card" onClick={() => showToast(`Showing ${c.name} articles`, "info")}>
                <div className="cat-icon" style={{ background: `linear-gradient(135deg,${c.color},#A855F7)` }}>{c.icon}</div>
                <h4>{c.name}</h4>
                <span>{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><h2>Learning Paths</h2><p>Follow structured roadmaps to your goal</p></div>
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

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><h2>Latest Tutorials</h2><p>Hands-on guides, updated weekly</p></div>
            <Link href="/articles" className="view-all">
              View all tutorials
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="tut-grid">
            {tutorials.map((t) => (
              <div key={t.title} className="tut-card" onClick={() => showToast(`Loading tutorial: ${t.title}`, "info")}>
                <div className="tut-img">
                  <img className="t-img" src={t.img} alt={t.title} loading="lazy" />
                  <span className="tut-cat">{t.cat}</span>
                  <div className="tut-bookmark"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></div>
                </div>
                <div className="tut-body">
                  <h4>{t.title}</h4>
                  <div className="tut-foot">
                    <div className="author"><img src={t.author} alt="" loading="lazy" />{t.time}</div>
                    <span>{t.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="resources">
        <div className="container">
          <div className="section-head">
            <div><h2>Developer Resources</h2><p>Practical tools and downloads</p></div>
            <Link href="/resources" className="view-all">
              View all resources
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
          <div className="res-grid">
            {homeResources.map((r) => (
              <div key={r.title} className="res-card" onClick={() => showToast(`Downloading ${r.title}...`, "success")}>
                <div className="res-icon" style={{ background: `linear-gradient(135deg,${r.color},var(--accent))` }}>{r.icon}</div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
                <a href="#" className="res-link" onClick={(e) => { e.preventDefault(); e.stopPropagation(); showToast(`Downloading ${r.title}...`, "success"); }}>
                  Download
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter
        heading={<>Stay Ahead.<br />Get Weekly Developer Insights.</>}
        body="Receive tutorials, career advice, resources, and exclusive articles straight to your inbox — every week, no fluff."
      />

      <section className="section">
        <div className="container">
          <div className="section-head"><div><h2>What Developers Say</h2></div></div>
          <div className="testi-track">
            {[
              { name: "Alex Johnson", role: "Frontend Developer", img: "https://i.pravatar.cc/72?img=15", quote: "The Coding Ledger helped me go from confused to confident developer." },
              { name: "Sarah Williams", role: "Software Engineer", img: "https://i.pravatar.cc/72?img=27", quote: "The tutorials are practical, modern, and easy to follow. My go-to blog!" },
              { name: "David Miller", role: "Full Stack Developer", img: "https://i.pravatar.cc/72?img=33", quote: "I landed my dream job by following the career advice and roadmaps." },
              { name: "Emma Davis", role: "UI/UX Designer", img: "https://i.pravatar.cc/72?img=44", quote: "Clean design, great content, and super valuable resources." },
            ].map((t) => (
              <div key={t.name} className="testi-card">
                <div className="stars">★★★★★</div>
                <p>&quot;{t.quote}&quot;</p>
                <div className="testi-author">
                  <img src={t.img} alt={t.name} loading="lazy" />
                  <div><div className="name">{t.name}</div><div className="role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><h2>Frequently Asked Questions</h2></div></div>
          <FaqAccordion faqs={homeFaqs} />
        </div>
      </section>
    </>
  );
}
