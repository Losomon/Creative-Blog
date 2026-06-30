"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";

export default function BrowseCategories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 text-center">
        <span className="text-sm font-semibold text-brand-600">CATEGORIES</span>
        <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Browse by Topic
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Explore our collection of developer resources organized by technology.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((cat, i) => {
          const Icon = cat.icon as unknown as LucideIcon;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl bg-card p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-500 to-brand-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${cat.colorHex}15` }}
                >
                  <Icon className="h-8 w-8" style={{ color: cat.colorHex }} />
                </motion.div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {cat.count} articles
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
