export interface Project {
    id: string;
    title: string;
    description: string;
    problem: string;
    solution: string;
    category: string;
    image: string;
    tech: string[];
    links: {
        github?: string;
        live?: string;
    };
    tags: string[];
}

export const projects: Project[] = [
    {
        id: "sortiqo-game",
        title: "Sortiqo - The Algorithm Challenge",
        description: "A competitive puzzle game that teaches algorithmic thinking through immersive gameplay.",
        problem: "Algorithms are often perceived as dry and purely academic, making it difficult for beginners to grasp logical flows in a fun way.",
        solution: "Developed an interactive mobile game where players solve complex sorting and logic puzzles, earning ranks based on efficiency and time.",
        category: "Game Development",
        image: "/images/projects/sortiqo/sortiqo.png",
        tech: ["Unity", "C#", "Firebase", "Figma"],
        links: {
            github: "https://github.com/Snehalfulluke2006",
            live: "#"
        },
        tags: ["Puzzle", "Algorithmic", "Core Logic"]
    },
    {
        id: "focloop-app",
        title: "Focloop - Cognitive Focus Tracker",
        description: "A productivity ecosystem focused on deep work and flow state management.",
        problem: "Modern professionals struggle with digital distractions and lack a data-driven way to track their cognitive stamina and focus periods.",
        solution: "Built a Flutter application that uses the Pomodoro technique combined with real-time biometric feedback and focus heatmaps.",
        category: "Mobile Development",
        image: "/images/thumbnails/IMG_5670 (1).jpg",
        tech: ["Flutter", "Dart", "Supabase", "Riverpod"],
        links: {
            github: "https://github.com/Snehalfulluke2006",
            live: "#"
        },
        tags: ["Productivity", "Mobile", "Fintech"]
    },
    {
        id: "cinematic-vfx",
        title: "Neon City - VFX Short Film",
        description: "A high-fidelity visual experience blending 3D environments with live-action footage.",
        problem: "Traditional VFX workflows can be slow and disconnected from the storyteller's immediate creative vision.",
        solution: "Utilized a real-time rendering pipeline inside Unreal Engine, combined with professional post-production in Premiere Pro.",
        category: "Video Production",
        image: "/images/photography/cinematic/IMG_4730 (1).jpg",
        tech: ["Premiere Pro", "After Effects", "Unreal Engine"],
        links: {
            github: "https://github.com/Snehalfulluke2006",
            live: "https://youtube.com/snehalfulluke1910"
        },
        tags: ["Visual Arts", "Post-Production", "3D"]
    }
];
