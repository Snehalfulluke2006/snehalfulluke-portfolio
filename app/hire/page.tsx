import { Metadata } from "next";
import HireClient from "./HireClient";
import { trackHireIntent } from "@/lib/analytics";

export const metadata: Metadata = {
    title: "Hire Snehal Fulluke | Senior Developer & Visual Creator",
    description: "Book a high-tier developer and creator for your next big project. Specializing in Flutter, Next.js, and Cinematic Branding.",
    openGraph: {
        title: "Work with Snehal Fulluke",
        description: "Scale your product with premium engineering and world-class visuals.",
        images: [
            {
                url: "/images/profile/snehal-studio.jpg",
                width: 1200,
                height: 630,
                alt: "Hire Snehal Fulluke",
            },
        ],
    },
};

export default async function HirePage() {
    try { await trackHireIntent("hire_page_view") } catch { }
    return <HireClient />;
}
