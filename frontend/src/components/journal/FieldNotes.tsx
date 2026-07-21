'use client';

import { motion } from 'framer-motion';
import { fieldNotes } from '@/data/articles';

export default function FieldNotes() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-24 md:px-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[auto_repeat(4,1fr)] md:gap-14 md:items-stretch">
        <div className="md:max-w-[220px]">
          <div className="flex items-start gap-3">
            <div className="text-[1.3rem] leading-none">📝</div>
            <div>
              <h3 className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink">
                Field Notes
              </h3>
              <p className="mb-4 text-[0.8rem] leading-relaxed text-stone">
                Short thoughts, observations and experiments.
              </p>
              <a
                href="/journal/notes"
                className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold transition hover:gap-2.5 hover:text-ink"
              >
                Browse notes
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {fieldNotes.map((note, i) => (
          <motion.a
            key={note.title}
            href="#"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="group relative flex flex-col justify-between rounded-3xl border border-stone-line bg-cream-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-dim hover:shadow-lg"
          >
            <div className="absolute left-4 top-4 h-1 w-1 rounded-full bg-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <h5 className="font-serif text-[1.05rem] font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-ink-soft">
              {note.title}
            </h5>
            <div className="mt-5 flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-stone">
              <span className="h-1 w-1 rounded-full bg-lime/60" />
              {note.date}
              <span className="text-stone-line">·</span>
              <span>{note.readTime}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
