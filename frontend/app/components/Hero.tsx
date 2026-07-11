import Hologram from "./Hologram";
import SitePhoto from "./SitePhoto";
import CalloutLine from "./CalloutLine";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <SitePhoto seed="solo-desk-hero" className="absolute inset-0" />
      {/* Warm gradient wash so text stays legible over the photo, matching a real sunlit-desk shot */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent" />

      <div className="relative px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="max-w-lg">
            <p className="font-mono text-[11px] tracking-[0.04em] text-blueprint mb-4">
              CHAPTER 01 &middot; ARRIVAL
            </p>
            <h1 className="font-display font-medium text-ink text-[2.75rem] md:text-[3.25rem] leading-[1.05] mb-6">
              Nothing great
              <br />
              gets built
              <br />
              by accident.
            </h1>
            <p className="font-body text-ink-soft text-base leading-relaxed mb-8 max-w-md">
              A publication documenting the art and engineering of building
              exceptional web experiences — one deliberate decision at a
              time.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-ink text-bg font-body text-sm font-medium px-5 py-3 rounded-sm hover:opacity-90 transition-opacity"
              >
                Read the first chapter →
              </a>
              <span className="font-mono text-xs text-blueprint">or scroll ↓</span>
            </div>
          </div>

          {/* Signature moment: hologram + callout annotations over the photo */}
          <div className="relative h-80 md:h-[26rem]">
            <div className="absolute left-[-90px] top-6 hidden lg:block">
              <CalloutLine label="Hierarchy starts here" align="left" />
            </div>
            <div className="absolute left-[-90px] top-24 hidden lg:block">
              <CalloutLine label="Whitespace is intentional" align="left" />
            </div>

            <Hologram />

            <div className="absolute right-0 top-4 w-40 border border-blueprint/30 bg-bg/90 backdrop-blur-sm rounded-sm p-3">
              <p className="font-mono text-[10px] text-blueprint mb-1.5">
                WHY THIS DECISION
              </p>
              <p className="font-mono text-[10px] text-ink-soft leading-relaxed">
                Three lines, not one paragraph — the headline reads like a
                cover, not a caption.
              </p>
            </div>
          </div>
        </div>

        {/* Corner metadata */}
        <div className="mt-10 flex items-end justify-between">
          <div className="font-mono text-[10px] text-ink-faint leading-relaxed">
            GRID 12
            <br />
            BASELINE 8
            <br />
            MAX WIDTH 820PX
          </div>
          <span className="font-mono text-[11px] text-ink-faint">01</span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.05em] text-blueprint">
          <span>IDEA</span>
          <span className="text-line">→</span>
          <span>SKETCH</span>
          <span className="text-line">→</span>
          <span>BLUEPRINT</span>
          <span className="text-line">→</span>
          <span>INTERFACE</span>
          <span className="text-line">→</span>
          <span>PRODUCT</span>
        </div>
      </div>
    </section>
  );
}
