"use server";

import { revalidatePath } from "next/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "../db";
import { organizations, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function createOrganizationAction(prevState: any, formData: FormData) {
    try {
        const { env } = await getCloudflareContext();
        // @ts-ignore
        const db = getDb(env as any);

        const name = formData.get("name") as string;
        const isActive = formData.get("isActive") === "true";

        if (!name) {
            return { error: "Organization name is required" };
        }

        await db.insert(organizations).values({
            id: randomUUID(),
            name,
            isActive: isActive,
            logoUrl: null,
        });

        revalidatePath("/admin/organizations");
        return { success: true };
    } catch (err: any) {
        console.error("Error creating organization:", err);
        return { error: err.message || "Failed to create organization" };
    }
}

export async function updateOrgStatusAction(orgId: string, isActive: boolean) {
    try {
        const { env } = await getCloudflareContext();
        // @ts-ignore
        const db = getDb(env as any);

        await db.update(organizations)
            .set({ isActive })
            .where(eq(organizations.id, orgId));

        revalidatePath("/admin/organizations");
        return { success: true };
    } catch (err: any) {
        console.error("Error updating org status:", err);
        return { error: err.message || "Failed to update org status" };
    }
}

export async function createClientUserAction(prevState: any, formData: FormData) {
    try {
        const { env } = await getCloudflareContext();
        // @ts-ignore
        const db = getDb(env as any);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const organizationId = formData.get("organizationId") as string;
        const isActive = formData.get("isActive") === "true";

        if (!name || !email || !organizationId) {
            return { error: "Name, email, and organization are required" };
        }

        await db.insert(users).values({
            id: randomUUID(),
            role: "client",
            name,
            email,
            organizationId,
            isActive: isActive,
        });

        revalidatePath("/admin/clients");
        return { success: true };
    } catch (err: any) {
        console.error("Error creating client user:", err);
        return { error: err.message || "Failed to create client user" };
    }
}

export async function updateClientStatusAction(userId: string, isActive: boolean) {
    try {
        const { env } = await getCloudflareContext();
        // @ts-ignore
        const db = getDb(env as any);

        await db.update(users)
            .set({ isActive })
            .where(eq(users.id, userId));

        revalidatePath("/admin/clients");
        return { success: true };
    } catch (err: any) {
        console.error("Error updating client status:", err);
        return { error: err.message || "Failed to update client status" };
    }
}
