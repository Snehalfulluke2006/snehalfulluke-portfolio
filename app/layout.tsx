import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * ROOT LAYOUT — app/layout.tsx
 *
 * Rules:
 * 1. ONLY ONE <html> and <body> in the entire app tree — here.
 * 2. Contains ONLY universal providers and passive scripts.
 * 3. NO Navbar, Footer, PageTransition, or public chrome here.
 *    Those live in app/(public)/layout.tsx (public route group).
 * 4. NO conditional rendering on pathname — that causes hydration mismatch.
 * 5. Studio layout is isolated via app/(studio)/layout.tsx route group.
 */

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Snehal Fulluke | Senior Developer & Creative Technologist",
  description: "B.Sc Computer Science Student specializing in Flutter Development, Game Creation, and Professional Cinematography.",
  keywords: ["Snehal Fulluke", "Flutter Developer", "Game Developer", "Photographer", "Video Editor"],
  metadataBase: new URL("https://snehal.dev"),
  openGraph: {
    title: "Snehal Fulluke | Portfolio",
    description: "Creative Technologist bridging the gap between high-fidelity code and cinematic visual storytelling.",
    url: "https://snehal.dev",
    siteName: "Snehal Fulluke Portfolio",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Snehal Fulluke Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snehal Fulluke | Developer & Creator",
    description: "Building the future of digital experiences through code and visuals.",
    creator: "@snehalfulluke",
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth selection:bg-white/10 selection:text-white">
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground", inter.variable)}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
