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
                    <a className="text-xl font-bold mr-4">Sibin Tech Solutions - Admin</a>
                    <div className="hidden lg:flex join">
                        <a href="/admin/dashboard" className="btn btn-ghost join-item rounded-none pointer-events-auto">Tickets</a>
                        <a href="/admin/organizations" className="btn btn-ghost join-item rounded-none pointer-events-auto">Organizations</a>
                        <a href="/admin/clients" className="btn btn-ghost join-item rounded-none pointer-events-auto">Clients</a>
                    </div>
                </div>
                <div className="flex-none gap-4">
                    <span className="font-medium text-sm hidden sm:inline-block">
                        Support Team
                    </span>
                    <button className="btn btn-ghost btn-sm">Logout</button>
                </div>
            </div>
            <main className="pt-24 pb-8">
                {children}
            </main>
        </div>
    );
}
