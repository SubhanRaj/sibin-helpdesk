import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { users, organizations } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import ClientList from "./ClientList";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
    let clientsData: any[] = [];
    let orgsData: any[] = [];

    try {
        const { env } = await getCloudflareContext();
        // @ts-ignore
        const db = getDb(env as any);

        clientsData = await db.select({
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

        orgsData = await db.select().from(organizations).where(eq(organizations.isActive, true)).orderBy(desc(organizations.name));
    } catch (err) {
        console.error("DB Error:", err);
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Client Onboarding & Management</h1>
            <ClientList clients={clientsData} organizations={orgsData} />
        </div>
    );
}
