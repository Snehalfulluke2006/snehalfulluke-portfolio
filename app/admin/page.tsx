import React from "react";
import {
    BarChart3,
    Users,
    FileEdit,
    Eye,
    TrendingUp,
    Layout
} from "lucide-react";

const stats = [
    { label: "Total Views", value: "24.5K", change: "+12.5%", icon: Eye },
    { label: "Blog Posts", value: "12", change: "+2", icon: FileEdit },
    { label: "Guestbook Signatures", value: "156", change: "+24", icon: Users },
    { label: "Portfolio Visits", value: "3.2K", change: "+8.4%", icon: BarChart3 },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-4xl font-black tracking-tighter mb-2">Dashboard</h1>
                <p className="text-white/40">Welcome back, Snehal. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="p-8 rounded-[32px] glass border-white/5 space-y-6">
                        <div className="flex justify-between items-start">
                            <div className="p-4 rounded-2xl bg-white/5">
                                <stat.icon size={24} className="text-indigo-400" />
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-green-400">
                                <TrendingUp size={12} /> {stat.change}
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-black tracking-tighter">{stat.value}</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/30">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-[1fr_0.4fr] gap-8">
                <div className="p-10 rounded-[48px] glass border-white/5 h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Analytics Visualization</div>
                        <div className="text-2xl font-black text-white/40">Real-time Traffic Monitor incoming...</div>
                    </div>
                </div>

                <div className="p-10 rounded-[48px] glass border-white/5 space-y-8">
                    <h3 className="text-xl font-bold tracking-tight">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
                                <div>
                                    <div className="text-sm font-bold">New Blog Post Published</div>
                                    <div className="text-xs text-white/30">2 hours ago</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
