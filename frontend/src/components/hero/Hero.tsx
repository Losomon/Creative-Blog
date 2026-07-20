'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';

// R3F needs the DOM/WebGL context, so it must never run during SSR.
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      scrollRef.current = v;
    });
  }, [scrollYProgress]);

  // headline + copy fade/rise slightly as the section scrolls past —
  // motion lives here in real HTML, not inside the canvas.
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-ink">
      {/* faint architectural grain, pure CSS */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_70%_at_60%_40%,black,transparent)]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />

      <div className="relative z-10 grid min-h-[640px] grid-cols-1 items-center px-6 pt-4 md:grid-cols-2 md:px-12">
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="max-w-[520px] py-10 md:py-0"
        >
          <div className="mb-4 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-lime">
            The craft of building digital products
          </div>
          <h1 className="font-serif text-5xl font-medium leading-[1.04] tracking-tight text-white md:text-6xl">
            Nothing great
            <br />
            <span className="text-lime">gets built</span>
            <br />
            by accident.
          </h1>
          <p className="mt-5 max-w-[440px] text-base leading-relaxed text-white/55">
            An editorial publication at the intersection of design and engineering —
            documenting the thinking, process and craft behind exceptional digital
            experiences.
          </p>
          <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(214,244,57,0.25)]">
            Read the first chapter
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-lime">
              →
            </span>
          </button>
        </motion.div>

        <div className="relative h-[420px] md:h-[560px]">
          <HeroScene scrollRef={scrollRef} />
        </div>
      </div>

      {/* dark studio -> light editorial transition, per the plan */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-cream" />
    </div>
  );
}
