import fs from 'fs';
import path from 'path';

export interface GalleryPhoto {
    id: string;
    title: string;
    category: string;
    image: string;
    description?: string;
}

export function getGalleryPhotos(): GalleryPhoto[] {
    const photographyPath = path.join(process.cwd(), 'public/images/photography');
    if (!fs.existsSync(photographyPath)) return [];

    const categories = ['cinematic', 'editing', 'events', 'portraits', 'reels'];
    const photos: GalleryPhoto[] = [];

    // Fallback if folders are empty but images exist in root
    const rootFiles = fs.readdirSync(photographyPath);
    rootFiles.forEach(file => {
        if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
            photos.push({
                id: `root-${file}`,
                title: file.split('.')[0].replace(/-/g, ' '),
                category: 'General',
                image: `/images/photography/${file}`,
            });
        }
    });

    // Scan specific category folders
    categories.forEach(category => {
        const categoryPath = path.join(photographyPath, category);
        if (fs.existsSync(categoryPath) && fs.lstatSync(categoryPath).isDirectory()) {
            const files = fs.readdirSync(categoryPath);
            files.forEach(file => {
                if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
                    photos.push({
                        id: `${category}-${file}`,
                        title: file.split('.')[0].replace(/-/g, ' '),
                        category: category.charAt(0).toUpperCase() + category.slice(1),
                        image: `/images/photography/${category}/${file}`,
                    });
                }
            });
        }
    });

    return photos;
}
