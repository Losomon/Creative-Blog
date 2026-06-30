"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { learningPaths } from "@/lib/data";

export default function LearningPaths() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 text-center">
        <span className="text-sm font-semibold text-brand-600">LEARNING PATHS</span>
        <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Structured Roadmaps
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Follow our carefully crafted learning paths to become the developer you want to be.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {learningPaths.map((path, i) => (
          <motion.div
            key={path.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-brand-500 to-brand-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {path.title}
              </h3>

              <div className="space-y-4">
                {path.steps.map((step, j) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                      {j + 1}
                    </div>
                    <span className="flex-1 font-medium text-gray-700 dark:text-gray-200">
                      {step}
                    </span>
                    {j < path.steps.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {path.progress}% complete
                </p>
              </div>

              <Link
                href={`/paths/${path.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
