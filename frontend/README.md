# Solo Design — frontend

Next.js 14 + TypeScript + Tailwind + React Three Fiber + Framer Motion,
built the way it was scoped: real HTML/CSS for content, a genuine WebGL
scene only in the hero.

## Run it

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build, also the fastest way to catch type errors
npm run start   # serve the production build
```

## Structure

```
src/
├── app/
│   ├── layout.tsx      root layout, loads Fraunces/Inter/JetBrains Mono
│   ├── page.tsx         assembles every section in build order
│   └── globals.css
│
├── components/
│   ├── layout/           Navbar, Footer
│   ├── hero/             the 3D hero — see below
│   ├── journal/          LatestArticle, TopicGrid, FieldNotes
│   ├── builds/            FeaturedBuild, CaseStudyCard, BuildsSection
│   └── newsletter/        Newsletter (Weekly Dispatch)
│
└── data/                articles.ts, builds.ts, topics.ts — plain typed
                          arrays; swap for a CMS fetch later without
                          touching any component markup
```

## How the hero works

`Hero.tsx` is a client component split straight down the middle:

- **Left: real DOM.** Headline, paragraph, CTA — plain HTML/Tailwind, so
  it's accessible, indexable, and animates with Framer Motion.
- **Right: `<HeroScene />`**, dynamically imported with `ssr: false`
  (WebGL can't run on the server) — a `@react-three/fiber` `<Canvas>`.

Inside the canvas:

- `BlueprintGrid.tsx` — the architectural floor grid (drei's `<Grid>`).
- `LaptopBase.tsx` — the laptop, built from primitive geometry for now.
  Swap it for a Blender-authored `laptop.glb` + `useGLTF()` later; nothing
  else in the scene needs to change.
- `FloatingUI.tsx` — the four exploded UI/code/component layers. Each one
  uses drei's `<Html transform>`, which maps **real DOM** (actual Tailwind
  markup, not a canvas texture) onto a 3D-transformed plane — so the
  panel content stays crisp and easy to restyle.
- `LayerAnnotations.tsx` — the "UI Layer / Code Layer / Structure" labels,
  each with an SVG-equivalent 3D `<Line>` leader line pointing at its
  panel.
- `HeroScene.tsx` — camera, lighting, and `ParallaxRig`, which rotates the
  whole rig a few degrees toward the pointer (parallax, not free orbit).

**Scroll-driven explode:** `Hero.tsx` tracks scroll progress for the
section with Framer Motion's `useScroll`, and writes it into a plain
`useRef` (not React state, to avoid a re-render every frame) that's
handed down into the canvas. Inside `FloatingUI.tsx`, each layer reads
that ref in its own `useFrame` loop and lerps outward along its own axis
as you scroll — the stack pulls apart into an exploded diagram.

## Extending it

- **Case study 3D interaction** (section 12 of the plan — hovering a case
  study reveals a UI → Design System → Architecture → Code stack): build
  it as a sibling to `FloatingUI.tsx` reused inside a small canvas on the
  case study page, driven by hover state instead of scroll.
- **Lenis / GSAP**: not wired in yet, since Framer Motion covers the
  current scroll needs. Add `lenis` for buttery inertia scrolling once
  you're happy with the base experience, and layer GSAP's ScrollTrigger
  in only if you need scroll-scrubbed sequences more complex than the
  linear explode above.
- **Laptop GLB**: drop the file in `public/models/laptop.glb`, then
  replace the contents of `LaptopBase.tsx` with a `useGLTF('/models/laptop.glb')`
  call — the rest of the scene graph doesn't change.

## Notes

- Colors, type scale, and spacing are pulled into `tailwind.config.ts`
  as design tokens (`ink`, `cream`, `lime`, `stone`, …) rather than
  hardcoded per component.
- `prefers-reduced-motion` is respected globally in `globals.css`.
- This was scaffolded and dependency-checked in a sandboxed environment;
  run `npm run build` locally once to confirm it's clean on your Node
  version before deploying.
