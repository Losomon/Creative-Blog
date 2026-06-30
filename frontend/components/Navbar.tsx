"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/categories", label: "Categories" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const isDark =
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", isDark);
      return isDark;
    }
    return false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDark = () => {
    const newMode = !dark;
    setDark(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.theme = newMode ? "dark" : "light";
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white text-sm">
            {"</>"}
          </span>
          <span className="text-xl">The Coding Ledger</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-brand-600 transition-all duration-200 hover:w-[calc(100%-0.5rem)] dark:bg-brand-400" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={toggleDark}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700 hover:shadow-brand-500/40"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden rounded-lg p-2 text-gray-600 dark:text-gray-300"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-white dark:bg-gray-900 md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-4">
                <Link
                  href="/login"
                  className="flex-1 rounded-lg border border-border px-4 py-2 text-center text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 rounded-lg bg-brand-600 px-4 py-2 text-center text-sm font-medium text-white"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
