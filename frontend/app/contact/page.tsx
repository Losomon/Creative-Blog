'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import styles from './contact.module.css';

// ---------- FAQ data ----------
const faqsData = [
  {
    q: 'How long until I hear back?',
    a: 'Usually within 2 business days. Article pitches can take a little longer since an editor reviews each one.',
  },
  {
    q: 'Do you accept guest posts?',
    a: 'Yes — check the About page for what we look for, then send a pitch through this form or that page.',
  },
  {
    q: 'Found a typo or bug in an article?',
    a: 'Select "Correction / typo" as the topic and include the article title and a link if you have it.',
  },
  {
    q: 'Can I advertise or sponsor a newsletter issue?',
    a: 'Select "Partnership" and tell us a bit about what you have in mind.',
  },
];

type FormErrors = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // ---------- form validation ----------
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = { name: '', email: '', subject: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }
    if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Enter a valid email';
      isValid = false;
    }
    if (!formData.subject) {
      newErrors.subject = 'Pick a topic';
      isValid = false;
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ---------- form submission ----------
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please fix the highlighted fields', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const firstName = formData.name.split(' ')[0] || 'there';
      showToast(`✅ Thanks ${firstName}! We'll reply to ${formData.email} soon.`, 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  // ---------- input change handler ----------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  // ---------- newsletter handlers ----------
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

  // ---------- FAQ toggle ----------
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
            <a href="/resources">Resources</a>
            <a href="/about">About</a>
            <a href="/contact" className={styles.active}>Contact</a>
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
        <a href="/about" onClick={closeMobile}>About</a>
        <a href="/contact" className={styles.active} onClick={closeMobile}>Contact</a>
        <a href="/contact" className={styles.btnPrimary} style={{ textAlign: 'center', marginTop: '12px' }} onClick={closeMobile}>
          Get Started
        </a>
      </div>

      {/* Page Hero */}
      <section className={styles.pageHero}>
        <div className="container">
          <div className={styles.eyebrow} style={{ justifyContent: 'center' }}>GET IN TOUCH</div>
          <h1>Let's talk <span>shop.</span></h1>
          <p>Questions, pitches, corrections, or just want to say hi — this goes straight to a real person, not a ticket queue.</p>
        </div>
      </section>

      {/* Contact section */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          {/* Info cards */}
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg,#6C4DF6,#A855F7)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z" opacity="0" />
                  <path d="M22 6l-10 7L2 6" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </div>
              <h4>Email us</h4>
              <p>For general questions or feedback.</p>
              <a href="mailto:hello@thecodingledger.example">hello@thecodingledger.example</a>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg,#3b82f6,#A855F7)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h4>Response time</h4>
              <p>We read everything and reply personally.</p>
              <a href="#contactForm">Usually within 2 business days</a>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon} style={{ background: 'linear-gradient(135deg,#22c55e,#A855F7)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h4>Guest writing</h4>
              <p>Pitching an article? Use the About page.</p>
              <a href="/about">Go to About →</a>
            </div>
          </div>

          {/* Contact form + side panel */}
          <div className={styles.contactGrid} id="contactForm">
            <div className={styles.formCard}>
              <h3>Send a message</h3>
              <p>Fill this out and we'll get back to you at the email you provide.</p>
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Jane Developer"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <div className={styles.fieldError}>{errors.name}</div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <div className={styles.fieldError}>{errors.email}</div>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label htmlFor="subject">What's this about?</label>
                    <select id="subject" value={formData.subject} onChange={handleChange}>
                      <option value="">Select a topic</option>
                      <option value="General question">General question</option>
                      <option value="Article pitch">Article pitch</option>
                      <option value="Correction / typo">Correction or typo</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className={styles.fieldError}>{errors.subject}</div>
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      placeholder="What's on your mind?"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <div className={styles.fieldError}>{errors.message}</div>
                  </div>
                </div>
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </button>
              </form>
            </div>

            <div className={styles.sidePanel}>
              <div className={styles.sideCard}>
                <h4>Response hours</h4>
                <div className={styles.hoursRow}>
                  <span>Monday – Friday</span>
                  <span>9am – 6pm</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Saturday</span>
                  <span>10am – 2pm</span>
                </div>
                <div className={styles.hoursRow}>
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className={`${styles.sideCard} ${styles.gradient}`}>
                <h4>Follow along</h4>
                <p>Faster than email for quick questions — we're active here daily.</p>
                <div className={styles.sideSocial}>
                  <a href="#" aria-label="Twitter">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="GitHub">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.84 3.14 8.94 7.49 10.39.55.1.75-.24.75-.53v-2.06c-3.05.67-3.69-1.31-3.69-1.31-.5-1.27-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.91.1-.71.39-1.2.7-1.47-2.43-.28-5-1.22-5-5.41 0-1.19.43-2.17 1.13-2.93-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.12a10.5 10.5 0 0 1 5.5 0c2.1-1.42 3.02-1.12 3.02-1.12.6 1.52.22 2.64.11 2.92.7.76 1.13 1.74 1.13 2.93 0 4.2-2.57 5.13-5.02 5.4.4.35.75 1.03.75 2.08v3.08c0 .29.2.64.76.53A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="LinkedIn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.02h.05c.53-1 1.85-2.06 3.8-2.06 4.06 0 4.82 2.67 4.82 6.14V23h-4v-6.78c0-1.62-.03-3.7-2.25-3.7-2.26 0-2.6 1.76-2.6 3.58V23h-4V8.25z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.section} ${styles.reveal}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>Before you write in…</h2>
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