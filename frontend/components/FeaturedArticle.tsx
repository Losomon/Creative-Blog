"use client";

import Link from "next/link";
import { ArrowRight, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { featuredArticle } from "@/lib/data";

export default function FeaturedArticle() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="text-sm font-semibold text-brand-600">FEATURED</span>
          <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Editor&apos;s Pick
          </h2>
        </div>
        <Link
          href="/articles"
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          View all →
        </Link>
      </div>

      <motion.div
        whileHover={{ y: -4 }}
        className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
      >
        <div className="grid lg:grid-cols-2">
          {/* Image Side */}
          <div className="relative h-64 lg:h-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-800" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {featuredArticle.category}
              </span>
            </div>
            <div className="absolute top-6 right-6 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
              FEATURED
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {featuredArticle.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {featuredArticle.readTime} min read
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-bold leading-tight text-gray-900 dark:text-white md:text-3xl group-hover:text-brand-600 dark:group-hover:text-brand-400">
              {featuredArticle.title}
            </h3>

            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              {featuredArticle.excerpt}
            </p>

            <div className="mt-8">
              <Link
                href={`/articles/${featuredArticle.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-700 hover:shadow-brand-500/40"
              >
                Continue Reading
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
