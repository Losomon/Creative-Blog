"use client";

import Link from "next/link";
import { Clock, User, Eye, Bookmark, BookmarkCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { latestTutorials } from "@/lib/data";

export default function LatestTutorials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-brand-600">LATEST</span>
          <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            New Tutorials
          </h2>
        </div>
        <Link
          href="/articles"
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestTutorials.map((tut, i) => (
          <TutorialCard key={tut.slug} tutorial={tut} index={i} />
        ))}
      </div>
    </section>
  );
}

function TutorialCard({
  tutorial: tut,
  index,
}: {
  tutorial: (typeof latestTutorials)[0];
  index: number;
}) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-500 to-brand-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-brand-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-4 left-4 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {tut.category}
          </span>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="absolute top-4 right-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
          >
            {bookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-brand-300" />
            ) : (
              <Bookmark className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="mb-3 text-lg font-bold leading-tight text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
            <Link href={`/articles/${tut.slug}`}>{tut.title}</Link>
          </h3>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              {tut.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {tut.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              {tut.views}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {tut.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-400">{tut.date}</span>
            <Link
              href={`/articles/${tut.slug}`}
              className="text-sm font-semibold text-brand-600"
            >
              Read →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
