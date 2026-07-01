'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './categories.module.css';

// ---------- Category data ----------
const categoriesData = [
  {
    name: 'Frontend',
    count: '126 articles',
    icon: '🎨',
    color: '#6C4DF6',
    img: 'https://picsum.photos/id/48/500/400',
    desc: 'UI, CSS, accessibility, and everything users touch.',
  },
  {
    name: 'React',
    count: '86 articles',
    icon: '⚛',
    color: '#0ea5e9',
    img: 'https://picsum.photos/id/180/500/400',
    desc: 'Hooks, state, server components, and the ecosystem.',
  },
  {
    name: 'Node.js',
    count: '74 articles',
    icon: '⬡',
    color: '#3c873a',
    img: 'https://picsum.photos/id/119/500/400',
    desc: 'Runtime internals, APIs, and backend patterns.',
  },
  {
    name: 'Backend',
    count: '92 articles',
    icon: '🗄',
    color: '#8B5CF6',
    img: 'https://picsum.photos/id/1/500/400',
    desc: 'Architecture, auth, and building things that scale.',
  },
  {
    name: 'AI & ML',
    count: '48 articles',
    icon: '🧠',
    color: '#A855F7',
    img: 'https://picsum.photos/id/2/500/400',
    desc: 'LLMs, prompting, and shipping AI features responsibly.',
  },
  {
    name: 'DevOps',
    count: '52 articles',
    icon: '☁',
    color: '#3b82f6',
    img: 'https://picsum.photos/id/60/500/400',
    desc: 'CI/CD, containers, and infrastructure that doesn’t page you at 3am.',
  },
  {
    name: 'Career',
    count: '36 articles',
    icon: '💼',
    color: '#f59e0b',
    img: 'https://picsum.photos/id/26/500/400',
    desc: 'Interviews, negotiation, and growing without burning out.',
  },
  {
    name: 'Databases',
    count: '47 articles',
    icon: '🗃',
    color: '#6C4DF6',
    img: 'https://picsum.photos/id/180/500/401',
    desc: 'Schema design, indexing, and query performance.',
  },
];

export default function CategoriesPage() {
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
            <a href="/categories" className={styles.active}>Categories</a>
            <a href="/resources">Resources</a>
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
        <a href="/categories" className={styles.active} onClick={closeMobile}>Categories</a>
        <a href="/resources" onClick={closeMobile}>Resources</a>
        <a href="/about" onClick={closeMobile}>About</a>
        <a href="/contact" onClick={closeMobile}>Contact</a>
        <a href="/contact" className={styles.btnPrimary} style={{ textAlign: 'center', marginTop: '12px' }} onClick={closeMobile}>
          Get Started
        </a>
      </div>

      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.eyebrow} style={{ justifyContent: 'center' }}>TOPICS</div>
          <h1>Browse by <span>category.</span></h1>
          <p>Eight focus areas, updated constantly. Pick a lane, or explore them all.</p>
        </div>
      </section>

      {/* Category Photo Cards */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.catPhotoGrid}>
            {categoriesData.map((cat, idx) => (
              <div
                key={idx}
                className={styles.catPhotoCard}
                onClick={() => showToast(`Showing ${cat.name} articles`, 'info')}
              >
                <img src={cat.img} alt={`${cat.name} category`} loading="lazy" />
                <div className={styles.catPhotoOverlay}></div>
                <div
                  className={styles.catPhotoIcon}
                  style={{ background: `linear-gradient(135deg,${cat.color},#A855F7)` }}
                >
                  {cat.icon}
                </div>
                <div className={styles.catArrow}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
                <div className={styles.catPhotoContent}>
                  <h3>{cat.name}</h3>
                  <span>{cat.count}</span>
                  <p>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <h2>Learning Paths</h2>
              <p>Structured roadmaps that string categories together into a plan</p>
            </div>
          </div>
          <div className={styles.pathGrid}>
            <div className={styles.pathCard}>
              <div className={styles.pathHead}>
                <div>
                  <h3>Become a Frontend Developer</h3>
                  <div className={styles.pathMeta}>12 Modules · Beginner to Advanced</div>
                </div>
              </div>
              <div className={styles.roadmap}>
                <div className={styles.roadStep}><span className={styles.ico} style={{ background: '#e34c26' }}>H</span>HTML</div>
                <span className={styles.roadArrow}>→</span>
                <div className={styles.roadStep}><span className={styles.ico} style={{ background: '#264de4' }}>C</span>CSS</div>
                <span className={styles.roadArrow}>→</span>
                <div className={styles.roadStep}><span className={styles.ico} style={{ background: '#f0db4f', color: '#222' }}>JS</span>JavaScript</div>
                <span className={styles.roadArrow}>→</span>
                <div className={styles.roadStep}><span className={styles.ico} style={{ background: '#20232a' }}>⚛</span>React</div>
                <span className={styles.roadArrow}>→</span>
                <div className={styles.roadStep}><span className={styles.ico} style={{ background: '#000' }}>N</span>Next.js</div>
              </div>
              <div className={styles.progressRow}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '25%' }}></div>
                </div>
                <span>25%</span>
              </div>
            </div>
            <div className={styles.pathCard}>
              <div className={styles.pathHead}>
                <div>
                  <h3>Backend Developer Roadmap</h3>
                  <div className={styles.pathMeta}>10 Modules · Beginner to Advanced</div>
                </div>
              </div>
              <div className={styles.roadmap}>
                <div className={styles.roadStep}><span className={styles.ico} style={{ background: '#3c873a' }}>N</span>Node</div>
                <span className={styles.roadArrow}>→</span>
                <div className={styles.roadStep}><span className={styles.ico} style={{ background: '#000' }}>E</span>Express</div>
                <span className={styles.roadArrow}>→</span>
                <div className={styles.roadStep}><span className={styles.ico} style={{ background: '#13aa52' }}>M</span>MongoDB</div>
                <span className={styles.roadArrow}>→</span>
                <div className={styles.roadStep}><span className={styles.ico} style={{ background: '#6C4DF6' }}>A</span>Auth</div>
                <span className={styles.roadArrow}>→</span>
                <div className={styles.roadStep}><span className={styles.ico} style={{ background: '#3b82f6' }}>D</span>Deployment</div>
              </div>
              <div className={styles.progressRow}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '30%' }}></div>
                </div>
                <span>30%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.newsletter}>
            <div className={styles.newsGrid}>
              <div className={styles.newsLeft}>
                <h2>Follow a category.<br />Get only what you need.</h2>
                <p>Subscribe and tell us which categories matter to you — we'll route the right tutorials your way.</p>
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