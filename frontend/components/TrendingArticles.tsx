"use client";

import Link from "next/link";
import { Clock, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { trendingArticles as articles } from "@/lib/data";

export default function TrendingArticles() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-brand-600">TRENDING</span>
          <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            What&apos;s Hot
          </h2>
        </div>
        <Link
          href="/articles"
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[280px]">
        {articles.map((article, i) => {
          const isFeatured = i === 0;
          const isLarge = i === 3;

          return (
            <motion.div
              key={article.slug}
              whileHover={{ y: -4 }}
              className={`group relative rounded-2xl ${
                isFeatured
                  ? "lg:col-span-2 lg:row-span-2"
                  : isLarge
                  ? "lg:col-span-2"
                  : ""
              }`}
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-500 to-brand-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative h-full rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
                {/* Image */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 to-brand-900" />

                {/* Bottom gradient for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Bookmark */}
                <button className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Bookmark className="h-4 w-4" />
                </button>

                {/* Content */}
                <div className="relative flex h-full flex-col justify-end p-6">
                  <span className="mb-3 inline-block w-fit rounded-full bg-brand-500/20 px-3 py-1 text-xs font-medium text-brand-200 backdrop-blur-sm">
                    {article.category}
                  </span>
                  <h3 className="mb-2 text-lg font-bold leading-tight text-white md:text-xl">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime} min
                    </span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>
                </div>

                <Link
                  href={`/articles/${article.slug}`}
                  className="absolute inset-0 z-10"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
