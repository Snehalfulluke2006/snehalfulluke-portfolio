"use client"

import { useEffect } from "react"
import { insertAnalyticsEvent, type EventType } from "@/app/actions/analytics"

interface PageTrackerProps {
    page: string
    eventType?: EventType
    meta?: string
}

/**
 * Drop this inside any Client Component to fire a single
 * analytics event on mount. Completely silent — never throws.
 */
export default function PageTracker({ page, eventType = "page_view", meta }: PageTrackerProps) {
    useEffect(() => {
        insertAnalyticsEvent(eventType, page, meta).catch(() => { })
    }, [page, eventType, meta])

    return null
}
