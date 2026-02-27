"use client";

import React from "react";
import {
    Plus,
    Search,
    MoreVertical,
    ExternalLink,
    Edit2,
    Trash2,
    Layout
} from "lucide-react";

const projects = [
    {
        title: "Sortiqo Game",
        category: "Game Development",
        status: "Live",
        lastEdited: "12 hours ago",
        image: "/images/projects/sortiqo/sortiqo.png"
    },
    {
        title: "Focloop App",
        category: "App Development",
        status: "In Progress",
        lastEdited: "2 days ago",
        image: "/images/thumbnails/IMG_5670 (1).jpg"
    },
    {
        title: "Cinematic VFX",
        category: "Creative Media",
        status: "Draft",
        lastEdited: "1 week ago",
        image: "/images/photography/cinematic/IMG_4730 (1).jpg"
    }
];

export default function AdminProjects() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2">Projects</h1>
                    <p className="text-white/40">Manage your portfolio works and case studies.</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all active:scale-95">
                    <Plus size={16} /> New Project
                </button>
            </div>

            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search projects by name, tag or tech stack..."
                    className="w-full h-16 bg-white/5 border border-white/5 rounded-3xl pl-16 pr-8 text-sm focus:outline-none focus:border-white/20 transition-all"
                />
            </div>

            <div className="grid gap-6">
                {projects.map((project, i) => (
                    <div key={i} className="group flex items-center justify-between p-8 rounded-[40px] glass border-white/5 hover:border-white/10 transition-all duration-500">
                        <div className="flex items-center gap-8">
                            <div className="w-24 h-24 rounded-3xl overflow-hidden glass border-white/10 relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img src={project.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${project.status === 'Live' ? 'bg-green-500/10 text-green-400' :
                                        project.status === 'In Progress' ? 'bg-indigo-500/10 text-indigo-400' :
                                            'bg-white/10 text-white/40'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/20">
                                    <span>{project.category}</span>
                                    <span>•</span>
                                    <span>Modified {project.lastEdited}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-4 rounded-2xl glass border-white/5 hover:border-white/20 hover:text-white transition-all">
                                <Edit2 size={18} />
                            </button>
                            <button className="p-4 rounded-2xl glass border-white/5 hover:border-white/20 hover:text-red-400 transition-all">
                                <Trash2 size={18} />
                            </button>
                            <button className="p-4 rounded-2xl glass border-white/5 hover:border-white/20 hover:text-indigo-400 transition-all">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
