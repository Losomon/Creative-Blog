"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type ToastType = "success" | "info" | "error";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const icons: Record<ToastType, string> = {
  success: "✅",
  info: "ℹ️",
  error: "❌",
};

export function useToastState() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return { toasts, showToast };
}

export function useDarkMode() {
  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDarkModeState(saved);
    document.documentElement.setAttribute("data-theme", saved ? "dark" : "light");
  }, []);

  const setDarkMode = useCallback((enabled: boolean) => {
    setDarkModeState(enabled);
    document.documentElement.setAttribute("data-theme", enabled ? "dark" : "light");
    localStorage.setItem("darkMode", String(enabled));
  }, []);

  return { darkMode, setDarkMode };
}

export function useScrollEffects() {
  const headerRef = useRef<HTMLElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 30);
      }
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { headerRef, showScrollTop };
}

export function useRevealOnScroll() {
  const revealRefs = useRef<NodeListOf<HTMLElement> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealRefs.current = document.querySelectorAll(".reveal");
    revealRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return revealRefs;
}

export function useTypingEffect(words: readonly string[]) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeEffect = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, charIndex - 1));
        const newCharIndex = charIndex - 1;
        setCharIndex(newCharIndex);
        if (newCharIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTimeout(typeEffect, 800);
          return;
        }
        setTimeout(typeEffect, 40);
      } else {
        setDisplayText(currentWord.substring(0, charIndex + 1));
        const newCharIndex = charIndex + 1;
        setCharIndex(newCharIndex);
        if (newCharIndex === currentWord.length) {
          setIsDeleting(true);
          setTimeout(typeEffect, 2000);
          return;
        }
        setTimeout(typeEffect, 80);
      }
    };
    const timer = setTimeout(typeEffect, 1000);
    return () => clearTimeout(timer);
  }, [wordIndex, charIndex, isDeleting, words]);

  return { displayText };
}

export function useStatCounter(target: number, suffix: string = "+") {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);

  return { count, ref, suffix };
}

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return { isOpen, setIsOpen };
}