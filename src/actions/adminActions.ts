"use server";

import { revalidatePath } from "next/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "../db";
import { organizations, users, partners, homepageSettings } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function createOrganizationAction(prevState: any, formData: FormData) {
    try {
        const { env } = await getCloudflareContext({ async: true });
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
        const { env } = await getCloudflareContext({ async: true });
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
        const { env } = await getCloudflareContext({ async: true });
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
            role: "org_user",
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
        const { env } = await getCloudflareContext({ async: true });
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

// ========== PARTNER MANAGEMENT ==========

export async function createPartnerAction(prevState: any, formData: FormData) {
    try {
        const { env } = await getCloudflareContext({ async: true });
        // @ts-ignore
        const db = getDb(env as any);

        const name = formData.get("name") as string;
        const logoUrl = formData.get("logoUrl") as string;
        const hoverColor = formData.get("hoverColor") as string;
        const order = parseInt(formData.get("order") as string) || 0;
        const isActive = formData.get("isActive") === "true";

        if (!name || !logoUrl) {
            return { error: "Partner name and logo URL are required" };
        }

        await db.insert(partners).values({
            id: randomUUID(),
            name,
            logoUrl,
            hoverColor,
            order,
            isActive,
        });

        revalidatePath("/admin/partners");
        revalidatePath("/");
        return { success: true };
    } catch (err: any) {
        console.error("Error creating partner:", err);
        return { error: err.message || "Failed to create partner" };
    }
}

export async function updatePartnerAction(partnerId: string, prevState: any, formData: FormData) {
    try {
        const { env } = await getCloudflareContext({ async: true });
        // @ts-ignore
        const db = getDb(env as any);

        const name = formData.get("name") as string;
        const logoUrl = formData.get("logoUrl") as string;
        const hoverColor = formData.get("hoverColor") as string;
        const order = parseInt(formData.get("order") as string) || 0;
        const isActive = formData.get("isActive") === "true";

        if (!name || !logoUrl) {
            return { error: "Partner name and logo URL are required" };
        }

        await db.update(partners)
            .set({ name, logoUrl, hoverColor, order, isActive })
            .where(eq(partners.id, partnerId));

        revalidatePath("/admin/partners");
        revalidatePath("/");
        return { success: true };
    } catch (err: any) {
        console.error("Error updating partner:", err);
        return { error: err.message || "Failed to update partner" };
    }
}

export async function deletePartnerAction(partnerId: string) {
    try {
        const { env } = await getCloudflareContext({ async: true });
        // @ts-ignore
        const db = getDb(env as any);

        await db.delete(partners).where(eq(partners.id, partnerId));

        revalidatePath("/admin/partners");
        revalidatePath("/");
        return { success: true };
    } catch (err: any) {
        console.error("Error deleting partner:", err);
        return { error: err.message || "Failed to delete partner" };
    }
}

// ========== HOMEPAGE SETTINGS MANAGEMENT ==========

export async function updateHomepageSettingsAction(prevState: any, formData: FormData) {
    try {
        const { env } = await getCloudflareContext({ async: true });
        // @ts-ignore
        const db = getDb(env as any);

        const headerTitle = formData.get("headerTitle") as string;
        const headerHighlight = formData.get("headerHighlight") as string;
        const headerSubtitle = formData.get("headerSubtitle") as string;
        const footerText = formData.get("footerText") as string;
        const primaryLogoUrl = formData.get("primaryLogoUrl") as string;
        const faviconUrl = formData.get("faviconUrl") as string;

        // Get or create settings record
        const existing = await db.select().from(homepageSettings).all();
        
        if (existing.length === 0) {
            await db.insert(homepageSettings).values({
                id: randomUUID(),
                headerTitle,
                headerHighlight,
                headerSubtitle,
                footerText,
                primaryLogoUrl,
                faviconUrl,
                isActive: true,
            });
        } else {
            await db.update(homepageSettings)
                .set({
                    headerTitle,
                    headerHighlight,
                    headerSubtitle,
                    footerText,
                    primaryLogoUrl,
                    faviconUrl,
                })
                .where(eq(homepageSettings.id, existing[0].id));
        }

        revalidatePath("/admin/homepage-settings");
        revalidatePath("/");
        return { success: true };
    } catch (err: any) {
        console.error("Error updating homepage settings:", err);
        return { error: err.message || "Failed to update homepage settings" };
    }
}
