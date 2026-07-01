'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './resources.module.css';

// ---------- Resource data ----------
type Resource = {
  icon: string;
  color: string;
  title: string;
  desc: string;
  badge: string;
};

const cheatSheets: Resource[] = [
  { icon: '⌥', color: '#6C4DF6', title: 'Git Cheat Sheet', desc: 'Every command you actually use, on one page.', badge: 'PDF' },
  { icon: '{}', color: '#8B5CF6', title: 'Regex Quick Reference', desc: 'Patterns, flags, and lookaheads without the headache.', badge: 'PDF' },
  { icon: '⌘', color: '#A855F7', title: 'VS Code Shortcuts', desc: 'The 40 shortcuts that actually save time.', badge: 'PDF' },
  { icon: '⚡', color: '#3b82f6', title: 'HTTP Status Codes', desc: 'What each code means and when to use it.', badge: 'Web' },
];

const designResources: Resource[] = [
  { icon: '🎁', color: '#6C4DF6', title: 'Free UI Kits', desc: 'Component kits for Figma and Sketch.', badge: 'Figma' },
  { icon: '✦', color: '#A855F7', title: 'Icons & Illustrations', desc: 'Free icon sets and hand-drawn illustrations.', badge: 'SVG' },
  { icon: '🎨', color: '#3b82f6', title: 'VS Code Themes', desc: 'Editor themes that are easy on the eyes.', badge: 'Theme' },
  { icon: '📐', color: '#8B5CF6', title: 'Design Token Starter', desc: 'A CSS variable system to start any project.', badge: 'CSS' },
];

const ossResources: Resource[] = [
  { icon: '⚒', color: '#22c55e', title: 'Open Source Starters', desc: 'Curated boilerplates worth forking.', badge: 'GitHub' },
  { icon: '🔧', color: '#3c873a', title: 'Awesome Dev Tools', desc: 'A living list of tools we actually use.', badge: 'List' },
  { icon: '🧩', color: '#16a34a', title: 'Component Libraries', desc: 'Battle-tested, accessible, and unstyled.', badge: 'npm' },
  { icon: '📦', color: '#059669', title: 'Self-Hosting Guides', desc: 'Run your own stack without the SaaS bill.', badge: 'Guide' },
];

const learningResources: Resource[] = [
  { icon: '🎓', color: '#f59e0b', title: 'Free Course Roundup', desc: 'The best free courses, sorted by topic.', badge: 'List' },
  { icon: '📺', color: '#ea580c', title: 'YouTube Channels Worth Subscribing To', desc: 'Signal, not noise.', badge: 'List' },
  { icon: '📚', color: '#d97706', title: 'Reading List', desc: 'Books that changed how we write software.', badge: 'List' },
  { icon: '🧪', color: '#f97316', title: 'Practice Platforms', desc: 'Where to actually apply what you learn.', badge: 'List' },
];

// Helper to render a resource card
const ResourceCard = ({ resource, onDownload }: { resource: Resource; onDownload: (title: string) => void }) => (
  <div className={styles.resCard}>
    <div className={styles.resIcon} style={{ background: `linear-gradient(135deg,${resource.color},var(--accent))` }}>
      {resource.icon}
    </div>
    <h4>{resource.title}</h4>
    <p>{resource.desc}</p>
    <div className={styles.resMeta}>
      <span className={styles.resBadge}>{resource.badge}</span>
      <a
        href="#"
        className={styles.resLink}
        onClick={(e) => {
          e.preventDefault();
          onDownload(resource.title);
        }}
      >
        Get it
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </a>
    </div>
  </div>
);

export default function ResourcesPage() {
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

  // ---------- dark mode ----------
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

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

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  // ---------- toast system ----------
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // ---------- resource download handler ----------
  const handleDownload = (title: string) => {
    showToast(`Downloading ${title}...`, 'success');
  };

  // ---------- newsletter handlers ----------
  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.querySelector('#newsletterEmail') as HTMLInputElement)?.value;
    if (email) {
      showToast(`🎉 Subscribed with ${email}!`, 'success');
      e.currentTarget.reset();
    }
  };

  const handleFooterNewsletter = () => {
    const input = document.getElementById('footerNewsletter') as HTMLInputElement;
    if (input?.value) {
      showToast(`🎉 Subscribed with ${input.value}!`, 'success');
      input.value = '';
    }
  };

  // ---------- reveal animation ----------
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

  // ---------- keyboard shortcuts ----------
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileOpen) setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

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
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navInner}`}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoMark}>{' { }'}</span>
            The Coding Ledger
          </a>
          <nav className={styles.navLinks} aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/articles">Articles</a>
            <a href="/categories">Categories</a>
            <a href="/resources" className={styles.active}>Resources</a>
            <a href="/about">About</a>
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
        <a href="/resources" className={styles.active} onClick={closeMobile}>Resources</a>
        <a href="/about" onClick={closeMobile}>About</a>
        <a href="/contact" onClick={closeMobile}>Contact</a>
        <a href="/contact" className={styles.btnPrimary} style={{ textAlign: 'center', marginTop: '12px' }} onClick={closeMobile}>
          Get Started
        </a>
      </div>

      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.eyebrow} style={{ justifyContent: 'center' }}>FREE TOOLS</div>
          <h1>Developer <span>resources.</span></h1>
          <p>Cheat sheets, kits, and curated lists — the practical stuff we reach for constantly, organized so you can too.</p>
        </div>
      </section>

      {/* Cheat Sheets */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>
              <span className={styles.sectionIcon} style={{ background: 'linear-gradient(135deg,#6C4DF6,#A855F7)' }}>⌥</span>
              Cheat Sheets
            </h2>
          </div>
          <div className={styles.resGrid}>
            {cheatSheets.map((r, idx) => (
              <ResourceCard key={idx} resource={r} onDownload={handleDownload} />
            ))}
          </div>
        </div>
      </section>

      {/* UI Kits & Design */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>
              <span className={styles.sectionIcon} style={{ background: 'linear-gradient(135deg,#3b82f6,#A855F7)' }}>🎨</span>
              UI Kits &amp; Design
            </h2>
          </div>
          <div className={styles.resGrid}>
            {designResources.map((r, idx) => (
              <ResourceCard key={idx} resource={r} onDownload={handleDownload} />
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>
              <span className={styles.sectionIcon} style={{ background: 'linear-gradient(135deg,#22c55e,#A855F7)' }}>⚒</span>
              Open Source
            </h2>
          </div>
          <div className={styles.resGrid}>
            {ossResources.map((r, idx) => (
              <ResourceCard key={idx} resource={r} onDownload={handleDownload} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Platforms */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>
              <span className={styles.sectionIcon} style={{ background: 'linear-gradient(135deg,#f59e0b,#A855F7)' }}>🎓</span>
              Learning Platforms
            </h2>
          </div>
          <div className={styles.resGrid}>
            {learningResources.map((r, idx) => (
              <ResourceCard key={idx} resource={r} onDownload={handleDownload} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.newsletter}>
            <div className={styles.newsGrid}>
              <div className={styles.newsLeft}>
                <h2>New resources, every week.</h2>
                <p>We add new cheat sheets and tool roundups constantly — get notified the moment they drop.</p>
                <form className={styles.newsForm} onSubmit={handleNewsletter}>
                  <input type="email" id="newsletterEmail" placeholder="Enter your email address" required />
                  <button type="submit">Subscribe</button>
                </form>
                <div className={styles.newsTags}>
                  <span>✓ No spam</span><span>✓ Unsubscribe anytime</span><span>✓ Weekly emails</span>
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
            <span>© 2024 The Coding Ledger. All rights reserved.</span>
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