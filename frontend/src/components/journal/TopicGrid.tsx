'use client';

import { motion } from 'framer-motion';
import { topics, type Topic } from '@/data/topics';

const ICONS: Record<Topic['icon'], string> = {
  cube: '◇',
  code: '</>',
  grid: '▦',
  trend: '↗',
};

export default function TopicGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {topics.map((topic, i) => (
        <motion.a
          key={topic.title}
          href={topic.href}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="group flex flex-col rounded-2xl border border-stone-line bg-cream-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lime-dim hover:shadow-lg"
        >
          <div className="mb-6 text-xl">{ICONS[topic.icon]}</div>
          <h3 className="font-serif text-xl font-medium text-ink">{topic.title}</h3>
          <div className="my-[6px] font-mono text-[0.7rem] text-stone">
            {topic.count} articles
          </div>
          <p className="flex-grow text-[0.82rem] leading-relaxed text-stone">
            {topic.description}
          </p>
          <div className="mt-3 font-semibold transition group-hover:translate-x-1">→</div>
        </motion.a>
      ))}
    </div>
  );
}
