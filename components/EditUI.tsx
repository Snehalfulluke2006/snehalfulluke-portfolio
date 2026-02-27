"use client"

import React, { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Save, Loader2, Pencil } from "lucide-react"
import { useOwner } from "@/contexts/OwnerContext"

// ─────────────────────────────────────────────────────
// EditButton: shown inline on editable sections
// ─────────────────────────────────────────────────────
interface EditButtonProps {
    contentKey: string
    currentValue: string
    label?: string
    className?: string
}

export function EditButton({ contentKey, currentValue, label = "Edit", className = "" }: EditButtonProps) {
    const { isOwner, isEditMode, openEditor } = useOwner()

    if (!isOwner || !isEditMode) return null

    return (
        <button
            onClick={(e) => {
                e.stopPropagation()
                openEditor(contentKey, currentValue)
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/30 z-50 ${className}`}
        >
            <Pencil size={10} /> {label}
        </button>
    )
}

// ─────────────────────────────────────────────────────
// EditModal: the actual editor overlay
// ─────────────────────────────────────────────────────
export function EditModal() {
    const {
        isOwner,
        editingKey,
        editingValue,
        setEditingValue,
        closeEditor,
        saving,
        saveContent,
    } = useOwner()

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (editingKey && textareaRef.current) {
            textareaRef.current.focus()
            textareaRef.current.setSelectionRange(
                textareaRef.current.value.length,
                textareaRef.current.value.length
            )
        }
    }, [editingKey])

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (!editingKey) return
            if (e.key === "Escape") closeEditor()
            if ((e.metaKey || e.ctrlKey) && e.key === "s") {
                e.preventDefault()
                saveContent()
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [editingKey, closeEditor, saveContent])

    if (!isOwner) return null

    return (
        <AnimatePresence>
            {editingKey && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[300] flex items-center justify-center p-6"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        onClick={closeEditor}
                    />

                    <motion.div
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-2xl glass border border-white/15 rounded-[40px] overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-10 pt-10 pb-6 border-b border-white/5">
                            <div>
                                <div className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-1">
                                    Owner Edit Mode
                                </div>
                                <div className="text-xl font-black tracking-tight">
                                    <span className="font-mono text-white/40 text-sm">content:</span>{" "}
                                    <span className="text-indigo-300">{editingKey}</span>
                                </div>
                            </div>
                            <button
                                onClick={closeEditor}
                                className="p-3 rounded-2xl glass border-white/10 hover:border-white/30 text-white/30 hover:text-white transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Editor */}
                        <div className="px-10 py-8">
                            <textarea
                                ref={textareaRef}
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                rows={8}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm leading-relaxed focus:outline-none focus:border-indigo-500/50 resize-none transition-all placeholder:text-white/20 font-medium"
                                placeholder="Enter content…"
                            />
                            <div className="mt-2 text-[9px] text-white/20 font-black uppercase tracking-widest">
                                {editingValue.length} characters · Ctrl+S to save · Esc to cancel
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-4 px-10 pb-10">
                            <button
                                onClick={closeEditor}
                                className="px-8 py-3.5 rounded-2xl glass border-white/10 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => saveContent()}
                                disabled={saving}
                                className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white text-black hover:bg-indigo-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                            >
                                {saving ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : (
                                    <Save size={14} />
                                )}
                                {saving ? "Saving…" : "Save Changes"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// ─────────────────────────────────────────────────────
// OwnerToolbar: floating bar shown to the owner
// ─────────────────────────────────────────────────────
export function OwnerToolbar() {
    const { isOwner, isEditMode, toggleEditMode } = useOwner()

    if (!isOwner) return null

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, type: "spring", damping: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200]"
        >
            <div className="flex items-center gap-4 px-6 py-4 rounded-full glass border border-white/20 shadow-2xl shadow-indigo-500/10 backdrop-blur-2xl">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">
                        Owner Mode
                    </span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <button
                    onClick={toggleEditMode}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${isEditMode
                            ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                            : "glass border-white/10 text-white/40 hover:text-white"
                        }`}
                >
                    <Pencil size={11} />
                    {isEditMode ? "Editing On" : "Edit Mode"}
                </button>
            </div>
        </motion.div>
    )
}
