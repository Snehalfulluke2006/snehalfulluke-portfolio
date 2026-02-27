import { getPostBySlug, getBlogPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";
import React from "react";

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    if (!post) return { title: "Blog Post Not Found" };

    return {
        title: `${post.title} | Snehal Fulluke Blog`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            images: [post.image || "/og-image.png"],
        },
    };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="pt-40 pb-32 min-h-screen">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="flex justify-between items-center mb-16">
                    <Link href="/blog" className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-all group font-bold uppercase tracking-widest text-xs">
                        <div className="w-10 h-10 rounded-full glass border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        Back to Archive
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="p-3 rounded-full glass border-white/10 hover:border-white/30 text-white/40 hover:text-white transition-all">
                            <Bookmark size={18} />
                        </button>
                        <button className="p-3 rounded-full glass border-white/10 hover:border-white/30 text-white/40 hover:text-white transition-all">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>

                <article className="relative animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-10">
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 transition-colors hover:border-indigo-500/50 cursor-pointer">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-2 py-2 text-white/30"><Calendar size={12} /> {post.date}</span>
                        <span className="flex items-center gap-2 py-2 text-white/30"><Clock size={12} /> {post.readTime}</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-16 text-glow">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 mb-20 pb-16 border-b border-white/5">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden glass border-white/10 relative">
                            <Image
                                src={post.authorImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100"}
                                alt={post.author || "Snehal Fulluke"}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">Author</div>
                            <div className="font-bold tracking-tight text-lg">{post.author || "Snehal Fulluke"}</div>
                        </div>
                    </div>

                    {post.image && (
                        <div className="my-16 aspect-video rounded-[40px] overflow-hidden border border-white/10 glass relative group">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>
                    )}

                    <div className="prose prose-invert prose-2xl max-w-none 
                        prose-p:text-white/50 prose-p:font-medium prose-p:tracking-tight prose-p:leading-relaxed
                        prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter
                        prose-strong:text-white prose-a:text-indigo-400">
                        <MDXRemote source={post.content} />
                    </div>
                </article>
            </div>
        </div>
    );
}
