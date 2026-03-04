import React from "react";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";
import { APP_CONFIG, route } from "@/config";
import { getCurrentAppUser, isSibinRole } from "@/lib/auth";
import { organizations } from "@/db/schema";

export default async function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const appUser = await getCurrentAppUser();

    if (!appUser) {
        // Signed in via Clerk but no D1 record yet — send to onboarding/redirect flow
        redirect(route("AUTH_REDIRECT"));
    }

    if (isSibinRole(appUser.role!)) {
        redirect(route("ADMIN.DASHBOARD"));
    }

    let orgName: string = APP_CONFIG.APP_NAME;
    if (appUser.organizationId) {
        const { env } = await getCloudflareContext({ async: true });
        const db = drizzle(env.sibin_helpdesk_db);
        const org = await db
            .select()
            .from(organizations)
            .where(eq(organizations.id, appUser.organizationId))
            .limit(1);
        if (org[0]) orgName = org[0].name;
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar sticky top-4 z-50 mx-auto w-[95%] max-w-7xl bg-base-100/70 backdrop-blur-lg backdrop-saturate-150 rounded-3xl shadow-lg border border-base-200/50 px-8">
                <div className="flex-1">
                    <a href={route("HOME")} className="text-xl font-bold cursor-pointer hover:opacity-80 transition-opacity">{APP_CONFIG.APP_NAME} - {APP_CONFIG.CLIENT_PORTAL_NAME}</a>
                </div>
                <div className="flex-none gap-6 items-center flex">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="font-medium text-sm text-base-content/80">{appUser.name}</span>
                        <span className="text-xs text-base-content/50">{orgName}</span>
                    </div>
                    <SignOutButton redirectUrl={route("SIGN_IN")}>
                        <button className="text-sm font-semibold text-error/80 hover:text-error transition-colors">Logout</button>
                    </SignOutButton>
                </div>
            </div>
            <main className="pt-24 pb-8">
                {children}
            </main>
        </div>
    );
}

