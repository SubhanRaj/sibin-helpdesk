"use client";

import { useTransition } from "react";
import { updateTicketStatusAction } from "../../../actions/ticketActions";

export default function UpdateStatusSelect({
    ticketId,
    initialStatus
}: {
    ticketId: string;
    initialStatus: "open" | "in-progress" | "resolved";
}) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as "open" | "in-progress" | "resolved";
        startTransition(async () => {
            await updateTicketStatusAction(ticketId, newStatus);
        });
    };

    return (
        <div className="flex items-center gap-2">
            <select
                className="select select-bordered select-sm w-full max-w-[150px]"
                defaultValue={initialStatus}
                onChange={handleChange}
                disabled={isPending}
            >
                <option value="open">Open</option>
                <option value="in-progress">In-Progress</option>
                <option value="resolved">Resolved</option>
            </select>
            {isPending && <span className="loading loading-spinner loading-sm text-primary"></span>}
        </div>
    );
}
