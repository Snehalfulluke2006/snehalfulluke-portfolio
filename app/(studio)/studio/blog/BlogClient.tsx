"use client"

import React, { useState, useTransition } from "react"
import {
    Plus, Search, Edit2, Trash2, ExternalLink, Loader2, X, AlertCircle, CheckCircle, Hash
} from "lucide-react"
import { useRouter } from "next/navigation"
import { BlogPost } from "@/lib/mdx"
import { deleteBlogPost, saveBlogPost, BlogSaveData } from "@/app/actions/blog"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [isPending, startTransition] = useTransition()

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingSlug, setEditingSlug] = useState<string | null>(null)

    // Form state
    const [formData, setFormData] = useState<BlogSaveData>({
        slug: "", title: "", description: "", date: new Date().toISOString().split("T")[0],
        readTime: "5 min read", category: "", gradient: "from-indigo-500/20 to-purple-500/20",
        author: "Snehal Fulluke", authorImage: "/images/profile/snehal-working.jpg", image: "", content: ""
    })

    const [modalError, setModalError] = useState<string | null>(null)
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

    const showToast = (type: "success" | "error", message: string) => {
        setToast({ type, message })
        setTimeout(() => setToast(null), 3000)
    }

    const openCreateModal = () => {
        setFormData({
            slug: "", title: "", description: "", date: new Date().toISOString().split("T")[0],
            readTime: "5 min read", category: "", gradient: "from-indigo-500/20 to-purple-500/20",
            author: "Snehal Fulluke", authorImage: "/images/profile/snehal-working.jpg", image: "", content: ""
        })
        setEditingSlug(null)
        setModalError(null)
        setIsModalOpen(true)
    }

    const openEditModal = (post: BlogPost) => {
        setFormData({
            slug: post.slug,
            title: post.title,
            description: post.description,
            date: post.date,
            readTime: post.readTime || "5 min read",
            category: post.category || "",
            gradient: post.gradient || "from-indigo-500/20 to-purple-500/20",
            author: post.author || "Snehal Fulluke",
            authorImage: post.authorImage || "/images/profile/snehal-working.jpg",
            image: post.image || "",
            content: post.content,
        })
        setEditingSlug(post.slug)
        setModalError(null)
        setIsModalOpen(true)
    }

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this blog post? This will permanently remove the MDX file.")) return

        startTransition(async () => {
            try {
                const res = await deleteBlogPost(slug)
                if (res.error) {
                    showToast("error", res.error)
                } else {
                    showToast("success", "Blog post deleted successfully")
                    router.refresh()
                }
            } catch (err: any) {
                showToast("error", err.message)
            }
        })
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        setModalError(null)

        if (!formData.slug || !formData.title || !formData.description || !formData.content) {
            setModalError("Please fill out all required fields (Slug, Title, Description, Content).")
            return
        }

        startTransition(async () => {
            try {
                const res = await saveBlogPost(formData, !!editingSlug)
                if (res.error) {
                    setModalError(res.error)
                } else {
                    showToast("success", editingSlug ? "Blog post updated successfully" : "Blog post created successfully")
                    setIsModalOpen(false)
                    router.refresh()
                }
            } catch (err: any) {
                setModalError(err.message)
            }
        })
    }

    const filtered = initialPosts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2">Blog Posts</h1>
                    <p className="text-white/40">Manage your blog articles and drafts via MDX.</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all active:scale-95"
                >
                    <Plus size={16} /> New Post
                </button>
            </div>

            {/* Search */}
            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={20} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search posts by name or category..."
                    className="w-full h-16 bg-white/5 border border-white/5 rounded-3xl pl-16 pr-8 text-sm focus:outline-none focus:border-white/20 transition-all font-medium"
                />
            </div>

            {/* List */}
            {filtered.length === 0 ? (
                <div className="text-center py-32 space-y-4">
                    <div className="text-5xl">📄</div>
                    <div className="text-white/20 font-bold text-lg">No blog posts match your search.</div>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filtered.map((post) => (
                        <div key={post.slug} className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 rounded-[40px] glass border-white/5 hover:border-white/10 transition-all duration-500 gap-6">
                            <div className="flex items-start gap-8 w-full">
                                <div className="space-y-2 flex-grow min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold tracking-tight truncate">{post.title}</h3>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-white/10 text-[8px] font-black uppercase tracking-[0.2em] text-indigo-400">
                                            <Hash size={8} /> {post.category || "General"}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/20">
                                        <span>{post.slug}</span>
                                        <span>•</span>
                                        <span>{new Date(post.date).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <p className="text-sm text-white/40 truncate w-full max-w-xl">
                                        {post.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    target="_blank"
                                    className="p-4 rounded-2xl glass border-white/5 hover:border-white/20 hover:text-white transition-all text-white/40"
                                    title="View Live"
                                >
                                    <ExternalLink size={18} />
                                </Link>
                                <button
                                    onClick={() => openEditModal(post)}
                                    className="p-4 rounded-2xl glass border-white/5 hover:border-white/20 hover:text-white transition-all text-white/40"
                                    title="Edit Post"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    disabled={isPending}
                                    onClick={() => handleDelete(post.slug)}
                                    className="p-4 rounded-2xl glass border-white/5 hover:border-red-500/30 hover:text-red-400 transition-all text-white/40 disabled:opacity-50"
                                    title="Delete Post"
                                >
                                    {isPending ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass border border-white/10 rounded-[40px] p-8 shadow-2xl z-10 custom-scrollbar"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-black tracking-tight">{editingSlug ? "Edit Post" : "New Post"}</h2>
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">MDX Content Editor</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {modalError && (
                                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex items-center gap-3">
                                    <AlertCircle size={18} />
                                    {modalError}
                                </div>
                            )}

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Title *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-indigo-500/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Slug *</label>
                                        <input
                                            type="text"
                                            required
                                            disabled={!!editingSlug}
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                                            placeholder="my-cool-post"
                                            className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-indigo-500/50 disabled:opacity-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Category / Tag</label>
                                        <input
                                            type="text"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-indigo-500/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Date</label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-indigo-500/50 [color-scheme:dark]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Read Time</label>
                                        <input
                                            type="text"
                                            value={formData.readTime}
                                            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                            placeholder="5 min read"
                                            className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-indigo-500/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Gradient / Cover</label>
                                        <input
                                            type="text"
                                            value={formData.gradient}
                                            onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                                            placeholder="from-indigo-500/20 to-purple-500/20"
                                            className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-indigo-500/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Short Description *</label>
                                    <textarea
                                        required
                                        rows={2}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-indigo-500/50 resize-none custom-scrollbar"
                                    />
                                </div>

                                <div className="space-y-2 border-t border-white/5 pt-6">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">MDX Content Body *</label>
                                    <p className="text-white/20 text-xs font-medium mb-2">Write your article content using markdown here.</p>
                                    <textarea
                                        required
                                        rows={12}
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-indigo-500/50 resize-none font-mono custom-scrollbar"
                                    />
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs text-white/40 hover:text-white transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-indigo-500 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all disabled:opacity-50"
                                    >
                                        {isPending ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                                        Save Post
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    )
}
