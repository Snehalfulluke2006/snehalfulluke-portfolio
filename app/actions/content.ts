"use server"

import { createClient as createServerSupabase } from "@/utils/supabase/server"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

export interface SiteContent {
    key: string
    value: string
    updated_at: string
}

const OWNER_EMAIL = "snehalfulluke@gmail.com"

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

// Read a single content key (public read, uses service role for simplicity)
export async function getSiteContent(key: string): Promise<string | null> {
    const supabase = getAdminClient()
    const { data } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", key)
        .single()
    return data?.value ?? null
}

// Read all content keys (public read)
export async function getAllSiteContent(): Promise<Record<string, string>> {
    const supabase = getAdminClient()
    const { data } = await supabase.from("site_content").select("key, value")
    if (!data) return {}
    return Object.fromEntries(data.map((row) => [row.key, row.value]))
}

// Write content — verifies owner session before any DB write
export async function upsertSiteContent(
    key: string,
    value: string
): Promise<{ success?: boolean; error?: string }> {
    try {
        // Double-layer guard: verify Supabase session independently of middleware
        const serverSupabase = await createServerSupabase()
        const { data: { user }, error: authError } = await serverSupabase.auth.getUser()
        if (authError || !user || user.email !== OWNER_EMAIL) {
            return { error: "Unauthorized" }
        }

        const admin = getAdminClient()
        const { error } = await admin.from("site_content").upsert(
            { key, value, updated_at: new Date().toISOString() },
            { onConflict: "key" }
        )
        if (error) return { error: error.message }

        revalidatePath("/")
        revalidatePath("/hire")
        return { success: true }
    } catch (e: any) {
        return { error: e.message ?? "Unknown error" }
    }
}
