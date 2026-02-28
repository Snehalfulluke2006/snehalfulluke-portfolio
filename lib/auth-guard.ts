"use server"

import { createClient } from "@/utils/supabase/server"

const OWNER_EMAIL = "snehalfulluke@gmail.com"

/**
 * Verifies the incoming server request has an active Supabase session
 * belonging to the owner email. Throws an error if not.
 * Call this at the top of every studio-only Server Action.
 */
export async function requireOwner(): Promise<void> {
    const supabase = await createClient()
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error || !user || user.email !== OWNER_EMAIL) {
        throw new Error("Unauthorized: owner session required")
    }
}
