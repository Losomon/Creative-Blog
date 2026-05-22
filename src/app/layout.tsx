import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Dev Atelier — Digital Architecture Studio",
  description: "Crafting immersive digital experiences through design, motion, and engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}