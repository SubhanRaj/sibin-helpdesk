import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "../../../db";
import { homepageSettings } from "../../../db/schema";
import HomepageSettingsForm from "./HomepageSettingsForm";

export default async function HomepageSettingsPage() {
    const { env } = await getCloudflareContext();
    const db = getDb(env as any);

    const settings = await db.select().from(homepageSettings).all();
    const currentSettings = settings[0] || null;

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
