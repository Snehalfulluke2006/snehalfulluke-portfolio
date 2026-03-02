"use server"

import { createClient } from "@supabase/supabase-js"
import { requireRole, type Role } from "./requireRole"
import { revalidatePath } from "next/cache"

function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )
}

export interface PlatformUser {
    id: string
    email: string
    role: Role
    last_sign_in_at: string | null
    created_at: string
}

export async function getUsers(): Promise<PlatformUser[]> {
    await requireRole(["owner"])

    const supabase = getAdminClient()
    const { data, error } = await supabase.auth.admin.listUsers()

    if (error) throw new Error(`Failed to fetch users: ${error.message}`)

    return data.users.map((u) => ({
        id: u.id,
        email: u.email!,
        role: (u.user_metadata?.role as Role) || "viewer",
        last_sign_in_at: u.last_sign_in_at || null,
        created_at: u.created_at,
    })).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function updateUserRole(userId: string, role: Role) {
    await requireRole(["owner"])
    const supabase = getAdminClient()

    const { error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { role }
    })

    if (error) return { error: error.message }

    revalidatePath("/studio/users")
    return { success: true }
}

export async function removeUser(userId: string) {
    await requireRole(["owner"])
    const supabase = getAdminClient()

    const { error } = await supabase.auth.admin.deleteUser(userId)

    if (error) return { error: error.message }

    revalidatePath("/studio/users")
    return { success: true }
}

export async function inviteEditor(email: string, role: Role) {
    await requireRole(["owner"])
    const supabase = getAdminClient()

    const { error, data } = await supabase.auth.admin.inviteUserByEmail(email, {
        data: { role }
    })

    if (error) return { error: error.message }

    revalidatePath("/studio/users")
    return { success: true }
}
