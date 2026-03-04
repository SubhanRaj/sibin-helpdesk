"use client";

import { useActionState } from "react";
import { updateHomepageSettingsAction } from "../../../actions/adminActions";

export default function HomepageSettingsForm({ currentSettings }: any) {
    const [state, formAction] = useActionState(updateHomepageSettingsAction, { success: false });

    return (
        <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
                <h2 className="card-title mb-6">Customize Homepage Content</h2>

                <form action={formAction} className="space-y-6">
                    {/* Header Section */}
                    <div className="divider font-semibold">Header Section</div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Header Title</span>
                        </label>
                        <input
                            type="text"
                            name="headerTitle"
                            defaultValue={currentSettings?.headerTitle || "Your Trusted Partner in"}
                            placeholder="e.g., Your Trusted Partner in"
                            className="input input-bordered w-full rounded-xl"
                        />
                        <label className="label">
                            <span className="label-text-alt text-xs text-base-content/50">This appears before the main highlight</span>
                        </label>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Header Highlight (Main Text)</span>
                        </label>
                        <input
                            type="text"
                            name="headerHighlight"
                            defaultValue={currentSettings?.headerHighlight || "IT Infrastructure"}
                            placeholder="e.g., IT Infrastructure"
                            className="input input-bordered w-full rounded-xl"
                        />
                        <label className="label">
                            <span className="label-text-alt text-xs text-base-content/50">This is the main headline with gradient color</span>
                        </label>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Header Subtitle</span>
                        </label>
                        <textarea
                            name="headerSubtitle"
                            defaultValue={
                                currentSettings?.headerSubtitle ||
                                "Official partners for Acer, HP, RDP, and Prodot. Providing seamless, scalable support for government and corporate sectors."
                            }
                            placeholder="Enter your subtitle..."
                            className="textarea textarea-bordered w-full rounded-xl h-24"
                        />
                    </div>

                    {/* Branding Section */}
                    <div className="divider font-semibold">Branding</div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Primary Logo URL</span>
                        </label>
                        <input
                            type="url"
                            name="primaryLogoUrl"
                            defaultValue={currentSettings?.primaryLogoUrl || ""}
                            placeholder="https://..."
                            className="input input-bordered w-full rounded-xl"
                        />
                        <label className="label">
                            <span className="label-text-alt text-xs text-base-content/50">Logo displayed in navbar</span>
                        </label>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Favicon URL</span>
                        </label>
                        <input
                            type="url"
                            name="faviconUrl"
                            defaultValue={currentSettings?.faviconUrl || ""}
                            placeholder="https://..."
                            className="input input-bordered w-full rounded-xl"
                        />
                        <label className="label">
                            <span className="label-text-alt text-xs text-base-content/50">Browser tab icon (16x16 or 32x32 px)</span>
                        </label>
                    </div>

                    {/* Footer Section */}
                    <div className="divider font-semibold">Footer</div>

                    <div>
                        <label className="label">
                            <span className="label-text font-semibold">Footer Text</span>
                        </label>
                        <textarea
                            name="footerText"
                            defaultValue={currentSettings?.footerText || "© 2025 Sibin Tech Solutions. All rights reserved."}
                            placeholder="Enter footer text..."
                            className="textarea textarea-bordered w-full rounded-xl h-16"
                        />
                    </div>

                    {/* Preview Section */}
                    <div className="divider font-semibold">Preview</div>
                    <div className="bg-base-200/30 border border-base-200 rounded-2xl p-6 space-y-4">
                        <div>
                            <p className="text-xs font-semibold text-base-content/50 uppercase">Header Preview</p>
                            <p className="text-base-content/70 mt-1">
                                <span className="text-base-content/60">{state.headerTitle || "Your Trusted Partner in"}</span>
                                <br />
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                                    {state.headerHighlight || "IT Infrastructure"}
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-base-content/50 uppercase">Footer Preview</p>
                            <p className="text-sm text-base-content/70 mt-1">{state.footerText || "© 2025 Sibin Tech Solutions. All rights reserved."}</p>
                        </div>
                    </div>

                    {/* Submit */}
                    {state.error && (
                        <div className="alert alert-error text-sm">
                            {state.error}
                        </div>
                    )}

                    {state.success && (
                        <div className="alert alert-success text-sm">
                            Homepage settings updated successfully!
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="btn btn-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow-xl shadow-indigo-500/20">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
