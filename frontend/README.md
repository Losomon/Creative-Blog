# The Coding Ledger — Frontend (Next.js + TypeScript)

Converted from the original static HTML pages into a Next.js 15 App Router project.

## Structure

```
frontend/
  app/
    layout.tsx        Root layout: fonts, ToastProvider, Header/Footer/BackgroundShapes/ScrollTop
    page.tsx           Homepage ("/")
    globals.css         All design tokens + component styles (one shared stylesheet)
    home/page.tsx        Redirects "/home" -> "/" (kept only for route-tree parity)
    articles/page.tsx     Search + category filter + pagination
    categories/page.tsx    Photo category grid + learning paths
    resources/page.tsx      Grouped resource cards
    about/page.tsx            Mission, stats, values, timeline, team
    contact/page.tsx           Validated contact form + FAQ
  components/
    Header.tsx, Footer.tsx, Toast.tsx, Newsletter.tsx, FaqAccordion.tsx,
    BackgroundShapes.tsx, ScrollTop.tsx
  hooks/
    useDarkMode.ts        localStorage-backed theme toggle
    useRevealOnScroll.ts   IntersectionObserver for the "shutter wipe" scroll reveal
  lib/
    types.ts, data.ts     All article/category/resource/team/FAQ content
```

## Notes on the conversion

- **One shared `globals.css`** instead of per-page stylesheets — all six routes now use the same design tokens, so a color/spacing change in one place updates everywhere.
- **`showToast(...)` became `useToast()`** — a React context (`components/Toast.tsx`) instead of the old imperative DOM-manipulation function.
- **Dark mode, header scroll, mobile menu** all live in `Header.tsx` as real React state instead of manual class toggling.
- **The scroll "shutter" reveal** (the site's signature motion) is now a reusable hook (`useRevealOnScroll`) — call it once per page component.
- Images use plain `<img>` tags (not `next/image`) since the photo/video URLs are external demo placeholders (picsum.photos, i.pravatar.cc, mixkit.co). `next.config.ts` already whitelists the two image domains if you want to switch to `next/image` later.
- `app/home/page.tsx` just redirects to `/` — Next's App Router treats `app/page.tsx` as the homepage, so this folder exists only to match your original route tree.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000.

## Known placeholders

- Nav "Sign In" and footer social icons still point to `#` — wire these up once you have real auth/social links.
- All content (articles, team, resources) lives in `lib/data.ts` — replace with a real CMS/API call when ready; the components already consume typed props so swapping the data source shouldn't require touching JSX.
