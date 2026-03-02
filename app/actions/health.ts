"use server"

import { createClient } from "@supabase/supabase-js"
import { requireRole } from "./requireRole"

function getClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

export async function checkSupabase() {
    try {
        const { error } = await getClient().from("analytics_events").select("id").limit(1)
        return error ? "Degraded" : "Operational"
    } catch {
        return "Offline"
    }
}

export async function checkStorage() {
    try {
        const { error } = await getClient().storage.listBuckets()
        return error ? "Degraded" : "Operational"
    } catch {
        return "Offline"
    }
}

export async function checkAuth() {
    try {
        const { error } = await getClient().auth.getSession()
        return error ? "Degraded" : "Operational"
    } catch {
        return "Offline"
    }
}

export async function checkVercelEdge() {
    return "Operational" // If this function executes, Vercel Edge/Serverless is up.
}

export async function getHealthStatus() {
    await requireRole(["owner", "editor", "viewer"])
    const [db, storage, auth, edge] = await Promise.all([
        checkSupabase(),
        checkStorage(),
        checkAuth(),
        checkVercelEdge()
    ])

    return { db, storage, auth, edge }
}
