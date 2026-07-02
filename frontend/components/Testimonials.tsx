"use client";

import { TESTIMONIALS } from "@/lib/data";
import { useToast } from "@/components/ToastProvider";
import styles from "@/styles/home.module.css";

export default function Testimonials() {
  const { showToast } = useToast();

  return (
    <section className={`${styles.section} ${styles.reveal}`}>
      <div className="container">
        <div className={styles.sectionHead}>
          <h2>What Developers Say</h2>
        </div>
        <div className={styles.testiTrack}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className={styles.testiCard}>
              <div className={styles.stars}>★★★★★</div>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.testiAuthor}>
                <img src={t.avatar} alt={t.name} loading="lazy" />
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.testiNav}>
          <button aria-label="Previous testimonial" onClick={() => showToast("Previous testimonial", "info")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button aria-label="Next testimonial" onClick={() => showToast("Next testimonial", "info")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
