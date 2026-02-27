import { insertAnalyticsEvent, type EventType } from "@/app/actions/analytics"

/**
 * Fire a page_view event for the given route.
 * Call this from Server Components directly (no useEffect needed).
 */
export async function trackPageView(page: string): Promise<void> {
    await insertAnalyticsEvent("page_view", page)
}

/**
 * Track when a project card or case study is clicked.
 * @param projectId  The project slug, e.g. "sortiqo-game"
 */
export async function trackProjectClick(projectId: string): Promise<void> {
    await insertAnalyticsEvent("project_click", "/projects/" + projectId, projectId)
}

/**
 * Track when someone clicks a "Hire Me" CTA.
 * @param source  Which page triggered it, e.g. "hero" | "navbar" | "services"
 */
export async function trackHireIntent(source: string): Promise<void> {
    await insertAnalyticsEvent("hire_click", "/hire", source)
}

/**
 * Track a blog post being read.
 * @param slug  Blog post slug
 */
export async function trackBlogView(slug: string): Promise<void> {
    await insertAnalyticsEvent("blog_view", "/blog/" + slug, slug)
}

/**
 * Generic event tracker for custom events.
 */
export async function trackEvent(
    eventType: EventType,
    page: string,
    meta?: string
): Promise<void> {
    await insertAnalyticsEvent(eventType, page, meta)
}
