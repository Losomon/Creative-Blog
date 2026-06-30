"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, Paperclip } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-16 md:px-16">
        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-brand-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[200px] w-[200px] rounded-full bg-brand-300/10 blur-3xl" />

        {/* Floating paper plane */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-4 top-8 text-brand-200/40 md:right-8 md:top-12"
        >
          <ArrowUpRight className="h-24 w-24 rotate-12 md:h-32 md:w-32" />
        </motion.div>

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <Mail className="h-4 w-4" />
              NEWSLETTER
            </div>
            <h2 className="mt-6 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Stay ahead of the curve.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-brand-100">
              Get weekly developer insights. Receive tutorials, career advice, resources,
              and exclusive articles directly to your inbox.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white placeholder-white/60 outline-none backdrop-blur-sm transition focus:border-white/40 focus:ring-2 focus:ring-white/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-lg transition hover:bg-brand-50"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </form>

            <p className="mt-4 text-sm text-brand-200">
              Join 15,000+ developers. Unsubscribe anytime.
            </p>
          </div>

          {/* Right side - 3D envelope illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
              style={{ perspective: "800px" }}
            >
              <div
                className="relative h-64 w-80 rounded-2xl border-4 border-white/20 bg-white/10 shadow-2xl shadow-brand-900/50"
                style={{ transform: "rotateY(-15deg) rotateX(5deg)" }}
              >
                {/* Envelope flap */}
                <div
                  className="absolute inset-x-0 top-0 h-24 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent"
                  style={{
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                />
                {/* Envelope body */}
                <div className="absolute inset-x-0 bottom-0 h-12 border-t border-white/10" />
                {/* Stamps / seals */}
                <div className="absolute top-8 right-8 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-white/30">
                  <Paperclip className="h-5 w-5 text-white/60" />
                </div>
                {/* Letter peeking */}
                <div
                  className="absolute bottom-4 left-4 right-4 h-20 rounded-lg bg-white/20 backdrop-blur-sm"
                  style={{ transform: "translateY(10px)" }}
                >
                  <div className="p-3 space-y-2">
                    <div className="h-1.5 w-3/4 rounded bg-white/30" />
                    <div className="h-1.5 w-1/2 rounded bg-white/20" />
                    <div className="h-1.5 w-2/3 rounded bg-white/30" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
