import { getProjects } from "@/lib/mdx"
import ProjectsClient from "./ProjectsClient"

export const metadata = {
    title: "Projects | Studio",
    robots: { index: false, follow: false },
}

export default async function AdminProjectsPage() {
    const projects = await getProjects()

    return <ProjectsClient initialProjects={projects} />
}
