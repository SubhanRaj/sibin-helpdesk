"use server";

import { revalidatePath } from "next/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "../db";
import { tickets, users, organizations } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { getCurrentAppUser } from "@/lib/auth";

export async function createTicketAction(prevState: any, formData: FormData) {
    try {
        const { env } = await getCloudflareContext({ async: true });
        // @ts-ignore - env type might need casting depending on build setup
        const db = getDb(env as any);

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const priority = formData.get("priority") as "low" | "medium" | "high";

        if (!title || !description || !priority) {
            return { error: "All fields are required" };
        }

        const appUser = await getCurrentAppUser();
        if (!appUser) {
            return { error: "You must be signed in to create a ticket." };
        }

        const checkUser = await db.select({
            isActive: users.isActive,
            orgIsActive: organizations.isActive,
        })
            .from(users)
            .leftJoin(organizations, eq(users.organizationId, organizations.id))
            .where(eq(users.id, appUser.id))
            .get();

        if (!checkUser) {
            return { error: "User not found." };
        }
        if (checkUser.isActive === false) {
            return { error: "Your account is inactive and cannot create tickets." };
        }
        if (checkUser.orgIsActive === false) {
            return { error: "Your organization is currently restricted from creating tickets." };
        }

        await db.insert(tickets).values({
            id: randomUUID(),
            userId: appUser.id,
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

export async function updateTicketStatusAction(ticketId: string, status: "open" | "in-progress" | "resolved") {
    try {
        const { env } = await getCloudflareContext({ async: true });
        const db = getDb(env as any);

        await db.update(tickets)
            .set({ status, updatedAt: new Date() })
            .where(eq(tickets.id, ticketId));

        revalidatePath("/admin/dashboard");
        revalidatePath("/client/dashboard");
        return { success: true };
    } catch (err: any) {
        console.error("Error updating status:", err);
        return { error: err.message || "Failed to update status" };
    }
}

export async function updateTicketLinkAction(ticketId: string, helpwireLink: string) {
    try {
        const { env } = await getCloudflareContext({ async: true });
        const db = getDb(env as any);

        await db.update(tickets)
            .set({ helpwireLink, updatedAt: new Date() })
            .where(eq(tickets.id, ticketId));

        revalidatePath("/admin/dashboard");
        revalidatePath("/client/dashboard");
        return { success: true };
    } catch (err: any) {
        console.error("Error updating link:", err);
        return { error: err.message || "Failed to update link" };
    }
}
