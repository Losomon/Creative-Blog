import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import LatestArticle from '@/components/journal/LatestArticle';
import TopicGrid from '@/components/journal/TopicGrid';
import Newsletter from '@/components/newsletter/Newsletter';
import BuildsSection from '@/components/builds/BuildsSection';
import FieldNotes from '@/components/journal/FieldNotes';

export default function Home() {
  return (
    <>
      <div className="relative bg-ink">
        <div className="absolute inset-x-0 top-0 z-20">
          <Navbar />
        </div>
        <Hero />
      </div>

      <main className="relative z-10 -mt-6 rounded-t-[28px] bg-cream">
        <div className="mx-auto max-w-[1240px] px-6 pt-14 md:px-12">
          <LatestArticle />
        </div>

        <section className="mx-auto max-w-[1240px] px-6 pb-14 pt-10 md:px-12">
          <div className="section-head">
            <span className="eyebrow">Explore topics</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_1.3fr]">
            <div className="lg:col-span-4">
              <TopicGrid />
            </div>
            <Newsletter />
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-6 pb-14 md:px-12">
          <BuildsSection />
        </section>

        <section className="mx-auto max-w-[1240px] px-6 pb-20 md:px-12">
          <FieldNotes />
        </section>
      </main>

      <Footer />
    </>
  );
}
