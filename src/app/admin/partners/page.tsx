import { Metadata } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "../../../db";
import { partners } from "../../../db/schema";
import { desc } from "drizzle-orm";
import PartnerList from "./PartnerList";

export const metadata: Metadata = {
	title: "Partners",
	description: "Manage OEM partners displayed on the homepage",
};

async function fetchPartners() {
    try {
        const { env } = await getCloudflareContext();
        const db = getDb(env as any);
        return await db.select().from(partners).orderBy(desc(partners.order)).all();
    } catch (err) {
        console.log("Error fetching partners:", err);
        return [];
    }
}

export default async function PartnerManagementPage() {
    const allPartners = await fetchPartners();

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Partner Management</h1>
                <p className="text-base-content/70 mt-1">Add and manage OEM partners displayed on the homepage.</p>
            </div>

            {/* Partner List Component */}
            <PartnerList initialPartners={allPartners} />
        </div>
    );
}
