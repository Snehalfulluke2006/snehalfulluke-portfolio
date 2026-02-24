import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Snehal Fulluke | Senior Developer & Visual Artist",
  description: "Senior App Developer, Game Creator, Photographer & Video Editor. Crafting high-fidelity digital experiences.",
  metadataBase: new URL("https://snehal.dev"), // Update when ready
  openGraph: {
    title: "Snehal Fulluke | High-Fidelity Portfolio",
    description: "App Developer, Game Creator, Photographer & Video Editor.",
    type: "website",
    images: ["/og-image.png"], // Add an OG image to public/
  },
  twitter: {
    card: "summary_large_image",
    title: "Snehal Fulluke",
    description: "Senior Developer & Visual Artist",
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
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />

        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 transition-all duration-700 ease-[0.22, 1, 0.36, 1]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
