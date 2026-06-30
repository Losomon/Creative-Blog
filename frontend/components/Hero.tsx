"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const words = ["developers", "engineers", "creators", "builders"];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [wordIdx, setWordIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden"
    >
      {/* Noise texture */}
      <div className="noise" />
      {/* Cursor glow */}
      <div
        className="cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      {/* Floating background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-200/30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-brand-300/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-brand-100/40 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-eyebrow"
            >
              WELCOME TO THE CODING LEDGER
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl"
            >
              Insights that{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                empower
              </span>{" "}
              <span className="relative">
                {words[wordIdx]}
                <span className="typing-cursor" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-lg text-lg leading-relaxed text-gray-600 dark:text-gray-300"
            >
              Modern tutorials, real-world projects, career advice, and software
              engineering guides. Everything you need to level up your craft.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/articles"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-700"
              >
                Explore Articles
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/categories"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/50 px-6 py-3.5 text-sm font-semibold text-gray-700 backdrop-blur-sm transition hover:border-brand-200 hover:bg-white dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:hover:border-brand-700"
              >
                Browse Categories
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 pt-2"
            >
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Trusted by 12,000+ developers
              </span>
            </motion.div>
          </div>

          {/* Right - Floating Workspace */}
          <div className="relative">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-lg"
            >
              {/* VS Code Window */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-900 shadow-2xl dark:border-gray-700">
                <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="ml-4 flex-1 rounded-md bg-gray-800 px-3 py-1 text-xs text-gray-400">
                    hero.tsx — The Coding Ledger
                  </div>
                </div>
                <div className="flex">
                  <div className="hidden w-12 flex-col gap-2 border-r border-gray-800 p-3 text-xs text-gray-500 sm:flex">
                    <span className="text-brand-400">01</span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                    <span>05</span>
                    <span>06</span>
                    <span>07</span>
                    <span>08</span>
                    <span>09</span>
                    <span>10</span>
                  </div>
                  <div className="flex-1 p-4 font-mono text-sm leading-relaxed">
                    <div>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-400">hero</span> ={" "}
                      <span className="text-purple-400">async</span> () =&gt; {"{"}
                    </div>
                    <div className="mt-1 pl-4">
                      <span className="text-purple-400">return</span> {"{"}
                    </div>
                    <div className="mt-1 pl-8">
                      <span className="text-green-400">insights</span>:{" "}
                      <span className="text-amber-300">true</span>,
                    </div>
                    <div className="mt-1 pl-8">
                      <span className="text-green-400">growth</span>:{" "}
                      <span className="text-amber-300">infinite</span>,
                    </div>
                    <div className="mt-1 pl-8">
                      <span className="text-green-400">community</span>:{" "}
                      <span className="text-amber-300">{"12k+"}</span>,
                    </div>
                    <div className="mt-1 pl-4">{"};"}</div>
                    <div className="mt-1">{"};"}</div>
                  </div>
                </div>
              </div>

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-8 rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700"
              >
                <div className="text-cyan-500">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
                    <path d="M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    <path d="M12 21.35c-1.1 0-2.15-.15-3.1-.45-1.35-.4-2.55-1.05-3.55-1.9-.85-.7-1.55-1.55-2.05-2.5-.55-1.1-.85-2.35-.85-3.7 0-1.3.2-2.45.65-3.45.5-1.1 1.2-2.05 2.05-2.8.95-.85 2.05-1.45 3.25-1.8.55-.15 1.15-.25 1.8-.3v-.05c0-1.05.2-2 .6-2.8.4-.85 1-1.55 1.75-2.1.85-.6 1.85-.95 3-.95 1.15 0 2.15.3 2.95.95.8.6 1.35 1.3 1.7 2.15.35.85.5 1.8.5 2.85v.15c1.05.05 2.05.35 2.9.85.85.5 1.55 1.2 2.05 2.05.55.95.85 2.05.85 3.35 0 1.25-.2 2.4-.6 3.4-.5 1.1-1.25 2.05-2.2 2.8-.9.75-1.95 1.3-3.15 1.65-1.2.35-2.45.5-3.7.5zm0-1.5c1.25 0 2.4-.2 3.45-.6 1.1-.4 2.1-1 2.95-1.75.8-.75 1.45-1.65 1.85-2.7.4-.95.6-2 .6-3.1 0-.65-.05-1.3-.15-1.9-.1-.6-.3-1.15-.55-1.65-.3-.55-.7-1-1.2-1.35-.5-.35-1.1-.55-1.8-.55-.7 0-1.3.2-1.8.55-.5.35-.9.8-1.2 1.35-.3.55-.5 1.15-.6 1.8-.1.65-.15 1.3-.15 1.95 0 .65.05 1.3.15 1.9.1.6.3 1.15.6 1.65.3.55.7 1 1.2 1.35.5.35 1.1.55 1.8.55z" />
                  </svg>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-6 bottom-16 rounded-xl border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700"
              >
                <div className="text-green-500">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-2 bottom-4 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700"
              >
                <div className="text-purple-600">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
