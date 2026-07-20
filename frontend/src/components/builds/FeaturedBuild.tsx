'use client';

import { motion } from 'framer-motion';
import { featuredBuild } from '@/data/builds';

export default function FeaturedBuild() {
  return (
    <motion.a
      href={featuredBuild.href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="group grid overflow-hidden rounded-2xl border border-stone-line bg-cream-card sm:grid-cols-2 lg:col-span-1"
    >
      <div className="relative min-h-[200px] overflow-hidden bg-gradient-to-br from-[#1a1c19] to-[#0c0d0b]">
        <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-500 ease-out group-hover:scale-105">
          <div className="h-[60%] w-[70%] rounded-lg bg-gradient-to-br from-[#2a2c25] to-[#111310] shadow-2xl" />
        </div>
      </div>
      <div className="p-7">
        <div className="mb-3 flex gap-3 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-stone">
          <span className="font-semibold text-ink">{featuredBuild.category}</span>
          <span>·</span>
          <span>{featuredBuild.subcategory}</span>
        </div>
        <h3 className="mb-2.5 font-serif text-2xl font-medium">{featuredBuild.title}</h3>
        <p className="mb-4 text-[0.85rem] leading-relaxed text-stone">
          {featuredBuild.description}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition group-hover:gap-2.5">
          View case study →
        </span>
      </div>
    </motion.a>
  );
}
