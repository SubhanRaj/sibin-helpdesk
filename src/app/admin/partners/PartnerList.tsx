"use client";

import { useState } from "react";
import { useActionState } from "react";
import { createPartnerAction, updatePartnerAction, deletePartnerAction } from "../../../actions/adminActions";

export default function PartnerList({ initialPartners }: any) {
    const [partners, setPartners] = useState(initialPartners || []);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Create partner
    const [createState, createAction] = useActionState(createPartnerAction, { success: false });
    
    // Update partner
    const [updateState, updateAction] = useActionState(
        (prevState: any, formData: FormData) => {
            const partnerId = formData.get("partnerId") as string;
            return updatePartnerAction(partnerId, prevState, formData);
        },
        { success: false }
    );

    const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await createAction(formData);
        if (createState.success) {
            e.currentTarget.reset();
            setShowModal(false);
        }
    };

    const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("partnerId", id);
        await updateAction(formData);
        if (updateState.success) {
            setEditingId(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this partner?")) {
            await deletePartnerAction(id);
            setPartners(partners.filter((p: any) => p.id !== id));
        }
    };

    return (
        <div className="space-y-8">
            {/* Add Partner Button */}
            <button onClick={() => setShowModal(true)} className="btn btn-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow-xl shadow-indigo-500/20">
                + Add Partner
            </button>

            {/* Add/Edit Partner Modal */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-md">
                        <h3 className="font-bold text-lg mb-4">Add New Partner</h3>
                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Partner Name</span>
                                </label>
                                <input type="text" name="name" placeholder="e.g., ACER" required className="input input-bordered w-full rounded-xl" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Logo URL</span>
                                </label>
                                <input type="url" name="logoUrl" placeholder="https://..." required className="input input-bordered w-full rounded-xl" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Hover Color (Tailwind)</span>
                                </label>
                                <input type="text" name="hoverColor" defaultValue="hover:text-blue-600" placeholder="e.g., hover:text-blue-600" className="input input-bordered w-full rounded-xl" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Display Order</span>
                                </label>
                                <input type="number" name="order" defaultValue="0" className="input input-bordered w-full rounded-xl" />
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-3">
                                    <input type="checkbox" name="isActive" value="true" defaultChecked className="checkbox checkbox-primary" />
                                    <span className="label-text font-medium">Active</span>
                                </label>
                            </div>

                            {createState.error && (
                                <div className="alert alert-error text-sm">
                                    {createState.error}
                                </div>
                            )}

                            <div className="modal-action gap-2">
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Add Partner
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
                </div>
            )}

            {/* Edit Partner Modals */}
            {editingId && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-md">
                        <h3 className="font-bold text-lg mb-4">Edit Partner</h3>
                        <form onSubmit={(e) => handleUpdateSubmit(e, editingId)} className="space-y-4">
                            {partners.map((p: any) =>
                                p.id === editingId ? (
                                    <div key={p.id}>
                                        <div>
                                            <label className="label">
                                                <span className="label-text font-medium">Partner Name</span>
                                            </label>
                                            <input type="text" name="name" defaultValue={p.name} required className="input input-bordered w-full rounded-xl" />
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="label-text font-medium">Logo URL</span>
                                            </label>
                                            <input type="url" name="logoUrl" defaultValue={p.logoUrl} required className="input input-bordered w-full rounded-xl" />
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="label-text font-medium">Hover Color (Tailwind)</span>
                                            </label>
                                            <input type="text" name="hoverColor" defaultValue={p.hoverColor} className="input input-bordered w-full rounded-xl" />
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="label-text font-medium">Display Order</span>
                                            </label>
                                            <input type="number" name="order" defaultValue={p.order} className="input input-bordered w-full rounded-xl" />
                                        </div>
                                        <div className="form-control">
                                            <label className="label cursor-pointer justify-start gap-3">
                                                <input type="checkbox" name="isActive" value="true" defaultChecked={p.isActive} className="checkbox checkbox-primary" />
                                                <span className="label-text font-medium">Active</span>
                                            </label>
                                        </div>

                                        {updateState.error && (
                                            <div className="alert alert-error text-sm">
                                                {updateState.error}
                                            </div>
                                        )}

                                        <div className="modal-action gap-2">
                                            <button type="button" onClick={() => setEditingId(null)} className="btn btn-ghost">
                                                Cancel
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                Update Partner
                                            </button>
                                        </div>
                                    </div>
                                ) : null
                            )}
                        </form>
                    </div>
                    <div className="modal-backdrop" onClick={() => setEditingId(null)}></div>
                </div>
            )}

            {/* Partners Table */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body p-0">
                    <div className="overflow-x-auto overflow-hidden rounded-2xl">
                        <table className="table table-zebra table-sm md:table-md w-full [&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4">
                            <thead className="bg-base-200/50 text-base-content">
                                <tr>
                                    <th>Partner Name</th>
                                    <th>Logo</th>
                                    <th>Order</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partners.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-base-content/50">
                                            No partners yet. Add one to get started!
                                        </td>
                                    </tr>
                                ) : (
                                    partners.map((partner: any) => (
                                        <tr key={partner.id}>
                                            <td className="font-medium">{partner.name}</td>
                                            <td>
                                                <img src={partner.logoUrl} alt={partner.name} className="h-10 w-auto object-contain" />
                                            </td>
                                            <td>{partner.order}</td>
                                            <td>
                                                <span className={`badge ${partner.isActive ? "badge-success" : "badge-ghost"}`}>
                                                    {partner.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="flex gap-2">
                                                <button
                                                    onClick={() => setEditingId(partner.id)}
                                                    className="btn btn-xs btn-ghost hover:bg-primary/10"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(partner.id)}
                                                    className="btn btn-xs btn-ghost hover:bg-error/10 text-error"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
