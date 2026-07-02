"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { useToast } from "@/components/ToastProvider";
import styles from "@/styles/home.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const { darkMode, toggle } = useDarkMode();
  const { scrolled } = useScrollHeader();
  const { showToast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        showToast("🔍 Search: Type your query...", "info");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showToast]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>{"{ }"}</span>
            The Coding Ledger
          </Link>

          <nav className={styles.navLinks} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? styles.active : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.navActions}>
            <button
              className={styles.iconBtn}
              aria-label="Search"
              onClick={() => showToast("🔍 Search feature coming soon!", "info")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button className={styles.iconBtn} aria-label="Toggle dark mode" onClick={toggle}>
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
            <Link href="#" className={styles.btnGhost}>Sign In</Link>
            <Link href="#" className={styles.btnPrimary}>Get Started</Link>
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.active : ""}`}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.active : ""}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? styles.active : undefined}
            onClick={closeMobile}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className={styles.btnPrimary} style={{ textAlign: "center", marginTop: 12 }} onClick={closeMobile}>
          Get Started
        </Link>
      </div>
    </>
  );
}
