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
