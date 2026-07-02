"use client";

import { useToast } from "@/components/ToastProvider";
import styles from "@/styles/home.module.css";

export default function NewsletterCTA() {
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("newsletterEmail") as HTMLInputElement)?.value;
    if (email) {
      showToast(`🎉 Subscribed with ${email}!`, "success");
      e.currentTarget.reset();
    }
  };

  return (
    <section className={`${styles.section} ${styles.reveal}`}>
      <div className="container">
        <div className={styles.newsletter}>
          <div className={styles.newsGrid}>
            <div className={styles.newsLeft}>
              <h2>Stay Ahead.<br />Get Weekly Developer Insights.</h2>
              <p>
                Receive tutorials, career advice, resources, and exclusive articles straight to your inbox — every week, no fluff.
              </p>
              <form className={styles.newsForm} onSubmit={handleSubmit}>
                <input type="email" name="newsletterEmail" placeholder="Enter your email address" required />
                <button type="submit">Subscribe</button>
              </form>
              <div className={styles.newsTags}>
                <span>✓ No spam</span>
                <span>✓ Unsubscribe anytime</span>
                <span>✓ Weekly emails</span>
              </div>
            </div>
            <div className={styles.newsRight}>
              <svg className={styles.plane} viewBox="0 0 60 60" fill="none">
                <path d="M5 30L55 5L40 55L28 35L5 30Z" fill="#fff" opacity=".9" />
              </svg>
              <svg className={styles.envelope} viewBox="0 0 200 160" fill="none">
                <rect x="10" y="30" width="180" height="120" rx="14" fill="#fff" opacity=".95" />
                <path d="M10 40 L100 110 L190 40" stroke="#A855F7" strokeWidth="6" fill="none" />
                <rect x="10" y="30" width="180" height="120" rx="14" stroke="#A855F7" strokeWidth="3" fill="none" opacity=".4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
