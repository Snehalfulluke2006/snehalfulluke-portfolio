"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { login } from "./actions"
import { Lock, Mail, ArrowRight, Loader2, Key } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append("email", email)
        formData.append("password", password)

        const res = await login(formData)
        if (res?.error) {
            setError(res.error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#050505]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_100%)] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass p-12 rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-700">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-1000" />

                    <div className="relative text-center mb-10">
                        <div className="w-16 h-16 rounded-2xl glass border-white/10 flex items-center justify-center mx-auto mb-6 text-indigo-400">
                            <Lock size={28} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter mb-2">Restricted Area</h1>
                        <p className="text-white/40 text-sm font-medium">Verify your identity to proceed</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group/input">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Admin Email"
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20 text-white"
                                />
                            </div>

                            <div className="relative group/input">
                                <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-indigo-400 transition-colors" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Password"
                                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20 text-white"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    Authenticate <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
