import React from "react";
import { getBlogPosts } from "@/lib/mdx";
import BlogList from "./BlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Snehal Fulluke",
    description: "Deep dives into software engineering, game development, and the creative intersection of code and visual arts.",
};

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="pt-40 pb-32 min-h-screen">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-32">
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        BLOG.
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                        Technical deep dives, creative philosophies, and experiments in motion and code.
                    </p>
                </div>

                <BlogList posts={posts} />
            </div>
        </div>
    );
}
