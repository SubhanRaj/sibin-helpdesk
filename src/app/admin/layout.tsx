import React from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar bg-neutral text-neutral-content shadow-sm px-8">
                <div className="flex-1">
                    <a className="text-xl font-bold">Sibin Tech Solutions - Admin Dashboard</a>
                </div>
                <div className="flex-none gap-4">
                    <span className="font-medium text-sm hidden sm:inline-block">
                        Support Team
                    </span>
                    <button className="btn btn-ghost btn-sm">Logout</button>
                </div>
            </div>
            <main className="p-8">
                {children}
            </main>
        </div>
    );
}
