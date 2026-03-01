import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollToTop from "@/components/ScrollToTop";
import PublicLayoutShell from "@/components/PublicLayoutShell";
import ConditionalPublicChrome from "@/components/ConditionalPublicChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Snehal Fulluke | Senior Developer & Creative Technologist",
  description: "B.Sc Computer Science Student specializing in Flutter Development, Game Creation, and Professional Cinematography. Exploring the intersection of code and visual art.",
  keywords: ["Snehal Fulluke", "Flutter Developer", "Game Developer", "Photographer", "Video Editor", "Product Engineer"],
  metadataBase: new URL("https://snehal.dev"),
  openGraph: {
    title: "Snehal Fulluke | Portfolio",
    description: "Creative Technologist bridging the gap between high-fidelity code and cinematic visual storytelling.",
    url: "https://snehal.dev",
    siteName: "Snehal Fulluke Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Snehal Fulluke Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snehal Fulluke | Developer & Creator",
    description: "Building the future of digital experiences through code and visuals.",
    creator: "@snehalfulluke",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth selection:bg-white/10 selection:text-white">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground",
          inter.variable
        )}
      >
        <PublicLayoutShell>
          {/* Public-only chrome: cursor, progress, scroll, analytics */}
          <LoadingScreen />
          <CustomCursor />
          <ScrollProgress />
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />

          {/*
            ConditionalPublicChrome:
            - Public routes  → wraps children in Navbar + PageTransition + Footer
            - Studio routes  → passes children through directly (studio has its own layout shell)
          */}
          <ConditionalPublicChrome>
            {children}
          </ConditionalPublicChrome>
        </PublicLayoutShell>
      </body>
    </html>
  );
}
