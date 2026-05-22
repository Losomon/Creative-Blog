"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.left = mx + "px";
        cursor.style.top = my + "px";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animCursor = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ring) {
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
      requestAnimationFrame(animCursor);
    };
    animCursor();

    document.querySelectorAll("a, button, .ps-card, .svc-card").forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("ch"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("ch"));
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!navRef.current || !progressRef.current) return;

    const nav = navRef.current;
    const pb = progressRef.current;

    const handleScroll = () => {
      nav.classList.toggle("sc", window.scrollY > 50);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      pb.style.width = (window.scrollY / h * 100) + "%";
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".rev").forEach((el, i) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          delay: (i % 10) * 0.07,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          }
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".ps-card").forEach((el, i) => {
      el.style.transitionDelay = (i * 0.07) + "s";
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useEffect(() => {
    const video = document.querySelector('.hero-video-bg video') as HTMLVideoElement;
    if (!video) return;

    const handleScroll = () => {
      video.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div id="cur" ref={cursorRef}></div>
      <div id="ring" ref={ringRef}></div>
      <div className="progress-bar" id="pb" ref={progressRef}></div>

      <nav id="nav" ref={navRef}>
        <a href="#" className="logo">The <span>Atelier</span></a>
        <ul className="nav-links">
          <li><a href="#projects">Work</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#journal">Journal</a></li>
          <li><a href="#cta">Contact</a></li>
        </ul>
        <a href="#cta" className="nav-cta">Book a Call</a>
      </nav>

      <section id="hero">
        <div className="hero-video-bg">
          <video autoPlay muted loop playsInline>
            <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/1093662/1093662-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-glow"></div>

        <div className="hero-content">
          <div className="h-badge rev">Digital Studio — Est. 2024</div>
          <h1 className="ht rev d1">The<br/>Dev<br/><em>Atelier</em></h1>
          <p className="h-sub rev d2">Crafting immersive digital experiences through design, motion, and engineering. Where code becomes craftsmanship.</p>
          <div className="btns rev d3">
            <a href="#projects" className="btn-p">View Portfolio</a>
            <a href="#journal" className="btn-g">Read Journal</a>
          </div>
        </div>

        <div className="hero-right rev d2">
          <div className="h-grid"></div>
          <div className="gc gc1">
            <div className="gc-lb">Active Project</div>
            <div className="gc-tt">Coconut Saraih Dashboard</div>
            <div className="gc-mt">Luxury Hotel SaaS — UI/UX</div>
            <div className="gc-bar"><div className="gc-fill" style={{ width: "72%" }}></div></div>
            <div style={{ fontFamily: "var(--ff-u)", fontSize: "10px", color: "var(--muted)", marginTop: "7px" }}>72% complete</div>
          </div>
          <div className="gc gc2">
            <div className="gc-lb">Studio Impact</div>
            <div className="gc-stats">
              <div className="gc-s"><div className="gc-sn">98+</div><div className="gc-sl">Projects</div></div>
              <div className="gc-s"><div className="gc-sn">4.9</div><div className="gc-sl">Rating</div></div>
              <div className="gc-s"><div className="gc-sn">5yr</div><div className="gc-sl">Exp</div></div>
            </div>
          </div>
          <div className="gc gc3">
            <div className="gc-lb">Latest Release</div>
            <div className="gc-tt">Design System v3.0</div>
            <div className="gc-mt" style={{ marginTop: "7px" }}><span className="gc-dot"></span>Components · Tokens · Motion</div>
          </div>
        </div>

        <div className="scroll-ind">
          <span className="scroll-txt">Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <section id="projects" style={{ padding: "0 0 0", background: "var(--bg)" }}>
        <div className="ph rev">
          <div className="sl">Selected Work</div>
          <h2>Crafted with<br/><em style={{ fontStyle: "italic", color: "var(--gold)" }}>intention</em></h2>
        </div>

        <ProjectCard n="01" title="Coconut Saraih Dashboard" category="Luxury Hotel SaaS System" tags={["UI/UX", "React", "Design System"]} img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop" />
        <ProjectCard n="02" title="Meridian Finance Platform" category="Investment Portfolio Interface" tags={["Frontend", "Data Viz", "Motion"]} img="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&fit=crop" />
        <ProjectCard n="03" title="Obsidian Creative Studio" category="Brand Identity + Digital Experience" tags={["Branding", "Creative Direction", "Web"]} img="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80&fit=crop" />
        <ProjectCard n="04" title="Velour E-Commerce" category="Luxury Fashion Storefront" tags={["E-Commerce", "Editorial", "Animation"]} img="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80&fit=crop" />
        <ProjectCard n="05" title="Nova Analytics Engine" category="Real-time Data Intelligence Platform" tags={["SaaS", "Dashboard", "API"]} img="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80&fit=crop" />
      </section>

      <section id="philosophy">
        <div className="phi-vid">
          <video autoPlay muted loop playsInline>
            <source src="https://videos.pexels.com/video-files/9694807/9694807-hd_1920_1080_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="phi-glow"></div>
        <div className="sl rev" style={{ justifyContent: "center" }}>Philosophy</div>
        <blockquote className="phi-q rev d1">
          Code is not just<br/>functionality.<br/><em>craftsmanship.</em>
        </blockquote>
        <p className="phi-a rev d2">— The ethos behind every pixel</p>
      </section>

      <section id="services" className="sec" style={{ background: "var(--bg)" }}>
        <div className="sl rev">What We Build</div>
        <div style={{ maxWidth: "580px" }}>
          <h2 className="rev d1" style={{ fontFamily: "var(--ff-h)", fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 300, lineHeight: 1.1 }}>
            Full-spectrum digital<br/><em style={{ color: "var(--gold)", fontStyle: "italic" }}>excellence</em>
          </h2>
        </div>
        <div className="svc-grid">
          <ServiceCard n="01" title="UI/UX Design" desc="Research-driven interfaces that seduce users into staying. Beauty is strategy." />
          <ServiceCard n="02" title="Frontend Engineering" desc="Production-grade React and Next.js — performant, accessible, and flawlessly rendered." delay />
          <ServiceCard n="03" title="Design Systems" desc="Tokens, components, documentation. The invisible architecture of great products." delay2 />
          <ServiceCard n="04" title="Creative Direction" desc="Brand vision, motion language, and editorial tone — the soul of your product." delay3 />
        </div>
      </section>

      <section id="journal" className="sec">
        <div className="sl rev">The Journal</div>
        <div style={{ maxWidth: "500px" }}>
          <h2 className="rev d1" style={{ fontFamily: "var(--ff-h)", fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 300, lineHeight: 1.1 }}>
            Thoughts on<br/><em style={{ color: "var(--gold)", fontStyle: "italic" }}>craft & code</em>
          </h2>
        </div>
        <div className="j-grid rev d2">
          <JournalFeature />
          <JournalList />
        </div>
      </section>

      <section id="cta">
        <div className="cta-vid">
          <video autoPlay muted loop playsInline>
            <source src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_25fps.mp4" type="video/mp4" />
            <source src="https://videos.pexels.com/video-files/856916/856916-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="cta-glow"></div>
        <div className="cta-lbl rev">Ready to Begin</div>
        <h2 className="cta-h rev d1">Let's Build Something<br/><em>Intentional</em></h2>
        <p className="cta-sub rev d2">Every great digital product starts with a conversation. Let's talk about yours.</p>
        <div className="cta-btns rev d3">
          <a href="mailto:studio@thedevatelier.com" className="btn-lg">Start a Project</a>
          <a href="#journal" className="btn-g" style={{ padding: "19px 52px" }}>Read the Journal</a>
        </div>
      </section>

      <footer>
        <div className="fi">
          <div>
            <div className="f-logo">The Dev <span>Atelier</span></div>
            <div className="f-mf">Where code becomes craftsmanship</div>
          </div>
          <ul className="f-nav">
            <li><a href="#projects">Work</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#journal">Journal</a></li>
            <li><a href="#cta">Contact</a></li>
          </ul>
          <div className="f-right">
            <div className="f-soc">
              <a href="#" className="f-s">Twitter</a>
              <a href="#" className="f-s">Dribbble</a>
              <a href="#" className="f-s">GitHub</a>
            </div>
            <div className="f-cp">© 2025 The Dev Atelier. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  );
}

function ProjectCard({ n, title, category, tags, img }: { n: string; title: string; category: string; tags: string[]; img: string }) {
  return (
    <div className="ps ps-card rev">
      <div className="ps-n">{n}</div>
      <div className="ps-i">
        <div className="ps-tt">{title}</div>
        <div className="ps-c">{category}</div>
        <div className="ps-tags">
          {tags.map((tag) => (
            <span key={tag} className="ps-tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="ps-img">
        <img src={img} alt={`${title} project`} loading="lazy" />
      </div>
      <div className="ps-a">→</div>
    </div>
  );
}

function ServiceCard({ n, title, desc, delay, delay2, delay3 }: { n: string; title: string; desc: string; delay?: boolean; delay2?: boolean; delay3?: boolean }) {
  const delayClass = delay ? "d1" : delay2 ? "d2" : delay3 ? "d3" : "";
  return (
    <div className={`svc svc-card rev ${delayClass}`}>
      <div className="svc-n">{n}</div>
      <div className="svc-tt">{title.split("<br/>").map((t, i) => i === 0 ? t : <><br/>{t}</>)}</div>
      <div className="svc-d">{desc}</div>
    </div>
  );
}

function JournalFeature() {
  return (
    <div className="jf">
      <div className="jf-img">
        <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=85&fit=crop" alt="Featured journal" loading="lazy" />
      </div>
      <div className="jf-tag">Featured Essay</div>
      <div className="jf-tt">Why Luxury Interfaces Command Premium Prices: A Design Manifesto</div>
      <div className="jf-meta">May 2025 &nbsp;·&nbsp; 12 min read</div>
    </div>
  );
}

function JournalList() {
  return (
    <div className="jl">
      <JournalItem img="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&q=80&fit=crop" tag="Motion Design · Apr 2025" title="The Grammar of Micro-Animations" read="8 min read" />
      <JournalItem img="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300&q=80&fit=crop" tag="Engineering · Mar 2025" title="Building a Design System That Scales" read="15 min read" />
      <JournalItem img="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&q=80&fit=crop" tag="Creative Direction · Feb 2025" title="On Typography as Visual Architecture" read="6 min read" />
    </div>
  );
}

function JournalItem({ img, tag, title, read }: { img: string; tag: string; title: string; read: string }) {
  return (
    <div className="ji">
      <div className="ji-img">
        <img src={img} alt={`${title} article`} loading="lazy" />
      </div>
      <div className="ji-body">
        <div className="ji-tag">{tag}</div>
        <div className="ji-tt">{title}</div>
        <div className="ji-meta">{read}</div>
      </div>
    </div>
  );
}