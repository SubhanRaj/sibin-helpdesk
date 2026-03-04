import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

async function migrateDatabase() {
  try {
    const { env } = await getCloudflareContext();
    // @ts-ignore
    const db = env.sibin_helpdesk_db;

    if (!db) {
      throw new Error("No D1 binding found");
    }

    try { await db.exec("ALTER TABLE users ADD COLUMN organization_id text REFERENCES organizations(id)"); } catch (e) { }
    try { await db.exec("ALTER TABLE users ADD COLUMN is_active integer DEFAULT 1 NOT NULL"); } catch (e) { }

    const stmts = [
      "CREATE TABLE IF NOT EXISTS organizations (" +
      "id text PRIMARY KEY NOT NULL, " +
      "name text NOT NULL, " +
      "logo_url text, " +
      "is_active integer DEFAULT 1 NOT NULL, " +
      "created_at integer DEFAULT CURRENT_TIMESTAMP NOT NULL" +
      ");",
      "CREATE TABLE IF NOT EXISTS users (" +
      "id text PRIMARY KEY NOT NULL, " +
      "role text DEFAULT 'client' NOT NULL, " +
      "name text NOT NULL, " +
      "organization_name text, " +
      "organization_id text REFERENCES organizations(id), " +
      "email text NOT NULL, " +
      "is_active integer DEFAULT 1 NOT NULL, " +
      "created_at integer DEFAULT CURRENT_TIMESTAMP NOT NULL" +
      ");",
      "CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users (email);",
      "CREATE TABLE IF NOT EXISTS tickets (" +
      "id text PRIMARY KEY NOT NULL, " +
      "user_id text NOT NULL, " +
      "title text NOT NULL, " +
      "description text NOT NULL, " +
      "status text DEFAULT 'open' NOT NULL, " +
      "priority text DEFAULT 'medium' NOT NULL, " +
      "helpwire_link text, " +
      "created_at integer DEFAULT CURRENT_TIMESTAMP NOT NULL, " +
      "updated_at integer DEFAULT CURRENT_TIMESTAMP NOT NULL, " +
      "FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE no action ON DELETE no action" +
      ");",
      "CREATE TABLE IF NOT EXISTS partners (" +
      "id text PRIMARY KEY NOT NULL, " +
      "name text NOT NULL, " +
      "logo_url text NOT NULL, " +
      "hover_color text DEFAULT 'hover:text-blue-600' NOT NULL, " +
      "order integer DEFAULT 0 NOT NULL, " +
      "is_active integer DEFAULT 1 NOT NULL, " +
      "created_at integer DEFAULT CURRENT_TIMESTAMP NOT NULL" +
      ");",
      "CREATE TABLE IF NOT EXISTS homepage_settings (" +
      "id text PRIMARY KEY NOT NULL, " +
      "header_title text DEFAULT 'Your Trusted Partner in' NOT NULL, " +
      "header_highlight text DEFAULT 'IT Infrastructure' NOT NULL, " +
      "header_subtitle text DEFAULT 'Official partners for Acer, HP, RDP, and Prodot. Providing seamless, scalable support for government and corporate sectors.' NOT NULL, " +
      "footer_text text DEFAULT '© 2025 Sibin Tech Solutions. All rights reserved.' NOT NULL, " +
      "primary_logo_url text, " +
      "favicon_url text, " +
      "is_active integer DEFAULT 1 NOT NULL, " +
      "updated_at integer DEFAULT CURRENT_TIMESTAMP NOT NULL" +
      ");"
    ];

    for (const statement of stmts) {
      const sanitize = statement.replace(/\n/g, " ").replace(/\s+/g, " ");
      await db.exec(sanitize);
    }

    return { success: true, message: "Migration applied successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function GET() {
  try {
    const result = await migrateDatabase();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
