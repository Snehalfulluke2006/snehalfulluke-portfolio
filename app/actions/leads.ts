"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

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

function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

// ── Public: anyone can submit a lead from the hire page ──────────────────────
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

// ── Studio: fetch all leads ───────────────────────────────────────────────────
export async function getLeads(): Promise<Lead[]> {
    const supabase = getAdminClient()
    const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
    if (error) return []
    return (data ?? []) as Lead[]
}

// ── Studio: update status ─────────────────────────────────────────────────────
export async function updateLeadStatus(id: string, status: LeadStatus) {
    const supabase = getAdminClient()
    const { error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", id)
    if (error) return { error: error.message }
    revalidatePath("/studio/leads")
    return { success: true }
}

// ── Studio: save notes ────────────────────────────────────────────────────────
export async function saveLeadNote(id: string, notes: string) {
    const supabase = getAdminClient()
    const { error } = await supabase
        .from("leads")
        .update({ notes })
        .eq("id", id)
    if (error) return { error: error.message }
    revalidatePath("/studio/leads")
    return { success: true }
}

// ── Studio: delete lead ───────────────────────────────────────────────────────
export async function deleteLead(id: string) {
    const supabase = getAdminClient()
    const { error } = await supabase.from("leads").delete().eq("id", id)
    if (error) return { error: error.message }
    revalidatePath("/studio/leads")
    return { success: true }
}

// ── Studio: count new leads ───────────────────────────────────────────────────
export async function getNewLeadCount(): Promise<number> {
    const supabase = getAdminClient()
    const { count } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "new")
    return count ?? 0
}
