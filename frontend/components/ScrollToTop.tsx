"use client";

import { useScrollHeader } from "@/hooks/useScrollHeader";
import styles from "@/styles/home.module.css";

export default function ScrollToTop() {
  const { showScrollTop } = useScrollHeader();

  return (
    <button
      className={`${styles.scrollTop} ${showScrollTop ? styles.visible : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
