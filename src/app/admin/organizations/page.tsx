import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { organizations } from "@/db/schema";
import { desc } from "drizzle-orm";
import OrgList from "./OrgList";

export const dynamic = "force-dynamic";

export default async function OrganizationsPage() {
    let orgs: any[] = [];
    try {
        const { env } = await getCloudflareContext();
        // @ts-ignore
        const db = getDb(env as any);

        orgs = await db.select().from(organizations).orderBy(desc(organizations.createdAt));
    } catch (err) {
        console.error(err);
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Organization Management</h1>
            <OrgList organizations={orgs} />
        </div>
    );
}
