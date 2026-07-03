"use client";

import { useEffect, useRef, useState } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useToast } from "@/components/Toast";
import { team, stats } from "@/lib/data";

function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && !counted) { setCounted(true); io.disconnect(); } }),
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [counted]);

  return (
    <div className="stats-card" ref={ref}>
      {stats.map((s) => (
        <AboutStatItem key={s.label} stat={s} start={counted} />
      ))}
    </div>
  );
}

function AboutStatItem({ stat, start }: { stat: (typeof stats)[number]; start: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const step = Math.max(1, Math.ceil(stat.count / 40));
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= stat.count) { cur = stat.count; clearInterval(t); }
      setValue(cur);
    }, 30);
    return () => clearInterval(t);
  }, [start, stat.count]);

  const icons: Record<string, React.ReactNode> = {
    Tutorials: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    Projects: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    Subscribers: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    "Monthly Readers": <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
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

export default function AboutPage() {
  useRevealOnScroll();
  const showToast = useToast();

  const handlePitch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("pitchEmail") as HTMLInputElement;
    if (input.value) {
      showToast(`✍️ Thanks! We'll reach out to ${input.value} soon.`, "success");
      input.value = "";
    }
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">OUR STORY</div>
            <h1>Built by developers, <span>for developers.</span></h1>
            <p>The Coding Ledger started as one engineer&apos;s notebook of things he wished someone had explained clearly the first time. It&apos;s grown into a publication read by thousands of developers every week — but the goal hasn&apos;t changed.</p>
            <p>We write the tutorial we&apos;d want to read: practical, honest about trade-offs, and never padded to hit a word count.</p>
          </div>
          <div className="hero-photo">
            <img src="https://picsum.photos/id/60/700/800" alt="Team working together at a desk with laptops" />
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <AboutStats />
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head centered"><h2>What we care about</h2><p>Three things guide every article we publish.</p></div>
          <div className="values-grid">
            <div className="value-card"><div className="value-icon" style={{ background: "linear-gradient(135deg,#6C4DF6,#A855F7)" }}>🎯</div><h4>Practical over trendy</h4><p>If it won&apos;t survive contact with a real codebase, we don&apos;t publish it. No hype for hype&apos;s sake.</p></div>
            <div className="value-card"><div className="value-icon" style={{ background: "linear-gradient(135deg,#3b82f6,#A855F7)" }}>🔍</div><h4>Honest about trade-offs</h4><p>Every tool has a downside. We tell you what it is before you find out the hard way.</p></div>
            <div className="value-card"><div className="value-icon" style={{ background: "linear-gradient(135deg,#22c55e,#A855F7)" }}>🤝</div><h4>Written for humans</h4><p>Clear language, real examples, no jargon for the sake of sounding smart.</p></div>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head centered"><h2>How we got here</h2></div>
          <div className="timeline">
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">2021</div><h4>The first post</h4><p>A single Markdown file explaining Docker to a friend. It got shared more than expected.</p></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">2022</div><h4>Weekly cadence</h4><p>Committed to publishing every week — and started building an actual editorial process.</p></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">2023</div><h4>10,000 subscribers</h4><p>Brought on two contributing writers to cover DevOps and career topics properly.</p></div>
            <div className="tl-item"><div className="tl-dot"></div><div className="tl-year">2024</div><h4>The Coding Ledger, rebuilt</h4><p>A full redesign focused on making tutorials easier to scan, save, and actually finish.</p></div>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-head centered"><h2>Who writes this</h2><p>A small team, each covering the areas they actually work in day to day.</p></div>
          <div className="team-grid">
            {team.map((t) => (
              <div key={t.name} className="team-card">
                <div className="team-photo">
                  <img src={t.img} alt={t.name} />
                  <div className="team-social">
                    <a href="#" aria-label="Twitter"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
                    <a href="#" aria-label="LinkedIn"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.02h.05c.53-1 1.85-2.06 3.8-2.06 4.06 0 4.82 2.67 4.82 6.14V23h-4v-6.78c0-1.62-.03-3.7-2.25-3.7-2.26 0-2.6 1.76-2.6 3.58V23h-4V8.25z"/></svg></a>
                  </div>
                </div>
                <div className="team-body"><h4>{t.name}</h4><span>{t.role}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="newsletter">
            <div className="news-grid">
              <div className="news-left">
                <h2>Want to write for us?</h2>
                <p>We&apos;re always open to guest contributors who write the way we do — clear, honest, and practical.</p>
                <form className="news-form" onSubmit={handlePitch}>
                  <input type="email" name="pitchEmail" placeholder="Your email address" required />
                  <button type="submit">Send a pitch</button>
                </form>
                <div className="news-tags"><span>✓ We reply within a week</span><span>✓ Paid contributions</span></div>
              </div>
              <div className="news-right">
                <svg className="plane" viewBox="0 0 60 60" fill="none"><path d="M5 30L55 5L40 55L28 35L5 30Z" fill="#fff" opacity=".9"/></svg>
                <svg className="envelope" viewBox="0 0 200 160" fill="none">
                  <rect x="10" y="30" width="180" height="120" rx="14" fill="#fff" opacity=".95"/>
                  <path d="M10 40 L100 110 L190 40" stroke="#A855F7" strokeWidth="6" fill="none"/>
                  <rect x="10" y="30" width="180" height="120" rx="14" stroke="#A855F7" strokeWidth="3" fill="none" opacity=".4"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
