"use client";

import { useEffect } from "react";

/**
 * Signature "shutter" motion frame: elements with the `.reveal` class sweep
 * open via clip-path instead of a plain fade. This hook wires up the
 * IntersectionObserver that adds `.in` the first time each element scrolls
 * into view. See globals.css for the actual transition.
 */
export function useRevealOnScroll(deps: React.DependencyList = []) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
