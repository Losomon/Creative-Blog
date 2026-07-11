import PhotoPlaceholder from "./PhotoPlaceholder";
import CalloutLine from "./CalloutLine";

export default function FeaturedBuild() {
  return (
    <section className="px-10 py-16 bg-dark-bg text-dark-text">
      <div className="grid md:grid-cols-[1fr_1.4fr_1fr] gap-8 items-center">
        <div>
          <p className="font-mono text-[11px] tracking-[0.04em] text-dark-accent mb-3">
            FEATURED BUILD
          </p>
          <h2 className="font-display font-medium text-[1.6rem] mb-4">
            Creative Blog Platform
          </h2>
          <p className="font-body text-sm leading-relaxed text-dark-text/70 mb-6 max-w-xs">
            A modern blogging platform focused on reading experience,
            performance, and a thoughtful content workflow.
          </p>
          <a href="#" className="font-mono text-xs text-dark-accent hover:opacity-80 transition-opacity">
            View case study →
          </a>
        </div>

        <div className="relative">
          <PhotoPlaceholder dark className="h-56 rounded-sm" label="[ laptop screenshot ]" />
          <div className="hidden lg:flex flex-col gap-10 absolute -left-32 top-4">
            <CalloutLine label="Typography readable at every size" dark align="left" />
            <CalloutLine label="Spacing built on an 8px baseline grid" dark align="left" />
          </div>
          <div className="hidden lg:flex flex-col gap-10 absolute -right-32 top-4 text-right">
            <CalloutLine label="Navigation minimal, always visible" dark align="right" />
            <CalloutLine label="Accessibility — contrast and focus considered" dark align="right" />
          </div>
        </div>

        <div className="border border-dark-text/15 rounded-sm p-4">
          <p className="font-mono text-[10px] text-dark-text/50 mb-1">ROLE</p>
          <p className="font-mono text-xs mb-4">Designer &amp; Developer</p>
          <p className="font-mono text-[10px] text-dark-text/50 mb-1">DURATION</p>
          <p className="font-mono text-xs mb-4">3 weeks</p>
          <p className="font-mono text-[10px] text-dark-text/50 mb-1">STACK</p>
          <p className="font-mono text-xs mb-4">Next.js · TypeScript
            <br />Tailwind · MDX</p>
          <a href="#" className="font-mono text-xs text-dark-accent hover:opacity-80 transition-opacity">
            View project →
          </a>
        </div>
      </div>
    </section>
  );
}
