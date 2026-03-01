"use server"

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { revalidatePath } from "next/cache"
import { requireOwner } from "@/lib/auth-guard"

const PROJECTS_PATH = path.join(process.cwd(), "content/projects")

export interface ProjectSaveData {
    slug: string
    title: string
    description: string
    date: string
    category: string
    image: string
    problem: string
    solution: string
    tech: string[]
    tags: string[]
    github?: string
    live?: string
    content: string
}

export async function deleteProject(slug: string) {
    await requireOwner()

    // Validate slug to prevent path traversal
    if (!/^[a-z0-9-]+$/.test(slug)) {
        return { error: "Invalid project slug" }
    }

    const filePath = path.join(PROJECTS_PATH, `${slug}.mdx`)

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
            revalidatePath("/projects")
            revalidatePath("/studio/projects")
            return { success: true }
        }
        return { error: "Project not found" }
    } catch (e: any) {
        throw new Error(`Failed to delete project: ${e.message}`)
    }
}

export async function saveProject(data: ProjectSaveData, isEdit: boolean) {
    await requireOwner()

    // Prevent path traversal
    if (!/^[a-z0-9-]+$/.test(data.slug)) {
        return { error: "Invalid project slug (use lowercase kebab-case only)" }
    }

    // Ensure directory exists
    if (!fs.existsSync(PROJECTS_PATH)) {
        fs.mkdirSync(PROJECTS_PATH, { recursive: true })
    }

    const filePath = path.join(PROJECTS_PATH, `${data.slug}.mdx`)

    try {
        if (!isEdit && fs.existsSync(filePath)) {
            return { error: "A project with this slug already exists" }
        }

        // Construct gray-matter frontmatter
        const { content, slug, ...frontmatter } = data

        // Build the MDX string manually or via gray-matter
        // Note: Using matter.stringify doesn't nicely strip out empty fields sometimes, 
        // so we'll build manually for clean markdown
        const fileContent = matter.stringify(content, frontmatter)

        fs.writeFileSync(filePath, fileContent, "utf8")

        revalidatePath("/projects")
        revalidatePath(`/projects/${slug}`)
        revalidatePath("/studio/projects")

        return { success: true }
    } catch (e: any) {
        throw new Error(`Failed to save project: ${e.message}`)
    }
}
