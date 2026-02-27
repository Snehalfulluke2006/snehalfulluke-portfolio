"use client";

import React from "react";
import Section from "../Section";
import { motion } from "framer-motion";
import { GraduationCap, Code, Rocket, Briefcase } from "lucide-react";

const events = [
    {
        year: "2024",
        title: "Senior Projects & Specialization",
        description: "Deepening expertise in Flutter architecture and cinematic visual production. Building industry-ready solutions.",
        icon: Rocket,
        category: "Professional"
    },
    {
        year: "2023",
        title: "Full-Stack Development & VFX",
        description: "Expanded into Next.js, Supabase, and advanced video editing. Blending technical skills with creative arts.",
        icon: Code,
        category: "Learning"
    },
    {
        year: "2022",
        title: "B.Sc Computer Science Journey",
        description: "Started academic journey, mastering data structures, algorithms, and core computing principles.",
        icon: GraduationCap,
        category: "Education"
    },
    {
        year: "2021",
        title: "The Creative Spark",
        description: "First steps into game development and professional photography. Exploring the digital canvas.",
        icon: Briefcase,
        category: "Origins"
    }
];

export default function Timeline() {
    return (
        <Section id="journey" className="relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <h2 className="text-xs font-black tracking-[0.4em] uppercase text-indigo-500 mb-6">Timeline</h2>
                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-glow">
                        MY <span className="text-white/40 italic">EVOLUTION.</span>
                    </h3>
                    <p className="text-lg text-white/40 max-w-2xl mx-auto font-medium">
                        From the first line of code to cinematic productions. A journey of constant growth and creative exploration.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-white/10 to-transparent" />

                    <div className="space-y-24">
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Dot */}
                                <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 w-10 h-10 rounded-2xl glass border-indigo-500/50 flex items-center justify-center z-10 bg-black">
                                    <event.icon size={18} className="text-indigo-400" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 pl-16 md:pl-0">
                                    <div className={`p-10 rounded-[40px] glass border-white/5 hover:border-white/20 transition-all duration-500 group ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                                        }`}>
                                        <div className="text-indigo-500 text-xs font-black uppercase tracking-widest mb-4">
                                            {event.year} — {event.category}
                                        </div>
                                        <h4 className="text-2xl font-black tracking-tight mb-4 group-hover:text-white transition-colors">
                                            {event.title}
                                        </h4>
                                        <p className="text-white/40 font-medium leading-relaxed italic">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Spacer for desktop */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
