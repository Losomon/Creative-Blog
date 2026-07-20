'use client';

import { motion } from 'framer-motion';
import type { CaseStudy } from '@/data/builds';

export default function CaseStudyCard({ study, delay = 0 }: { study: CaseStudy; delay?: number }) {
  return (
    <motion.a
      href={study.href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay }}
      className="group overflow-hidden rounded-2xl border border-stone-line bg-cream-card"
    >
      <div className="h-[180px] overflow-hidden bg-gradient-to-br from-[#1e2019] to-[#0c0d0b]">
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h4 className="mb-2 font-serif text-lg font-medium">{study.title}</h4>
        <p className="mb-3 text-[0.82rem] text-stone">{study.description}</p>
        <div className="font-mono text-[0.68rem] text-stone">
          {study.date} · {study.readTime}
        </div>
      </div>
    </motion.a>
  );
}
