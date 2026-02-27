"use client";

import React from "react";
import Section from "../Section";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "James Wilson",
        role: "Founder, TechFlow AI",
        feedback: "Snehal brought a cinematic touch to our application that we didn't think was possible in code. His eye for detail and logical rigor is rare.",
        image: "/images/profile/snehal-fulluke.jpg" // Fallback to local image
    },
    {
        name: "Aria Chen",
        role: "Lead Designer, Studio Kinetic",
        feedback: "Working with Snehal on the Neon City project was seamless. He bridges the gap between design and engineering effortlessly.",
        image: "/images/profile/snehal-fulluke.jpg"
    },
    {
        name: "Marcus Thorne",
        role: "CTO, Grolist Systems",
        feedback: "The level of animation and performance Snehal delivers in Flutter is world-class. He transformed our complex logic into a premium UX.",
        image: "/images/profile/snehal-fulluke.jpg"
    }
];

const Testimonials = () => {
    return (
        <Section id="testimonials">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <h2 className="text-xs font-black tracking-[0.4em] uppercase text-indigo-500 mb-8">Endorsements</h2>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]">
                        What industry <span className="text-white/30 italic">leaders say.</span>
                    </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="p-10 rounded-[40px] glass border-white/5 relative group hover:border-white/10 transition-all duration-500"
                        >
                            <div className="absolute top-10 right-10 text-white/5 group-hover:text-indigo-500/10 transition-colors">
                                <Quote size={60} />
                            </div>

                            <div className="space-y-8 relative z-10">
                                <p className="text-lg text-white/60 font-medium leading-relaxed italic">
                                    "{t.feedback}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                    <div className="w-12 h-12 rounded-2xl glass border border-white/10 overflow-hidden relative grayscale">
                                        <div className="w-full h-full bg-indigo-500/20 flex items-center justify-center font-black text-xs">
                                            {t.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold tracking-tight">{t.name}</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30">
                                            {t.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default Testimonials;
