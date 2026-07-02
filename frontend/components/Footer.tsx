"use client";

import Link from "next/link";
import { useToast } from "@/components/ToastProvider";
import styles from "@/styles/home.module.css";

export default function Footer() {
  const { showToast } = useToast();

  const handleFooterNewsletter = () => {
    const input = document.getElementById("footerNewsletter") as HTMLInputElement | null;
    if (input?.value) {
      showToast(`🎉 Subscribed with ${input.value}!`, "success");
      input.value = "";
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <div className={styles.footerLogo}>
              <span className={styles.logoMark}>{"{ }"}</span>
              The Coding Ledger
            </div>
            <p>
              A platform dedicated to helping developers level up their skills through in-depth tutorials, real-world projects, and practical insights.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.84 3.14 8.94 7.49 10.39.55.1.75-.24.75-.53v-2.06c-3.05.67-3.69-1.31-3.69-1.31-.5-1.27-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.91.1-.71.39-1.2.7-1.47-2.43-.28-5-1.22-5-5.41 0-1.19.43-2.17 1.13-2.93-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.12a10.5 10.5 0 0 1 5.5 0c2.1-1.42 3.02-1.12 3.02-1.12.6 1.52.22 2.64.11 2.92.7.76 1.13 1.74 1.13 2.93 0 4.2-2.57 5.13-5.02 5.4.4.35.75 1.03.75 2.08v3.08c0 .29.2.64.76.53A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5z" /></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.02h.05c.53-1 1.85-2.06 3.8-2.06 4.06 0 4.82 2.67 4.82 6.14V23h-4v-6.78c0-1.62-.03-3.7-2.25-3.7-2.26 0-2.6 1.76-2.6 3.58V23h-4V8.25z" /></svg>
              </a>
              <a href="#" aria-label="Dev">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6v4.5h.58c.38 0 .66-.08.84-.23.18-.16.27-.42.27-.78v-2.5c0-.36-.09-.61-.27-.76zM24 12c0 6.63-5.37 12-12 12S0 18.63 0 12 5.37 0 12 0s12 5.37 12 12zM8.56 9.05H4.25v7.9h4.27c.65 0 1.18-.13 1.6-.4.42-.27.7-.63.84-1.07.14-.44.21-1.02.21-1.74v-1.5c0-.72-.07-1.3-.21-1.74-.14-.44-.42-.8-.84-1.07-.42-.27-.95-.38-1.56-.38zm6.3 0h-4.4v7.9h4.4v-1.55h-2.62v-1.6h2.3v-1.5h-2.3v-1.7h2.62V9.05zm5.4 7.9l-2.4-7.9h1.85l1.42 5.6 1.4-5.6h1.85l-2.4 7.9h-1.72z" /></svg>
              </a>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h5>Quick Links</h5>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/articles">Articles</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/resources">Resources</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h5>Categories</h5>
            <ul>
              <li><Link href="/categories">Frontend</Link></li>
              <li><Link href="/categories">Backend</Link></li>
              <li><Link href="/categories">DevOps</Link></li>
              <li><Link href="/categories">Databases</Link></li>
              <li><Link href="/categories">AI &amp; ML</Link></li>
              <li><Link href="/categories">Career</Link></li>
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
  );
}
