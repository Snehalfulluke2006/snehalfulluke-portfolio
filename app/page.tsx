import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Timeline from "@/components/sections/Timeline";
import Photography from "@/components/sections/Photography";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { Metadata } from "next";

import { getGalleryPhotos } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Snehal Fulluke | Senior Developer & Visual Creator",
  description: "B.Sc Computer Science student building premium digital experiences. Specialist in Flutter, Unity, and Cinematic Media.",
};

export default function Home() {
  const photos = getGalleryPhotos();

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
      <Contact />
    </div>
  );
}
