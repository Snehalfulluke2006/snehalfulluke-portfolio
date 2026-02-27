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
    Layout
} from "lucide-react";
import Link from "next/link";

const menuItems = [
    { label: "Overview", icon: BarChart3, href: "/admin", active: true },
    { label: "Blog Posts", icon: FileEdit, href: "/admin/blog" },
    { label: "Projects", icon: Layout, href: "/admin/projects" },
    { label: "Gallery", icon: Image, href: "/admin/gallery" },
    { label: "Guestbook", icon: MessageSquare, href: "/admin/guestbook" },
    { label: "Users", icon: Users, href: "/admin/users" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export function Sidebar() {
    return (
        <aside className="w-80 border-r border-white/5 flex flex-col p-10 space-y-16">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl glass border-white/10 flex items-center justify-center font-black italic">SF</div>
                <div className="text-sm font-black tracking-widest uppercase">Admin</div>
            </div>

            <nav className="flex-1 space-y-4">
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center justify-between group p-4 rounded-2xl transition-all ${item.active
                            ? "bg-white text-black"
                            : "text-white/40 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <item.icon size={20} />
                            <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                        </div>
                        {!item.active && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </Link>
                ))}
            </nav>

            <button className="flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all font-black uppercase tracking-widest text-[10px]">
                <LogOut size={20} /> Logout
            </button>
        </aside>
    );
}
