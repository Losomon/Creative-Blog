import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ProcessSection from "./components/ProcessSection";
import FeaturedBuild from "./components/FeaturedBuild";
import EssaysGrid from "./components/EssaysGrid";
import BuildLogNewsletter from "./components/BuildLogNewsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ProcessSection />
      <FeaturedBuild />
      <EssaysGrid />
      <BuildLogNewsletter />
      <Footer />
    </main>
  );
}
