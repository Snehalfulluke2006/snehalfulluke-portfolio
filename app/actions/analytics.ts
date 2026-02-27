"use server"

import { createClient } from "@supabase/supabase-js"

// Use service-role key for analytics writes — bypasses RLS
function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

export type EventType = "page_view" | "project_click" | "hire_click" | "blog_view" | "contact_click"

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

export async function getAnalyticsSummary() {
    try {
        const supabase = getAdminClient()

        // Total page views
        const { count: totalViews } = await supabase
            .from("analytics_events")
            .select("*", { count: "exact", head: true })
            .eq("event_type", "page_view")

        // Project clicks
        const { count: projectClicks } = await supabase
            .from("analytics_events")
            .select("*", { count: "exact", head: true })
            .eq("event_type", "project_click")

        // Hire conversions
        const { count: hireClicks } = await supabase
            .from("analytics_events")
            .select("*", { count: "exact", head: true })
            .eq("event_type", "hire_click")

        // Blog views
        const { count: blogViews } = await supabase
            .from("analytics_events")
            .select("*", { count: "exact", head: true })
            .eq("event_type", "blog_view")

        // Top page (most visited)
        const { data: topPageData } = await supabase
            .from("analytics_events")
            .select("page")
            .eq("event_type", "page_view")
            .order("created_at", { ascending: false })
            .limit(100)

        let topPage = "/"
        if (topPageData && topPageData.length > 0) {
            const freq: Record<string, number> = {}
            topPageData.forEach((row) => {
                freq[row.page] = (freq[row.page] ?? 0) + 1
            })
            topPage = Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "/"
        }

        // Recent events
        const { data: recentEvents } = await supabase
            .from("analytics_events")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(6)

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
            totalViews: 0,
            projectClicks: 0,
            hireClicks: 0,
            blogViews: 0,
            topPage: "/",
            recentEvents: [],
        }
    }
}
