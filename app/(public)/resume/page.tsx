import { redirect, notFound } from 'next/navigation';
import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Resume Route — app/(public)/resume/page.tsx
 *
 * Redirects to the hosted PDF file.
 * existsSync check ensures a missing PDF never causes a blank
 * white 404 — it falls through to the app not-found.tsx instead.
 */
export default function ResumePage() {
    const pdfPath = join(process.cwd(), 'public', 'Snehal-Fulluke-Resume.pdf');

    if (!existsSync(pdfPath)) {
        notFound();
    }

    redirect('/Snehal-Fulluke-Resume.pdf');
}
