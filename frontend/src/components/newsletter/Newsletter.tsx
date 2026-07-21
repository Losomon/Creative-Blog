'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Wire this up to your actual list provider (Resend, Buttondown, etc).
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-ink-soft to-ink p-7 text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rotate-12 rounded-lg bg-white/[0.03]"
      />
      <div>
        <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-lime">
          Weekly dispatch
        </div>
        <p className="text-[0.86rem] leading-relaxed text-white/60">
          One thoughtful email each week about designing and building better digital
          experiences.
        </p>
      </div>
      <div className="mt-5">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-white/35"
          />
          <button
            type="submit"
            className="rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
          >
            Subscribe
          </button>
        </form>
        <div className="mt-2.5 text-[0.68rem] text-white/30">
          {submitted ? 'Thanks — check your inbox to confirm.' : 'No spam. Unsubscribe anytime.'}
        </div>
      </div>
    </motion.div>
  );
}
