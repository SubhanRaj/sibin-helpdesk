# Sibin Tech Solutions Support Desk - AI Developer Blueprint

## Project Overview
A fast, serverless IT support ticket tracking platform for Sibin Tech Solutions. This system allows our government and corporate clients to raise IT service requests, while providing our team with an admin dashboard to track statuses and provide remote support links (e.g., Helpwire).

**Core Objective:** Build a lightweight, functional Minimum Viable Product (MVP) staying strictly within the Cloudflare ecosystem (Free Tier).

## Architecture & Tech Stack
* **Framework:** Next.js 14+ (Strictly using the **App Router**).
* **Deployment:** Cloudflare Workers (using the `@opennextjs/cloudflare` adapter).
* **Database:** Cloudflare D1 (Serverless SQLite).
* **ORM:** Drizzle ORM.
* **Styling:** Tailwind CSS + **daisyUI** component library.

## Route Organization (App Router)
Use semantic Next.js routing patterns:
* `app/page.tsx` - Public landing page and login interface.
* `app/client/dashboard/page.tsx` - Client view to see their active/past tickets and submit new ones.
* `app/admin/dashboard/page.tsx` - Internal admin view for managing all client tickets.

## UI & Styling Guidelines
* **Component Library:** Use **daisyUI** for all interactive components (buttons, modals, tables, forms, badges). Do not write raw Tailwind utility classes for complex components if a semantic daisyUI class exists.
* **Design Language:** Professional, clean, and enterprise-grade. Prioritize readability and data density for the admin tables.
* **Client vs. Server Components:** Use `"use client"` *only* at the leaf nodes of the component tree (e.g., inside a specific form component or interactive toggle). Keep layouts, pages, and data-fetching wrappers as Server Components.

## Database Schema (Drizzle ORM for Cloudflare D1)
The database must use Drizzle ORM configured for Cloudflare D1. Create `src/db/schema.ts` exactly as follows:

```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users Table: Handles both Admins and Clients
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // Generate via crypto.randomUUID()
  role: text('role', { enum: ['admin', 'client'] }).default('client').notNull(),
  name: text('name').notNull(),
  organizationName: text('organization_name').notNull(), // e.g., Excise Department of UP
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Tickets Table: The core support desk entity
export const tickets = sqliteTable('tickets', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .references(() => users.id)
    .notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status', { enum: ['open', 'in-progress', 'resolved'] })
    .default('open')
    .notNull(),
  priority: text('priority', { enum: ['low', 'medium', 'high'] })
    .default('medium')
    .notNull(),
  helpwireLink: text('helpwire_link'), // Optional link for remote support sessions
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
```

## AI Agent Directives (Strict Rules)
1.  **No External State Managers:** Do not use Redux, Zustand, or Jotai. Use standard React hooks (`useState`, `useActionState`) or URL search parameters for state.
2.  **Data Fetching:** Fetch data server-side within Server Components directly using Drizzle ORM. Do not use `useEffect` for initial data fetching.
3.  **Database Mutations:** Use Next.js **Server Actions** for all database mutations (e.g., creating a new ticket, updating a status). Do not create standalone API route handlers for standard form submissions.
4.  **Cloudflare Constraints & Database Binding:** Ensure all server-side code is compatible with the Cloudflare Workers edge runtime. Avoid Node-specific APIs (like `fs` or `child_process`). **Crucial Note:** The Cloudflare D1 binding name in `wrangler.jsonc` is `sibin_helpdesk_db`. Ensure all Drizzle database connection logic uses `env.sibin_helpdesk_db` (not `env.DB`).
5.  **Version Control Workflow:** Initialize a Git repository. Make atomic, well-described commits after completing every major step or feature (e.g., `feat: setup Cloudflare D1 schema`).
6.  **Incremental Development:** Execute tasks in logical phases and ask for approval before moving on. 
    * **Phase 1:** Install dependencies (Drizzle, daisyUI) and configure Drizzle for D1.
    * **Phase 2:** Generate the Drizzle schema files and local database migrations.
    * **Phase 3:** Build the UI layouts (Navbar, Sidebar) using daisyUI.
    * **Phase 4:** Build the Client Ticket Submission form with Server Actions.
    * **Phase 5:** Build the Admin Dashboard table with status update capabilities.