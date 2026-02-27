import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Strict route protection
    if (request.nextUrl.pathname.startsWith("/studio")) {
        if (!user) {
            // not authenticated -> redirect to login
            const url = request.nextUrl.clone()
            url.pathname = "/sf-login"
            return NextResponse.redirect(url)
        }

        // Owner access only check
        if (user.email !== "snehalfulluke@gmail.com") {
            // signed in but not owner -> redirect to home
            const url = request.nextUrl.clone()
            url.pathname = "/"
            return NextResponse.redirect(url)
        }
    }

    // If visiting login page while already authenticated -> redirect to studio
    if (request.nextUrl.pathname === "/sf-login" && user && user.email === "snehalfulluke@gmail.com") {
        const url = request.nextUrl.clone()
        url.pathname = "/studio"
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}
