"use client"

import React, { useState, useTransition, useRef } from "react"
import {
    Upload, Search, Trash2, ExternalLink, Loader2, Image as ImageIcon, Copy, CheckCircle, AlertCircle
} from "lucide-react"
import { useRouter } from "next/navigation"
import { deleteGalleryImage } from "@/app/actions/gallery"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

export default function GalleryClient({ initialImages }: { initialImages: any[] }) {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [isPending, startTransition] = useTransition()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [uploading, setUploading] = useState(false)
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null)

    const showToast = (type: "success" | "error", message: string) => {
        setToast({ type, message })
        setTimeout(() => setToast(null), 3000)
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            showToast("error", "Image exceeds 5MB limit.")
            return
        }
        if (!file.type.startsWith("image/")) {
            showToast("error", "Only valid image files are allowed.")
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("category", "General") // Allow expandability later

        try {
            // Import upload action directly here to avoid large client bundle
            const { uploadGalleryImage } = await import("@/app/actions/gallery")
            const res = await uploadGalleryImage(formData)
            if (res.error) {
                showToast("error", res.error)
            } else {
                showToast("success", "Image uploaded successfully")
                router.refresh()
            }
        } catch (err: any) {
            showToast("error", err.message)
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ""
        }
    }

    const handleDelete = async (path: string) => {
        if (!confirm("Permanently delete this image? It will break any public links showing it.")) return

        startTransition(async () => {
            try {
                const res = await deleteGalleryImage(path)
                if (res.error) {
                    showToast("error", res.error)
                } else {
                    showToast("success", "Image deleted")
                    router.refresh()
                }
            } catch (err: any) {
                showToast("error", err.message)
            }
        })
    }

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url)
        showToast("success", "Public URL copied to clipboard")
    }

    const filtered = initialImages.filter(img =>
        img.title.toLowerCase().includes(search.toLowerCase()) ||
        img.category.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2">Supabase Gallery</h1>
                    <p className="text-white/40">Manage your public bucket photography portfolio.</p>
                </div>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleUpload}
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all active:scale-95 disabled:opacity-50"
                    >
                        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        {uploading ? "Uploading..." : "Upload Image"}
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={20} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search images by filename or category..."
                    className="w-full h-16 bg-white/5 border border-white/5 rounded-3xl pl-16 pr-8 text-sm focus:outline-none focus:border-white/20 transition-all font-medium"
                />
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-32 space-y-4">
                    <div className="text-5xl">📸</div>
                    <div className="text-white/20 font-bold text-lg">No images found in bucket.</div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((img) => (
                        <div key={img.id} className="group relative aspect-square rounded-[32px] overflow-hidden glass border-white/5 flex flex-col">
                            <img src={img.image} alt={img.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => copyUrl(img.image)}
                                        className="p-3 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md transition-all"
                                        title="Copy URL"
                                    >
                                        <Copy size={14} />
                                    </button>
                                    <button
                                        disabled={isPending}
                                        onClick={() => handleDelete(img.path)}
                                        className="p-3 rounded-xl bg-white/10 hover:bg-red-500 text-white backdrop-blur-md transition-all disabled:opacity-50"
                                        title="Delete Image"
                                    >
                                        {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                    </button>
                                </div>
                                <div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">{img.category}</div>
                                    <h3 className="text-sm font-bold text-white truncate" title={img.title}>{img.title}</h3>
                                </div>
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
