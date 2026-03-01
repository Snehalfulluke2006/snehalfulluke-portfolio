"use client"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center space-y-6 px-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-red-400">
                        System Error
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter">
                        Something went wrong.
                    </h1>
                    <p className="text-white/40 font-medium max-w-sm mx-auto">
                        An unexpected error occurred. Please try refreshing the page.
                    </p>
                    {error.digest && (
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                            Error ID: {error.digest}
                        </p>
                    )}
                    <button
                        onClick={reset}
                        className="px-8 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all"
                    >
                        Try Again
                    </button>
                </div>
            </body>
        </html>
    )
}
