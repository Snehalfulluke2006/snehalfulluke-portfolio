import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "./studio/components/DashboardHeader";
import { Sidebar } from "./studio/components/Sidebar";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Studio — Snehal Fulluke",
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
};

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body
                className={cn(
                    "min-h-screen bg-[#050505] text-white antialiased",
                    inter.variable
                )}
            >
                <div className="flex h-screen overflow-hidden">
                    <Sidebar />
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <DashboardHeader />
                        <main className="flex-1 overflow-y-auto p-12">
                            {children}
                        </main>
                    </div>
                </div>
            </body>
        </html>
    );
}
