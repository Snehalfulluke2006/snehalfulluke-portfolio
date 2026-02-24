"use client";

import React, { useState } from "react";
import Section from "../Section";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Instagram } from "lucide-react";
import Link from "next/link";

const photos = [
    { id: 1, src: "https://images.unsplash.com/photo-1452442102724-5dc5a0a3fe62?q=80&w=1200", title: "Valley of Spirits", category: "Cinematic" },
    { id: 2, src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200", title: "The Silent Forest", category: "Nature" },
    { id: 3, src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200", title: "Sunlight Weaver", category: "Abstract" },
    { id: 4, src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200", title: "Lake of Mirrors", category: "Landscapes" },
    { id: 5, src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200", title: "Infinite Heights", category: "Commercial" },
    { id: 6, src: "https://images.unsplash.com/photo-1533628635777-112b2239b1c7?q=80&w=1200", title: "Metropolis Pulse", category: "Street" },
];

const Photography = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<null | typeof photos[0]>(null);

    return (
        <Section id="photography">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <h2 className="text-xs font-black tracking-[0.3em] uppercase text-indigo-500 mb-6">Visuals</h2>
                    <h3 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
                        Through the <span className="text-white/40">Lens.</span>
                    </h3>
                    <p className="text-lg text-white/40 max-w-2xl mx-auto font-medium">Capturing moments that exist between reality and dreams. Professional cinematography and photography archive.</p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedPhoto(photo)}
                            className="relative group cursor-pointer overflow-hidden rounded-[32px] glass border-white/5"
                        >
                            <img
                                src={photo.src}
                                alt={photo.title}
                                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-2">{photo.category}</p>
                                    <h4 className="text-2xl font-bold text-white mb-6 tracking-tight">{photo.title}</h4>
                                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                                        <Maximize2 className="text-white" size={20} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <Link
                        href="#"
                        className="inline-flex items-center gap-4 px-10 py-4 rounded-2xl glass border-white/10 hover:border-white/30 transition-all font-bold uppercase tracking-widest text-xs"
                    >
                        <Instagram size={18} /> View Instagram Feed
                    </Link>
                </div>
            </div>

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-6 md:p-12 overflow-hidden"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[210] p-4 rounded-full glass"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <X size={24} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-7xl max-h-screen"
                        >
                            <img
                                src={selectedPhoto.src}
                                alt={selectedPhoto.title}
                                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl shadow-black/50 border border-white/5"
                            />
                            <div className="pt-6 text-center">
                                <h5 className="text-3xl font-bold mb-2 tracking-tight">{selectedPhoto.title}</h5>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/30">{selectedPhoto.category}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Photography;
