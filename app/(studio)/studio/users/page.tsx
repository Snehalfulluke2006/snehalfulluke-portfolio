import { getUsers } from "@/app/actions/users"
import UsersClient from "./UsersClient"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "User Management | Studio",
    robots: { index: false, follow: false },
}

export default async function AdminUsersPage() {
    // If not owner, getUsers will throw error correctly preventing load by edge-case checks.
    const initialUsers = await getUsers()

    return <UsersClient initialUsers={initialUsers} />
}
