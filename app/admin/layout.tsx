import React from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { Sidebar } from "./components/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#050505] text-white">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto p-12">
                    {children}
                </main>
            </div>
        </div>
    );
}
