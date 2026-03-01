import Link from "next/link"

/**
 * Root not-found — app/not-found.tsx
 * Renders when notFound() is called or a URL matches no route.
 */
export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
            <div className="text-center space-y-6 max-w-md">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
                    404
                </div>
                <h1 className="text-6xl font-black tracking-tighter">
                    Not Found.
                </h1>
                <p className="text-white/40 font-medium leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}
