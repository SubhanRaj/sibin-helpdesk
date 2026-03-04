import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { homepageSettings } from "@/db/schema";

export async function GET() {
	try {
		const { env } = await getCloudflareContext();
		const db = getDb(env as any);
		
		const settings = await db.select({ faviconUrl: homepageSettings.faviconUrl }).from(homepageSettings).get();
		
		const faviconUrl = settings?.faviconUrl || "/favicon.svg";
		
		return Response.json({ faviconUrl });
	} catch (err) {
		console.error("Error fetching favicon URL:", err);
		return Response.json({ faviconUrl: "/favicon.svg" });
	}
}
