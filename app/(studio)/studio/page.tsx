import React from "react";
import {
    Eye,
    TrendingUp,
    MousePointerClick,
    Briefcase,
    BookOpen,
    Activity,
    Globe,
    ArrowUpRight,
} from "lucide-react";
import { getAnalyticsSummary } from "@/app/actions/analytics";

function formatNum(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return String(n);
}

function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

const EVENT_LABELS: Record<string, string> = {
    page_view: "Page View",
    project_click: "Project Viewed",
    hire_click: "Hire Intent",
    blog_view: "Blog Read",
    contact_click: "Contact Click",
};

export default async function StudioDashboard() {
    const data = await getAnalyticsSummary();

    const stats = [
        {
            label: "Total Visitors",
            value: formatNum(data.totalViews),
            change: "+live",
            icon: Eye,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
        },
        {
            label: "Project Views",
            value: formatNum(data.projectClicks),
            change: "+live",
            icon: MousePointerClick,
            color: "text-violet-400",
            bg: "bg-violet-500/10",
        },
        {
            label: "Hire Conversions",
            value: formatNum(data.hireClicks),
            change: "+live",
            icon: Briefcase,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
        },
        {
            label: "Blog Reads",
            value: formatNum(data.blogViews),
            change: "+live",
            icon: BookOpen,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
        },
    ];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-2">
                        Live Analytics
                    </p>
                    <h1 className="text-4xl font-black tracking-tighter">Dashboard</h1>
                    <p className="text-white/40 mt-1 text-sm">
                        Welcome back, Snehal. Here&apos;s what&apos;s happening in real time.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="group p-8 rounded-[32px] glass border-white/5 space-y-6 hover:border-white/15 transition-all duration-500"
                    >
                        <div className="flex justify-between items-start">
                            <div className={`p-4 rounded-2xl ${stat.bg}`}>
                                <stat.icon size={22} className={stat.color} />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                <TrendingUp size={11} /> {stat.change}
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-black tracking-tighter">
                                {stat.value}
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-1">
                                {stat.label}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Top Page + Live Feed */}
            <div className="grid lg:grid-cols-[1fr_0.5fr] gap-8">
                {/* Live Event Feed */}
                <div className="p-10 rounded-[40px] glass border-white/5 space-y-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-black tracking-tight">Live Event Feed</h3>
                            <p className="text-xs text-white/30 mt-1">Last 6 actions on your portfolio</p>
                        </div>
                        <Activity size={18} className="text-indigo-400 animate-pulse" />
                    </div>

                    <div className="space-y-3">
                        {data.recentEvents.length === 0 ? (
                            <div className="text-center py-12 text-white/20 text-sm font-bold">
                                No events yet. Visit a page to begin tracking.
                            </div>
                        ) : (
                            data.recentEvents.map((event: any, i: number) => (
                                <div
                                    key={event.id ?? i}
                                    className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/8 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all text-xs font-black">
                                            {(EVENT_LABELS[event.event_type] ?? event.event_type)
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold">
                                                {EVENT_LABELS[event.event_type] ?? event.event_type}
                                            </div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20 font-mono">
                                                {event.page}
                                                {event.meta ? ` · ${event.meta}` : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/20 whitespace-nowrap">
                                        {timeAgo(event.created_at)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Metrics Panel */}
                <div className="space-y-6">
                    {/* Top Page */}
                    <div className="p-8 rounded-[32px] glass border-white/5 space-y-4 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-3">
                            <Globe size={16} className="text-indigo-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                                Top Page
                            </span>
                        </div>
                        <div className="text-2xl font-black tracking-tighter font-mono text-indigo-300">
                            {data.topPage}
                        </div>
                        <div className="text-xs text-white/20 font-bold">Most visited route this session</div>
                    </div>

                    {/* Conversion Rate */}
                    <div className="p-8 rounded-[32px] glass border-white/5 space-y-4 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-3">
                            <ArrowUpRight size={16} className="text-emerald-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                                Hire Conversion
                            </span>
                        </div>
                        <div className="text-2xl font-black tracking-tighter">
                            {data.totalViews > 0
                                ? ((data.hireClicks / data.totalViews) * 100).toFixed(1) + "%"
                                : "—"}
                        </div>
                        <div className="text-xs text-white/20 font-bold">
                            {data.hireClicks} hire intents / {data.totalViews} page views
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="p-8 rounded-[32px] glass border-white/5 space-y-5 hover:border-white/10 transition-all">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                            System Status
                        </div>
                        {[
                            { label: "Vercel Platform", status: "Operational", color: "bg-emerald-400" },
                            { label: "Supabase Analytics", status: "Live", color: "bg-emerald-400" },
                            { label: "Middleware Auth", status: "Active", color: "bg-emerald-400" },
                        ].map((sys, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${sys.color} animate-pulse`} />
                                    <span className="text-xs font-bold">{sys.label}</span>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/20">
                                    {sys.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
