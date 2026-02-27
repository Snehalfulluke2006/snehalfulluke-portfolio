"use client";

import React, { useState } from "react";
import Section from "../Section";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, X, ChevronRight, Hash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, Project } from "@/lib/projects";

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <Section id="projects" className="bg-transparent">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-xs font-black tracking-[0.4em] uppercase text-indigo-500 mb-6">Portfolio</h2>
                        <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-glow">
                            SELECTED<br />WORKS.
                        </h3>
                    </div>
                    <div className="text-white/30 text-sm font-medium tracking-tight uppercase max-w-[200px] text-right">
                        01 — 03 / Engineering & Visual Creations
                    </div>
                </div>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 lg:gap-24 items-center`}
                        >
                            <Link
                                href={`/projects/${project.id}`}
                                className="w-full lg:w-3/5 group relative"
                            >
                                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[48px] blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                                <div className="relative aspect-[16/10] rounded-[48px] overflow-hidden border border-white/10 glass p-3">
                                    <div className="relative w-full h-full rounded-[36px] overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                            <div className="px-8 py-4 glass border-white/20 rounded-2xl flex items-center gap-3 font-black uppercase tracking-[0.2em] text-[10px]">
                                                View Case Study <ChevronRight size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Text Meta */}
                            <div className="w-full lg:w-2/5 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-indigo-400">
                                        <Hash size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">{project.category}</span>
                                    </div>
                                    <h4 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                                        {project.title}
                                    </h4>
                                    <p className="text-lg text-white/40 font-medium leading-relaxed italic">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-4 py-2 rounded-full glass border-white/5 text-[9px] font-black uppercase tracking-widest text-white/30">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-6 pt-4">
                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="group px-8 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-indigo-500/20"
                                    >
                                        Explore Case Study <ArrowUpRight size={14} />
                                    </Link>
                                    {project.links.github && project.links.github !== "#" && (
                                        <Link
                                            href={project.links.github}
                                            target="_blank"
                                            className="p-4 rounded-2xl glass border-white/5 hover:border-white/20 text-white/40 hover:text-white transition-all"
                                        >
                                            <Github size={20} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12"
                    >
                        <div
                            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                            onClick={() => setSelectedProject(null)}
                        />

                        <motion.div
                            initial={{ y: 50, scale: 0.9, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 50, scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-6xl glass-dark border-white/10 rounded-[48px] overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-8 right-8 z-30 p-4 rounded-full glass border-white/10 hover:border-white/30 transition-all text-white/40 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Visual Half */}
                                <div className="relative aspect-video lg:aspect-square">
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                </div>

                                {/* Content Half */}
                                <div className="p-12 lg:py-20 lg:pr-20 space-y-12">
                                    <div className="space-y-4">
                                        <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">{selectedProject.category}</span>
                                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9]">{selectedProject.title}</h3>
                                    </div>

                                    <div className="grid gap-10">
                                        <div className="space-y-4">
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">The Problem</div>
                                            <p className="text-lg text-white/60 font-medium leading-relaxed">{selectedProject.problem}</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 italic">The Solution</div>
                                            <p className="text-lg text-white font-medium leading-relaxed">{selectedProject.solution}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 items-center">
                                        <Link
                                            href={selectedProject.links.live || "#"}
                                            target="_blank"
                                            className="flex-1 lg:flex-none px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs text-center hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            Launch Experience
                                        </Link>
                                        {selectedProject.links.github && selectedProject.links.github !== "#" && (
                                            <Link
                                                href={selectedProject.links.github}
                                                target="_blank"
                                                className="flex-1 lg:flex-none px-10 py-5 rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-xs text-center hover:border-white/30 transition-all flex items-center justify-center gap-3"
                                            >
                                                <Github size={18} /> Source
                                            </Link>
                                        )}
                                    </div>

                                    <div className="pt-10 border-t border-white/5 flex flex-wrap gap-3">
                                        {selectedProject.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-indigo-400">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Projects;
