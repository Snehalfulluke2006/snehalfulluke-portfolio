import { getProjectBySlug, getProjects } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, Globe, Hash, Calendar, Share2, Twitter, Linkedin, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import { trackProjectClick } from "@/lib/analytics";

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const project = await getProjectBySlug(params.slug);
    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Snehal Fulluke`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [project.image],
            type: "article",
            tags: project.tags,
            section: project.category
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.description,
            images: [project.image],
        }
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const project = await getProjectBySlug(params.slug);
    const allProjects = await getProjects();

    if (!project) {
        notFound();
    }

    await trackProjectClick(params.slug);

    const currentIndex = allProjects.findIndex(p => p.slug === params.slug);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = typeof window !== 'undefined' ? document.title : project.title;

    return (
        <article className="min-h-screen pt-40 pb-32">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex justify-between items-center mb-16">
                    {/* Back Link */}
                    <Link
                        href="/#projects"
                        className="group inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-black uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </Link>

                    {/* Quick Share */}
                    <div className="flex items-center gap-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mr-2">Share</div>
                        <a href={`https://twitter.com/intent/tweet?text=${project.title}`} target="_blank" className="p-3 rounded-full glass border-white/5 hover:text-indigo-400 transition-all">
                            <Twitter size={14} />
                        </a>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" className="p-3 rounded-full glass border-white/5 hover:text-indigo-400 transition-all">
                            <Linkedin size={14} />
                        </a>
                        <a href={`https://wa.me/?text=${project.title}`} target="_blank" className="p-3 rounded-full glass border-white/5 hover:text-indigo-400 transition-all">
                            <MessageCircle size={14} />
                        </a>
                    </div>
                </div>

                {/* Header Section */}
                <div className="flex flex-col gap-12 mb-20">
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-4 items-center">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                                <Hash size={10} /> {project.category}
                            </span>
                            <span className="flex items-center gap-2 text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                                <Calendar size={12} /> {project.date}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-3xl">
                            {project.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="p-8 rounded-3xl glass border-white/5 space-y-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Role</div>
                            <div className="font-bold text-sm">Lead Developer</div>
                        </div>
                        <div className="p-8 rounded-3xl glass border-white/5 space-y-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Duration</div>
                            <div className="font-bold text-sm">4 Months</div>
                        </div>
                        <div className="p-8 rounded-3xl glass border-white/5 space-y-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Status</div>
                            <div className="font-bold text-sm text-indigo-400">Production</div>
                        </div>
                        <div className="p-8 rounded-3xl glass border-white/5 space-y-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Tech</div>
                            <div className="font-bold text-sm">{project.tech[0]} & More</div>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-video rounded-[60px] overflow-hidden border border-white/10 glass mb-32 group">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-[1fr_300px] gap-24">
                    <div className="prose prose-invert prose-2xl max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-p:text-white/60 prose-strong:text-white prose-a:text-indigo-400">
                        <div className="grid md:grid-cols-2 gap-16 mb-24 not-prose">
                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500">The Challenge</h3>
                                <p className="text-xl text-white/80 font-medium leading-relaxed">{project.problem}</p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500">The Result</h3>
                                <p className="text-xl text-white/80 font-medium leading-relaxed">{project.solution}</p>
                            </div>
                        </div>

                        <MDXRemote source={project.content} />
                    </div>

                    <aside className="space-y-12">
                        <div className="p-8 rounded-[40px] glass border-white/10 space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Project Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t) => (
                                    <span key={t} className="px-4 py-2 rounded-full glass border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[40px] glass border-white/10 space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Project Links</h4>
                            <div className="flex flex-col gap-4">
                                {project.live && project.live !== "#" && (
                                    <Link
                                        href={project.live}
                                        target="_blank"
                                        className="w-full px-6 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-all"
                                    >
                                        <Globe size={16} /> Live Demo
                                    </Link>
                                )}
                                {project.github && project.github !== "#" && (
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        className="w-full px-6 py-4 rounded-2xl glass border-white/10 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:border-white/30 transition-all"
                                    >
                                        <Github size={16} /> Source Code
                                    </Link>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Project Navigation */}
                <div className="mt-40 pt-20 border-t border-white/5 grid grid-cols-2 gap-8">
                    {prevProject ? (
                        <Link href={`/projects/${prevProject.slug}`} className="group p-10 rounded-[48px] glass border-white/5 hover:border-indigo-500/30 transition-all text-left">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 group-hover:text-indigo-400 transition-colors">
                                <ChevronLeft size={14} /> Previous Project
                            </div>
                            <div className="text-2xl font-black tracking-tight group-hover:translate-x-2 transition-transform">{prevProject.title}</div>
                        </Link>
                    ) : (
                        <div />
                    )}
                    {nextProject ? (
                        <Link href={`/projects/${nextProject.slug}`} className="group p-10 rounded-[48px] glass border-white/5 hover:border-indigo-500/30 transition-all text-right">
                            <div className="flex items-center justify-end gap-4 text-[10px] font-black uppercase tracking-widest text-white/30 mb-4 group-hover:text-indigo-400 transition-colors">
                                Next Project <ChevronRight size={14} />
                            </div>
                            <div className="text-2xl font-black tracking-tight group-hover:-translate-x-2 transition-transform">{nextProject.title}</div>
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </article>
    );
}
