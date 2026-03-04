import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { users, organizations } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import ClientList from "./ClientList";

export const dynamic = "force-dynamic";

async function fetchClientsData() {
    try {
        const { env } = await getCloudflareContext();
        const db = getDb(env as any);

        const clientsData = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            isActive: users.isActive,
            // @ts-ignore drizzle typings
            organizationName: organizations.name,
            organizationId: users.organizationId
        })
            .from(users)
            .leftJoin(organizations, eq(users.organizationId, organizations.id))
            .where(eq(users.role, "client"))
            .orderBy(desc(users.createdAt));

        const orgsData = await db.select().from(organizations).orderBy(desc(organizations.createdAt));
        return { clientsData, orgsData };
    } catch (err) {
        console.error("Error fetching clients:", err);
        return { clientsData: [], orgsData: [] };
    }
}

export default async function ClientsPage() {
    const { clientsData, orgsData } = await fetchClientsData();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <h1 className="text-3xl font-bold mb-8">Client Onboarding & Management</h1>
            <ClientList clients={clientsData} organizations={orgsData} />
        </div>
    );
}
