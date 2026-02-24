"use client";

import React from "react";
import Section from "../Section";
import { motion } from "framer-motion";

const skills = [
    { name: "Flutter", icon: "📱", group: "Mobile" },
    { name: "React / Next.js", icon: "⚛️", group: "Web" },
    { name: "Python", icon: "🐍", group: "Backend" },
    { name: "TypeScript", icon: "📘", group: "Language" },
    { name: "Unity & C#", icon: "🎮", group: "Gaming" },
    { name: "Premiere Pro", icon: "🎬", group: "Editing" },
    { name: "Lightroom", icon: "🎨", group: "Creative" },
    { name: "Supabase", icon: "⚡", group: "Infrastructure" },
    { name: "Figma", icon: "📐", group: "Design" },
    { name: "Git / CI/CD", icon: "🛠️", group: "DevOps" },
];

const TechStack = () => {
    return (
        <Section id="skills">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    <div className="lg:w-1/3 sticky top-32">
                        <h2 className="text-xs font-black tracking-[0.3em] uppercase text-indigo-500 mb-6">Expertise</h2>
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
                            A powerful <span className="text-white/40">toolkit.</span>
                        </h3>
                        <p className="text-lg text-white/50 leading-relaxed font-medium mb-10">
                            A curated selection of technologies and tools I&apos;ve mastered to deliver high-performance digital solutions across multiple platforms.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="px-6 py-4 glass rounded-2xl border-white/5 flex-1 text-center">
                                <div className="text-3xl font-bold mb-1 tracking-tighter">15+</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Technologies</div>
                            </div>
                            <div className="px-6 py-4 glass rounded-2xl border-white/5 flex-1 text-center">
                                <div className="text-3xl font-bold mb-1 tracking-tighter">50+</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">Projects</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="group relative p-8 rounded-[32px] glass border-white/5 hover:border-white/20 transition-all duration-500"
                            >
                                <div className="absolute top-6 right-8 text-[10px] font-black uppercase tracking-widest text-white/10 group-hover:text-indigo-400/40 transition-colors">
                                    {skill.group}
                                </div>
                                <div className="text-4xl mb-6 transform group-hover:rotate-12 transition-transform duration-500">{skill.icon}</div>
                                <div className="text-sm font-bold tracking-tight uppercase group-hover:text-white transition-colors">{skill.name}</div>

                                {/* Glow Effect */}
                                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default TechStack;
