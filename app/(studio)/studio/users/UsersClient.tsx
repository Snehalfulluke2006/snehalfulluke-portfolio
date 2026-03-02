"use client"

import React, { useState, useTransition } from "react"
import {
    Users as UsersIcon, Search, Shield, UserX, Loader2, CheckCircle, AlertCircle, Mail, Crown, Key, Eye, User
} from "lucide-react"
import { useRouter } from "next/navigation"
import { updateUserRole, removeUser, inviteEditor, type PlatformUser } from "@/app/actions/users"
import type { Role } from "@/app/actions/requireRole"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

export default function UsersClient({ initialUsers }: { initialUsers: PlatformUser[] }) {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [inviteEmail, setInviteEmail] = useState("")
    const [inviteRole, setInviteRole] = useState<Role>("editor")

    const [isPending, startTransition] = useTransition()
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

    const showToast = (type: "success" | "error", message: string) => {
        setToast({ type, message })
        setTimeout(() => setToast(null), 3000)
    }

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inviteEmail) return

        startTransition(async () => {
            try {
                const res = await inviteEditor(inviteEmail, inviteRole)
                if (res.error) {
                    showToast("error", res.error)
                } else {
                    showToast("success", "Invitation sent successfully")
                    setInviteEmail("")
                    router.refresh()
                }
            } catch (err: any) {
                showToast("error", err.message)
            }
        })
    }

    const handleRoleChange = (userId: string, targetRole: Role) => {
        if (!confirm(`Are you sure you want to change this user's role to ${targetRole}?`)) return

        startTransition(async () => {
            try {
                const res = await updateUserRole(userId, targetRole)
                if (res.error) showToast("error", res.error)
                else {
                    showToast("success", "User role updated")
                    router.refresh()
                }
            } catch (err: any) {
                showToast("error", err.message)
            }
        })
    }

    const handleDelete = (userId: string) => {
        if (!confirm("Are you sure you want to completely remove this user's access? This action is irreversible.")) return

        startTransition(async () => {
            try {
                const res = await removeUser(userId)
                if (res.error) showToast("error", res.error)
                else {
                    showToast("success", "User revoked successfully")
                    router.refresh()
                }
            } catch (err: any) {
                showToast("error", err.message)
            }
        })
    }

    const filtered = initialUsers.filter(u =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    )

    const getRoleIcon = (role: Role) => {
        switch (role) {
            case "owner": return <Crown size={14} className="text-amber-400" />
            case "editor": return <Shield size={14} className="text-emerald-400" />
            case "viewer": return <Eye size={14} className="text-indigo-400" />
            default: return <User size={14} className="text-white/40" />
        }
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2">Platform Users</h1>
                    <p className="text-white/40">Manage role-based access for your portfolio studio.</p>
                </div>
                <div className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20 flex items-center gap-2">
                    <Key size={12} />
                    Owner Only
                </div>
            </div>

            {/* Invite Form */}
            <div className="p-8 rounded-[40px] glass border border-white/5 space-y-6">
                <div>
                    <h3 className="text-xl font-bold tracking-tight mb-1">Invite Collaborator</h3>
                    <p className="text-xs text-white/40">Send a magic link to immediately grant bounded access.</p>
                </div>

                <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4 max-w-3xl">
                    <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Email Address</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="email"
                                required
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                placeholder="colleague@domain.com"
                                className="w-full bg-black/50 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50"
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-48 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Target Role</label>
                        <select
                            value={inviteRole}
                            onChange={(e) => setInviteRole(e.target.value as Role)}
                            className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 appearance-none"
                        >
                            <option value="editor">Editor (Mutate)</option>
                            <option value="viewer">Viewer (Read-Only)</option>
                            <option value="owner">Owner (Full admin)</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-50"
                        >
                            {isPending ? <Loader2 size={16} className="animate-spin" /> : "Send Invite"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Search */}
            <div className="relative group max-w-md">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={20} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search assigned users..."
                    className="w-full h-14 bg-white/5 border border-white/5 rounded-3xl pl-16 pr-8 text-sm focus:outline-none focus:border-white/20 transition-all font-medium"
                />
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                    <UsersIcon className="mx-auto text-white/20" size={48} />
                    <div className="text-white/20 font-bold text-lg">No active users match this.</div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filtered.map((user) => (
                        <div key={user.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[32px] glass border-white/5 gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    {getRoleIcon(user.role)}
                                </div>
                                <div>
                                    <div className="text-sm font-bold tracking-tight mb-0.5">{user.email}</div>
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/30">
                                        <span className={
                                            user.role === "owner" ? "text-amber-400" :
                                                user.role === "editor" ? "text-emerald-400" : "text-indigo-400"
                                        }>
                                            {user.role}
                                        </span>
                                        <span>•</span>
                                        <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex bg-black/50 rounded-xl border border-white/5 p-1">
                                    <button
                                        disabled={isPending || user.role === "owner"}
                                        onClick={() => handleRoleChange(user.id, "editor")}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${user.role === "editor" ? "bg-white/10 text-white" : "text-white/40 hover:text-white disabled:opacity-20"}`}
                                    >
                                        Editor
                                    </button>
                                    <button
                                        disabled={isPending || user.role === "owner"}
                                        onClick={() => handleRoleChange(user.id, "viewer")}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${user.role === "viewer" ? "bg-white/10 text-white" : "text-white/40 hover:text-white disabled:opacity-20"}`}
                                    >
                                        Viewer
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    disabled={isPending || user.role === "owner"}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-red-500/10 disabled:hover:text-red-400"
                                    title={user.role === "owner" ? "Cannot remove original owner" : "Revoke Access"}
                                >
                                    {isPending ? <Loader2 size={16} className="animate-spin" /> : <UserX size={16} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className={cn(
                            "fixed bottom-8 right-8 px-6 py-4 rounded-2xl flex items-center gap-3 z-50 text-sm font-bold shadow-2xl backdrop-blur-md",
                            toast.type === "success" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                        )}
                    >
                        {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
