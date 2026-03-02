"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { requireRole } from "@/app/actions/requireRole"

export type LeadStatus = "new" | "contacted" | "closed"

export interface Lead {
    id: string
    name: string
    email: string
    service: string
    message: string
    budget: string
    status: LeadStatus
    notes: string | null
    created_at: string
}

/**
 * Returns an admin Supabase client using the Service Role key.
 * Throws clearly if the env var is missing rather than silently
 * falling back to the anon key (which would have wrong permissions).
 */
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
// PUBLIC: Anyone can submit a lead from the Hire page form.
// No auth required — this is the intentional public write endpoint.
// ─────────────────────────────────────────────────────────────────────────────
export async function submitLead(formData: FormData) {
    const supabase = getAdminClient()
    const { error } = await supabase.from("leads").insert({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        service: formData.get("service") as string,
        message: formData.get("message") as string,
        budget: formData.get("budget") as string,
        status: "new",
        notes: null,
    })
    if (error) return { error: error.message }
    return { success: true }
}

// ─────────────────────────────────────────────────────────────────────────────
// OWNER-ONLY: All actions below require an active authenticated owner session.
// requireOwner() throws "Unauthorized" if the session is absent or wrong email.
// ─────────────────────────────────────────────────────────────────────────────

export async function getLeads(): Promise<Lead[]> {
    await requireRole(["owner", "editor", "viewer"])
    const supabase = getAdminClient()
    const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
    if (error) return []
    return (data ?? []) as Lead[]
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
    await requireRole(["owner"])
    const supabase = getAdminClient()
    const { error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", id)
    if (error) return { error: error.message }
    revalidatePath("/studio/leads")
    return { success: true }
}

export async function saveLeadNote(id: string, notes: string) {
    await requireRole(["owner"])
    const supabase = getAdminClient()
    const { error } = await supabase
        .from("leads")
        .update({ notes })
        .eq("id", id)
    if (error) return { error: error.message }
    revalidatePath("/studio/leads")
    return { success: true }
}

export async function deleteLead(id: string) {
    await requireRole(["owner"])
    const supabase = getAdminClient()
    const { error } = await supabase.from("leads").delete().eq("id", id)
    if (error) return { error: error.message }
    revalidatePath("/studio/leads")
    return { success: true }
}

export async function getNewLeadCount(): Promise<number> {
    await requireRole(["owner", "editor", "viewer"])
    const supabase = getAdminClient()
    const { count } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "new")
    return count ?? 0
}
