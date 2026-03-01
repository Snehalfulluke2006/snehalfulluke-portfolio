"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Send, Clock, MessageSquare } from "lucide-react";

interface Entry {
    id: number;
    name: string;
    message: string;
    created_at: string;
}

export default function GuestbookPage() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Start loading=false — page renders immediately, data arrives asynchronously
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

    useEffect(() => {
        fetchEntries();

        // Realtime: only subscribe if anon key is present (avoids error on missing env)
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder")) {
            try {
                const channel = supabase
                    .channel("guestbook_changes")
                    .on(
                        "postgres_changes",
                        { event: "INSERT", schema: "public", table: "guestbook" },
                        (payload) => {
                            setEntries((prev) => [payload.new as Entry, ...prev]);
                        }
                    )
                    .subscribe();
                channelRef.current = channel;
            } catch {
                // Realtime unavailable — silent fail, page still renders
            }
        }

        return () => {
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current).catch(() => { });
            }
        };
    }, []);

    const fetchEntries = async () => {
        // Hard 5s safety timeout — loading state MUST resolve even on network failure
        const safetyTimer = setTimeout(() => {
            setLoading(false);
            setFetchError(true);
        }, 5000);

        try {
            const { data, error } = await supabase
                .from("guestbook")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setEntries(data || []);
            setFetchError(false);
        } catch {
            setFetchError(true);
        } finally {
            clearTimeout(safetyTimer);
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !message) return;

        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from("guestbook")
                .insert([{ name, message }]);

            if (error) throw error;
            setMessage("");
            setName("");
        } catch {
            // Silent fail — submission error shown via isSubmitting reset
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-40 pb-32 min-h-screen relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full -ml-64 -mb-64" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                        GUESTBOOK.
                    </h1>
                    <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
                        Leave a mark, share a thought, or just say hello. A public archive of friends and collaborators.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
                    {/* Submission Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-[40px] p-10 border-white/5 sticky top-32"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Display Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold tracking-tight text-sm placeholder:text-white/10"
                                    required
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Write something memorable..."
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none font-medium tracking-tight text-sm placeholder:text-white/10"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black font-black uppercase tracking-widest text-xs py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? "Syncing..." : "Publish Message"}
                                <Send size={14} className={isSubmitting ? "animate-pulse" : ""} />
                            </button>
                        </form>
                    </motion.div>

                    {/* Messages List */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-8 px-4">
                            <div className="flex items-center gap-3 text-white/60">
                                <MessageSquare size={18} />
                                <span className="text-xs font-black uppercase tracking-widest">Archive</span>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">{entries.length} Messages</div>
                        </div>

                        {/* Render immediately — loading state is non-blocking */}
                        {loading ? (
                            <div className="py-20 text-center text-white/20 font-black uppercase tracking-widest animate-pulse">
                                Accessing data layer...
                            </div>
                        ) : fetchError ? (
                            <div className="py-20 text-center text-white/20 glass border-dashed border-white/10 rounded-[40px] font-black uppercase tracking-widest text-xs">
                                Could not load messages.<br />Check your connection.
                            </div>
                        ) : entries.length === 0 ? (
                            <div className="py-32 text-center text-white/20 glass border-dashed border-white/10 rounded-[40px] font-black uppercase tracking-widest text-xs">
                                The archive is empty.<br />Be the first to leave a message.
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {entries.map((entry, index) => (
                                    <motion.div
                                        key={entry.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="p-10 rounded-[40px] glass border-white/5 group hover:border-white/20 transition-all duration-500"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400 group-hover:bg-indigo-500 group-hover:text-black transition-all">
                                                    {entry.name[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="font-black tracking-tight text-white mb-0.5">{entry.name}</h4>
                                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 flex items-center gap-2">
                                                        <Clock size={10} />
                                                        {new Date(entry.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-white/50 leading-relaxed font-medium tracking-tight">
                                            {entry.message}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
