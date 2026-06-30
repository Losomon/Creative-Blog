"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Tutorials", value: 120, suffix: "+" },
  { label: "Projects", value: 50, suffix: "+" },
  { label: "Subscribers", value: 15, suffix: "K+" },
  { label: "Monthly Readers", value: 500, suffix: "K+" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-border bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="bg-gradient-to-br from-brand-600 to-brand-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
        {count}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        {stat.label}
      </div>
    </motion.div>
  );
}
