"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Github, Instagram, Linkedin, Twitter, FileText, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EditButton } from "@/components/EditUI";
import { useOwner } from "@/contexts/OwnerContext";

const roles = [
    "Flutter App Developer",
    "Game Developer",
    "Photographer",
    "Video Editor"
];

const Hero = () => {
    const [index, setIndex] = useState(0);
    const { isOwner, isEditMode } = useOwner();

    // Mouse movement glow effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden py-32 select-none">
            {/* Background Light Layers */}
            <motion.div
                className="fixed inset-0 z-0 pointer-events-none opacity-50"
                style={{
                    background: `radial-gradient(800px circle at ${springX}px ${springY}px, rgba(99, 102, 241, 0.1), transparent 80%)`
                }}
            />

            {/* Mesh Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animate-mesh opacity-20" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">

                    {/* Brand Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full glass border-white/10 text-[10px] uppercase tracking-[0.5em] font-black text-indigo-400 mb-12 shadow-2xl"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span>Available for Projects</span>
                    </motion.div>

                    {/* Main Headline */}
                    <div className="relative mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <h2 className="text-sm md:text-xl font-medium tracking-[0.2em] text-white/40 uppercase italic">
                                    Creative Developer &amp; Visual Creator
                                </h2>
                                <EditButton contentKey="hero_tagline" currentValue="Creative Developer & Visual Creator" />
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/20 text-glow">
                                    SNEHAL<br />FULLUKE
                                </h1>
                            </div>
                        </motion.div>
                    </div>

                    {/* Roles Engine */}
                    <div className="h-10 md:h-16 flex items-center justify-center overflow-hidden mb-16 relative w-full">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={roles[index]}
                                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                exit={{ y: -20, opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="text-lg md:text-3xl font-black uppercase tracking-[0.3em] text-white/30"
                            >
                                {roles[index]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Primary Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-2xl px-4"
                    >
                        <Link
                            href="#projects"
                            className="w-full sm:w-auto group relative px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-indigo-500/20"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                View Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        <Link
                            href="/hire"
                            className="w-full sm:w-auto px-10 py-5 rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-xs hover:bg-white/5 hover:border-white/20 transition-all active:scale-95 flex items-center justify-center gap-3 bg-white/5"
                        >
                            Hire Agent
                        </Link>

                        <a
                            href="/Snehal-Fulluke-Resume.pdf"
                            download
                            className="w-full sm:w-auto px-10 py-5 rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-xs hover:bg-white/5 hover:border-white/20 transition-all active:scale-95 flex items-center justify-center gap-3 text-indigo-400"
                        >
                            <Download size={16} /> Resume
                        </a>
                    </motion.div>

                    {/* Freelance Ribbon */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-12 group cursor-pointer"
                    >
                        <Link href="/hire" className="inline-flex items-center gap-4 px-6 py-3 rounded-full glass border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-500">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">
                                Available for Freelance – 2026 Slots Open
                            </span>
                        </Link>
                    </motion.div>

                    {/* Profile & Social Meta */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="mt-24 flex flex-col items-center gap-10"
                    >
                        {/* Profile Image Support (Stylized Placeholder) */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-indigo-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative w-24 h-24 rounded-full glass border border-white/10 p-1.5 overflow-hidden ring-4 ring-white/5 ring-offset-4 ring-offset-black">
                                <div className="w-full h-full rounded-full overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src="/images/profile/snehal-fulluke.jpg"
                                        alt="Snehal Fulluke"
                                        fill
                                        priority
                                        className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-8">
                            {[
                                { Icon: Github, href: "https://github.com/Snehalfulluke2006" },
                                { Icon: Instagram, href: "https://instagram.com/snehalfulluke1910" },
                                { Icon: Linkedin, href: "https://linkedin.com/in/snehalfulluke1910" },
                                { Icon: Twitter, href: "https://twitter.com/snehalfulluke" }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    className="p-3 rounded-full glass border-white/5 hover:border-white/20 hover:text-white transition-all transform hover:-translate-y-2 group"
                                >
                                    <social.Icon size={18} className="text-white/20 group-hover:text-white transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Vertical Rhythm Accent */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-12 flex flex-col items-center gap-6"
            >
                <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
