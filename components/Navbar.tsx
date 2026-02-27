"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "/#about" },
        { name: "Expertise", href: "/#skills" },
        { name: "Projects", href: "/#projects" },
        { name: "Visuals", href: "/#photography" },
        { name: "Blog", href: "/blog" },
        { name: "Guestbook", href: "/guestbook" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-6 left-0 right-0 z-[100] transition-all duration-500 container mx-auto px-6",
            )}
        >
            <div className={cn(
                "flex items-center justify-between transition-all duration-500 px-8 py-4 rounded-3xl mx-auto max-w-5xl",
                scrolled
                    ? "bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] py-3"
                    : "bg-white/5 backdrop-blur-md border border-white/5"
            )}>
                <Link
                    href="/"
                    className="text-lg font-black tracking-tighter hover:opacity-70 transition-opacity flex items-center gap-2"
                >
                    SNEHAL <span className="text-white/30 hidden sm:inline">FULLUKE</span>
                </Link>

                {/* Simplified Desktop Nav */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 hover:text-white transition-all relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    <Link
                        href="/hire"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all duration-300 active:scale-95"
                    >
                        Hire Me <ArrowUpRight size={12} />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Cinematic Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="md:hidden absolute top-20 left-6 right-6 bg-black/95 backdrop-blur-3xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl z-50"
                    >
                        <div className="flex flex-col p-10 space-y-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-3xl font-black tracking-tighter text-white/40 hover:text-white transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/hire"
                                className="text-3xl font-black tracking-tighter text-indigo-500"
                                onClick={() => setIsOpen(false)}
                            >
                                Hire Agent
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
