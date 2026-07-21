'use client';

import Image from 'next/image';
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
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-line bg-cream-card"
    >
      <div className="relative h-[180px] shrink-0 overflow-hidden bg-[#0c0d0b]">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h4 className="mb-2 font-serif text-lg font-medium">{study.title}</h4>
        <p className="mb-3 text-[0.82rem] text-stone">{study.description}</p>
        <div className="mt-auto flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.06em] text-stone">
          <span>
            {study.date} · {study.readTime}
          </span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </motion.a>
  );
}
