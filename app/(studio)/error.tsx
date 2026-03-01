"use client"

import Link from "next/link"

/**
 * Studio route group error boundary — app/(studio)/error.tsx
 * Catches errors thrown by any Server Component in the (studio) group:
 * /studio, /studio/leads, /studio/projects, etc.
 *
 * NOTE: Does NOT emit <html>/<body> — those come from the root layout.
 * The studio flex shell (Sidebar + DashboardHeader) is in (studio)/layout.tsx.
 */
export default function StudioError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center h-full py-32 text-center space-y-6 px-6">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-red-400">
                Studio Error
            </div>
            <h1 className="text-4xl font-black tracking-tighter">
                Dashboard unavailable.
            </h1>
            <p className="text-white/30 max-w-sm font-medium">
                The studio encountered an error. This is usually a temporary database or network issue.
            </p>
            {error.digest && (
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    ref: {error.digest}
                </p>
            )}
            <div className="flex items-center gap-4">
                <button
                    onClick={reset}
                    className="px-8 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all"
                >
                    Retry
                </button>
                <Link
                    href="/studio"
                    className="px-8 py-3 rounded-2xl glass border border-white/10 text-white/60 font-black uppercase tracking-widest text-xs hover:text-white hover:border-white/30 transition-all"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    )
}
