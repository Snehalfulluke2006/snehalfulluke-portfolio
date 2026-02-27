import fs from 'fs';
import path from 'path';

export function getProjectThumbnail(projectId: string): string | null {
    const projectPath = path.join(process.cwd(), `public/images/projects/${projectId}`);

    if (fs.existsSync(projectPath) && fs.lstatSync(projectPath).isDirectory()) {
        const files = fs.readdirSync(projectPath);
        const image = files.find(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
        if (image) return `/images/projects/${projectId}/${image}`;
    }

    // Fallback to direct file if exists (e.g. sortiqo.png)
    const directPath = path.join(process.cwd(), `public/images/projects/${projectId}.png`);
    if (fs.existsSync(directPath)) return `/images/projects/${projectId}.png`;

    return null;
}
