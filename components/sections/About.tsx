"use client";

import React from "react";
import Section from "../Section";
import { motion } from "framer-motion";
import Image from "next/image";
import { EditButton } from "@/components/EditUI";

const About = () => {
    return (
        <Section id="about">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-[1fr_1.2fr] gap-24 items-center">

                    {/* Visual Side */}
                    <div className="relative group">
                        <div className="absolute -inset-10 bg-indigo-500/5 blur-[100px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden border border-white/10 glass p-4">
                            <div className="w-full h-full rounded-[32px] overflow-hidden relative">
                                <motion.div
                                    className="w-full h-full"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Image
                                        src="/images/profile/snehal-working.jpg"
                                        alt="Snehal Fulluke working in his studio"
                                        fill
                                        className="object-cover transition-all duration-1000 grayscale hover:grayscale-0"
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-8 -right-8 glass p-8 rounded-[32px] border-white/10 shadow-2xl"
                            >
                                <div className="text-4xl font-black tracking-tighter text-indigo-400 mb-1">B.Sc</div>
                                <div className="text-[10px] uppercase font-black tracking-widest text-white/40">Computer Science</div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-12">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <h2 className="text-xs font-black tracking-[0.4em] uppercase text-indigo-500">My Narrative</h2>
                                <EditButton contentKey="about_tagline" currentValue="My Narrative" label="Edit" />
                            </div>
                            <div className="flex items-start gap-3 mb-10">
                                <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] flex-1">
                                    Bridging pixels with <span className="text-white/30 italic">perfected logic.</span>
                                </h3>
                                <EditButton contentKey="about_headline" currentValue="Bridging pixels with perfected logic." label="Edit" className="flex-shrink-0 mt-2" />
                            </div>
                            <div className="space-y-6 text-lg md:text-xl text-white/50 leading-relaxed font-medium">
                                <p>
                                    I am <span className="text-white font-bold">Snehal Fulluke</span>, a Computer Science student driven by the desire to build digital experiences that are as beautiful as they are functional. My journey started with a curiosity for how games were built, which evolved into a professional pursuit of software engineering and visual arts.
                                </p>
                                <p>
                                    As a Flutter developer, I craft cross-platform applications that prioritize performance and user intuition. Beyond the screen, my passion for photography and video editing allows me to see software as a cinematic experience—where every transition and interaction tells a story.
                                </p>
                                <p>
                                    Currently pursuing my B.Sc in Computer Science, I am constantly refining my toolkit, blending academic rigor with hands-on creation. My goal is to work at the intersection of advanced technology and creative direction, delivering high-impact products for the next generation of users.
                                </p>
                            </div>
                        </div>

                        {/* Pillars */}
                        <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/10">
                            <div className="space-y-4">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Philosophy</div>
                                <h4 className="text-lg font-bold tracking-tight">Purposeful Code</h4>
                                <p className="text-sm text-white/30 leading-relaxed">Developing scalable architectures that solve real-world problems with elegant simplicity.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Vision</div>
                                <h4 className="text-lg font-bold tracking-tight">Visual Integrity</h4>
                                <p className="text-sm text-white/30 leading-relaxed">Maintaining the highest standards of aesthetic quality across development and visual media.</p>
                            </div>
                        </div>
                        {/* CTA */}
                        <div className="pt-8">
                            <motion.div
                                whileHover={{ x: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <a
                                    href="/resume"
                                    className="inline-flex items-center gap-6 group"
                                >
                                    <div className="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                        <motion.div
                                            animate={{ y: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                        </motion.div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Curriculum Vitae</div>
                                        <div className="text-xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors">Download Full Resume</div>
                                    </div>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;
