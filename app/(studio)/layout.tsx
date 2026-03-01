import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "./studio/components/DashboardHeader";
import { Sidebar } from "./studio/components/Sidebar";

/**
 * Studio Layout — (studio) route group
 *
 * IMPORTANT: This layout does NOT emit <html> or <body>.
 * The root app/layout.tsx already provides those.
 * Emitting nested <html>/<body> here would cause:
 *   - Hydration mismatch
 *   - "removeChild: node is not a child" DOM errors
 *   - Broken public pages due to React tree corruption
 *
 * This layout simply provides the sidebar + header flex shell.
 */

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
        <div
            className={cn(
                "flex h-screen overflow-hidden bg-[#050505] text-white antialiased",
                inter.variable
            )}
        >
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto p-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
