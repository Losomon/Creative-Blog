"use client";

import Link from "next/link";
import { GitBranch, MessageCircle, Briefcase, Play, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Floating background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-brand-200/20 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-[300px] w-[300px] rounded-full bg-brand-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-brand-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white text-sm">
                {"</>"}
              </span>
              The Coding Ledger
            </Link>
            <p className="mt-4 max-w-sm text-gray-600 dark:text-gray-400">
              Modern tutorials, real-world projects, and software engineering guides.
              Empowering developers to build better software.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-brand-100 hover:text-brand-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-brand-900/30">
                <GitBranch className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-brand-100 hover:text-brand-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-brand-900/30">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-brand-100 hover:text-brand-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-brand-900/30">
                <Briefcase className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-brand-100 hover:text-brand-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-brand-900/30">
                <Play className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/" className="transition hover:text-brand-600">Home</Link></li>
              <li><Link href="/articles" className="transition hover:text-brand-600">Articles</Link></li>
              <li><Link href="/categories" className="transition hover:text-brand-600">Categories</Link></li>
              <li><Link href="/resources" className="transition hover:text-brand-600">Resources</Link></li>
              <li><Link href="/about" className="transition hover:text-brand-600">About</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Categories</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/cat/frontend" className="transition hover:text-brand-600">Frontend</Link></li>
              <li><Link href="/cat/react" className="transition hover:text-brand-600">React</Link></li>
              <li><Link href="/cat/nodejs" className="transition hover:text-brand-600">Node.js</Link></li>
              <li><Link href="/cat/devops" className="transition hover:text-brand-600">DevOps</Link></li>
              <li><Link href="/cat/ai" className="transition hover:text-brand-600">AI</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Newsletter</h4>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Get the latest articles delivered to your inbox weekly.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="mt-4"
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 rounded-xl border border-border bg-white px-4 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:bg-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-brand-600 px-4 py-2 text-white transition hover:bg-brand-700"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} The Coding Ledger. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
