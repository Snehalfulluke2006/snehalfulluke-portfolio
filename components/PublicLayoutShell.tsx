"use client"

import { OwnerProvider } from "@/contexts/OwnerContext"
import { EditModal, OwnerToolbar } from "@/components/EditUI"

export default function PublicLayoutShell({ children }: { children: React.ReactNode }) {
    return (
        <OwnerProvider>
            {children}
            <EditModal />
            <OwnerToolbar />
        </OwnerProvider>
    )
}
