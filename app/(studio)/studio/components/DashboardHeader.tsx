import React from "react";
import { Bell, Search, Command } from "lucide-react";
import Image from "next/image";

export function DashboardHeader() {
    return (
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-12">
            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl glass border-white/5 text-white/20 w-96">
                <Search size={18} />
                <span className="text-xs uppercase font-black tracking-widest">Global Search...</span>
                <div className="ml-auto flex items-center gap-1 border border-white/10 px-2 py-0.5 rounded text-[8px]">
                    <Command size={10} /> K
                </div>
            </div>

            <div className="flex items-center gap-8">
                <button className="relative p-3 rounded-full hover:bg-white/5 transition-all text-white/40 hover:text-white">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#050505]" />
                </button>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-sm font-black tracking-tight">Snehal Fulluke</div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-white/20">Master Architect</div>
                    </div>
                    <div className="w-10 h-10 rounded-2xl glass border-white/10 overflow-hidden relative">
                        <Image
                            src="/images/profile/snehal-fulluke.jpg"
                            alt="Admin Profile"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
