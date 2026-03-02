"use server"

import { createClient } from "@supabase/supabase-js"
import { requireRole } from "@/app/actions/requireRole"

export type EventType = "page_view" | "project_click" | "hire_click" | "blog_view" | "contact_click"

function getAdminClient() {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured")
    }
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey
    )
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC: Fire-and-forget event write, called server-side from page renders.
// No auth required — intentional public write with silent failure.
// Service Role key is used server-side only (never reaches client bundle as
// this function has "use server" directive and runs in the Node/Edge runtime).
// ─────────────────────────────────────────────────────────────────────────────
export async function insertAnalyticsEvent(
    event_type: EventType,
    page: string,
    meta?: string
): Promise<void> {
    try {
        const supabase = getAdminClient()
        await supabase.from("analytics_events").insert({
            event_type,
            page,
            meta: meta ?? null,
            created_at: new Date().toISOString(),
        })
    } catch {
        // Silently fail — never break user experience for analytics
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// OWNER-ONLY: Dashboard aggregate query.
// Requires active authenticated owner session.
// ─────────────────────────────────────────────────────────────────────────────
export async function getAnalyticsSummary() {
    await requireRole(["owner", "editor", "viewer"])

    try {
        const supabase = getAdminClient()

        const [
            { count: totalViews },
            { count: projectClicks },
            { count: hireClicks },
            { count: blogViews },
            { data: topPageData },
            { data: recentEvents },
        ] = await Promise.all([
            supabase
                .from("analytics_events")
                .select("*", { count: "exact", head: true })
                .eq("event_type", "page_view"),
            supabase
                .from("analytics_events")
                .select("*", { count: "exact", head: true })
                .eq("event_type", "project_click"),
            supabase
                .from("analytics_events")
                .select("*", { count: "exact", head: true })
                .eq("event_type", "hire_click"),
            supabase
                .from("analytics_events")
                .select("*", { count: "exact", head: true })
                .eq("event_type", "blog_view"),
            supabase
                .from("analytics_events")
                .select("page")
                .eq("event_type", "page_view")
                .order("created_at", { ascending: false })
                .limit(100),
            supabase
                .from("analytics_events")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(6),
        ])

        let topPage = "/"
        if (topPageData && topPageData.length > 0) {
            const freq: Record<string, number> = {}
            topPageData.forEach((row) => {
                freq[row.page] = (freq[row.page] ?? 0) + 1
            })
            topPage = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "/"
        }

        return {
            totalViews: totalViews ?? 0,
            projectClicks: projectClicks ?? 0,
            hireClicks: hireClicks ?? 0,
            blogViews: blogViews ?? 0,
            topPage,
            recentEvents: recentEvents ?? [],
        }
    } catch {
        return {
            totalViews: 0, projectClicks: 0, hireClicks: 0,
            blogViews: 0, topPage: "/", recentEvents: [],
        }
    }
}
