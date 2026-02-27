import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_PATH = path.join(process.cwd(), 'content/blog');
const PROJECTS_PATH = path.join(process.cwd(), 'content/projects');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    readTime: string;
    description: string;
    category: string;
    gradient?: string;
    author?: string;
    authorImage?: string;
    image?: string;
    content: string;
}

export interface ProjectMDX {
    slug: string;
    title: string;
    date: string;
    category: string;
    image: string;
    description: string;
    problem: string;
    solution: string;
    tech: string[];
    tags: string[];
    github?: string;
    live?: string;
    content: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    if (!fs.existsSync(BLOG_PATH)) {
        return [];
    }

    const files = fs.readdirSync(BLOG_PATH);

    const posts = files
        .filter((file) => /\.mdx?$/.test(file))
        .map((file) => {
            const source = fs.readFileSync(path.join(BLOG_PATH, file), 'utf8');
            const { data, content } = matter(source);
            return {
                ...(data as any),
                slug: file.replace(/\.mdx?$/, ''),
                content,
            } as BlogPost;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
        return null;
    }

    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    return {
        ...(data as any),
        slug,
        content,
    } as BlogPost;
}

export async function getProjects(): Promise<ProjectMDX[]> {
    if (!fs.existsSync(PROJECTS_PATH)) {
        return [];
    }

    const files = fs.readdirSync(PROJECTS_PATH);

    const projects = files
        .filter((file) => /\.mdx?$/.test(file))
        .map((file) => {
            const source = fs.readFileSync(path.join(PROJECTS_PATH, file), 'utf8');
            const { data, content } = matter(source);
            return {
                ...(data as any),
                slug: file.replace(/\.mdx?$/, ''),
                content,
            } as ProjectMDX;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectMDX | null> {
    const filePath = path.join(PROJECTS_PATH, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
        return null;
    }

    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);

    return {
        ...(data as any),
        slug,
        content,
    } as ProjectMDX;
}
