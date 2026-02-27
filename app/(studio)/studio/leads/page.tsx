import { getLeads } from "@/app/actions/leads"
import LeadsClient from "./LeadsClient"

export const metadata = {
    title: "Leads | Studio",
    robots: { index: false, follow: false },
}

export default async function LeadsPage() {
    const leads = await getLeads()
    return <LeadsClient initialLeads={leads} />
}
