"use client"

import React, { useState, useTransition, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import {
    Trash2, Clock, XCircle, CheckCircle,
    ChevronDown, Save, StickyNote, Loader2,
    Mail, Briefcase, DollarSign, Activity
} from "lucide-react"
import type { Lead, LeadStatus } from "@/app/actions/leads"
import { updateLeadStatus, saveLeadNote, deleteLead } from "@/app/actions/leads"
import { cn } from "@/lib/utils"

const STATUS_CONFIG: Record<LeadStatus, { label: string; color: string }> = {
    new: { label: "New", color: "bg-indigo-500 text-white" },
    contacted: { label: "Contacted", color: "bg-amber-500 text-black" },
    closed: { label: "Closed", color: "bg-emerald-500 text-white" },
}

function LeadCard({ lead, onDelete }: { lead: Lead; onDelete: (id: string) => void }) {
    const [status, setStatus] = useState<LeadStatus>(lead.status)
    const [notes, setNotes] = useState(lead.notes ?? "")
    const [showNotes, setShowNotes] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [saveSuccess, setSaveSuccess] = useState(false)

    const handleStatusChange = (newStatus: LeadStatus) => {
        setStatus(newStatus)
        startTransition(() => { updateLeadStatus(lead.id, newStatus) })
    }

    const handleSaveNotes = () => {
        startTransition(() => {
            saveLeadNote(lead.id, notes).then(() => {
                setSaveSuccess(true)
                setTimeout(() => setSaveSuccess(false), 2000)
            })
        })
    }

    const handleDelete = () => {
        if (!confirm(`Delete lead from ${lead.name}?`)) return
        startTransition(() => {
            deleteLead(lead.id).then(() => onDelete(lead.id))
        })
    }

    return (
        <div className={cn(
            "group rounded-[32px] glass border transition-all duration-500",
            status === "new" ? "border-indigo-500/20 hover:border-indigo-500/40" :
                status === "contacted" ? "border-amber-500/20 hover:border-amber-500/40" :
                    "border-white/5 hover:border-white/10"
        )}>
            {/* Header */}
            <div className="p-8 flex items-start justify-between gap-6">
                <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center font-black text-indigo-400 text-lg flex-shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                        {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="font-black text-lg tracking-tight">{lead.name}</div>
                        <a href={`mailto:${lead.email}`} className="text-xs text-white/30 hover:text-indigo-400 transition-colors flex items-center gap-1 mt-0.5">
                            <Mail size={11} /> {lead.email}
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Status selector */}
                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                            className={cn(
                                "appearance-none pr-7 pl-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest cursor-pointer focus:outline-none",
                                STATUS_CONFIG[status].color
                            )}
                        >
                            {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((s) => (
                                <option key={s} value={s} className="bg-zinc-900 text-white">
                                    {STATUS_CONFIG[s].label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Notes toggle */}
                    <button
                        onClick={() => setShowNotes(!showNotes)}
                        className="p-2.5 rounded-xl glass border-white/5 hover:border-white/20 text-white/30 hover:text-indigo-400 transition-all"
                        title="Add Notes"
                    >
                        <StickyNote size={15} />
                    </button>

                    {/* Delete */}
                    <button
                        onClick={handleDelete}
                        className="p-2.5 rounded-xl glass border-white/5 hover:border-red-500/30 text-white/30 hover:text-red-400 transition-all"
                        title="Delete Lead"
                    >
                        {isPending ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                    </button>
                </div>
            </div>

            {/* Details row */}
            <div className="px-8 pb-6 flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-[11px] font-bold text-white/40">
                    <Briefcase size={13} className="text-indigo-400" />
                    {lead.service}
                </div>
                {lead.budget && (
                    <div className="flex items-center gap-2 text-[11px] font-bold text-white/40">
                        <DollarSign size={13} className="text-emerald-400" />
                        {lead.budget}
                    </div>
                )}
                <div className="text-[11px] font-bold text-white/20 ml-auto">
                    {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </div>
            </div>

            {/* Message */}
            {lead.message && (
                <div className="px-8 pb-6">
                    <p className="text-sm text-white/40 leading-relaxed italic border-l-2 border-indigo-500/30 pl-4">
                        &ldquo;{lead.message}&rdquo;
                    </p>
                </div>
            )}

            {/* Notes editor */}
            {showNotes && (
                <div className="px-8 pb-8 space-y-3 border-t border-white/5 pt-6">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Internal Notes</div>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        placeholder="Add follow-up notes, calls, next steps..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-indigo-500/50 resize-none placeholder:text-white/20 transition-all"
                    />
                    <button
                        onClick={handleSaveNotes}
                        disabled={isPending}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                            saveSuccess
                                ? "bg-emerald-500 text-white"
                                : "bg-white text-black hover:bg-indigo-500 hover:text-white"
                        )}
                    >
                        {isPending ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                        {saveSuccess ? "Saved!" : "Save Notes"}
                    </button>
                </div>
            )}
        </div>
    )
}

interface LeadsClientProps {
    initialLeads: Lead[]
}

export default function LeadsClient({ initialLeads }: LeadsClientProps) {
    const [leads, setLeads] = useState<Lead[]>(initialLeads)
    const [filter, setFilter] = useState<"all" | LeadStatus>("all")
    const [liveIndicator, setLiveIndicator] = useState(false)

    // Realtime subscription
    useEffect(() => {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const channel = supabase
            .channel("leads-realtime")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "leads" },
                (payload) => {
                    setLiveIndicator(true)
                    setTimeout(() => setLiveIndicator(false), 3000)

                    if (payload.eventType === "INSERT") {
                        setLeads((prev) => [payload.new as Lead, ...prev])
                    } else if (payload.eventType === "UPDATE") {
                        setLeads((prev) =>
                            prev.map((l) => (l.id === (payload.new as Lead).id ? (payload.new as Lead) : l))
                        )
                    } else if (payload.eventType === "DELETE") {
                        setLeads((prev) => prev.filter((l) => l.id !== payload.old.id))
                    }
                }
            )
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [])

    const handleDelete = (id: string) => {
        setLeads((prev) => prev.filter((l) => l.id !== id))
    }

    const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter)
    const counts = {
        all: leads.length,
        new: leads.filter(l => l.status === "new").length,
        contacted: leads.filter(l => l.status === "contacted").length,
        closed: leads.filter(l => l.status === "closed").length,
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-2">CRM</p>
                    <h1 className="text-4xl font-black tracking-tighter">Leads</h1>
                    <p className="text-white/40 text-sm mt-1">{leads.length} total leads in pipeline</p>
                </div>
                <div className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full glass border text-[10px] font-black uppercase tracking-widest transition-all",
                    liveIndicator ? "border-emerald-500/50 text-emerald-400" : "border-white/5 text-white/20"
                )}>
                    <Activity size={12} className={liveIndicator ? "animate-pulse" : ""} />
                    {liveIndicator ? "New Activity!" : "Live"}
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-3">
                {(["all", "new", "contacted", "closed"] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
                            filter === f
                                ? "bg-white text-black border-white"
                                : "glass border-white/5 text-white/40 hover:text-white hover:border-white/20"
                        )}
                    >
                        {f} <span className="opacity-50 ml-1">({counts[f]})</span>
                    </button>
                ))}
            </div>

            {/* Leads list */}
            {filtered.length === 0 ? (
                <div className="text-center py-32 space-y-4">
                    <div className="text-5xl">📭</div>
                    <div className="text-white/20 font-bold text-lg">No {filter === "all" ? "" : filter} leads yet.</div>
                    <div className="text-white/10 text-sm">Submit the Hire page form to create your first lead.</div>
                </div>
            ) : (
                <div className="space-y-6">
                    {filtered.map((lead) => (
                        <LeadCard key={lead.id} lead={lead} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    )
}
