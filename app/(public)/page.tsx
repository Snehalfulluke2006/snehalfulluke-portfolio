import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Timeline from "@/components/sections/Timeline";
import Photography from "@/components/sections/Photography";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import { Metadata } from "next";

import { getGalleryPhotos } from "@/lib/gallery";
import { trackPageView } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Snehal Fulluke | Modern Portfolio",
  description: "Senior Developer and Cinematic Creator crafting world-class digital experiences with Next.js, Flutter, and Motion Design.",
  openGraph: {
    title: "Snehal Fulluke - Developer & Creator",
    description: "Bridging advanced engineering with cinematic visual storytelling.",
    images: ["/images/profile/snehal-fulluke.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snehal Fulluke | Portfolio",
    description: "Senior Developer and Cinematic Creator.",
    images: ["/images/profile/snehal-fulluke.jpg"],
  }
};

export default async function Home() {
  const photos = getGalleryPhotos();
  try { await trackPageView("/") } catch { }

  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <About />
      <Timeline />
      <TechStack />
      <Projects />
      <Photography photos={photos} />
      <Services />
      <Testimonials />
      <Contact />
    </div>
  );
}
