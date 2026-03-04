import React from "react";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar sticky top-4 z-50 mx-auto w-[95%] max-w-7xl bg-base-100/70 backdrop-blur-lg backdrop-saturate-150 rounded-3xl shadow-lg border border-base-200/50 px-8">
                <div className="flex-1">
                    <a className="text-xl font-bold">Sibin Tech Solutions - Client Portal</a>
                </div>
                <div className="flex-none gap-4">
                    <span className="font-medium text-sm hidden sm:inline-block">
                        ACME Corporation
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
