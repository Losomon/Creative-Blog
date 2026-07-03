"use client";

import { useMemo, useState } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useToast } from "@/components/Toast";
import Newsletter from "@/components/Newsletter";
import { articles, categoryList } from "@/lib/data";

export default function ArticlesPage() {
  useRevealOnScroll();
  const showToast = useToast();
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (activeCat === "All" || a.cat === activeCat) &&
        (q === "" || a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q))
    );
  }, [activeCat, query]);

  const shown = filtered.slice(0, visibleCount);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">ALL ARTICLES</div>
          <h1>Every tutorial, <span>in one place.</span></h1>
          <p>Search, filter by topic, and dig into practical, up-to-date guides written for working developers.</p>
          <div className="search-row">
            <div className="search-box">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                placeholder="Search articles, e.g. 'React hooks'…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setVisibleCount(6); }}
              />
            </div>
            <div className="filter-pills">
              {categoryList.map((c) => (
                <button
                  key={c}
                  className={`pill${activeCat === c ? " active" : ""}`}
                  onClick={() => { setActiveCat(c); setVisibleCount(6); }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="result-count">
            {filtered.length > 0 && (
              <>Showing <strong>{shown.length}</strong> of <strong>{filtered.length}</strong> articles</>
            )}
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="article-grid">
            {shown.map((a) => (
              <div key={a.title} className="article-card" onClick={() => showToast(`Loading: ${a.title}`, "info")}>
                <div className="article-img">
                  <img src={a.img} alt={a.title} loading="lazy" />
                  <span className="article-cat">{a.cat}</span>
                  <div
                    className="article-bookmark"
                    onClick={(e) => { e.stopPropagation(); showToast("Saved to your reading list", "success"); }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </div>
                </div>
                <div className="article-body">
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                  <div className="article-foot">
                    <div className="author"><img src={a.author} alt="" loading="lazy" />{a.time}</div>
                    <span>{a.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state show">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <h3>No articles match that search</h3>
              <p>Try a different keyword or clear the filter.</p>
            </div>
          )}

          {visibleCount < filtered.length && (
            <div className="load-more-row">
              <button className="load-more" onClick={() => setVisibleCount((v) => v + 6)}>Load more articles</button>
            </div>
          )}
        </div>
      </section>

      <Newsletter
        heading="Never miss a new article."
        body="Get every tutorial delivered to your inbox the week it's published — no fluff, no filler."
      />
    </>
  );
}
