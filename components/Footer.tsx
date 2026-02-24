"use client";

import React from "react";
import Link from "next/link";
import { Github, Twitter, Instagram, Linkedin, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="py-20 border-t border-white/5 bg-background relative z-10 overflow-hidden">
            {/* Visual Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
                    <div className="max-w-md">
                        <Link
                            href="/"
                            className="text-2xl font-black tracking-tighter mb-8 block transition-opacity hover:opacity-70"
                        >
                            SNEHAL<span className="text-white/30">FULLUKE</span>
                        </Link>
                        <p className="text-lg text-white/40 leading-relaxed font-medium mb-12">
                            Transforming complex technical concepts into world-class digital experiences. Available for creative collaborations worldwide.
                        </p>
                        <div className="flex space-x-8">
                            {[Github, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="text-white/20 hover:text-white transition-all transform hover:scale-110 active:scale-90">
                                    <Icon size={24} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-20 w-full md:w-auto">
                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Navigation</h5>
                            <ul className="space-y-4">
                                {["About", "Skills", "Projects", "Blog"].map(item => (
                                    <li key={item}>
                                        <Link href={`#${item.toLowerCase()}`} className="text-sm font-bold text-white/40 hover:text-white transition-colors">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Resources</h5>
                            <ul className="space-y-4">
                                {["Guestbook", "Privacy", "Archive"].map(item => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm font-bold text-white/40 hover:text-white transition-colors">{item}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="hidden md:block">
                            <button
                                onClick={scrollToTop}
                                className="w-16 h-16 rounded-full glass border-white/10 flex items-center justify-center group hover:border-white/40 transition-all hover:bg-white hover:text-black"
                            >
                                <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                        © {currentYear} SNEHAL FULLUKE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                        CRAFTED WITH <Heart size={10} className="fill-indigo-500/20 text-indigo-500 inline" /> AT THE STUDIO.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
