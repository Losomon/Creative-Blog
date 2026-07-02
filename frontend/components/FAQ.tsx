"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data";
import styles from "@/styles/home.module.css";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={`${styles.section} ${styles.reveal}`}>
      <div className="container">
        <div className={styles.sectionHead}>
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className={styles.faqGrid}>
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className={`${styles.faqItem} ${openIndex === i ? styles.open : ""}`}
              onClick={() => toggle(i)}
            >
              <div className={styles.faqQ}>
                {faq.q}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div className={styles.faqA}>{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
