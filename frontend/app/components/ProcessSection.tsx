import SitePhoto from "./SitePhoto";

const steps = [
  { n: "01", label: "IDEA" },
  { n: "02", label: "SKETCH" },
  { n: "03", label: "WIREFRAME" },
  { n: "04", label: "PROTOTYPE" },
  { n: "05", label: "DEVELOPMENT" },
  { n: "06", label: "LAUNCH" },
];

export default function ProcessSection() {
  return (
    <section className="relative px-10 py-14 bg-bg-alt border-y border-line">
      <span className="hidden lg:block absolute left-3 top-14 font-mono text-[10px] text-ink-faint">
        02
      </span>

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        <div>
          <p className="font-mono text-[11px] tracking-[0.04em] text-blueprint mb-3">
            THE PROCESS
          </p>
          <h2 className="font-display font-medium text-ink text-[1.6rem] mb-3">
            From idea
            <br />
            to impact.
          </h2>
          <p className="font-body text-sm text-ink-soft leading-relaxed mb-4 max-w-[220px]">
            Every project begins with questions. We design the answers.
          </p>
          <a href="#" className="font-mono text-xs text-blueprint hover:opacity-70 transition-opacity">
            View the process →
          </a>
        </div>

        <div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {steps.map((step) => (
              <div key={step.n}>
                <p className="font-mono text-[10px] text-ink-faint mb-2">
                  {step.n}
                  <br />
                  {step.label}
                </p>
                <SitePhoto seed={`process-${step.n}`} className="h-20 rounded-sm" />
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-line flex justify-end">
            <a href="#" className="font-mono text-xs text-blueprint hover:opacity-70 transition-opacity">
              Explore a build log →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
