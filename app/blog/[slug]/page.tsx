"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";

export default function BlogPost() {
    const post = {
        title: "Cinematic Code: The Art of Visual Storytelling in Software",
        date: "May 12, 2024",
        author: "Snehal Fulluke",
        readTime: "8 min read",
        category: "Philosophy",
        content: `
      <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium mb-12 italic border-l-4 border-indigo-500 pl-8">
        "Software is no longer just a tool for utility; it is a canvas for emotion. As architects of the digital age, we have the responsibility to choreograph experiences that resonate at a human level."
      </p>
      
      <h2 className="text-4xl font-bold tracking-tight text-white mb-8 mt-16 text-glow">The Paradox of Utility</h2>
      <p className="text-lg text-white/50 leading-relaxed mb-8">
        In the early days of software engineering, the metric for success was efficiency. How fast could a query run? How little memory could a process consume? While these metrics remain critical, they are no longer sufficient. We have entered the era of the Experience Economy, where the 'how' is just as important as the 'what'.
      </p>
      
      <div className="my-16 aspect-video rounded-[40px] overflow-hidden border border-white/10 glass relative group">
        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200" alt="Hardware study" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
        <div className="absolute bottom-8 left-8 glass px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/60 border-white/10">
            Study of Digital Architecture
        </div>
      </div>

      <h2 className="text-4xl font-bold tracking-tight text-white mb-8 mt-16 text-glow">Choreography of Motion</h2>
      <p className="text-lg text-white/50 leading-relaxed mb-8">
        Animation is often mistaken for decoration. In reality, motion is the narrative thread that guides a user through the digital space. A well-choreographed transition doesn't just look pretty—it provides context, reduces cognitive load, and creates a sense of spatial awareness that static interfaces lack.
      </p>
    `
    };

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

                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
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
                        <div className="w-14 h-14 rounded-2xl overflow-hidden glass border-white/10">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" alt="Snehal Fulluke" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">Author</div>
                            <div className="font-bold tracking-tight text-lg">{post.author}</div>
                        </div>
                    </div>

                    <div
                        className="prose prose-invert prose-2xl max-w-none 
            prose-p:text-white/50 prose-p:font-medium prose-p:tracking-tight prose-p:leading-relaxed
            prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter
            "
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </motion.article>
            </div>
        </div>
    );
}
