import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { organizations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentAppUser } from "@/lib/auth";
import { route, APP_CONFIG } from "@/config";
import OnboardingForm from "./OnboardingForm";

export default async function OnboardingPage() {
	// If already has a D1 record, redirect to the right dashboard
	const appUser = await getCurrentAppUser();
	if (appUser) {
		redirect(route("AUTH_REDIRECT"));
	}

	const clerkUser = await currentUser();
	if (!clerkUser) redirect(route("SIGN_IN"));

	const { env } = await getCloudflareContext({ async: true });
	const db = drizzle(env.sibin_helpdesk_db);

	const activeOrgs = await db
		.select({ id: organizations.id, name: organizations.name })
		.from(organizations)
		.where(eq(organizations.isActive, true));

	const displayName = clerkUser.fullName ?? clerkUser.username ?? "";

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-100">
			<div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-200">
				<div className="card-body gap-6">
					<div>
						<h1 className="text-2xl font-bold">{APP_CONFIG.APP_NAME}</h1>
						<p className="text-base-content/60 mt-1">
							Almost there! Tell us a bit about yourself.
						</p>
					</div>
					<OnboardingForm orgs={activeOrgs} defaultName={displayName} />
				</div>
			</div>
		</div>
	);
}
