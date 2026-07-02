"use client";

import { useEffect } from "react";
import BgShapes from "@/components/BgShapes";
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
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import styles from "@/styles/home.module.css";

export default function HomePage() {
  const pageRef = useRevealOnScroll(styles.reveal, styles.in);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "true";
    document.documentElement.setAttribute("data-theme", stored ? "dark" : "light");
  }, []);

  return (
    <div ref={pageRef}>
      <BgShapes />
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
    </div>
  );
}
