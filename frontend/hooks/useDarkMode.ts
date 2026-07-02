"use client";

import { useEffect, useState } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "true";
    setDarkMode(stored);
    document.documentElement.setAttribute("data-theme", stored ? "dark" : "light");
  }, []);

  const toggle = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      localStorage.setItem("darkMode", String(next));
      return next;
    });
  };

  return { darkMode, toggle };
}
