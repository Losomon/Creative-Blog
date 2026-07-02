"use client";

import Link from "next/link";
import { TUTORIALS } from "@/lib/data";
import { useToast } from "@/components/ToastProvider";
import styles from "@/styles/home.module.css";

export default function LatestTutorials() {
  const { showToast } = useToast();

  return (
    <section className={`${styles.section} ${styles.reveal}`} id="tutorials">
      <div className="container">
        <div className={styles.sectionHead}>
          <div>
            <h2>Latest Tutorials</h2>
            <p>Hands-on guides, updated weekly</p>
          </div>
          <Link href="/articles" className={styles.viewAll}>
            View all tutorials
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
        <div className={styles.tutGrid}>
          {TUTORIALS.map((tut) => (
            <div key={tut.title} className={styles.tutCard} onClick={() => showToast(`Loading tutorial: ${tut.title}`, "info")}>
              <div className={styles.tutImg}>
                <img className={styles.tImg} src={tut.image} alt={tut.title} loading="lazy" />
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
  );
}
