'use client';

import { motion } from 'framer-motion';
import { latestArticle, buildLog } from '@/data/articles';

export default function LatestArticle() {
  return (
    <section className="mx-auto grid max-w-[1240px] grid-cols-1 gap-7 px-6 pt-0 md:grid-cols-[1.6fr_1fr] md:px-12">
      <div>
        <h2 className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink">
          Latest article
        </h2>
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-stone-line bg-cream-card sm:grid-cols-[1fr_1.15fr]"
        >
          <div className="relative min-h-[220px] overflow-hidden bg-gradient-to-br from-[#1a1c19] to-[#0c0d0b]">
            <div className="absolute inset-0 flex items-center justify-center p-6 transition-transform duration-500 ease-out group-hover:scale-105">
              <div className="h-[70%] w-[80%] rounded-lg bg-gradient-to-br from-[#2a2c25] to-[#111310] shadow-2xl" />
            </div>
          </div>
          <div className="p-7 md:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-stone">
              <span className="font-semibold text-ink">{latestArticle.category}</span>
              <span>·</span>
              <span>{latestArticle.subcategory}</span>
              <span>·</span>
              <span>{latestArticle.date}</span>
              <span>·</span>
              <span>{latestArticle.readTime}</span>
            </div>
            <h3 className="mb-3 font-serif text-[1.9rem] font-medium leading-[1.15] text-ink">
              {latestArticle.title}
            </h3>
            <p className="mb-5 text-[0.92rem] leading-relaxed text-stone">
              {latestArticle.excerpt}
            </p>
            <a
              href={`/journal/${latestArticle.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:gap-2.5 hover:text-ink"
            >
              Read article →
            </a>
          </div>
        </motion.article>
      </div>

      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink">
            Build log
          </h2>
          <a href="/builds" className="flex items-center gap-1 text-sm font-semibold transition hover:text-ink">
            View all →
          </a>
        </div>
        <div className="rounded-2xl border border-stone-line bg-cream-card p-7">
          {buildLog.map((entry, i) => (
            <motion.div
              key={entry.date}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative ml-1 border-l-[1.5px] border-stone-line pb-6 pl-5 last:border-transparent last:pb-0"
            >
              <span
                className={`absolute -left-[5.5px] top-0.5 h-2.5 w-2.5 rounded-full border-2 border-cream-card ${
                  i === 0 ? 'bg-lime' : 'bg-stone'
                }`}
              />
              <div className="mb-1 font-mono text-[0.68rem] text-stone">{entry.date}</div>
              <div className="text-sm leading-snug">{entry.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
