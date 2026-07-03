import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import BackgroundShapes from "@/components/BackgroundShapes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "The Coding Ledger — Insights that empower developers",
  description:
    "Modern tutorials, real-world projects, career advice, and everything you need to grow in software engineering.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${jetbrainsMono.variable}`}>
        <ToastProvider>
          <BackgroundShapes />
          <ScrollTop />
          <Header />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
