"use client";

import { useEffect, useRef } from "react";

export function useRevealOnScroll(revealClass: string, visibleClass: string) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current ?? document;
    const elements = root.querySelectorAll(`.${revealClass}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [revealClass, visibleClass]);

  return containerRef;
}
