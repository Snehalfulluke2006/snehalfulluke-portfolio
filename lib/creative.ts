export interface CreativeWork {
    id: string;
    title: string;
    category: "Cinematic Shoots" | "Reel Editing" | "Photography" | "Creative Work";
    image: string;
    description?: string;
}

export const creativeWorks: CreativeWork[] = [
    {
        id: "cinematic-01",
        title: "Enchanted Valley",
        category: "Cinematic Shoots",
        image: "/images/photography/IMG_3002.jpg",
        description: "A study on natural lighting and atmospheric depth in high-altitude environments."
    },
    {
        id: "reel-01",
        title: "Neo-Tokyo Pulse",
        category: "Reel Editing",
        image: "/images/IMG_3006.jpg",
        description: "Fast-paced rhythm-based editing using custom speed ramps and color grading."
    },
    {
        id: "photo-01",
        title: "Shadow & Light",
        category: "Photography",
        image: "/images/photography/IMG_3002.jpg",
        description: "Capturing the stark contrast of morning light in dense pine forests."
    },
    {
        id: "creative-01",
        title: "Digital Mirage",
        category: "Creative Work",
        image: "/images/IMG_3006.jpg",
        description: "An abstract blend of organic shapes and generative digital textures."
    },
    {
        id: "photo-02",
        title: "Mountain Whisper",
        category: "Photography",
        image: "/images/photography/IMG_3002.jpg",
        description: "Long exposure photography capturing the stillness of alpine lakes."
    },
    {
        id: "cinematic-02",
        title: "Urban Nomads",
        category: "Cinematic Shoots",
        image: "/images/photography/IMG_3002.jpg",
        description: "Documentary-style cinematography exploring the intersection of modern life and architecture."
    }
];
