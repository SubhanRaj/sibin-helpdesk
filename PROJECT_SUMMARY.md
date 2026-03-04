# Sibin Tech Solutions — IT Support Desk
## Project Summary

> **Stack**: Next.js 16 (App Router, Turbopack) · Cloudflare Workers (`@opennextjs/cloudflare` v1.17.1) · Cloudflare D1 (SQLite) · Drizzle ORM · Tailwind CSS v4 · DaisyUI v5

**Production URL**: https://sibin-helpdesk.shubhanraj2002.workers.dev

---

## Database Schema

| Table | Key Columns |
|-------|------------|
| `organizations` | id, name, logo_url, isActive, createdAt |
| `users` | id, name, email, role (`admin`/`client`), organizationId (FK), isActive, createdAt |
| `tickets` | id, userId (FK), title, description, status, priority, helpwireLink, createdAt, updatedAt |
| `partners` | id, name, logoUrl, websiteUrl, order, createdAt |
| `homepage_settings` | id, headerTitle, headerHighlight, footerText, faviconUrl, createdAt, updatedAt |

Schema is applied via the migration endpoint at `/api/migrate`. This must be called once after each fresh deployment or database reset.

---

## Pages & Components

### `app/page.tsx` — Landing Page
- Animated gradient orb hero with text-gradient headline
- Glassmorphism navigation cards (Client Portal & Staff Admin)
- OEM partners grid — dynamically loaded from `partners` DB table with hover color reveal
- Three-column footer with contact details
- Content (header, footer text) driven by `homepage_settings` DB table

### `app/client/dashboard/page.tsx` — Client Dashboard
- Stats bar: Open / In-Progress / Resolved ticket counts
- Tickets table with status badges, priority and HelpWire "Join Session" link
- **`NewTicketModal.tsx`** — Modal to raise a new ticket (Title, Description, Priority)

### `app/admin/dashboard/page.tsx` — Admin Dashboard
- Aggregated ticket view across all clients
- Stats row + full tickets table
- **`UpdateStatusSelect.tsx`** — Inline status dropdown per ticket (uses `useTransition`)
- **`UpdateLinkInput.tsx`** — Inline HelpWire link input per ticket (uses `useTransition`)

### `app/admin/organizations/` — Organization Management
- **`page.tsx`** — Server component, fetches all orgs
- **`OrgList.tsx`** — Client component: Add Organization modal + per-row Activate/Restrict toggle (uses `useTransition`)

### `app/admin/clients/` — Client User Management
- **`page.tsx`** — Server component with client listing
- **`ClientList.tsx`** — Client component: Onboard New Client modal (Name, Email, Org dropdown) + per-row login enable/restrict (uses `useTransition`)

### `app/admin/partners/` — OEM Partner Management
- **`page.tsx`** — Server component, fetches all partners
- **`PartnerList.tsx`** — Full CRUD: Add/Edit partner modal, delete with confirm. Uses `useActionState` for forms, `useTransition` for delete, `router.refresh()` for live table updates after every mutation.

### `app/admin/homepage-settings/` — Homepage Customization
- **`page.tsx`** — Server component, fetches current settings
- **`HomepageSettingsForm.tsx`** — Edit header title, header highlight word, footer text, favicon URL. Live preview section shows current DB values.

---

## Server Actions

### `src/actions/adminActions.ts`
All functions use `getCloudflareContext({ async: true })`.

| Action | Description |
|--------|-------------|
| `createOrganizationAction` | Create a new org |
| `updateOrgStatusAction` | Toggle org active/restricted |
| `createClientUserAction` | Onboard a new client user with org assignment |
| `updateClientStatusAction` | Toggle individual user login access |
| `createPartnerAction` | Add new OEM partner |
| `updatePartnerAction` | Edit partner details |
| `deletePartnerAction` | Delete a partner |
| `updateHomepageSettingsAction` | Update header, footer, favicon settings |

### `src/actions/ticketActions.ts`
All functions use `getCloudflareContext({ async: true })`.

| Action | Description |
|--------|-------------|
| `createTicketAction` | Creates a new ticket. Blocks if org or user is inactive. |
| `updateTicketStatusAction` | Admin updates ticket status |
| `updateTicketLinkAction` | Admin sets HelpWire remote session link |

---

## Configuration System (`src/config/`)

Centralized config following a Laravel-like pattern. Import from `@/config`.

### `constants.ts`
```typescript
export const APP_CONFIG = {
  name: "Sibin Tech Solutions",
  supportEmail: "support@sibintechsolutions.com",
  // ... branding, defaults, enums
};
```

### `routes.ts`
```typescript
export const ROUTES = {
  ADMIN: { DASHBOARD: "/admin/dashboard", CLIENTS: "/admin/clients", ... },
  CLIENT: { DASHBOARD: "/client/dashboard" },
};
export const route = (key: string) => /* resolve nested key */;
```

Usage: `route("ADMIN.DASHBOARD")` returns `"/admin/dashboard"`. All nav links in layouts use this — no hardcoded paths.

---

## Dynamic Favicon & Page Titles

### Favicon (`app/api/favicon/route.ts`)
- HTTP 302 redirect to `homepageSettings.faviconUrl` from DB
- Falls back to `/favicon.svg` if no URL is set
- Root layout metadata icon points to `/api/favicon`
- No client-side flicker — purely server-driven

### Page Titles
- Root layout metadata uses template: `"%s | Sibin Tech Solutions"`
- Each page exports its own `metadata` object with a `title` string

---

## Cloudflare Context Pattern (CRITICAL)

Every server-side function that accesses the D1 database must use:
```typescript
const { env } = await getCloudflareContext({ async: true });
const db = drizzle(env.sibin_helpdesk_db);
```
The `{ async: true }` flag is required for compatibility with Next.js static prerendering during build. Without it, the build fails with a sync-mode error. This applies to all:
- Server Actions (`src/actions/`)
- Page server components (`app/**/page.tsx`)
- API route handlers (`app/api/**/route.ts`)

---

## React Form/Action Pattern

| Use Case | Pattern |
|----------|---------|
| Form submission (create/update) | `useActionState(action, initialState)` + `<form action={formAction}>` |
| Button click (delete, toggle) | `useTransition()` + `startTransition(async () => { await action() })` |
| Table refresh after mutation | `router.refresh()` from `useRouter()` inside the success branch |

**Never** call useActionState results directly with `await` outside a transition — causes "async function called outside of transition" errors.

---

## UI Design System

### Global (`app/globals.css` + `app/layout.tsx`)
- DaisyUI rounded corner tokens: `--rounded-box: 1.5rem`, `--rounded-btn: 0.75rem`, `--rounded-badge: 1.9rem`
- Subtle body gradient: `bg-gradient-to-br from-base-100 via-base-200 to-base-100`
- Global input focus: single thin border highlight, no double ring

### Layout Standard (all pages)
```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8
```

### Floating Glass Navbar (`app/admin/layout.tsx`, `app/client/layout.tsx`)
```
sticky top-4 z-50 w-[95%] max-w-7xl
bg-base-100/70 backdrop-blur-lg backdrop-saturate-150
rounded-3xl shadow-lg border border-base-200/50
```
Nav links use `route()` helper from `@/config`. Hover: `hover:text-indigo-600` with scale transition.

---

## Build & Deployment Pipeline

### Scripts (`package.json`)
| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Local development (Next.js dev server) |
| `build` | `next build` | Standard Next.js build (called internally by OpenNext) |
| `cf-build` | `opennextjs-cloudflare build` | Full Cloudflare build — runs `next build` + transforms to `.open-next/` |
| `preview` | `opennextjs-cloudflare build && opennextjs-cloudflare preview` | Test with Cloudflare adapter locally |
| `deploy` | `opennextjs-cloudflare build && opennextjs-cloudflare deploy` | Build + deploy from local machine |

### Cloudflare Workers Builds Dashboard Settings
- **Build command**: `npm run cf-build`  ← must NOT be `npm run build`
- **Deploy command**: `npx wrangler deploy`

**Why**: `npm run build` causes infinite recursion because OpenNext internally calls `npm run build` again. `npm run cf-build` runs OpenNext directly, which then calls `npm run build` internally once.

### `wrangler.jsonc` Key Config
```jsonc
"build": { "command": "opennextjs-cloudflare build" },
"d1_databases": [{
  "binding": "sibin_helpdesk_db",
  "database_name": "sibin-helpdesk-db",
  "database_id": "0d45ef78-4a29-4599-b88e-d27442229642"
}]
```
Access in code via `env.sibin_helpdesk_db` — never `env.DB`.

---

## Migration Endpoint (`app/api/migrate/route.ts`)

Hit once after each fresh deploy to create all tables:
```
GET https://sibin-helpdesk.shubhanraj2002.workers.dev/api/migrate
```
Creates: `organizations`, `users`, `tickets`, `partners`, `homepage_settings`

Note: The `order` column in `partners` is escaped as `"order"` — it is a reserved SQL keyword.

---

## Git History

| Commit | Description |
|--------|-------------|
| `feat: implement professional landing page` | Landing page with hero, nav cards, partners, footer |
| `feat: admin organization and client management` | Orgs + Clients pages with server actions and security checks |
| `style: global modern UI overhaul` | Layout standards, shadows, gradient buttons, rounded tables |
| `style: implement floating glass navbar` | Sticky glassmorphism navbar on both portals |
| `style: thin focus borders and fix input label spacing` | Input label gaps and thin focus rings globally |
| `style: remove double border from inputs on focus` | Single clean border color change on focus |
| `style: landing page redesign with modern UI` | Animated hero, glassmorphism cards, SVG icons, partner grid |
| `feat: add partners and homepage-settings admin pages` | Full CRUD for partners + homepage settings form |
| `feat: add global config system (constants + named routes)` | Laravel-like route() helper and APP_CONFIG |
| `feat: dynamic favicon and page title system` | Server-side favicon redirect + metadata templates |
| `fix: all getCloudflareContext calls to async mode` | Build compatibility across all pages, actions, and routes |
| `fix: cloudflare build pipeline (cf-build script)` | Resolved infinite build recursion, correct npm scripts |
| `chore: production deployment successful` | Live at sibin-helpdesk.shubhanraj2002.workers.dev |

