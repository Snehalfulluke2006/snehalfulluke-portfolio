"use client"

/**
 * Root error boundary — app/error.tsx
 * Catches unhandled errors in the root layout segment.
 * Does NOT replace <html>/<body> — those come from root layout.
 */
export default function RootError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
            <div className="text-center space-y-6 max-w-md">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-red-400">
                    Unexpected Error
                </div>
                <h1 className="text-4xl font-black tracking-tighter">
                    Something went wrong.
                </h1>
                <p className="text-white/40 font-medium leading-relaxed">
                    An error occurred while loading this page. Please try again.
                </p>
                {error.digest && (
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                        Ref: {error.digest}
                    </p>
                )}
                <button
                    onClick={reset}
                    className="px-8 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}
