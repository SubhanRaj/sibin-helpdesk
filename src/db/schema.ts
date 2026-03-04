import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const organizations = sqliteTable('organizations', {
    id: text('id').primaryKey(), // Generate via crypto.randomUUID()
    name: text('name').notNull(),
    logoUrl: text('logo_url'),
    isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

// Users Table: Handles Sibin staff and client org users
export const users = sqliteTable('users', {
    id: text('id').primaryKey(), // Generate via crypto.randomUUID()
    clerkUserId: text('clerk_user_id').unique(), // Linked after first Clerk sign-in
    role: text('role', { enum: ['sibin_admin', 'sibin_staff', 'org_admin', 'org_user'] }).default('org_user').notNull(),
    name: text('name').notNull(),
    organizationId: text('organization_id').references(() => organizations.id), // null for sibin_admin/sibin_staff
    email: text('email').notNull().unique(),
    isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
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

// Partners Table: Dynamic OEM Partner Management
export const partners = sqliteTable('partners', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    logoUrl: text('logo_url').notNull(),
    hoverColor: text('hover_color').default('hover:text-blue-600').notNull(), // Tailwind color class
    order: integer('order').default(0).notNull(),
    isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

// Homepage Settings Table: Customize header, footer, and branding
export const homepageSettings = sqliteTable('homepage_settings', {
    id: text('id').primaryKey(),
    headerTitle: text('header_title').default('Your Trusted Partner in').notNull(),
    headerHighlight: text('header_highlight').default('IT Infrastructure').notNull(),
    headerSubtitle: text('header_subtitle').default('Official partners for Acer, HP, RDP, and Prodot. Providing seamless, scalable support for government and corporate sectors.').notNull(),
    footerText: text('footer_text').default('© 2025 Sibin Tech Solutions. All rights reserved.').notNull(),
    primaryLogoUrl: text('primary_logo_url'),
    faviconUrl: text('favicon_url'),
    isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});
