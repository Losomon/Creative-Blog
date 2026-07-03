"use client";

import { useToast } from "./Toast";

interface NewsletterProps {
  heading: React.ReactNode;
  body: string;
  buttonLabel?: string;
  tags?: string[];
}

export default function Newsletter({
  heading,
  body,
  buttonLabel = "Subscribe",
  tags = ["✓ No spam", "✓ Unsubscribe anytime", "✓ Weekly emails"],
}: NewsletterProps) {
  const showToast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("newsletterEmail") as HTMLInputElement;
    if (input.value) {
      showToast(`🎉 Subscribed with ${input.value}!`, "success");
      input.value = "";
    }
  };

  return (
    <section className="section reveal">
      <div className="container">
        <div className="newsletter">
          <div className="news-grid">
            <div className="news-left">
              <h2>{heading}</h2>
              <p>{body}</p>
              <form className="news-form" onSubmit={handleSubmit}>
                <input type="email" name="newsletterEmail" placeholder="Enter your email address" required />
                <button type="submit">{buttonLabel}</button>
              </form>
              <div className="news-tags">
                {tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
            <div className="news-right">
              <svg className="plane" viewBox="0 0 60 60" fill="none"><path d="M5 30L55 5L40 55L28 35L5 30Z" fill="#fff" opacity=".9"/></svg>
              <svg className="envelope" viewBox="0 0 200 160" fill="none">
                <rect x="10" y="30" width="180" height="120" rx="14" fill="#fff" opacity=".95"/>
                <path d="M10 40 L100 110 L190 40" stroke="#A855F7" strokeWidth="6" fill="none"/>
                <rect x="10" y="30" width="180" height="120" rx="14" stroke="#A855F7" strokeWidth="3" fill="none" opacity=".4"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
