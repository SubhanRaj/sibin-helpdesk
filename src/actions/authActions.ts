"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { route } from "@/config";

export async function completeOnboardingAction(
	_prevState: { error: string } | null,
	formData: FormData
): Promise<{ error: string } | null> {
	const { userId } = await auth();
	if (!userId) redirect(route("SIGN_IN"));

	const organizationId = formData.get("organizationId") as string;
	const name = formData.get("name") as string;

	if (!organizationId || !name) {
		return { error: "Name and organization are required." };
	}
	

	const clerkUser = await currentUser();
	const email = clerkUser?.emailAddresses.find(
		(e) => e.id === clerkUser.primaryEmailAddressId
	)?.emailAddress;

	if (!email) {
		return { error: "Could not retrieve email from Clerk." };
	}
	

	const { env } = await getCloudflareContext({ async: true });
	const db = drizzle(env.sibin_helpdesk_db);

	// Check if a pre-added user record exists for this email
	const existing = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	if (existing[0]) {
		if (existing[0].clerkUserId && existing[0].clerkUserId !== userId) {
			return { error: "This email is already linked to another account." };
		}
		// Link clerkUserId if not yet linked
		await db
			.update(users)
			.set({ clerkUserId: userId })
			.where(eq(users.id, existing[0].id));
	} else {
		// Create new D1 user record for new org user
		await db.insert(users).values({
			id: crypto.randomUUID(),
			clerkUserId: userId,
			name,
			email,
			role: "org_user",
			organizationId,
			isActive: true,
		});
	}

	redirect(route("CLIENT.DASHBOARD"));
}
