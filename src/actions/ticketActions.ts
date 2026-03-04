"use server";

import { revalidatePath } from "next/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "../db";
import { tickets, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

// Dummy Auth: We'll ensure a default user exists and get their ID
async function getOrCreateDefaultUser(db: ReturnType<typeof getDb>) {
    const defaultEmail = "client@acme.corp";
    let user = await db.select().from(users).where(eq(users.email, defaultEmail)).get();

    if (!user) {
        const newUserId = randomUUID();
        await db.insert(users).values({
            id: newUserId,
            name: "Acme Client",
            organizationName: "ACME Corporation",
            email: defaultEmail,
            role: "client"
        });
        user = await db.select().from(users).where(eq(users.email, defaultEmail)).get();
    }
    return user!.id;
}

export async function createTicketAction(prevState: any, formData: FormData) {
    try {
        const { env } = await getCloudflareContext();
        // @ts-ignore - env type might need casting depending on build setup
        const db = getDb(env as any);

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const priority = formData.get("priority") as "low" | "medium" | "high";

        if (!title || !description || !priority) {
            return { error: "All fields are required" };
        }

        const userId = await getOrCreateDefaultUser(db);

        await db.insert(tickets).values({
            id: randomUUID(),
            userId,
            title,
            description,
            priority,
            status: "open",
        });

        revalidatePath("/client/dashboard");
        return { success: true };
    } catch (err: any) {
        console.error("Error creating ticket:", err);
        return { error: err.message || "Failed to create ticket" };
    }
}
