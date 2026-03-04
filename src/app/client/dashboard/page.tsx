import { Metadata } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "../../../db";
import { tickets, users } from "../../../db/schema";
import { eq, desc } from "drizzle-orm";
import NewTicketModal from "./NewTicketModal";

export const metadata: Metadata = {
	title: "Client Dashboard",
	description: "View and manage your support tickets",
};

// Helper to get or create the default user for the MVP
async function getDefaultUserId(db: any) {
    const defaultEmail = "client@acme.corp";
    let user = await db.select().from(users).where(eq(users.email, defaultEmail)).get();
    return user?.id; // If undefined, there are no tickets yet anyway
}

export default async function ClientDashboardPage() {
    const { env } = await getCloudflareContext({ async: true });
    const db = getDb(env as any);

    const userId = await getDefaultUserId(db);

    let userTickets: any[] = [];
    if (userId) {
        userTickets = await db.select()
            .from(tickets)
            .where(eq(tickets.userId, userId))
            .orderBy(desc(tickets.createdAt))
            .all();
    }

    const openCount = userTickets.filter((t) => t.status === "open").length;
    const inProgressCount = userTickets.filter((t) => t.status === "in-progress").length;
    const resolvedCount = userTickets.filter((t) => t.status === "resolved").length;

    return (
        <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Row */}
            <div className="stats shadow-xl w-full bg-base-100 border border-base-200">
                <div className="stat">
                    <div className="stat-title border-b border-base-200 pb-2 mb-2 font-semibold">Open Tickets</div>
                    <div className="stat-value text-3xl">{openCount}</div>
                </div>

                <div className="stat border-l border-base-200">
                    <div className="stat-title border-b border-base-200 pb-2 mb-2 font-semibold">In Progress</div>
                    <div className="stat-value text-3xl">{inProgressCount}</div>
                </div>

                <div className="stat border-l border-base-200">
                    <div className="stat-title border-b border-base-200 pb-2 mb-2 font-semibold">Resolved</div>
                    <div className="stat-value text-3xl">{resolvedCount}</div>
                </div>
            </div>

            {/* Main Action Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold">My Support Tickets</h1>
                <NewTicketModal />
            </div>

            {/* Tickets Table */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body p-0">
                    <div className="overflow-x-auto overflow-hidden rounded-2xl">
                        <table className="table table-zebra w-full [&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4">
                            {/* head */}
                            <thead className="bg-base-200/50 text-base-content">
                                <tr>
                                    <th>Date</th>
                                    <th>Issue Title</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userTickets.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-8 text-base-content/60">
                                            No tickets found. Click &quot;Raise New Ticket&quot; to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    userTickets.map((ticket) => (
                                        <tr key={ticket.id}>
                                            <td className="whitespace-nowrap">
                                                {new Date(ticket.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="font-medium">{ticket.title}</td>
                                            <td>
                                                <span className={`badge badge-sm ${ticket.priority === 'high' ? 'badge-error' :
                                                    ticket.priority === 'medium' ? 'badge-warning' : 'badge-info'
                                                    }`}>
                                                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge badge-sm ${ticket.status === 'open' ? 'badge-error' :
                                                    ticket.status === 'in-progress' ? 'badge-primary' : 'badge-success'
                                                    }`}>
                                                    {ticket.status === 'in-progress' ? 'In-Progress' :
                                                        ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                                </span>
                                            </td>
                                            <td>
                                                {ticket.helpwireLink ? (
                                                    <a href={ticket.helpwireLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow-md">
                                                        Join Session
                                                    </a>
                                                ) : (
                                                    <button className="btn btn-sm btn-ghost" disabled>View/Join</button>
                                                )}
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
