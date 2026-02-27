"use client";

import React, { useState } from "react";
import Section from "../Section";
import { Mail, Instagram, MessageCircle, Check, Github } from "lucide-react";
import Link from "next/link";

const Contact = () => {
    const [copied, setCopied] = useState(false);
    const email = "hello@snehal.dev";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Section id="contact" className="pb-32">
            <div className="container mx-auto px-6">
                <div className="relative group max-w-6xl mx-auto rounded-[60px] overflow-hidden glass border-white/10 p-12 md:p-24 text-center">
                    {/* Animated Glows */}
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-indigo-500/10 blur-[150px] animate-mesh rounded-full pointer-events-none" />
                    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 blur-[150px] animate-mesh rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-xs font-black tracking-[0.4em] uppercase text-indigo-500 mb-10">Collaboration</h2>
                        <h3 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            LET&apos;S BUILD<br />TOGETHER.
                        </h3>
                        <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-medium mb-16 px-4">
                            I&apos;m always looking for ambitious projects and bold partners. If you have an idea that needs a cinematic digital touch, let&apos;s connect.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
                            <button
                                onClick={copyToClipboard}
                                className="group flex flex-col items-center gap-4 px-12 py-10 rounded-3xl glass border-white/5 hover:border-white/20 transition-all w-full md:w-80"
                            >
                                <div className="p-4 rounded-full bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-black transition-all">
                                    {copied ? <Check size={28} /> : <Mail size={28} />}
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Send an Email</div>
                                    <div className="text-sm font-bold tracking-tight">{email}</div>
                                </div>
                            </button>

                            <Link
                                href="https://wa.me/#"
                                target="_blank"
                                className="group flex flex-col items-center gap-4 px-12 py-10 rounded-3xl glass border-white/5 hover:border-white/20 transition-all w-full md:w-80"
                            >
                                <div className="p-4 rounded-full bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-black transition-all">
                                    <MessageCircle size={28} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">WhatsApp Me</div>
                                    <div className="text-sm font-bold tracking-tight">Direct Message</div>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center gap-12 justify-center">
                            {[
                                { label: "Instagram", Icon: Instagram, href: "https://instagram.com/snehalfulluke" },
                                { label: "LinkedIn", Icon: (props: any) => <span {...props} className="font-bold">in</span>, href: "https://linkedin.com/in/snehalfulluke" },
                                { label: "GitHub", Icon: Github, href: "https://github.com/snehalfulluke" }
                            ].map(({ label, Icon, href }, i) => (
                                <Link
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    className="flex flex-col items-center gap-3 text-white/30 hover:text-white transition-all group/social"
                                >
                                    <div className="text-xl group-hover/social:scale-125 transition-transform duration-500">
                                        <Icon size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Contact;
