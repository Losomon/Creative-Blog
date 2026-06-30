"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 text-center">
        <span className="text-sm font-semibold text-brand-600">TESTIMONIALS</span>
        <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Loved by Developers
        </h2>
      </div>

      <div className="relative mx-auto max-w-3xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm">
              <div className="absolute -top-6 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white">
                <Quote className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-200 md:text-xl">
                &ldquo;{testimonials[current].quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white font-bold">
                  {testimonials[current].author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonials[current].author}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonials[current].role}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="rounded-full border border-border p-3 text-gray-600 transition hover:border-brand-300 hover:text-brand-600 dark:text-gray-300 dark:hover:border-brand-700"
          >
            ←
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-brand-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="rounded-full border border-border p-3 text-gray-600 transition hover:border-brand-300 hover:text-brand-600 dark:text-gray-300 dark:hover:border-brand-700"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
