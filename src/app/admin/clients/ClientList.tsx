"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createClientUserAction, updateClientStatusAction } from "@/actions/adminActions";

export default function ClientList({ clients, organizations }: { clients: any[], organizations: any[] }) {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [state, formAction, isPending] = useActionState(createClientUserAction, null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (state?.success) {
            modalRef.current?.close();
        }
    }, [state]);

    const filteredClients = clients.filter(client => {
        if (!searchQuery) return true;
        const orgName = client.organizationName?.toLowerCase() || "";
        const clientName = client.name?.toLowerCase() || "";
        const email = client.email?.toLowerCase() || "";
        const lowerQuery = searchQuery.toLowerCase();
        return orgName.includes(lowerQuery) || clientName.includes(lowerQuery) || email.includes(lowerQuery);
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search by Org or Name..."
                    className="input input-bordered w-full max-w-xs rounded-xl focus:ring-2 focus:ring-indigo-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow-md shadow-indigo-500/20 ml-4" onClick={() => modalRef.current?.showModal()}>
                    ➕ Add Client
                </button>
            </div>

            {/* Clients Table */}
            <div className="overflow-x-auto overflow-hidden rounded-2xl bg-base-100 border border-base-200 shadow-xl">
                <table className="table table-zebra w-full [&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4">
                    <thead>
                        <tr className="bg-base-200/50">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Organization</th>
                            <th>Onboarding Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map((client) => (
                            <tr key={client.id} className="hover">
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.organizationName || <span className="text-error">Unknown</span>}</td>
                                <td>
                                    <div className="badge badge-outline gap-2">
                                        <span className={`w-2 h-2 rounded-full ${client.isActive ? 'bg-success' : 'bg-error'}`}></span>
                                        {client.isActive ? "Active" : "Restricted"}
                                    </div>
                                </td>
                                <td>
                                    <button
                                        onClick={() => updateClientStatusAction(client.id, !client.isActive)}
                                        className={`btn btn-sm ${client.isActive ? "btn-error btn-outline" : "btn-success"}`}
                                    >
                                        {client.isActive ? "Restrict Login" : "Allow Login"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredClients.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-base-content/60">
                                    No client users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Client Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Onboard New Client User</h3>
                    <form action={formAction}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" name="name" className="input input-bordered rounded-xl focus:ring-2 focus:ring-indigo-500" required placeholder="John Doe" />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <input type="email" name="email" className="input input-bordered rounded-xl focus:ring-2 focus:ring-indigo-500" required placeholder="john@example.com" />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Organization</span>
                            </label>
                            <select name="organizationId" className="select select-bordered w-full rounded-xl focus:ring-2 focus:ring-indigo-500" required defaultValue="">
                                <option value="" disabled>Select an Organization</option>
                                {organizations.map(org => (
                                    <option key={org.id} value={org.id}>{org.name}</option>
                                ))}
                            </select>
                            {organizations.length === 0 && (
                                <label className="label">
                                    <span className="label-text-alt text-error">Please create an Organization first.</span>
                                </label>
                            )}
                        </div>
                        <div className="form-control mb-6">
                            <label className="label cursor-pointer justify-start gap-4">
                                <span className="label-text">Allow Login Output (Active)</span>
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
                            <button type="submit" className="btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow" disabled={isPending || organizations.length === 0}>
                                {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Add Client"}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
