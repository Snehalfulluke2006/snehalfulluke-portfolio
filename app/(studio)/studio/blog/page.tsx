import { getBlogPosts } from "@/lib/mdx"
import BlogClient from "./BlogClient"

export const metadata = {
    title: "Blog Manager | Studio",
    robots: { index: false, follow: false },
}

export default async function AdminBlogPage() {
    const posts = await getBlogPosts()

    return <BlogClient initialPosts={posts} />
}
