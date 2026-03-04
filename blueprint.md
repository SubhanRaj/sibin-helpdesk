# Sibin Tech Solutions Support Desk - AI Developer Blueprint

## Project Overview
A fast, serverless IT support ticket tracking platform for Sibin Tech Solutions. This system allows government and corporate clients to raise IT service requests, while providing the admin team with a dashboard to track statuses and provide remote support links (e.g., Helpwire).

**Production URL**: https://sibin-helpdesk.shubhanraj2002.workers.dev

## Architecture & Tech Stack
* **Framework:** Next.js 16 (App Router, Turbopack)
* **Deployment:** Cloudflare Workers via `@opennextjs/cloudflare` v1.17.1
* **Database:** Cloudflare D1 (Serverless SQLite) — binding name: `sibin_helpdesk_db`
* **ORM:** Drizzle ORM
* **Styling:** Tailwind CSS v4 + DaisyUI v5
* **Language:** TypeScript

## Route Organization (App Router)
* `app/page.tsx` — Public landing page (partners + homepage settings from DB)
* `app/client/dashboard/page.tsx` — Client ticket view and submission
* `app/admin/dashboard/page.tsx` — Admin ticket management
* `app/admin/organizations/page.tsx` — Organization CRUD
* `app/admin/clients/page.tsx` — Client user management
* `app/admin/partners/page.tsx` — OEM partner CRUD
* `app/admin/homepage-settings/page.tsx` — Customize landing page content
* `app/api/migrate/route.ts` — One-time DB table creation endpoint
* `app/api/favicon/route.ts` — Dynamic favicon redirect from DB

## Configuration System (`src/config/`)
All global constants and route paths live here. Import via `@/config`.
* **`constants.ts`** — `APP_CONFIG` object (app name, branding, enums)
* **`routes.ts`** — `ROUTES` object + `route("ADMIN.DASHBOARD")` helper
* **`index.ts`** — Central re-exports

Never hardcode route paths in components. Always use `route()` from `@/config`.

## Database Schema
```typescript
// organizations — top-level clients
// users — admin and client accounts (linked to org)
// tickets — support requests
// partners — OEM partners shown on landing page
// homepage_settings — dynamic landing page content (header, footer, favicon)
```
Tables are created by hitting `GET /api/migrate` once after deployment.
**Important**: The `order` column in `partners` must be quoted as `"order"` in raw SQL — it is a reserved keyword.

## CRITICAL: Cloudflare Context Pattern
Every server-side DB access **must** use:
```typescript
const { env } = await getCloudflareContext({ async: true });
const db = drizzle(env.sibin_helpdesk_db);
```
`{ async: true }` is mandatory — without it, Next.js static prerendering during build will fail with a sync-mode error. Apply this to all Server Actions, page components, and API routes.

## AI Agent Directives (Strict Rules)

### 1. No External State Managers
Do not use Redux, Zustand, or Jotai. Use `useState`, `useActionState`, `useTransition`, `useRouter`.

### 2. Data Fetching
Fetch data server-side within Server Components using Drizzle ORM + `getCloudflareContext({ async: true })`. Do not use `useEffect` for initial data loading.

### 3. Database Mutations — Server Actions Pattern
Use Next.js Server Actions for all DB mutations. Follow this pattern strictly:

| Use Case | Pattern |
|----------|---------|
| Form submit (create/update) | `useActionState(action, initialState)` + `<form action={formAction}>` |
| Button click (delete/toggle) | `useTransition()` + `startTransition(async () => { await action() })` |
| Refresh table after mutation | Call `router.refresh()` from `useRouter()` after success |

**Never** call a `useActionState` result directly with `await` outside of a transition — this causes "async function called outside of transition" console errors.

### 4. Cloudflare Binding
The D1 binding name is `sibin_helpdesk_db`. Always use `env.sibin_helpdesk_db`, never `env.DB`.

### 5. Dynamic Favicon
`/api/favicon` returns an HTTP 302 redirect to the favicon URL stored in `homepage_settings.faviconUrl`, falling back to `/favicon.svg`. The root layout metadata icon should point to `/api/favicon`.

### 6. Build & Deployment — CRITICAL
The Cloudflare Workers Builds dashboard must use:
- **Build command**: `npm run cf-build` (runs `opennextjs-cloudflare build`)
- **Deploy command**: `npx wrangler deploy`

**Do NOT set build command to `npm run build`** — this causes infinite recursion because OpenNext internally calls `npm run build` again.

Scripts in `package.json`:
```json
"build": "next build",
"cf-build": "opennextjs-cloudflare build",
"deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
"preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview"
```

`wrangler.jsonc` must include:
```jsonc
"build": { "command": "opennextjs-cloudflare build" }
```

### 7. UI & Styling Guidelines
* Use **daisyUI** for all interactive components. Prefer semantic daisyUI classes over raw Tailwind for complex components.
* Design: Professional, enterprise-grade. Prioritize readability and data density.
* Use `"use client"` only at leaf nodes (interactive form components, toggles). Keep pages and layouts as Server Components.
* Glass navbar pattern: `bg-base-100/70 backdrop-blur-lg rounded-3xl` sticky at top.
* Layout standard: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`

### 8. After Adding New Features
If you add a new DB table, update `/api/migrate/route.ts` with the `CREATE TABLE IF NOT EXISTS` statement and hit the migration endpoint on the live deployment.
