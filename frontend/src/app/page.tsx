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
      {/* Navbar sits on top of the hero, so it lives inside the dark wrap */}
      <div className="relative bg-ink">
        <div className="absolute inset-x-0 top-0 z-20">
          <Navbar />
        </div>
        <Hero />
      </div>

      <main className="relative z-10 -mt-6 rounded-t-[28px] bg-cream">
        <LatestArticle />

        <section className="mx-auto max-w-[1240px] px-6 py-14 md:px-12">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[repeat(4,1fr)_1.3fr]">
            <div className="lg:col-span-4">
              <TopicGrid />
            </div>
            <Newsletter />
          </div>
        </section>

        <BuildsSection />
        <FieldNotes />
      </main>

      <Footer />
    </>
  );
}
