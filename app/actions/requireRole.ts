"use server"

import { createClient } from "@/utils/supabase/server"

export type Role = "owner" | "editor" | "viewer"

/**
 * Validates the user session and checks if their assigned role via raw_user_meta_data
 * is within the allowed roles array. "owner" always bypasses all checks.
 */
export async function requireRole(allowedRoles: Role[]): Promise<any> {
    const supabase = await createClient()
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error || !user) {
        throw new Error("Unauthorized: active session required")
    }

    const role = (user.user_metadata?.role as Role) || "viewer"

    if (role === "owner") return user

    if (!allowedRoles.includes(role)) {
        throw new Error(`Unauthorized: Insufficient permissions. Role required: ${allowedRoles.join(", ")}`)
    }

    return user
}

export async function getUserRole(): Promise<Role | null> {
    const supabase = await createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    return (user.user_metadata?.role as Role) || "viewer"
}
