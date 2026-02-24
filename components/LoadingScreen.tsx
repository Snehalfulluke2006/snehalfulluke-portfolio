"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[1000] bg-background flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Visual Distortion / Energy */}
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute h-px bg-gradient-to-r from-transparent via-white/40 to-transparent top-1/2 -translate-y-1/2"
                    />

                    <div className="relative group">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-2xl font-black tracking-[0.5em] text-white flex items-center gap-4"
                        >
                            <span>SNEHAL</span>
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-white/20">STUDIO</span>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="absolute bottom-20 text-[10px] font-black uppercase tracking-[0.3em] text-white/20"
                    >
                        Initializing High-Fidelity Layers
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
