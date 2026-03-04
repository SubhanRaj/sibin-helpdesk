import { Metadata } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "../../../db";
import { homepageSettings } from "../../../db/schema";
import HomepageSettingsForm from "./HomepageSettingsForm";

export const metadata: Metadata = {
	title: "Homepage Settings",
	description: "Customize your homepage header, footer, branding, and more",
};

async function fetchSettings() {
    try {
        const { env } = await getCloudflareContext({ async: true });
        const db = getDb(env as any);
        const settings = await db.select().from(homepageSettings).all();
        return settings[0] || null;
    } catch (err) {
        console.log("Error fetching settings:", err);
        return null;
    }
}

export default async function HomepageSettingsPage() {
    const currentSettings = await fetchSettings();

    return (
        <div className="space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Homepage Customization</h1>
                <p className="text-base-content/70 mt-1">Customize your homepage header, footer, branding, and more.</p>
            </div>

            {/* Settings Form */}
            <HomepageSettingsForm currentSettings={currentSettings} />
        </div>
    );
}
