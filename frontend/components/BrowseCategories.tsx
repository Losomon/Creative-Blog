"use client";

import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { useToast } from "@/components/ToastProvider";
import styles from "@/styles/home.module.css";

export default function BrowseCategories() {
  const { showToast } = useToast();

  return (
    <section className={`${styles.section} ${styles.reveal}`} id="categories">
      <div className="container">
        <div className={styles.sectionHead}>
          <div>
            <h2>Browse Categories</h2>
            <p>Find the topics that matter to you</p>
          </div>
          <Link href="/categories" className={styles.viewAll}>
            View all categories
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
        <div className={styles.catGrid}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className={styles.catCard}
              onClick={() => showToast(`Showing ${cat.name} articles`, "info")}
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
  );
}
