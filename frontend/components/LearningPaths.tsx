"use client";

import Link from "next/link";
import { LEARNING_PATHS } from "@/lib/data";
import styles from "@/styles/home.module.css";

export default function LearningPaths() {
  return (
    <section className={`${styles.section} ${styles.reveal}`}>
      <div className="container">
        <div className={styles.sectionHead}>
          <div>
            <h2>Learning Paths</h2>
            <p>Follow structured roadmaps to your goal</p>
          </div>
          <Link href="#" className={styles.viewAll}>
            View all paths
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
        <div className={styles.pathGrid}>
          {LEARNING_PATHS.map((path) => (
            <div key={path.title} className={styles.pathCard}>
              <div className={styles.pathHead}>
                <div>
                  <h3>{path.title}</h3>
                  <div className={styles.pathMeta}>{path.meta}</div>
                </div>
              </div>
              <div className={styles.roadmap}>
                {path.steps.map((step, i) => (
                  <span key={step.label} style={{ display: "contents" }}>
                    <div className={styles.roadStep}>
                      <span className={styles.ico} style={{ background: step.color, color: step.textColor ?? "#fff" }}>
                        {step.icon}
                      </span>
                      {step.label}
                    </div>
                    {i < path.steps.length - 1 && <span className={styles.roadArrow}>→</span>}
                  </span>
                ))}
              </div>
              <div className={styles.progressRow}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${path.progress}%` }} />
                </div>
                <span>{path.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
