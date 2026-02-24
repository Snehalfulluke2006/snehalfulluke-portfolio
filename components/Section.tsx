"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    delay?: number;
}

export default function Section({ children, id, className = "", delay = 0 }: SectionProps) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`py-24 md:py-32 relative ${className}`}
        >
            {children}
        </motion.section>
    );
}
