import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/ToastProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Coding Ledger | Modern Developer Publication",
  description:
    "In-depth articles, tutorials, and real-world lessons on modern web development, design, and software engineering. Trusted by 12,000+ developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
