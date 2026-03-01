"use server"

import { createClient } from "@supabase/supabase-js"
import { requireOwner } from "@/lib/auth-guard"
import { revalidatePath } from "next/cache"

const BUCKET_NAME = "gallery"

function getAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
}

export interface GalleryImage {
    id: string
    title: string
    category: string
    image: string
    path: string
    description?: string
}

export async function uploadGalleryImage(formData: FormData) {
    await requireOwner()

    const file = formData.get("file") as File
    const category = formData.get("category") as string || "General"

    if (!file) return { error: "No file provided" }

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        return { error: "File exceeds 5MB limit" }
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
        return { error: "Only image files are allowed" }
    }

    const supabase = getAdminClient()
    const year = new Date().getFullYear();
    const cleanFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const path = `${year}/${Date.now()}_${cleanFilename}`

    try {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(path, buffer, {
                contentType: file.type,
                upsert: false // Prevent overwrite collisions
            })

        if (error) throw error

        revalidatePath("/")
        revalidatePath("/studio/gallery")
        return { success: true, path: data.path }
    } catch (e: any) {
        return { error: `Upload failed: ${e.message}` }
    }
}

export async function deleteGalleryImage(path: string) {
    await requireOwner()
    const supabase = getAdminClient()

    try {
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([path])

        if (error) return { error: error.message }

        revalidatePath("/")
        revalidatePath("/studio/gallery")
        return { success: true }
    } catch (e: any) {
        return { error: `Delete failed: ${e.message}` }
    }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data: years, error: folderError } = await supabase.storage.from(BUCKET_NAME).list()
        if (folderError || !years) return []

        let allImages: GalleryImage[] = []

        for (const yearFolder of years) {
            // Check if it's a folder (no metadata)
            if (!yearFolder.id) continue

            const { data: files } = await supabase.storage
                .from(BUCKET_NAME)
                .list(yearFolder.name)

            if (!files) continue

            for (const file of files) {
                if (file.name === ".emptyFolderPlaceholder") continue

                const fullPath = `${yearFolder.name}/${file.name}`
                const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fullPath)

                // Simple title parse (Date_filename)
                const parsedTitle = file.name.replace(/^\d+_/, "").split(".")[0].replace(/[_-]/g, " ")

                allImages.push({
                    id: file.id,
                    title: parsedTitle || "Untitled",
                    category: "General", // Default assigned automatically right now
                    image: data.publicUrl,
                    path: fullPath
                })
            }
        }

        // Return sorted by newest
        return allImages.sort((a, b) => b.path.localeCompare(a.path))
    } catch {
        return []
    }
}
