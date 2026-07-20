'use client';

import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Journal', href: '/journal' },
  { label: 'Builds', href: '/builds' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-7 md:px-12">
      <Link href="/" className="font-mono text-sm font-bold tracking-[0.15em] text-white">
        SOLO DESIGN
      </Link>

      <div className="hidden gap-9 text-sm text-white/70 md:flex">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="transition hover:text-white">
            {link.label.toUpperCase()}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden min-w-[180px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-white/50 sm:flex">
          <span aria-hidden>🔍</span>
          <span>Search articles…</span>
        </div>
        <button
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-sm"
        >
          ☀️
        </button>
        <button className="rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(214,244,57,0.25)]">
          Subscribe
        </button>
      </div>
    </nav>
  );
}
