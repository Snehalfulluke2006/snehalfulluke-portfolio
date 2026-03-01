"use client"

/**
 * PublicChrome — client component
 *
 * Provides the public page shell:
 * - OwnerContext (for owner mode editing)
 * - Public-only UI: LoadingScreen, CustomCursor, ScrollProgress, ScrollToTop
 * - Navbar / PageTransition / Footer wrapper
 *
 * This runs ONLY for routes inside app/(public)/* — never for studio routes.
 * Because it lives inside a route group layout, there is NO pathname check,
 * NO conditional rendering of children, and NO hydration mismatch.
 */

import { OwnerProvider } from "@/contexts/OwnerContext"
import { EditModal, OwnerToolbar } from "@/components/EditUI"
import LoadingScreen from "@/components/LoadingScreen"
import CustomCursor from "@/components/CustomCursor"
import ScrollProgress from "@/components/ScrollProgress"
import ScrollToTop from "@/components/ScrollToTop"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageTransition from "@/components/PageTransition"

export default function PublicChrome({ children }: { children: React.ReactNode }) {
    return (
        <OwnerProvider>
            {/* Public-only ambient UI */}
            <LoadingScreen />
            <CustomCursor />
            <ScrollProgress />
            <ScrollToTop />

            {/* Owner mode editing UI — only renders when isOwner = true */}
            <EditModal />
            <OwnerToolbar />

            {/* Page shell */}
            <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
                <Footer />
            </div>
        </OwnerProvider>
    )
}
