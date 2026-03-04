"use client";

import { useTransition, useState } from "react";
import { updateTicketLinkAction } from "../../../actions/ticketActions";

export default function UpdateLinkInput({
    ticketId,
    initialLink
}: {
    ticketId: string;
    initialLink: string | null;
}) {
    const [isPending, startTransition] = useTransition();
    const [link, setLink] = useState(initialLink || "");

    const handleSave = () => {
        startTransition(async () => {
            await updateTicketLinkAction(ticketId, link);
        });
    };

    return (
        <div className="flex items-center gap-2">
            <input
                type="url"
                placeholder="https://helpwire..."
                className="input input-bordered input-sm w-full max-w-[200px]"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                disabled={isPending}
            />
            <button
                className="btn btn-sm btn-outline btn-primary"
                onClick={handleSave}
                disabled={isPending || link === (initialLink || "")}
            >
                {isPending ? <span className="loading loading-spinner loading-xs"></span> : "Save"}
            </button>
        </div>
    );
}
