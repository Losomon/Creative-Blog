"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data";
import styles from "@/styles/home.module.css";

const STAT_ICONS = [
  <svg key="tutorials" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  <svg key="projects" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  <svg key="subscribers" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="readers" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
];

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        let cur = 0;
        const step = Math.max(1, Math.ceil(value / 40));
        const interval = setInterval(() => {
          cur += step;
          if (cur >= value) {
            setCount(value);
            clearInterval(interval);
          } else {
            setCount(cur);
          }
        }, 30);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={styles.statNum}>
      {count}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <section className={styles.statsSection}>
      <div className={`container ${styles.reveal}`}>
        <div className={styles.statsCard}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className={styles.stat}>
              <div className={styles.statIcon}>{STAT_ICONS[i]}</div>
              <div>
                <StatCounter value={stat.value} suffix={stat.suffix} />
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statSub}>{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
