'use client';

import Image from 'next/image';
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
      className="group grid overflow-hidden rounded-2xl border border-stone-line bg-cream-card sm:grid-cols-2"
    >
      <div className="relative min-h-[200px] overflow-hidden bg-[#0c0d0b]">
        <Image
          src={featuredBuild.image}
          alt={featuredBuild.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 40vw"
        />
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
