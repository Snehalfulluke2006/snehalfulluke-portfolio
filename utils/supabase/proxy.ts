/**
 * utils/supabase/proxy.ts
 *
 * Edge-runtime-safe Supabase session handler for proxy.ts (Next.js 16).
 *
 * DELIBERATELY does NOT import:
 *   - next/headers          ← Node.js only — kills Edge runtime
 *   - utils/supabase/server ← imports next/headers
 *   - lib/auth-guard.ts     ← imports utils/supabase/server
 *   - any "use server" file
 *
 * Only imports: @supabase/ssr + next/server (both Edge-compatible).
 */

import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

const OWNER_EMAIL = "snehalfulluke@gmail.com"

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(
                    cookiesToSet: { name: string; value: string; options: CookieOptions }[]
                ) {
                    cookiesToSet.forEach(({ name, value }: { name: string; value: string }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(
                        ({
                            name,
                            value,
                            options,
                        }: {
                            name: string
                            value: string
                            options: CookieOptions
                        }) => supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Use getUser() not getSession() — validates JWT on Supabase server.
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const role = user?.user_metadata?.role || "viewer"
    const isOwner = role === "owner"
    const isEditor = role === "editor"
    const isViewer = role === "viewer"
    const isPrivileged = isOwner || isEditor || isViewer

    // ── /studio/* — strictly privileged-only ──────────────────────────────────────
    if (request.nextUrl.pathname.startsWith("/studio")) {
        if (!user) {
            const url = request.nextUrl.clone()
            url.pathname = "/sf-login"
            return NextResponse.redirect(url)
        }
        if (!isPrivileged) {
            const url = request.nextUrl.clone()
            url.pathname = "/"
            return NextResponse.redirect(url)
        }

        // Settings, Users -> Owner only
        if ((request.nextUrl.pathname.startsWith("/studio/settings") || request.nextUrl.pathname.startsWith("/studio/users")) && !isOwner) {
            const url = request.nextUrl.clone()
            url.pathname = "/studio"
            return NextResponse.redirect(url)
        }
    }

    // ── /sf-login — redirect authenticated privileged user away ─────────────────────────
    if (request.nextUrl.pathname === "/sf-login" && user && isPrivileged) {
        const url = request.nextUrl.clone()
        url.pathname = "/studio"
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
