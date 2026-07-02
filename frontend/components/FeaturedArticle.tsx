"use client";

import { useRef, useState } from "react";
import { FEATURED_ARTICLE } from "@/lib/data";
import { useToast } from "@/components/ToastProvider";
import styles from "@/styles/home.module.css";

export default function FeaturedArticle() {
  const { showToast } = useToast();
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <section className={`${styles.section} ${styles.reveal}`}>
      <div className="container">
        <div className={styles.sectionHead}>
          <h2>Featured Article</h2>
        </div>
        <div className={styles.featuredCard}>
          <div className={`${styles.featuredImg} ${playing ? styles.playing : ""}`}>
            <img className={styles.featuredPhoto} src={FEATURED_ARTICLE.image} alt="Developer's dual-monitor coding setup" loading="lazy" />
            <video ref={videoRef} className={styles.featuredVideo} muted playsInline onEnded={() => setPlaying(false)}>
              <source src={FEATURED_ARTICLE.video} type="video/mp4" />
            </video>
            <button className={styles.playBtn} onClick={handlePlay} aria-label="Play preview">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
            </button>
          </div>
          <div className={styles.featuredBody}>
            <div className={styles.tagPill}>FEATURED ARTICLE</div>
            <h3>{FEATURED_ARTICLE.title}</h3>
            <p>{FEATURED_ARTICLE.excerpt}</p>
            <div className={styles.authorRow}>
              <img src={FEATURED_ARTICLE.authorImage} alt={FEATURED_ARTICLE.author} loading="lazy" />
              <div>
                <div className={styles.authorName}>{FEATURED_ARTICLE.author}</div>
                <div className={styles.authorMeta}>{FEATURED_ARTICLE.meta}</div>
              </div>
            </div>
            <a
              href="#"
              className={styles.readMore}
              onClick={(e) => {
                e.preventDefault();
                showToast("Article loaded successfully!", "success");
              }}
            >
              Continue Reading
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
