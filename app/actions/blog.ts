"use server"

import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { revalidatePath } from "next/cache"
import { requireOwner } from "@/lib/auth-guard"

const BLOG_PATH = path.join(process.cwd(), "content/blog")

export interface BlogSaveData {
    slug: string
    title: string
    description: string
    date: string
    readTime: string
    category: string
    gradient?: string
    author?: string
    authorImage?: string
    image?: string
    content: string
}

export async function deleteBlogPost(slug: string) {
    await requireOwner()

    // Validate slug to prevent path traversal
    if (!/^[a-z0-9-]+$/.test(slug)) {
        return { error: "Invalid blog slug" }
    }

    const filePath = path.join(BLOG_PATH, `${slug}.mdx`)

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
            revalidatePath("/blog")
            revalidatePath(`/blog/${slug}`)
            revalidatePath("/studio/blog")
            return { success: true }
        }
        return { error: "Blog post not found" }
    } catch (e: any) {
        throw new Error(`Failed to delete blog post: ${e.message}`)
    }
}

export async function saveBlogPost(data: BlogSaveData, isEdit: boolean) {
    await requireOwner()

    // Validate slug
    if (!/^[a-z0-9-]+$/.test(data.slug)) {
        return { error: "Invalid slug (use lowercase kebab-case only)" }
    }

    // Ensure directory exists
    if (!fs.existsSync(BLOG_PATH)) {
        fs.mkdirSync(BLOG_PATH, { recursive: true })
    }

    const filePath = path.join(BLOG_PATH, `${data.slug}.mdx`)

    try {
        if (!isEdit && fs.existsSync(filePath)) {
            return { error: "A blog post with this slug already exists" }
        }

        const { content, slug, ...frontmatter } = data

        // matter.stringify converts frontmatter + content back into an MDX string
        const fileContent = matter.stringify(content, frontmatter)

        fs.writeFileSync(filePath, fileContent, "utf8")

        revalidatePath("/blog")
        revalidatePath(`/blog/${slug}`)
        revalidatePath("/studio/blog")

        return { success: true }
    } catch (e: any) {
        throw new Error(`Failed to save blog post: ${e.message}`)
    }
}
