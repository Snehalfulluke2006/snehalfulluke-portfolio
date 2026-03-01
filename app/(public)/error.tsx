"use client"

import Link from "next/link"

/**
 * Public route group error boundary — app/(public)/error.tsx
 * Catches errors thrown by any Server Component in the (public) group:
 * /, /blog, /blog/[slug], /projects/[slug], /hire, /guestbook, /resume
 */
export default function PublicError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
            <div className="text-center space-y-6 max-w-lg">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-red-400">
                    Page Error
                </div>
                <h1 className="text-5xl font-black tracking-tighter">
                    Couldn't load this page.
                </h1>
                <p className="text-white/40 font-medium leading-relaxed">
                    Something went wrong while loading this content.
                    This is likely temporary — please try again.
                </p>
                {error.digest && (
                    <p className="text-[10px] font-mono text-white/20 tracking-widest">
                        ref: {error.digest}
                    </p>
                )}
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={reset}
                        className="px-8 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-8 py-3 rounded-2xl glass border border-white/10 text-white/60 font-black uppercase tracking-widest text-xs hover:text-white hover:border-white/30 transition-all"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
