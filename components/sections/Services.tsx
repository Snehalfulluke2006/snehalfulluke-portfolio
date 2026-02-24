"use client";

import React from "react";
import Section from "../Section";
import { motion } from "framer-motion";
import { AppWindow, Gamepad2, Camera, Video, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "App Development",
        description: "Architecting high-performance cross-platform solutions with Flutter and Next.js.",
        icon: AppWindow,
        theme: "from-blue-500/20 to-indigo-500/20"
    },
    {
        title: "Game Creation",
        description: "Immersive 3D/2D game worlds built with Unity, focused on mechanics and storytelling.",
        icon: Gamepad2,
        theme: "from-purple-500/20 to-pink-500/20"
    },
    {
        title: "Visual Media",
        description: "Professional cinematography and high-fidelity photography for premium brands.",
        icon: Camera,
        theme: "from-orange-500/20 to-yellow-500/20"
    },
    {
        title: "Post-Production",
        description: "Expert editing and color grading that transforms raw footage into cinematic art.",
        icon: Video,
        theme: "from-red-500/20 to-orange-500/20"
    },
];

const Services = () => {
    return (
        <Section className="relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-xs font-black tracking-[0.3em] uppercase text-indigo-500 mb-6">Expertise</h2>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        Comprehensive <span className="text-white/40">Studio Services.</span>
                    </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group relative p-12 rounded-[40px] glass border-white/5 overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.theme} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
                                <div className="p-6 rounded-3xl glass border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                                    <service.icon size={36} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h4>
                                    <p className="text-white/50 leading-relaxed font-medium mb-6">
                                        {service.description}
                                    </p>
                                    <Link href="#contact" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] group/link">
                                        Inquire <ArrowUpRight size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all" />
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

export default Services;
