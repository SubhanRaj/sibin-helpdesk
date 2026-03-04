import React from "react";
import { APP_CONFIG, route } from "@/config";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar sticky top-4 z-50 mx-auto w-[95%] max-w-7xl bg-base-100/70 backdrop-blur-lg backdrop-saturate-150 rounded-3xl shadow-lg border border-base-200/50 px-8">
                <div className="flex-1 gap-2 flex items-center">
                    <a href={route("HOME")} className="text-xl font-bold mr-4 cursor-pointer hover:opacity-80 transition-opacity">{APP_CONFIG.APP_NAME} - {APP_CONFIG.ADMIN_PANEL_NAME}</a>
                    <div className="hidden lg:flex gap-6 font-medium">
                        <a href={route("ADMIN.DASHBOARD")} className="text-base-content/70 hover:text-indigo-600 hover:scale-105 transition-all cursor-pointer">Tickets</a>
                        <a href={route("ADMIN.ORGANIZATIONS")} className="text-base-content/70 hover:text-indigo-600 hover:scale-105 transition-all cursor-pointer">Organizations</a>
                        <a href={route("ADMIN.CLIENTS")} className="text-base-content/70 hover:text-indigo-600 hover:scale-105 transition-all cursor-pointer">Clients</a>
                        <a href={route("ADMIN.PARTNERS")} className="text-base-content/70 hover:text-indigo-600 hover:scale-105 transition-all cursor-pointer">Partners</a>
                        <a href={route("ADMIN.HOMEPAGE_SETTINGS")} className="text-base-content/70 hover:text-indigo-600 hover:scale-105 transition-all cursor-pointer">Homepage</a>
                    </div>
                </div>
                <div className="flex-none gap-6 items-center flex">
                    <span className="font-medium text-sm hidden sm:inline-block text-base-content/80">
                        {APP_CONFIG.SUPPORT_TEAM_NAME}
                    </span>
                    <button className="text-sm font-semibold text-error/80 hover:text-error transition-colors">Logout</button>
                </div>
            </div>
            <main className="pt-24 pb-8">
                {children}
            </main>
        </div>
    );
}
