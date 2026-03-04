"use client";

import { useActionState } from "react";
import { completeOnboardingAction } from "@/actions/authActions";

type Org = { id: string; name: string };

export default function OnboardingForm({
	orgs,
	defaultName,
}: {
	orgs: Org[];
	defaultName: string;
}) {
	const [state, formAction, isPending] = useActionState(completeOnboardingAction, null);

	return (
		<form action={formAction} className="flex flex-col gap-4">
			<div className="form-control">
				<label className="label" htmlFor="name">
					<span className="label-text font-medium">Your Name</span>
				</label>
				<input
					id="name"
					name="name"
					type="text"
					defaultValue={defaultName}
					required
					placeholder="Full name"
					className="input input-bordered w-full"
				/>
			</div>

			<div className="form-control">
				<label className="label" htmlFor="organizationId">
					<span className="label-text font-medium">Your Organization</span>
				</label>
				<select
					id="organizationId"
					name="organizationId"
					required
					className="select select-bordered w-full"
					defaultValue=""
				>
					<option value="" disabled>
						Select your organization…
					</option>
					{orgs.map((org) => (
						<option key={org.id} value={org.id}>
							{org.name}
						</option>
					))}
				</select>
				{orgs.length === 0 && (
					<p className="text-sm text-warning mt-2">
						No organizations available yet. Please contact support.
					</p>
				)}
			</div>

			{state?.error && (
				<div className="alert alert-error text-sm">{state.error}</div>
			)}

			<button
				type="submit"
				className="btn btn-primary w-full mt-2"
				disabled={orgs.length === 0 || isPending}
			>
				{isPending ? "Saving…" : "Complete Setup"}
			</button>
		</form>
	);
}
