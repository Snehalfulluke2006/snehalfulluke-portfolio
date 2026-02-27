"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
    { label: "Projects Completed", value: "12+", suffix: "" },
    { label: "App Installs", value: "5K", suffix: "+" },
    { label: "Creative Edits", value: "150", suffix: "+" },
    { label: "Years Experience", value: "3", suffix: "+" }
];

export default function Stats() {
    return (
        <div className="container mx-auto px-6 relative z-20 -mt-20">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden glass shadow-2xl"
            >
                {stats.map((stat, index) => (
                    <div key={index} className="bg-black/40 p-10 text-center hover:bg-white/[0.02] transition-colors">
                        <div className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">
                            {stat.value}<span className="text-indigo-500">{stat.suffix}</span>
                        </div>
                        <div className="text-[10px] uppercase font-black tracking-[0.2em] text-white/30">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
