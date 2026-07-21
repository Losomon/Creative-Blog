'use client';

import { motion } from 'framer-motion';
import { fieldNotes } from '@/data/articles';

export default function FieldNotes() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-14 md:px-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_repeat(4,1fr)] md:gap-10 md:items-stretch">
        <div className="flex max-w-[220px] gap-3.5">
          <div className="text-lg">📝</div>
          <div>
            <h3 className="mb-1.5 font-mono text-xs font-semibold uppercase tracking-[0.16em]">
              Field Notes
            </h3>
            <p className="mb-2.5 text-[0.8rem] leading-relaxed text-stone">
              Short thoughts, observations and experiments.
            </p>
            <a href="/journal/notes" className="text-[0.8rem] font-semibold">
              Browse notes →
            </a>
          </div>
        </div>

        {fieldNotes.map((note, i) => (
          <motion.a
            key={note.title}
            href="#"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex flex-col justify-between rounded-2xl border border-stone-line bg-cream-card p-7 min-h-[118px] transition hover:border-lime-dim"
          >
            <h5 className="font-serif text-base font-medium leading-snug">{note.title}</h5>
            <div className="mt-4 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-stone">
              {note.date} · {note.readTime}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
