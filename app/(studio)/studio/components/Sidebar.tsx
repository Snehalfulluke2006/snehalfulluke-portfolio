import React from "react";
import {
    BarChart3,
    FileEdit,
    Settings,
    Users,
    MessageSquare,
    Image,
    LogOut,
    ChevronRight,
    Layout,
    Inbox,
} from "lucide-react";
import Link from "next/link";
import { logout } from "../actions";
import { getNewLeadCount } from "@/app/actions/leads";
import { getUserRole } from "@/app/actions/requireRole";

const baseMenuItems = [
    { label: "Overview", icon: BarChart3, href: "/studio" },
    { label: "Leads", icon: Inbox, href: "/studio/leads", badge: true },
    { label: "Blog Posts", icon: FileEdit, href: "/studio/blog" },
    { label: "Projects", icon: Layout, href: "/studio/projects" },
    { label: "Gallery", icon: Image, href: "/studio/gallery" },
    { label: "Guestbook", icon: MessageSquare, href: "/studio/guestbook" },
];

const ownerItems = [
    { label: "Settings", icon: Settings, href: "/studio/settings" },
    { label: "Users", icon: Users, href: "/studio/users" },
];

export async function Sidebar() {
    const newLeadCount = await getNewLeadCount();
    const role = await getUserRole();
    const isOwner = role === "owner";

    return (
        <aside className="w-72 border-r border-white/5 flex flex-col p-8 space-y-12 flex-shrink-0">
            {/* Brand */}
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl glass border-white/10 flex items-center justify-center font-black italic text-indigo-400">
                    SF
                </div>
                <div>
                    <div className="text-sm font-black tracking-widest uppercase">Studio</div>
                    <div className="text-[9px] uppercase tracking-widest text-white/20 font-bold">Admin Panel</div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1">
                {baseMenuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-between group p-3.5 rounded-2xl transition-all text-white/40 hover:text-white hover:bg-white/5"
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {item.badge && newLeadCount > 0 && (
                                <span className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[9px] font-black animate-pulse">
                                    {newLeadCount}
                                </span>
                            )}
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </Link>
                ))}
                {isOwner && ownerItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-between group p-3.5 rounded-2xl transition-all text-amber-400/60 hover:text-amber-400 hover:bg-amber-400/5 mt-4"
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <form action={logout}>
                <button
                    type="submit"
                    className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all font-black uppercase tracking-widest text-[10px]"
                >
                    <LogOut size={18} /> Logout
                </button>
            </form>
        </aside>
    );
}
