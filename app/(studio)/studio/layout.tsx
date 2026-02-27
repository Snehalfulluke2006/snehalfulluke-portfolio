import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Studio — Dashboard",
    robots: { index: false, follow: false },
};

export default function StudioSegmentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
