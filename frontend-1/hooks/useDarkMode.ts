"use client";

import { useEffect, useState, useCallback } from "react";

export function useDarkMode() {
  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("darkMode") === "true";
    setDarkModeState(stored);
    document.documentElement.setAttribute("data-theme", stored ? "dark" : "light");
  }, []);

  const setDarkMode = useCallback((enabled: boolean) => {
    setDarkModeState(enabled);
    document.documentElement.setAttribute("data-theme", enabled ? "dark" : "light");
    window.localStorage.setItem("darkMode", String(enabled));
  }, []);

  return { darkMode, setDarkMode, toggle: () => setDarkMode(!darkMode) };
}
