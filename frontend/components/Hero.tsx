"use client";

import Link from "next/link";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import styles from "@/styles/home.module.css";

export default function Hero() {
  const typingText = useTypingEffect();

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`}>
        <div>
          <div className={styles.eyebrow}>WELCOME TO THE CODING LEDGER</div>
          <h1>
            Insights that
            <br />
            empower <span>{typingText}</span>
            <span className={styles.typingCursor} />
          </h1>
          <p>
            Modern tutorials, real-world projects, career advice, and everything you need to grow in software engineering.
          </p>
          <div className={styles.heroCta}>
            <Link href="/articles" className={`${styles.btnLg} ${styles.primary}`}>
              Explore Articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/categories" className={`${styles.btnLg} ${styles.outline}`}>
              Browse Categories
            </Link>
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
            <div className={styles.vscodeBar}><span /><span /><span /></div>
            <div className={styles.vscodeBody}>
              <div><span className={styles.kw}>const</span> developer = {"{"}</div>
              <div>&nbsp;&nbsp;problemSolving: <span className={styles.kw}>true</span>,</div>
              <div>&nbsp;&nbsp;coffee: <span className={styles.str}>&apos;always&apos;</span>,</div>
              <div>&nbsp;&nbsp;<span className={styles.prop}>code</span>: <span className={styles.str}>&apos;everyday&apos;</span></div>
              <div>{"};"}</div>
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
            <div className={styles.laptopBase} />
          </div>
          <div className={`${styles.floatCard} ${styles.mug}`} />
          <div className={`${styles.floatCard} ${styles.plant}`}>
            <svg width="90" height="100" viewBox="0 0 90 100">
              <rect x="28" y="70" width="34" height="28" rx="6" fill="#3a2d6b" />
              <path d="M45 70 Q20 50 25 20 Q45 35 45 70" fill="#7c5cf0" />
              <path d="M45 70 Q70 50 65 20 Q45 35 45 70" fill="#A855F7" />
            </svg>
          </div>
          <div className={`${styles.floatCard} ${styles.notebook}`}>
            <div style={{ width: 34, height: 3, background: "#A855F7", borderRadius: 2, marginBottom: 8 }} />
            <div style={{ width: 50, height: 3, background: "rgba(255,255,255,.3)", borderRadius: 2, marginBottom: 6 }} />
            <div style={{ width: 40, height: 3, background: "rgba(255,255,255,.3)", borderRadius: 2 }} />
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
          <div className={styles.floatDot} style={{ top: 60, right: 120, animationDelay: ".5s" }} />
          <div className={styles.floatDot} style={{ top: 220, left: 60, animationDelay: "1.5s" }} />
          <div className={styles.floatDot} style={{ bottom: 80, right: 200, animationDelay: "2s" }} />
        </div>
      </div>
    </section>
  );
}
