"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight, Clock, Hash } from "lucide-react";
import { BlogPost } from "@/lib/mdx";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
    return (
        <div className="grid gap-12">
            {posts.map((post, index) => (
                <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                >
                    <Link href={`/blog/${post.slug}`} className="block">
                        <div className="p-12 md:p-16 rounded-[48px] glass border-white/5 group-hover:border-white/20 transition-all duration-700 overflow-hidden relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient || "from-indigo-500/20 to-purple-500/20"} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start lg:items-center">
                                <div className="w-full lg:w-1/4">
                                    <div className="flex flex-col gap-6">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 w-fit">
                                            <Hash size={10} /> {post.category || "General"}
                                        </span>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-white/30 text-xs font-bold uppercase tracking-widest">
                                                <Calendar size={14} />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center gap-3 text-white/30 text-xs font-bold uppercase tracking-widest">
                                                <Clock size={14} />
                                                {post.readTime}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-3/4">
                                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 group-hover:translate-x-4 transition-transform duration-700">
                                        {post.title}
                                    </h2>
                                    <p className="text-xl text-white/40 leading-relaxed font-medium mb-10 max-w-2xl">
                                        {post.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-white">
                                        Read Article <ArrowRight size={18} className="group-hover:translate-x-4 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.article>
            ))}
        </div>
    );
}
