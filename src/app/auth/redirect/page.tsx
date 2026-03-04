import { redirect } from "next/navigation";
import { getCurrentAppUser, isSibinRole } from "@/lib/auth";
import { route } from "@/config";

/**
 * Post-login redirect page.
 * Clerk redirects here after sign-in (/auth/redirect).
 * We look up the user in D1 to determine their role, then redirect appropriately.
 */
export default async function AuthRedirectPage() {
	const appUser = await getCurrentAppUser();

	if (!appUser) {
		// No D1 record — send to onboarding to pick an org
		redirect(route("ONBOARDING"));
	}

	if (isSibinRole(appUser.role!)) {
		redirect(route("ADMIN.DASHBOARD"));
	}

	redirect(route("CLIENT.DASHBOARD"));
}
