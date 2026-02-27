"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Smartphone,
    Monitor,
    Video,
    CheckCircle2,
    MessageCircle,
    ArrowRight,
    Sparkles,
    Loader2,
    Send,
    CheckCheck,
} from "lucide-react";
import Link from "next/link";
import { submitLead } from "@/app/actions/leads";

const packages = [
    {
        name: "MVP Velocity",
        price: "$1,499",
        description: "Perfect for startups needing a fast, high-quality prototype or V1 product.",
        features: [
            "Flutter Mobile App (iOS/Android)",
            "Supabase Integration",
            "Core UI/UX Foundations",
            "Basic Analytics",
            "2 Weeks Timeline"
        ],
        popular: false
    },
    {
        name: "Cinematic Studio",
        price: "$2,999",
        description: "Full brand transformation: software engineering + premium visual assets.",
        features: [
            "Next.js Global Platform",
            "Professional Promo Video",
            "Commercial Photography",
            "SEO & Performance Audit",
            "Vercel Deployment"
        ],
        popular: true
    },
    {
        name: "Custom Enterprise",
        price: "Custom",
        description: "Bespoke digital solutions for established companies requiring complex logic.",
        features: [
            "Advanced Cloud Architecture",
            "Custom API Development",
            "Motion Design System",
            "Long-term Maintenance",
            "Wholesale Support"
        ],
        popular: false
    }
];

const services = [
    {
        title: "Mobile App Development",
        icon: Smartphone,
        description: "Building ultra-smooth cross-platform apps using Flutter. I focus on performance, animations, and clean architecture.",
        tags: ["Flutter", "Dart", "Firebase", "Riverpod"]
    },
    {
        title: "Modern Web Engineering",
        icon: Monitor,
        description: "Creating 'Vercel-tier' web experiences with Next.js. Speed, SEO, and cinematic design are non-negotiable.",
        tags: ["Next.js", "React", "Tailwind", "GSAP"]
    },
    {
        title: "Cinematic Visuals",
        icon: Video,
        description: "High-end video production and editing. I help brands tell their story through light and motion.",
        tags: ["VFX", "Grading", "Cinematography"]
    }
];

const SERVICE_OPTIONS = [
    "Mobile App Development",
    "Modern Web Engineering",
    "Cinematic Visuals / Video",
    "Brand Design System",
    "Consulting / Architecture",
    "Custom Enterprise"
];

const BUDGET_OPTIONS = [
    "Under $500",
    "$500 – $1,500",
    "$1,500 – $3,000",
    "$3,000 – $10,000",
    "$10,000+",
    "Let's Discuss",
];

interface FormState {
    name: string;
    email: string;
    service: string;
    budget: string;
    message: string;
}

export default function HireClient() {
    const [form, setForm] = useState<FormState>({
        name: "", email: "", service: "", budget: "", message: ""
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        const result = await submitLead(fd);

        if (result?.error) {
            setError(result.error);
        } else {
            setSuccess(true);
            setForm({ name: "", email: "", service: "", budget: "", message: "" });
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Hero Header */}
                <div className="text-center mb-32 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-white/10 text-[10px] uppercase tracking-[0.5em] font-black text-indigo-400 mb-4"
                    >
                        <Sparkles size={12} className="animate-pulse" />
                        Available for Q1 2026
                    </motion.div>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                        HIRE THE <span className="italic text-white/20">AGENT.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto font-medium leading-relaxed">
                        I bridge the gap between advanced software engineering and cinematic visual storytelling. Select your tier or request a custom proposal.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-40">
                    {services.map((service, i) => (
                        <div key={i} className="p-12 rounded-[48px] glass border-white/5 space-y-8 group hover:border-white/20 transition-all duration-700">
                            <div className="w-16 h-16 rounded-3xl glass border-white/10 flex items-center justify-center text-indigo-400 group-hover:bg-white group-hover:text-black transition-all">
                                <service.icon size={30} />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-black tracking-tight">{service.title}</h3>
                                <p className="text-white/40 font-medium leading-relaxed">{service.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {service.tags.map(tag => (
                                    <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-indigo-400/60">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pricing Tiers */}
                <div className="mb-40">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-500">Tiered Solutions</h2>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter">Strategic Partnerships.</h3>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {packages.map((pkg, i) => (
                            <div
                                key={i}
                                className={`relative p-12 rounded-[56px] border ${pkg.popular ? 'bg-white text-black border-white shadow-[0_0_80px_rgba(255,255,255,0.1)]' : 'glass border-white/5 text-white'} transition-all hover:scale-[1.02] duration-700 overflow-hidden group`}
                            >
                                {pkg.popular && (
                                    <div className="absolute top-8 right-8 px-4 py-1 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest animate-bounce">
                                        Most Popular
                                    </div>
                                )}
                                <div className="space-y-8 relative z-10">
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">{pkg.name}</h4>
                                        <div className="text-5xl font-black tracking-tighter">{pkg.price}</div>
                                    </div>
                                    <p className={`font-medium leading-relaxed ${pkg.popular ? 'text-black/60' : 'text-white/40'}`}>
                                        {pkg.description}
                                    </p>
                                    <div className="h-px bg-current opacity-10" />
                                    <ul className="space-y-4">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm font-bold tracking-tight">
                                                <CheckCircle2 size={16} className={pkg.popular ? 'text-indigo-600' : 'text-indigo-400'} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="#contact-form"
                                        className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs transition-all ${pkg.popular ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-indigo-500 hover:text-white'}`}
                                    >
                                        Start Project <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Contact Form ─────────────────────────────────────── */}
                <div id="contact-form" className="mb-24">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-indigo-500">Get In Touch</h2>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter">
                            Start a <span className="text-white/30 italic">Conversation.</span>
                        </h3>
                        <p className="text-white/40 text-lg max-w-2xl mx-auto">
                            Fill in the brief and I&apos;ll get back to you within 24 hours with a custom proposal.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <AnimatePresence mode="wait">
                            {success ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-20 rounded-[56px] glass border-emerald-500/20 text-center space-y-6"
                                >
                                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-400">
                                        <CheckCheck size={40} />
                                    </div>
                                    <h4 className="text-3xl font-black tracking-tighter">Message Received!</h4>
                                    <p className="text-white/40 font-medium">
                                        Your brief has been submitted. I&apos;ll review it and respond within 24 hours.
                                    </p>
                                    <Link
                                        href="https://wa.me/918262945714"
                                        target="_blank"
                                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#25D366] text-white font-black uppercase tracking-widest text-xs"
                                    >
                                        <MessageCircle size={16} /> Continue on WhatsApp
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onSubmit={handleSubmit}
                                    className="p-12 rounded-[56px] glass border-white/5 space-y-8"
                                >
                                    {error && (
                                        <div className="px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
                                            {error}
                                        </div>
                                    )}

                                    {/* Name + Email */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Your Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="you@company.com"
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20"
                                            />
                                        </div>
                                    </div>

                                    {/* Service + Budget */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Service Needed *</label>
                                            <select
                                                name="service"
                                                required
                                                value={form.service}
                                                onChange={handleChange}
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-white/80 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled className="bg-zinc-900">Select a service…</option>
                                                {SERVICE_OPTIONS.map(s => (
                                                    <option key={s} value={s} className="bg-zinc-900">{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Budget Range</label>
                                            <select
                                                name="budget"
                                                value={form.budget}
                                                onChange={handleChange}
                                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-white/80 appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-zinc-900">Select budget…</option>
                                                {BUDGET_OPTIONS.map(b => (
                                                    <option key={b} value={b} className="bg-zinc-900">{b}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Project Brief *</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={5}
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell me about your vision, goals, and any specific requirements…"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all resize-none placeholder:text-white/20"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50 group"
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin" size={18} />
                                        ) : (
                                            <>
                                                Send Project Brief
                                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="max-w-4xl mx-auto p-16 md:p-24 rounded-[70px] glass border-white/10 text-center relative overflow-hidden group">
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-green-500/10 blur-[150px] rounded-full pointer-events-none group-hover:bg-green-500/20 transition-all duration-1000" />
                    <div className="relative z-10">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                            <MessageCircle size={40} />
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">Prefer instant contact?</h3>
                        <p className="text-xl text-white/40 font-medium mb-12 max-w-xl mx-auto">
                            Skip the form. Let&apos;s talk about your vision directly on WhatsApp.
                        </p>
                        <Link
                            href="https://wa.me/918262945714"
                            target="_blank"
                            className="inline-flex items-center gap-4 px-12 py-6 rounded-3xl bg-[#25D366] text-white font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-green-500/20"
                        >
                            WhatsApp Messenger <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
