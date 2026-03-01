"use client"

import React, {
    createContext, useContext, useEffect, useState, useCallback
} from "react"
import { createClient } from "@supabase/supabase-js"

const OWNER_EMAIL = "snehalfulluke@gmail.com"

interface OwnerContextType {
    isOwner: boolean
    isEditMode: boolean
    toggleEditMode: () => void
    editingKey: string | null
    openEditor: (key: string, currentValue: string) => void
    closeEditor: () => void
    editingValue: string
    setEditingValue: (v: string) => void
    saving: boolean
    saveContent: () => Promise<void>
}

const OwnerContext = createContext<OwnerContextType>({
    isOwner: false,
    isEditMode: false,
    toggleEditMode: () => { },
    editingKey: null,
    openEditor: () => { },
    closeEditor: () => { },
    editingValue: "",
    setEditingValue: () => { },
    saving: false,
    saveContent: async () => { },
})

export function useOwner() {
    return useContext(OwnerContext)
}

let _browserClient: ReturnType<typeof createClient> | null = null
function getBrowserClient() {
    if (!_browserClient) {
        _browserClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    }
    return _browserClient
}

export function OwnerProvider({ children }: { children: React.ReactNode }) {
    const [isOwner, setIsOwner] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editingKey, setEditingKey] = useState<string | null>(null)
    const [editingValue, setEditingValue] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        /**
         * ONE-SHOT session check — no persistent WebSocket.
         *
         * onAuthStateChange() opens a long-lived WebSocket for REALTIME auth events.
         * On public pages this WebSocket competes with page resources + the guestbook
         * WebSocket, causing ERR_NETWORK_CHANGED and blocking page render.
         *
         * getSession() is a single HTTP request — resolves immediately from
         * the local JWT stored in localStorage/cookies. No WebSocket opened.
         */
        getBrowserClient()
            .auth.getSession()
            .then(({ data: { session } }) => {
                setIsOwner(session?.user?.email === OWNER_EMAIL)
            })
            .catch(() => {
                // Supabase unavailable — owner stays false, page still renders
                setIsOwner(false)
            })
    }, [])

    const toggleEditMode = useCallback(() => {
        if (!isOwner) return
        setIsEditMode((prev) => !prev)
    }, [isOwner])

    const openEditor = useCallback((key: string, currentValue: string) => {
        setEditingKey(key)
        setEditingValue(currentValue)
    }, [])

    const closeEditor = useCallback(() => {
        setEditingKey(null)
        setEditingValue("")
    }, [])

    const saveContent = useCallback(async () => {
        if (!editingKey) return
        setSaving(true)
        try {
            const { upsertSiteContent } = await import("@/app/actions/content")
            const result = await upsertSiteContent(editingKey, editingValue)
            if (result.error) {
                alert("Save failed: " + result.error)
            } else {
                closeEditor()
                window.location.reload()
            }
        } finally {
            setSaving(false)
        }
    }, [editingKey, editingValue, closeEditor])

    return (
        <OwnerContext.Provider value={{
            isOwner,
            isEditMode,
            toggleEditMode,
            editingKey,
            openEditor,
            closeEditor,
            editingValue,
            setEditingValue,
            saving,
            saveContent,
        }}>
            {children}
        </OwnerContext.Provider>
    )
}
