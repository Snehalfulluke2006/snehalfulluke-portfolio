"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const roles = ["App Developer", "Game Developer", "Photographer", "Video Editor"];

const Hero = () => {
    const [index, setIndex] = useState(0);

    // Mouse movement glow effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    // Effect for mouse move listener
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]); // mouseX and mouseY are stable motion values, but including them is good practice for clarity

    // Effect for role rotation interval
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length);
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, []); // Empty dependency array to run once and prevent re-creating the interval

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 select-none">
            {/* Interactive Mouse Glow */}
            <motion.div
                className="fixed inset-0 z-0 pointer-events-none opacity-40"
                style={{
                    background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(99, 102, 241, 0.15), transparent 80%)`
                }}
            />

            {/* Dynamic Background Blurs */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animate-mesh opacity-30" />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"
                />
                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 60, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center space-x-2 px-6 py-2 rounded-full glass border-white/5 text-[10px] uppercase tracking-[0.4em] font-black text-white/40 mb-16"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span>Open for Production — 2024</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.8] mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10 text-glow">
                        SNEHAL<br />FULLUKE
                    </h1>
                </motion.div>

                <div className="h-12 md:h-16 flex items-center justify-center overflow-hidden mb-16 relative">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={roles[index]}
                            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -20, opacity: 0, filter: "blur(10px)" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-xl md:text-4xl font-black uppercase tracking-[0.2em] text-white/40 italic"
                        >
                            {roles[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8"
                >
                    <Link
                        href="#projects"
                        className="group relative px-12 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Explore Works <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                    <Link
                        href="#contact"
                        className="px-12 py-5 rounded-2xl glass border-white/5 font-black uppercase tracking-widest text-xs hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                    >
                        Inquire Now
                    </Link>
                </motion.div>

                {/* Floating Socials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-24 flex items-center justify-center space-x-12"
                >
                    {[Github, Linkedin, Twitter, Instagram].map((Icon, i) => (
                        <Link
                            key={i}
                            href="#"
                            className="group p-4 rounded-full glass border-white/5 hover:border-white/20 hover:text-white transition-all transform hover:-translate-y-2"
                        >
                            <Icon size={20} className="text-white/20 group-hover:text-white transition-colors" />
                        </Link>
                    ))}
                </motion.div>
            </div>

            {/* Dynamic Scroll Hint */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-12 flex flex-col items-center gap-6"
            >
                <div className="w-px h-24 bg-gradient-to-b from-white w-px to-transparent opacity-20" />
            </motion.div>
        </section>
    );
};

export default Hero;
