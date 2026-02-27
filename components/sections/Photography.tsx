"use client";

import React, { useState, useMemo } from "react";
import Section from "../Section";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Instagram, Filter, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GalleryPhoto } from "@/lib/gallery";

interface PhotographyProps {
    photos: GalleryPhoto[];
}

const Photography = ({ photos }: PhotographyProps) => {
    const categories = ["All", ...Array.from(new Set(photos.map(p => p.category)))];
    const [selectedPhoto, setSelectedPhoto] = useState<null | GalleryPhoto>(null);
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const filteredWorks = useMemo(() => {
        if (activeCategory === "All") return photos;
        return photos.filter(work => work.category === activeCategory);
    }, [activeCategory, photos]);

    return (
        <Section id="photography">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-24">
                    <h2 className="text-xs font-black tracking-[0.4em] uppercase text-indigo-500 mb-6">Visual Storytelling</h2>
                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 text-glow">
                        THROUGH THE <span className="text-white/40 italic">LENS.</span>
                    </h3>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mt-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-black transition-all duration-500 border ${activeCategory === cat
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent text-white/40 border-white/5 hover:border-white/20"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Masonry-style Grid */}
                <motion.div
                    layout
                    className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredWorks.map((work, index) => (
                            <motion.div
                                layout
                                key={work.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ y: -10 }}
                                onClick={() => setSelectedPhoto(work)}
                                className="relative group cursor-pointer overflow-hidden rounded-[40px] glass border-white/5 inline-block w-full"
                            >
                                <div className="relative w-full h-auto overflow-hidden">
                                    <Image
                                        src={work.image}
                                        alt={work.title}
                                        width={1200}
                                        height={1600}
                                        className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-2">{work.category}</p>
                                            <h4 className="text-2xl font-black text-white mb-6 tracking-tight leading-none">{work.title}</h4>
                                            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center border-white/20">
                                                <Maximize2 className="text-white" size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Social Integration */}
                <div className="mt-32 text-center">
                    <Link
                        href="https://instagram.com/snehalfulluke1910"
                        target="_blank"
                        className="group inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-white text-black hover:bg-indigo-500 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] shadow-2xl"
                    >
                        <Instagram size={18} /> View Creative Archive <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Lightbox Preview */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 md:p-12 overflow-hidden"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[210] p-4 rounded-full glass border-white/10"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-7xl w-full flex flex-col items-center"
                        >
                            <div className="relative w-full max-h-[75vh] aspect-video md:aspect-auto md:h-[70vh] rounded-[48px] overflow-hidden border border-white/5 shadow-2xl">
                                <Image
                                    src={selectedPhoto.image}
                                    alt={selectedPhoto.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="pt-10 text-center max-w-2xl px-6">
                                <div className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                                    {selectedPhoto.category}
                                </div>
                                <h5 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-none">
                                    {selectedPhoto.title}
                                </h5>
                                {selectedPhoto.description && (
                                    <p className="text-white/40 text-lg font-medium leading-relaxed italic">
                                        &ldquo;{selectedPhoto.description}&rdquo;
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Photography;
