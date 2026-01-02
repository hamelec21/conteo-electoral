"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex bg-[#F4F7FE] dark:bg-gray-950 min-h-screen font-sans transition-colors">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                <Header onMenuToggle={toggleSidebar} />
                <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
