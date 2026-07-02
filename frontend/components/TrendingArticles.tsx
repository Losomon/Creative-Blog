"use client";

import Link from "next/link";
import { TRENDING_ARTICLES } from "@/lib/data";
import { useToast } from "@/components/ToastProvider";
import styles from "@/styles/home.module.css";

function TrendCard({
  article,
}: {
  article: (typeof TRENDING_ARTICLES)[number];
}) {
  const { showToast } = useToast();
  const spanClass = article.span === "2-2" ? styles.span22 : styles.span11;

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!article.hoverVideo) return;
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    video?.pause();
  };

  return (
    <div
      className={`${styles.trendCard} ${spanClass} ${article.hoverVideo ? styles.hoverVideo : ""}`}
      style={{ background: "#1a1235" }}
      onClick={() => showToast(`Article: ${article.title}`, "info")}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <img className={styles.tImg} src={article.image} alt={article.title} loading="lazy" />
      {article.video && (
        <video className={styles.tVideo} muted loop playsInline preload="none">
          <source src={article.video} type="video/mp4" />
        </video>
      )}
      <div className={styles.tOverlay} />
      <div className={styles.bookmark}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <div className={styles.tContent}>
        <span className={styles.tCat}>{article.category}</span>
        <div className={styles.tTitle}>{article.title}</div>
        <div className={styles.tMeta}>{article.meta}</div>
      </div>
    </div>
  );
}

export default function TrendingArticles() {
  return (
    <section className={`${styles.section} ${styles.reveal}`} id="trending">
      <div className="container">
        <div className={styles.sectionHead}>
          <div>
            <h2>Trending Articles</h2>
            <p>What developers are reading right now</p>
          </div>
          <Link href="/articles" className={styles.viewAll}>
            View all articles
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
        <div className={styles.trendGrid}>
          {TRENDING_ARTICLES.map((article) => (
            <TrendCard key={article.title} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
