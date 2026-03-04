import { Metadata } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { organizations } from "@/db/schema";
import { desc } from "drizzle-orm";
import OrgList from "./OrgList";

export const metadata: Metadata = {
	title: "Organizations",
	description: "Manage organizations",
};

export const dynamic = "force-dynamic";

async function fetchOrganizations() {
    try {
        const { env } = await getCloudflareContext({ async: true });
        const db = getDb(env as any);
        return await db.select().from(organizations).orderBy(desc(organizations.createdAt));
    } catch (err) {
        console.error("Error fetching organizations:", err);
        return [];
    }
}

export default async function OrganizationsPage() {
    const orgs = await fetchOrganizations();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <h1 className="text-3xl font-bold mb-8">Organization Management</h1>
            <OrgList organizations={orgs} />
        </div>
    );
}
