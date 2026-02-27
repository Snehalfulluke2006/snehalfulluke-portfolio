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
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

// Read a single content key (public)
export async function getSiteContent(key: string): Promise<string | null> {
    const supabase = getAdminClient()
    const { data } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", key)
        .single()
    return data?.value ?? null
}

// Read all content (public)
export async function getAllSiteContent(): Promise<Record<string, string>> {
    const supabase = getAdminClient()
    const { data } = await supabase.from("site_content").select("key, value")
    if (!data) return {}
    return Object.fromEntries(data.map((row) => [row.key, row.value]))
}

// Save content — verifies owner session before writing
export async function upsertSiteContent(
    key: string,
    value: string
): Promise<{ success?: boolean; error?: string }> {
    try {
        // Verify caller is the authenticated owner
        const serverSupabase = createServerSupabase()
        const { data: { user } } = await (await serverSupabase).auth.getUser()
        if (!user || user.email !== OWNER_EMAIL) {
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
