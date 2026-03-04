"use client";

import { useRef, useActionState, useEffect } from "react";
import { createTicketAction } from "../../../actions/ticketActions";

export default function NewTicketModal() {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [state, formAction, isPending] = useActionState(createTicketAction, null);

    useEffect(() => {
        if (state?.success) {
            modalRef.current?.close();
        }
    }, [state]);

    return (
        <>
            <button
                className="btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow-md shadow-indigo-500/20"
                onClick={() => modalRef.current?.showModal()}
            >
                Raise New Ticket
            </button>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Ticket</h3>
                    <p className="py-4 text-sm text-base-content/70">
                        Please provide the details of your issue below, and our support team will assist you shortly.
                    </p>

                    <form action={formAction} className="space-y-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Title</span>
                            </label>
                            <input
                                name="title"
                                type="text"
                                placeholder="Brief summary of the issue"
                                className="input input-bordered w-full rounded-xl focus:outline-1 focus:outline-indigo-500"
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Description</span>
                            </label>
                            <textarea
                                name="description"
                                className="textarea textarea-bordered h-24 w-full rounded-xl focus:outline-1 focus:outline-indigo-500"
                                placeholder="Detailed description of the problem"
                                required
                            ></textarea>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Priority</span>
                            </label>
                            <select name="priority" className="select select-bordered w-full rounded-xl focus:outline-1 focus:outline-indigo-500" defaultValue="medium">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {state?.error && (
                            <div className="text-error text-sm">{state.error}</div>
                        )}

                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => modalRef.current?.close()}
                                disabled={isPending}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow" disabled={isPending}>
                                {isPending && <span className="loading loading-spinner"></span>}
                                Submit Ticket
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button disabled={isPending}>close</button>
                </form>
            </dialog>
        </>
    );
}
