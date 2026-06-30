"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { developerResources as resources } from "@/lib/data";

export default function DeveloperResources() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 text-center">
        <span className="text-sm font-semibold text-brand-600">RESOURCES</span>
        <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Developer Resources
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Free tools, cheat sheets, and resources to boost your productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, i) => {
          const Icon = resource.icon as unknown as LucideIcon;
          return (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-500 to-brand-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${resource.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {resource.description}
                </p>
                <button className="mt-4 inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-brand-50 hover:text-brand-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-brand-900/30">
                  Download
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
