import FeaturedBuild from './FeaturedBuild';
import CaseStudyCard from './CaseStudyCard';
import { caseStudies } from '@/data/builds';

export default function BuildsSection() {
  return (
    <section id="builds" className="mx-auto max-w-[1240px] px-6 py-14 md:px-12">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.16em]">
          Builds &amp; case studies
        </h2>
        <a href="/builds" className="flex items-center gap-1 text-sm font-semibold">
          View all →
        </a>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <FeaturedBuild />
        <div className="grid grid-rows-2 gap-6">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.title} study={study} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
