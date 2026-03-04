import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "../../../db";
import { tickets, users } from "../../../db/schema";
import { desc, eq } from "drizzle-orm";
import UpdateStatusSelect from "./UpdateStatusSelect";
import UpdateLinkInput from "./UpdateLinkInput";

export default async function AdminDashboardPage() {
    const { env } = await getCloudflareContext();
    const db = getDb(env as any);

    // Fetch all tickets with user information
    const allTickets = await db.select({
        ticket: tickets,
        user: users,
    })
        .from(tickets)
        .innerJoin(users, eq(tickets.userId, users.id))
        .orderBy(desc(tickets.createdAt))
        .all();

    const openCount = allTickets.filter((t) => t.ticket.status === "open").length;
    const inProgressCount = allTickets.filter((t) => t.ticket.status === "in-progress").length;
    const resolvedCount = allTickets.filter((t) => t.ticket.status === "resolved").length;

    return (
        <div className="space-y-8 max-w-[95%] mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Admin Support Dashboard</h1>
                <p className="text-base-content/70 mt-1">Manage and assign remote support links for all client tickets.</p>
            </div>

            {/* Stats Row */}
            <div className="stats shadow w-full bg-base-100">
                <div className="stat">
                    <div className="stat-title border-b border-base-200 pb-2 mb-2 font-semibold">Total Open</div>
                    <div className="stat-value text-3xl text-error">{openCount}</div>
                </div>

                <div className="stat border-l border-base-200">
                    <div className="stat-title border-b border-base-200 pb-2 mb-2 font-semibold">In Progress</div>
                    <div className="stat-value text-3xl text-primary">{inProgressCount}</div>
                </div>

                <div className="stat border-l border-base-200">
                    <div className="stat-title border-b border-base-200 pb-2 mb-2 font-semibold">Total Resolved</div>
                    <div className="stat-value text-3xl text-success">{resolvedCount}</div>
                </div>
            </div>

            {/* Tickets Table */}
            <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra table-sm md:table-md w-full">
                            {/* head */}
                            <thead className="bg-base-200/50 text-base-content">
                                <tr>
                                    <th>Client & Org</th>
                                    <th>Issue Title</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Remote Support Link (Helpwire)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTickets.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-base-content/60">
                                            No active tickets in the system.
                                        </td>
                                    </tr>
                                ) : (
                                    allTickets.map(({ ticket, user }) => (
                                        <tr key={ticket.id}>
                                            <td>
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-xs opacity-60">{user.organizationName}</div>
                                            </td>
                                            <td>
                                                <div className="font-medium">{ticket.title}</div>
                                                <div className="text-xs opacity-60 text-ellipsis overflow-hidden whitespace-nowrap max-w-[15rem]">
                                                    {ticket.description}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge badge-sm ${ticket.priority === 'high' ? 'badge-error' :
                                                        ticket.priority === 'medium' ? 'badge-warning' : 'badge-info'
                                                    }`}>
                                                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                                                </span>
                                            </td>
                                            <td>
                                                <UpdateStatusSelect ticketId={ticket.id} initialStatus={ticket.status as "open" | "in-progress" | "resolved"} />
                                            </td>
                                            <td>
                                                <UpdateLinkInput ticketId={ticket.id} initialLink={ticket.helpwireLink} />
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
