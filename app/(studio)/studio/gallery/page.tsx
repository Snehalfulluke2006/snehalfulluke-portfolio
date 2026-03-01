import { getGalleryImages } from "@/app/actions/gallery"
import GalleryClient from "./GalleryClient"

export const metadata = {
    title: "Gallery Manager | Studio",
    robots: { index: false, follow: false },
}

export default async function AdminGalleryPage() {
    const images = await getGalleryImages()

    return <GalleryClient initialImages={images} />
}
