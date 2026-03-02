import React from "react"
import { getAnalyticsSummary } from "@/app/actions/analytics"
import { getHealthStatus } from "@/app/actions/health"
import StudioDashboardClient from "./StudioDashboardClient"

export default async function StudioDashboard() {
    const [data, health] = await Promise.all([
        getAnalyticsSummary(),
        getHealthStatus()
    ])

    return <StudioDashboardClient initialData={data} initialHealth={health} />
}
