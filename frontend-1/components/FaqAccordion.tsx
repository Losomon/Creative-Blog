"use client";

import { useState } from "react";
import type { Faq } from "@/lib/types";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-grid">
      {faqs.map((f, i) => (
        <div
          key={f.q}
          className={`faq-item${openIndex === i ? " open" : ""}`}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <div className="faq-q">
            {f.q}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <div className="faq-a">{f.a}</div>
        </div>
      ))}
    </div>
  );
}
