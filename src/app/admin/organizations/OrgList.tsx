"use client";

import { useActionState, useEffect, useRef } from "react";
import { createOrganizationAction, updateOrgStatusAction } from "@/actions/adminActions";

export default function OrgList({ organizations }: { organizations: any[] }) {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [state, formAction, isPending] = useActionState(createOrganizationAction, null);

    useEffect(() => {
        if (state?.success) {
            modalRef.current?.close();
        }
    }, [state]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-base-content/80">All Organizations</h2>
                <button className="btn btn-primary" onClick={() => modalRef.current?.showModal()}>
                    ➕ Add Organization
                </button>
            </div>

            {/* Organizations Table */}
            <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-box shadow">
                <table className="table">
                    <thead>
                        <tr className="bg-base-200/50">
                            <th>Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {organizations.map((org) => (
                            <tr key={org.id} className="hover">
                                <td>{org.name}</td>
                                <td>
                                    <div className="badge badge-outline gap-2">
                                        <span className={`w-2 h-2 rounded-full ${org.isActive ? 'bg-success' : 'bg-error'}`}></span>
                                        {org.isActive ? "Active" : "Restricted"}
                                    </div>
                                </td>
                                <td>
                                    <button
                                        onClick={() => updateOrgStatusAction(org.id, !org.isActive)}
                                        className={`btn btn-sm ${org.isActive ? "btn-error btn-outline" : "btn-success"}`}
                                    >
                                        {org.isActive ? "Restrict" : "Activate"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {organizations.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center py-4 text-base-content/60">
                                    No organizations found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Org Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Add New Organization</h3>
                    <form action={formAction}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Organization Name</span>
                            </label>
                            <input type="text" name="name" className="input input-bordered" required placeholder="e.g. Acme Corp" />
                        </div>
                        <div className="form-control mb-6">
                            <label className="label cursor-pointer justify-start gap-4">
                                <span className="label-text">Active Status</span>
                                <input type="checkbox" name="isActive" value="true" className="toggle toggle-success" defaultChecked />
                            </label>
                        </div>
                        {state?.error && (
                            <div className="alert alert-error mb-4 rounded-box text-sm py-2">
                                {state.error}
                            </div>
                        )}
                        <div className="modal-action">
                            <button type="button" className="btn btn-ghost" onClick={() => modalRef.current?.close()}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={isPending}>
                                {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
