// about page context
'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './about.module.css';   

// ---- Team data ----
const teamMembers = [
  { name: 'Solomon Mboni', role: 'Founder & Editor', img: 'https://i.pravatar.cc/300?img=51' },
  { name: 'Amara Chen', role: 'Frontend & Design', img: 'https://i.pravatar.cc/300?img=47' },
  { name: 'Diego Fernandez', role: 'Backend & DevOps', img: 'https://i.pravatar.cc/300?img=33' },
  { name: 'Priya Nair', role: 'Career & Community', img: 'https://i.pravatar.cc/300?img=44' },
];

export default function AboutPage() {
  // ---------- state ----------
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'info' | 'error' }[]>([]);
  const [counted, setCounted] = useState(false);

  // refs for observers and intervals
  const statsRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<HTMLElement[]>([]);

  // ---------- dark mode ----------
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // ---------- scroll effects ----------
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ---------- scroll to top ----------
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // ---------- mobile menu ----------
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen(prev => !prev);
  const closeMobile = () => setMobileOpen(false);

  // ---------- toast system ----------
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // ---------- stat counters with Intersection Observer ----------
  useEffect(() => {
    if (!statsRef.current || counted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            setCounted(true);
            const statEls = entry.target.querySelectorAll<HTMLElement>('.stat-num');
            statEls.forEach((el) => {
              const target = parseInt(el.dataset.count || '0');
              const suffix = el.dataset.suffix || '+';
              let cur = 0;
              const step = Math.max(1, Math.ceil(target / 40));
              const interval = setInterval(() => {
                cur += step;
                if (cur >= target) {
                  cur = target;
                  clearInterval(interval);
                }
                el.textContent = cur + suffix;
              }, 30);
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  // ---------- reveal animations with Intersection Observer ----------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.in);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    const elements = document.querySelectorAll(`.${styles.reveal}`);
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ---------- pitch form handler ----------
  const handlePitch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.querySelector('#pitchEmail') as HTMLInputElement)?.value;
    if (email) {
      showToast(`✍️ Thanks! We'll reach out to ${email} soon.`, 'success');
      e.currentTarget.reset();
    }
  };

  // ---------- footer newsletter handler ----------
  const handleFooterNewsletter = () => {
    const input = document.getElementById('footerNewsletter') as HTMLInputElement;
    if (input?.value) {
      showToast(`🎉 Subscribed with ${input.value}!`, 'success');
      input.value = '';
    }
  };

  // ---------- render ----------
  return (
    <>
      {/* Background shapes */}
      <div className={styles.bgShapes}>
        <div className={styles.gridPattern}></div>
        <div className={`${styles.blob} ${styles.blob1}`}></div>
        <div className={`${styles.blob} ${styles.blob2}`}></div>
        <div className={`${styles.blob} ${styles.blob3}`}></div>
      </div>

      {/* Toast container */}
      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
            <span>{toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}</span>
            {toast.message}
          </div>
        ))}
      </div>

      {/* Scroll to top button */}
      <button
        className={`${styles.scrollTop} ${showScrollTop ? styles.visible : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      {/* Header */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="header">
        <div className={`container ${styles.navInner}`}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoMark}>{' { }'}</span>
            The Coding Ledger
          </a>
          <nav className={styles.navLinks} aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/articles">Articles</a>
            <a href="/categories">Categories</a>
            <a href="/resources">Resources</a>
            <a href="/about" className={styles.active}>About</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className={styles.navActions}>
            <button className={styles.iconBtn} aria-label="Search" onClick={() => (window.location.href = '/articles')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button className={styles.iconBtn} aria-label="Toggle dark mode" onClick={toggleDarkMode}>
              {darkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  <circle cx="12" cy="12" r="5" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <a href="/contact" className={styles.btnGhost}>Sign In</a>
            <a href="/contact" className={styles.btnPrimary}>Get Started</a>
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.active : ''}`}
              onClick={toggleMobile}
              aria-label="Toggle menu"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.active : ''}`}>
        <a href="/" onClick={closeMobile}>Home</a>
        <a href="/articles" onClick={closeMobile}>Articles</a>
        <a href="/categories" onClick={closeMobile}>Categories</a>
        <a href="/resources" onClick={closeMobile}>Resources</a>
        <a href="/about" className={styles.active} onClick={closeMobile}>About</a>
        <a href="/contact" onClick={closeMobile}>Contact</a>
        <a href="/contact" className={styles.btnPrimary} style={{ textAlign: 'center', marginTop: '12px' }} onClick={closeMobile}>
          Get Started
        </a>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <div className={styles.eyebrow}>OUR STORY</div>
            <h1>Built by developers, <span>for developers.</span></h1>
            <p>The Coding Ledger started as one engineer's notebook of things he wished someone had explained clearly the first time. It's grown into a publication read by thousands of developers every week — but the goal hasn't changed.</p>
            <p>We write the tutorial we'd want to read: practical, honest about trade-offs, and never padded to hit a word count.</p>
          </div>
          <div className={styles.heroPhoto}>
            <img src="https://picsum.photos/id/60/700/800" alt="Team working together at a desk with laptops" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.statsCard} ref={statsRef}>
            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <div>
                <div className="stat-num" data-count="120">0</div>
                <div className={styles.statLabel}>Tutorials</div>
                <div className={styles.statSub}>In-depth guides</div>
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div>
                <div className="stat-num" data-count="50">0</div>
                <div className={styles.statLabel}>Projects</div>
                <div className={styles.statSub}>Real-world projects</div>
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <div className="stat-num" data-count="15" data-suffix="K">0</div>
                <div className={styles.statLabel}>Subscribers</div>
                <div className={styles.statSub}>Growing community</div>
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <div className="stat-num" data-count="500" data-suffix="K">0</div>
                <div className={styles.statLabel}>Monthly Readers</div>
                <div className={styles.statSub}>Across the globe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>What we care about</h2>
            <p>Three things guide every article we publish.</p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} style={{ background: 'linear-gradient(135deg,#6C4DF6,#A855F7)' }}>🎯</div>
              <h4>Practical over trendy</h4>
              <p>If it won't survive contact with a real codebase, we don't publish it. No hype for hype's sake.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} style={{ background: 'linear-gradient(135deg,#3b82f6,#A855F7)' }}>🔍</div>
              <h4>Honest about trade-offs</h4>
              <p>Every tool has a downside. We tell you what it is before you find out the hard way.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon} style={{ background: 'linear-gradient(135deg,#22c55e,#A855F7)' }}>🤝</div>
              <h4>Written for humans</h4>
              <p>Clear language, real examples, no jargon for the sake of sounding smart.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>How we got here</h2>
          </div>
          <div className={styles.timeline}>
            <div className={styles.tlItem}>
              <div className={styles.tlDot}></div>
              <div className={styles.tlYear}>2021</div>
              <h4>The first post</h4>
              <p>A single Markdown file explaining Docker to a friend. It got shared more than expected.</p>
            </div>
            <div className={styles.tlItem}>
              <div className={styles.tlDot}></div>
              <div className={styles.tlYear}>2022</div>
              <h4>Weekly cadence</h4>
              <p>Committed to publishing every week — and started building an actual editorial process.</p>
            </div>
            <div className={styles.tlItem}>
              <div className={styles.tlDot}></div>
              <div className={styles.tlYear}>2023</div>
              <h4>10,000 subscribers</h4>
              <p>Brought on two contributing writers to cover DevOps and career topics properly.</p>
            </div>
            <div className={styles.tlItem}>
              <div className={styles.tlDot}></div>
              <div className={styles.tlYear}>2024</div>
              <h4>The Coding Ledger, rebuilt</h4>
              <p>A full redesign focused on making tutorials easier to scan, save, and actually finish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>Who writes this</h2>
            <p>A small team, each covering the areas they actually work in day to day.</p>
          </div>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, idx) => (
              <div key={idx} className={styles.teamCard}>
                <div className={styles.teamPhoto}>
                  <img src={member.img} alt={member.name} />
                  <div className={styles.teamSocial}>
                    <a href="#" aria-label="Twitter">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.02h.05c.53-1 1.85-2.06 3.8-2.06 4.06 0 4.82 2.67 4.82 6.14V23h-4v-6.78c0-1.62-.03-3.7-2.25-3.7-2.26 0-2.6 1.76-2.6 3.58V23h-4V8.25z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className={styles.teamBody}>
                  <h4>{member.name}</h4>
                  <span>{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Pitch */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.newsletter}>
            <div className={styles.newsGrid}>
              <div className={styles.newsLeft}>
                <h2>Want to write for us?</h2>
                <p>We're always open to guest contributors who write the way we do — clear, honest, and practical.</p>
                <form className={styles.newsForm} onSubmit={handlePitch}>
                  <input type="email" id="pitchEmail" placeholder="Your email address" required />
                  <button type="submit">Send a pitch</button>
                </form>
                <div className={styles.newsTags}>
                  <span>✓ We reply within a week</span>
                  <span>✓ Paid contributions</span>
                </div>
              </div>
              <div className={styles.newsRight}>
                <svg className={styles.plane} viewBox="0 0 60 60" fill="none">
                  <path d="M5 30L55 5L40 55L28 35L5 30Z" fill="#fff" opacity=".9" />
                </svg>
                <svg className={styles.envelope} viewBox="0 0 200 160" fill="none">
                  <rect x="10" y="30" width="180" height="120" rx="14" fill="#fff" opacity=".95" />
                  <path d="M10 40 L100 110 L190 40" stroke="#A855F7" strokeWidth="6" fill="none" />
                  <rect x="10" y="30" width="180" height="120" rx="14" stroke="#A855F7" strokeWidth="3" fill="none" opacity=".4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
              <div className={styles.footerLogo}>
                <span className={styles.logoMark}>{' { }'}</span>
                The Coding Ledger
              </div>
              <p>A platform dedicated to helping developers level up their skills through in-depth tutorials, real-world projects, and practical insights.</p>
              <div className={styles.socials}>
                <a href="#" aria-label="Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
                <a href="#" aria-label="GitHub">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.84 3.14 8.94 7.49 10.39.55.1.75-.24.75-.53v-2.06c-3.05.67-3.69-1.31-3.69-1.31-.5-1.27-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.91.1-.71.39-1.2.7-1.47-2.43-.28-5-1.22-5-5.41 0-1.19.43-2.17 1.13-2.93-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.12a10.5 10.5 0 0 1 5.5 0c2.1-1.42 3.02-1.12 3.02-1.12.6 1.52.22 2.64.11 2.92.7.76 1.13 1.74 1.13 2.93 0 4.2-2.57 5.13-5.02 5.4.4.35.75 1.03.75 2.08v3.08c0 .29.2.64.76.53A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.02h.05c.53-1 1.85-2.06 3.8-2.06 4.06 0 4.82 2.67 4.82 6.14V23h-4v-6.78c0-1.62-.03-3.7-2.25-3.7-2.26 0-2.6 1.76-2.6 3.58V23h-4V8.25z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className={styles.footerCol}>
              <h5>Quick Links</h5>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/articles">Articles</a></li>
                <li><a href="/categories">Categories</a></li>
                <li><a href="/resources">Resources</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h5>Categories</h5>
              <ul>
                <li><a href="/categories">Frontend</a></li>
                <li><a href="/categories">Backend</a></li>
                <li><a href="/categories">DevOps</a></li>
                <li><a href="/categories">Databases</a></li>
                <li><a href="/categories">AI &amp; ML</a></li>
                <li><a href="/categories">Career</a></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h5>Newsletter</h5>
              <p>Get the best content straight to your inbox.</p>
              <div className={styles.footerNews}>
                <input type="email" placeholder="Enter your email" id="footerNewsletter" />
                <button aria-label="Subscribe" onClick={handleFooterNewsletter}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© 2026 The Coding Ledger. All rights reserved.</span>
            <span>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}