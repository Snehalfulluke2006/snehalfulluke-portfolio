/**
 * Auth Layout — app/(auth)/layout.tsx
 *
 * IMPORTANT: This layout must NOT emit <html> or <body>.
 * The root app/layout.tsx already provides those for every route.
 * Nested <html>/<body> causes hydration removeChild crashes.
 *
 * Robots noindex/nofollow is set per-page in sf-login/page.tsx metadata.
 */
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
