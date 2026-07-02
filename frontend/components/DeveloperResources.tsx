"use client";

import Link from "next/link";
import { RESOURCES } from "@/lib/data";
import { useToast } from "@/components/ToastProvider";
import styles from "@/styles/home.module.css";

export default function DeveloperResources() {
  const { showToast } = useToast();

  return (
    <section className={`${styles.section} ${styles.reveal}`} id="resources">
      <div className="container">
        <div className={styles.sectionHead}>
          <div>
            <h2>Developer Resources</h2>
            <p>Practical tools and downloads</p>
          </div>
          <Link href="/resources" className={styles.viewAll}>
            View all resources
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
        <div className={styles.resGrid}>
          {RESOURCES.map((res) => (
            <div key={res.title} className={styles.resCard} onClick={() => showToast(`Downloading ${res.title}...`, "success")}>
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
                  showToast(`Downloading ${res.title}...`, "success");
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
  );
}
