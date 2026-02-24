"use client";

import React from "react";
import Section from "../Section";

const About = () => {
    return (
        <Section id="about">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative aspect-square rounded-[32px] overflow-hidden border border-white/10 glass">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                                alt="Snehal Fulluke"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                            />
                        </div>
                        {/* Visual Accents */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 glass rounded-2xl flex items-center justify-center p-4 text-center">
                            <p className="text-xs font-bold leading-tight tracking-tight uppercase">5+ Years<br /><span className="text-white/40">Experience</span></p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div>
                            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-indigo-500 mb-6">Discovery</h2>
                            <h3 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
                                Blending logic with <span className="text-white/40">cinematic vision.</span>
                            </h3>
                            <p className="text-xl text-white/50 leading-relaxed font-medium">
                                I am Snehal Fulluke, a creator who lives at the intersection of technical architecture and visual storytelling. My work bridges the gap between complex code and human emotion.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <p className="text-white/40 leading-relaxed font-medium">
                                Based in India, I&apos;ve spent the last half-decade mastering the art of mobile development, game design, and professional post-production. Every project I undertake is a pursuit of aesthetic and functional perfection.
                            </p>
                            <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/10">
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2">Strategy</h4>
                                    <p className="text-xs text-white/40 leading-relaxed uppercase tracking-tighter">Performance first, user-centric architecture, scalable infrastructure.</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2">Aesthetic</h4>
                                    <p className="text-xs text-white/40 leading-relaxed uppercase tracking-tighter">Minimalist design, premium motion design, high-fidelity visuals.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default About;
