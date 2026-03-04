import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { homepageSettings } from "@/db/schema";

export async function GET(request: Request) {
	const fallbackUrl = new URL("/favicon.svg", request.url);

	try {
		const { env } = await getCloudflareContext({ async: true });
		const db = getDb(env as any);
		
		const settings = await db.select({ faviconUrl: homepageSettings.faviconUrl }).from(homepageSettings).get();

		if (settings?.faviconUrl) {
			try {
				const candidate = new URL(settings.faviconUrl, request.url);
				if (candidate.protocol === "http:" || candidate.protocol === "https:") {
					return Response.redirect(candidate.toString(), 302);
				}
			} catch {
			}
		}

		return Response.redirect(fallbackUrl.toString(), 302);
	} catch (err) {
		console.error("Error fetching favicon URL:", err);
		return Response.redirect(fallbackUrl.toString(), 302);
	}
}
