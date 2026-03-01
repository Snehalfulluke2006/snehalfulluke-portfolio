"use client"

/**
 * ConditionalPublicChrome
 *
 * Renders the public Navbar, PageTransition, and Footer ONLY on public routes.
 * Studio routes (/studio/*, /sf-login) render children directly with no public chrome.
 *
 * This is required because the root app/layout.tsx wraps ALL routes including
 * (studio) route group. Without this guard, Navbar + Footer + PageTransition
 * would render inside the studio dashboard.
 */

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageTransition from "@/components/PageTransition"

const STUDIO_PREFIXES = ["/studio", "/sf-login"]

export default function ConditionalPublicChrome({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const isStudioRoute = STUDIO_PREFIXES.some((prefix) =>
        pathname.startsWith(prefix)
    )

    if (isStudioRoute) {
        // Studio routes render children directly — no Navbar, Footer, or PageTransition
        return <>{children}</>
    }

    return (
        <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
        </div>
    )
}
