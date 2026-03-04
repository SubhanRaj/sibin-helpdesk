import NewTicketModal from "./NewTicketModal";

export default function ClientDashboardPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Stats Row */}
            <div className="stats shadow w-full bg-base-100">
                <div className="stat">
                    <div className="stat-title border-b border-base-200 pb-2 mb-2 font-semibold">Open Tickets</div>
                    <div className="stat-value text-3xl">3</div>
                </div>

                <div className="stat border-l border-base-200">
                    <div className="stat-title border-b border-base-200 pb-2 mb-2 font-semibold">In Progress</div>
                    <div className="stat-value text-3xl">1</div>
                </div>

                <div className="stat border-l border-base-200">
                    <div className="stat-title border-b border-base-200 pb-2 mb-2 font-semibold">Resolved</div>
                    <div className="stat-value text-3xl">12</div>
                </div>
            </div>

            {/* Main Action Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold">My Support Tickets</h1>
                <NewTicketModal />
            </div>

            {/* Tickets Table */}
            <div className="card bg-base-100 shadow-sm border border-base-200">
                <div className="card-body p-0">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
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
                                {/* row 1 */}
                                <tr>
                                    <td className="whitespace-nowrap">Oct 24, 2023</td>
                                    <td className="font-medium">Cannot access email server</td>
                                    <td>
                                        <span className="badge badge-error badge-sm">High</span>
                                    </td>
                                    <td>
                                        <span className="badge badge-primary badge-sm">In-Progress</span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-primary">Join Session</button>
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <td className="whitespace-nowrap">Oct 23, 2023</td>
                                    <td className="font-medium">Printer not found on network</td>
                                    <td>
                                        <span className="badge badge-warning badge-sm">Medium</span>
                                    </td>
                                    <td>
                                        <span className="badge badge-error badge-sm">Open</span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-ghost" disabled>View/Join</button>
                                    </td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <td className="whitespace-nowrap">Oct 21, 2023</td>
                                    <td className="font-medium">Install new specialized software</td>
                                    <td>
                                        <span className="badge badge-info badge-sm">Low</span>
                                    </td>
                                    <td>
                                        <span className="badge badge-success badge-sm">Resolved</span>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-ghost" disabled>View/Join</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
