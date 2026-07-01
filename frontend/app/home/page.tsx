'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './home.module.css';

// ---------- Data ----------
const categoriesData = [
  { name: 'Frontend', count: '126 articles', icon: '🎨', color: '#6C4DF6' },
  { name: 'React', count: '86 articles', icon: '⚛', color: '#61DAFB' },
  { name: 'Node.js', count: '74 articles', icon: '⬡', color: '#3c873a' },
  { name: 'Backend', count: '92 articles', icon: '🗄', color: '#8B5CF6' },
  { name: 'AI & ML', count: '48 articles', icon: '🧠', color: '#A855F7' },
  { name: 'DevOps', count: '52 articles', icon: '☁', color: '#3b82f6' },
  { name: 'Career', count: '36 articles', icon: '💼', color: '#f59e0b' },
  { name: 'Databases', count: '47 articles', icon: '🗃', color: '#6C4DF6' },
];

const tutorialsData = [
  { tag: 'JavaScript', title: 'Top 10 JavaScript Array Methods', time: '7 min read', views: '2.1K views', author: 'https://i.pravatar.cc/40?img=5', img: 'https://picsum.photos/id/119/400/300' },
  { tag: 'Tailwind CSS', title: 'Build a Modern Landing Page', time: '12 min read', views: '3.8K views', author: 'https://i.pravatar.cc/40?img=8', img: 'https://picsum.photos/id/48/400/300' },
  { tag: 'React', title: 'React Hooks Complete Guide', time: '15 min read', views: '4.5K views', author: 'https://i.pravatar.cc/40?img=22', img: 'https://picsum.photos/id/180/400/300' },
  { tag: 'TypeScript', title: 'Why TypeScript Makes You Better', time: '10 min read', views: '2.9K views', author: 'https://i.pravatar.cc/40?img=14', img: 'https://picsum.photos/id/60/400/300' },
  { tag: 'Next.js', title: 'Server Components Explained', time: '11 min read', views: '3.3K views', author: 'https://i.pravatar.cc/40?img=19', img: 'https://picsum.photos/id/1/400/300' },
];

const resourcesData = [
  { icon: '🎁', color: '#6C4DF6', title: 'Free UI Kits', desc: 'Beautiful UI kits for your next project.' },
  { icon: '⌥', color: '#A855F7', title: 'Git Cheat Sheet', desc: 'Essential Git commands in one place.' },
  { icon: '🎨', color: '#3b82f6', title: 'VS Code Themes', desc: 'Best themes to boost your productivity.' },
  { icon: '✦', color: '#8B5CF6', title: 'Icons & Illustrations', desc: 'Free icons and illustrations for developers.' },
  { icon: '⚒', color: '#22c55e', title: 'Open Source Projects', desc: 'Curated list of amazing open source projects.' },
];

const faqsData = [
  { q: 'How often do you publish new articles?', a: 'We publish 3-4 new tutorials and articles every week, covering frontend, backend, and career topics.' },
  { q: 'Are the tutorials completely free?', a: 'Yes — all core tutorials are free. We also offer optional premium deep-dives for subscribers.' },
  { q: 'Can I contribute to The Coding Ledger?', a: 'Absolutely. We welcome guest writers — reach out via the Contact page to pitch an article.' },
  { q: 'Do you offer premium content?', a: 'We do! Premium members get early access, downloadable resources, and exclusive guides.' },
  { q: 'How can I stay updated with new content?', a: 'Subscribe to our weekly newsletter or follow us on social media for new releases.' },
  { q: 'Can I use the code from your tutorials?', a: 'Yes, all code snippets are free to use in personal and commercial projects.' },
];

export default function HomePage() {
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
  const [featuredPlaying, setFeaturedPlaying] = useState(false);
  const [typingText, setTypingText] = useState('developers');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // refs for observers and video
  const statsRef = useRef<HTMLDivElement>(null);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // ---------- reveal animations ----------
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

  // ---------- typing effect ----------
  useEffect(() => {
    const words = ['developers', 'engineers', 'creators', 'innovators', 'problem solvers'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setTypingText(currentWord.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typingTimerRef.current = setTimeout(typeEffect, 800);
          return;
        }
        typingTimerRef.current = setTimeout(typeEffect, 40);
      } else {
        setTypingText(currentWord.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentWord.length) {
          isDeleting = true;
          typingTimerRef.current = setTimeout(typeEffect, 2000);
          return;
        }
        typingTimerRef.current = setTimeout(typeEffect, 80);
      }
    };

    typingTimerRef.current = setTimeout(typeEffect, 1000);
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  // ---------- featured video play ----------
  const handleFeaturedPlay = () => {
    if (featuredVideoRef.current) {
      setFeaturedPlaying(true);
      featuredVideoRef.current.currentTime = 0;
      featuredVideoRef.current.play().catch(() => {});
    }
  };
  const handleFeaturedEnded = () => setFeaturedPlaying(false);

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

  // ---------- search handler ----------
  const handleSearch = () => showToast('🔍 Search feature coming soon!', 'info');

  // ---------- FAQ toggle ----------
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
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
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navInner}`}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoMark}>{' { }'}</span>
            The Coding Ledger
          </a>
          <nav className={styles.navLinks} aria-label="Main navigation">
            <a href="/" className={styles.active}>Home</a>
            <a href="/articles">Articles</a>
            <a href="/categories">Categories</a>
            <a href="/resources">Resources</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className={styles.navActions}>
            <button className={styles.iconBtn} aria-label="Search" onClick={handleSearch}>
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
            <a href="#" className={styles.btnGhost}>Sign In</a>
            <a href="#" className={styles.btnPrimary}>Get Started</a>
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
        <a href="/" className={styles.active} onClick={closeMobile}>Home</a>
        <a href="/articles" onClick={closeMobile}>Articles</a>
        <a href="/categories" onClick={closeMobile}>Categories</a>
        <a href="/resources" onClick={closeMobile}>Resources</a>
        <a href="/about" onClick={closeMobile}>About</a>
        <a href="/contact" onClick={closeMobile}>Contact</a>
        <a href="/contact" className={styles.btnPrimary} style={{ textAlign: 'center', marginTop: '12px' }} onClick={closeMobile}>
          Get Started
        </a>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <div className={styles.eyebrow}>WELCOME TO THE CODING LEDGER</div>
            <h1>
              Insights that<br />empower <span id="typingText">{typingText}</span>
              <span className={styles.typingCursor}></span>
            </h1>
            <p>Modern tutorials, real-world projects, career advice, and everything you need to grow in software engineering.</p>
            <div className={styles.heroCta}>
              <a href="/articles" className={`${styles.btnLg} ${styles.primary}`}>
                Explore Articles
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="/categories" className={`${styles.btnLg} ${styles.outline}`}>Browse Categories</a>
            </div>
            <div className={styles.trustRow}>
              <div className={styles.avatars}>
                <img src="https://i.pravatar.cc/72?img=12" alt="Developer avatar" loading="lazy" />
                <img src="https://i.pravatar.cc/72?img=32" alt="Developer avatar" loading="lazy" />
                <img src="https://i.pravatar.cc/72?img=47" alt="Developer avatar" loading="lazy" />
              </div>
              <div>
                <div className={styles.stars}>★★★★★</div>
                <div className={styles.trustText}>Trusted by 12,000+ developers</div>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={`${styles.floatCard} ${styles.vscodeWin}`}>
              <div className={styles.vscodeBar}>
                <span></span><span></span><span></span>
              </div>
              <div className={styles.vscodeBody}>
                <div><span className={styles.kw}>const</span> developer = {'{'}</div>
                <div>&nbsp;&nbsp;problemSolving: <span className={styles.kw}>true</span>,</div>
                <div>&nbsp;&nbsp;coffee: <span className={styles.str}>'always'</span>,</div>
                <div>&nbsp;&nbsp;<span className={styles.prop}>code</span>: <span className={styles.str}>'everyday'</span></div>
                <div>{'}'};</div>
              </div>
            </div>
            <div className={`${styles.floatCard} ${styles.laptop}`}>
              <div className={styles.laptopFrame}>
                <div className={styles.laptopScreen}>
                  <video className={styles.laptopVideo} autoPlay muted loop playsInline poster="https://picsum.photos/id/60/300/170">
                    <source src="https://assets.mixkit.co/videos/41646/41646-720.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className={styles.laptopBase}></div>
            </div>
            <div className={`${styles.floatCard} ${styles.mug}`}></div>
            <div className={`${styles.floatCard} ${styles.plant}`}>
              <svg width="90" height="100" viewBox="0 0 90 100">
                <rect x="28" y="70" width="34" height="28" rx="6" fill="#3a2d6b" />
                <path d="M45 70 Q20 50 25 20 Q45 35 45 70" fill="#7c5cf0" />
                <path d="M45 70 Q70 50 65 20 Q45 35 45 70" fill="#A855F7" />
              </svg>
            </div>
            <div className={`${styles.floatCard} ${styles.notebook}`}>
              <div style={{ width: '34px', height: '3px', background: '#A855F7', borderRadius: '2px', marginBottom: '8px' }}></div>
              <div style={{ width: '50px', height: '3px', background: 'rgba(255,255,255,.3)', borderRadius: '2px', marginBottom: '6px' }}></div>
              <div style={{ width: '40px', height: '3px', background: 'rgba(255,255,255,.3)', borderRadius: '2px' }}></div>
            </div>
            <div className={`${styles.iconChip} ${styles.chipReact}`}>⚛</div>
            <div className={`${styles.iconChip} ${styles.chipNode}`}>⬡</div>
            <div className={`${styles.iconChip} ${styles.chipGit}`}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#171029">
                <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 1 1-1.103 1.103l-2.48-2.48v6.526a1.837 1.837 0 1 1-1.51-.054V8.978a1.838 1.838 0 0 1-.998-2.41L7.687 3.892.452 11.128a1.55 1.55 0 0 0 0 2.188l10.479 10.478a1.55 1.55 0 0 0 2.188 0l10.427-10.427a1.55 1.55 0 0 0 0-2.188" />
              </svg>
            </div>
            <div className={styles.phone}>
              <video className={styles.phoneScreen} autoPlay muted loop playsInline poster="https://picsum.photos/id/1/80/160">
                <source src="https://assets.mixkit.co/videos/41659/41659-720.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={styles.floatDot} style={{ top: '60px', right: '120px', animationDelay: '.5s' }}></div>
            <div className={styles.floatDot} style={{ top: '220px', left: '60px', animationDelay: '1.5s' }}></div>
            <div className={styles.floatDot} style={{ bottom: '80px', right: '200px', animationDelay: '2s' }}></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className={`container ${styles.reveal}`}>
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

      {/* Featured Article */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>Featured Article</h2>
          </div>
          <div className={styles.featuredCard}>
            <div className={`${styles.featuredImg} ${featuredPlaying ? styles.playing : ''}`}>
              <img className={styles.featuredPhoto} src="https://picsum.photos/id/180/900/700" alt="Developer's dual-monitor coding setup" loading="lazy" />
              <video
                ref={featuredVideoRef}
                className={styles.featuredVideo}
                muted
                loop={false}
                playsInline
                onEnded={handleFeaturedEnded}
              >
                <source src="https://assets.mixkit.co/videos/41659/41659-720.mp4" type="video/mp4" />
              </video>
              <button className={styles.playBtn} onClick={handleFeaturedPlay} aria-label="Play preview">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
            <div className={styles.featuredBody}>
              <div className={styles.tagPill}>FEATURED ARTICLE</div>
              <h3>How I Built a Scalable Blog Platform with Next.js</h3>
              <p>A behind-the-scenes look at the architecture, features, and lessons learned while building The Coding Ledger from the ground up.</p>
              <div className={styles.authorRow}>
                <img src="https://i.pravatar.cc/72?img=51" alt="Solomon Mboni" loading="lazy" />
                <div>
                  <div className={styles.authorName}>Solomon Mboni</div>
                  <div className={styles.authorMeta}>May 20, 2024 · 12 min read</div>
                </div>
              </div>
              <a
                href="#"
                className={styles.readMore}
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Article loaded successfully!', 'success');
                }}
              >
                Continue Reading
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <h2>Trending Articles</h2>
              <p>What developers are reading right now</p>
            </div>
            <a href="/articles" className={styles.viewAll}>
              View all articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <div className={styles.trendGrid}>
            <div className={`${styles.trendCard} ${styles.span22} ${styles.hoverVideo}`} style={{ background: '#1a1235' }} onClick={() => showToast('Article: Building a REST API with Node.js & Express', 'info')}>
              <img className={styles.tImg} src="https://picsum.photos/id/119/700/500" alt="Server room and backend infrastructure" loading="lazy" />
              <video className={styles.tVideo} muted loop playsInline preload="none">
                <source src="https://assets.mixkit.co/videos/41646/41646-720.mp4" type="video/mp4" />
              </video>
              <div className={styles.tOverlay}></div>
              <div className={styles.bookmark}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className={styles.tContent}>
                <span className={styles.tCat}>Web Development</span>
                <div className={styles.tTitle}>Building a REST API with Node.js &amp; Express</div>
                <div className={styles.tMeta}>10 min read · May 18, 2024 · hover to preview</div>
              </div>
            </div>
            <div className={`${styles.trendCard} ${styles.span11}`} style={{ background: '#1a1235' }} onClick={() => showToast('Article: Designing a Dashboard Users Love', 'info')}>
              <img className={styles.tImg} src="https://picsum.photos/id/48/500/500" alt="Designer reviewing dashboard UI on screen" loading="lazy" />
              <div className={styles.tOverlay}></div>
              <div className={styles.bookmark}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className={styles.tContent}>
                <span className={styles.tCat}>UI/UX Design</span>
                <div className={styles.tTitle}>Designing a Dashboard Users Love</div>
                <div className={styles.tMeta}>9 min read · May 17, 2024</div>
              </div>
            </div>
            <div className={`${styles.trendCard} ${styles.span11}`} style={{ background: '#1a1235' }} onClick={() => showToast('Article: State Management in React Explained', 'info')}>
              <img className={styles.tImg} src="https://picsum.photos/id/180/500/500" alt="Developer working with React code on dual monitors" loading="lazy" />
              <div className={styles.tOverlay}></div>
              <div className={styles.bookmark}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className={styles.tContent}>
                <span className={styles.tCat}>React</span>
                <div className={styles.tTitle}>State Management in React Explained</div>
                <div className={styles.tMeta}>8 min read · May 15, 2024</div>
              </div>
            </div>
            <div className={`${styles.trendCard} ${styles.span11}`} style={{ background: '#1a1235' }} onClick={() => showToast('Article: Deploying a Full-Stack App with Docker & Render', 'info')}>
              <img className={styles.tImg} src="https://picsum.photos/id/1/500/500" alt="Cloud servers and deployment infrastructure" loading="lazy" />
              <div className={styles.tOverlay}></div>
              <div className={styles.bookmark}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className={styles.tContent}>
                <span className={styles.tCat}>DevOps</span>
                <div className={styles.tTitle}>Deploying a Full-Stack App with Docker &amp; Render</div>
                <div className={styles.tMeta}>11 min read · May 14, 2024</div>
              </div>
            </div>
            <div className={`${styles.trendCard} ${styles.span11}`} style={{ background: '#1a1235' }} onClick={() => showToast('Article: MongoDB Aggregation Pipeline Explained', 'info')}>
              <img className={styles.tImg} src="https://picsum.photos/id/60/500/500" alt="Database schema and data on a laptop screen" loading="lazy" />
              <div className={styles.tOverlay}></div>
              <div className={styles.bookmark}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className={styles.tContent}>
                <span className={styles.tCat}>Databases</span>
                <div className={styles.tTitle}>MongoDB Aggregation Pipeline Explained</div>
                <div className={styles.tMeta}>9 min read · May 13, 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <h2>Browse Categories</h2>
              <p>Find the topics that matter to you</p>
            </div>
            <a href="/categories" className={styles.viewAll}>
              View all categories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <div className={styles.catGrid}>
            {categoriesData.map((cat, idx) => (
              <div
                key={idx}
                className={styles.catCard}
                onClick={() => showToast(`Showing ${cat.name} articles`, 'info')}
              >
                <div className={styles.catIcon} style={{ background: `linear-gradient(135deg,${cat.color},#A855F7)` }}>
                  {cat.icon}
                </div>
                <h4>{cat.name}</h4>
                <span>{cat.count}</span>
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
              <p>Follow structured roadmaps to your goal</p>
            </div>
            <a href="#" className={styles.viewAll}>
              View all paths
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
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

      {/* Tutorials */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <h2>Latest Tutorials</h2>
              <p>Hands-on guides, updated weekly</p>
            </div>
            <a href="/articles" className={styles.viewAll}>
              View all tutorials
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <div className={styles.tutGrid}>
            {tutorialsData.map((tut, idx) => (
              <div key={idx} className={styles.tutCard} onClick={() => showToast(`Loading tutorial: ${tut.title}`, 'info')}>
                <div className={styles.tutImg}>
                  <img className={styles.tImg} src={tut.img} alt={tut.title} loading="lazy" />
                  <span className={styles.tutCat}>{tut.tag}</span>
                  <div className={styles.tutBookmark}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.tutBody}>
                  <h4>{tut.title}</h4>
                  <div className={styles.tutFoot}>
                    <div className={styles.author}>
                      <img src={tut.author} alt="" loading="lazy" />
                      {tut.time}
                    </div>
                    <span>{tut.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <div>
              <h2>Developer Resources</h2>
              <p>Practical tools and downloads</p>
            </div>
            <a href="/resources" className={styles.viewAll}>
              View all resources
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
          <div className={styles.resGrid}>
            {resourcesData.map((res, idx) => (
              <div key={idx} className={styles.resCard} onClick={() => showToast(`Downloading ${res.title}...`, 'success')}>
                <div className={styles.resIcon} style={{ background: `linear-gradient(135deg,${res.color},var(--accent))` }}>
                  {res.icon}
                </div>
                <h4>{res.title}</h4>
                <p>{res.desc}</p>
                <a
                  href="#"
                  className={styles.resLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast(`Downloading ${res.title}...`, 'success');
                  }}
                >
                  Download
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </a>
              </div>
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
                <h2>Stay Ahead.<br />Get Weekly Developer Insights.</h2>
                <p>Receive tutorials, career advice, resources, and exclusive articles straight to your inbox — every week, no fluff.</p>
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

      {/* Testimonials */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>What Developers Say</h2>
          </div>
          <div className={styles.testiTrack}>
            <div className={styles.testiCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>"The Coding Ledger helped me go from confused to confident developer."</p>
              <div className={styles.testiAuthor}>
                <img src="https://i.pravatar.cc/72?img=15" alt="Alex Johnson" loading="lazy" />
                <div>
                  <div className={styles.name}>Alex Johnson</div>
                  <div className={styles.role}>Frontend Developer</div>
                </div>
              </div>
            </div>
            <div className={styles.testiCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>"The tutorials are practical, modern, and easy to follow. My go-to blog!"</p>
              <div className={styles.testiAuthor}>
                <img src="https://i.pravatar.cc/72?img=27" alt="Sarah Williams" loading="lazy" />
                <div>
                  <div className={styles.name}>Sarah Williams</div>
                  <div className={styles.role}>Software Engineer</div>
                </div>
              </div>
            </div>
            <div className={styles.testiCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>"I landed my dream job by following the career advice and roadmaps."</p>
              <div className={styles.testiAuthor}>
                <img src="https://i.pravatar.cc/72?img=33" alt="David Miller" loading="lazy" />
                <div>
                  <div className={styles.name}>David Miller</div>
                  <div className={styles.role}>Full Stack Developer</div>
                </div>
              </div>
            </div>
            <div className={styles.testiCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>"Clean design, great content, and super valuable resources."</p>
              <div className={styles.testiAuthor}>
                <img src="https://i.pravatar.cc/72?img=44" alt="Emma Davis" loading="lazy" />
                <div>
                  <div className={styles.name}>Emma Davis</div>
                  <div className={styles.role}>UI/UX Designer</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.testiNav}>
            <button aria-label="Previous testimonial" onClick={() => showToast('Previous testimonial', 'info')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button aria-label="Next testimonial" onClick={() => showToast('Next testimonial', 'info')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqGrid}>
            {faqsData.map((faq, idx) => (
              <div
                key={idx}
                className={`${styles.faqItem} ${openFaq === idx ? styles.open : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className={styles.faqQ}>
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div className={styles.faqA}>{faq.a}</div>
              </div>
            ))}
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
                <a href="#" aria-label="Dev">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6v4.5h.58c.38 0 .66-.08.84-.23.18-.16.27-.42.27-.78v-2.5c0-.36-.09-.61-.27-.76zM24 12c0 6.63-5.37 12-12 12S0 18.63 0 12 5.37 0 12 0s12 5.37 12 12zM8.56 9.05H4.25v7.9h4.27c.65 0 1.18-.13 1.6-.4.42-.27.7-.63.84-1.07.14-.44.21-1.02.21-1.74v-1.5c0-.72-.07-1.3-.21-1.74-.14-.44-.42-.8-.84-1.07-.42-.27-.95-.38-1.56-.38zm6.3 0h-4.4v7.9h4.4v-1.55h-2.62v-1.6h2.3v-1.5h-2.3v-1.7h2.62V9.05zm5.4 7.9l-2.4-7.9h1.85l1.42 5.6 1.4-5.6h1.85l-2.4 7.9h-1.72z" />
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