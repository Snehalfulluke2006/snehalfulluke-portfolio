"use client";

import React from "react";
import Section from "../Section";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "Sortiqo Elite",
        category: "Game Development",
        description: "A high-fidelity spatial puzzle experience with real-time physics and immersive soundscapes.",
        image: "https://images.unsplash.com/photo-1614027126733-758b8d2ce7f3?q=80&w=1200",
        tags: ["Unity", "C#", "HDRP"],
        link: "#",
        github: "#"
    },
    {
        title: "Lumina Studio",
        category: "Mobile Application",
        description: "Production-ready photo editing suite with hardware-accelerated filters and edge cloud storage.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
        tags: ["Flutter", "Fastlane", "Firebase"],
        link: "#",
        github: "#"
    },
    {
        title: "Horizon OS",
        category: "System Design",
        description: "Experimental glassmorphic desktop environment prototype focused on developer productivity.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200",
        tags: ["Next.js", "Tauri", "Rust"],
        link: "#",
        github: "#"
    }
];

const Projects = () => {
    return (
        <Section id="projects" className="bg-white/[0.01]">
            <div className="container mx-auto px-6">
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-xs font-black tracking-[0.3em] uppercase text-indigo-500 mb-6">Archive</h2>
                        <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                            Selected <span className="text-white/40">Productions.</span>
                        </h3>
                    </div>
                    <Link href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white transition-all group">
                        View full archive <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid gap-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}
                        >
                            <div className="w-full lg:w-3/5 group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden border border-white/10 glass cursor-pointer">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
                                        <Link href={project.github} className="p-4 rounded-full glass hover:bg-white hover:text-black transition-all transform hover:scale-110">
                                            <Github size={24} />
                                        </Link>
                                        <Link href={project.link} className="p-4 rounded-full glass hover:bg-white hover:text-black transition-all transform hover:scale-110">
                                            <ExternalLink size={24} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-2/5 space-y-8">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-4">{project.category}</div>
                                    <h4 className="text-4xl font-bold tracking-tight mb-6">{project.title}</h4>
                                    <p className="text-lg text-white/50 leading-relaxed font-medium">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-5 py-2 rounded-full border border-white/5 bg-white/[0.03] text-[10px] uppercase tracking-widest font-black text-white/40">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="pt-4">
                                    <Link
                                        href={project.link}
                                        className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white group"
                                    >
                                        View Project
                                        <div className="w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-indigo-500 transition-all duration-500" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Projects;
