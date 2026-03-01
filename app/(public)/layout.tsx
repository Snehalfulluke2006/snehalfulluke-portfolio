import PublicChrome from "@/components/PublicChrome"

/**
 * Public Route Group Layout — app/(public)/layout.tsx
 *
 * Wraps all public-facing pages:
 * /, /blog, /blog/[slug], /projects/[slug],
 * /hire, /guestbook, /resume
 *
 * Does NOT wrap:
 * - /studio/* → handled by app/(studio)/layout.tsx
 * - /sf-login → handled by app/(auth)/layout.tsx
 *
 * Server component — safe to import client entry point PublicChrome.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return <PublicChrome>{children}</PublicChrome>
}
