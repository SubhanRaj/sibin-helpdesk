import React from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar sticky top-4 z-50 mx-auto w-[95%] max-w-7xl bg-base-100/70 backdrop-blur-lg backdrop-saturate-150 rounded-3xl shadow-lg border border-base-200/50 px-8">
                <div className="flex-1 gap-2 flex items-center">
                    <a className="text-xl font-bold mr-4 cursor-pointer hover:opacity-80 transition-opacity">Sibin Tech Solutions - Admin</a>
                    <div className="hidden lg:flex gap-6 font-medium">
                        <a href="/admin/dashboard" className="text-base-content/70 hover:text-indigo-600 hover:scale-105 transition-all cursor-pointer">Tickets</a>
                        <a href="/admin/organizations" className="text-base-content/70 hover:text-indigo-600 hover:scale-105 transition-all cursor-pointer">Organizations</a>
                        <a href="/admin/clients" className="text-base-content/70 hover:text-indigo-600 hover:scale-105 transition-all cursor-pointer">Clients</a>
                    </div>
                </div>
                <div className="flex-none gap-6 items-center flex">
                    <span className="font-medium text-sm hidden sm:inline-block text-base-content/80">
                        Support Team
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
