import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: ["400", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Access Restricted",
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
};

export default function AuthLayout({
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
                {children}
            </body>
        </html>
    );
}
