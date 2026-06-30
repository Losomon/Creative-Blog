import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import FeaturedArticle from "@/components/FeaturedArticle";
import TrendingArticles from "@/components/TrendingArticles";
import BrowseCategories from "@/components/BrowseCategories";
import LearningPaths from "@/components/LearningPaths";
import LatestTutorials from "@/components/LatestTutorials";
import DeveloperResources from "@/components/DeveloperResources";
import NewsletterCTA from "@/components/NewsletterCTA";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedArticle />
      <TrendingArticles />
      <BrowseCategories />
      <LearningPaths />
      <LatestTutorials />
      <DeveloperResources />
      <NewsletterCTA />
      <Testimonials />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
