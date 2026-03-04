# Sibin Tech Solutions — IT Support Desk
## Project Summary

> **Stack**: Next.js 16 (App Router) · Cloudflare Workers (`@opennextjs/cloudflare`) · Cloudflare D1 · Drizzle ORM · Tailwind CSS v4 · DaisyUI v5

---

## Database Schema

| Table | Key Columns |
|-------|------------|
| `users` | id, name, email, role (`admin`/`client`), organizationId (FK), isActive, createdAt |
| `organizations` | id, name, logo_url, isActive, createdAt |
| `tickets` | id, title, description, status, priority, helpwireLink, createdAt |

Schema is applied via the migration endpoint at `/api/migrate`.

---

## Pages

### `app/page.tsx` — Landing Page
- Animated gradient orb hero with text-gradient headline
- Glassmorphism navigation cards (Client Portal & Staff Admin)
- OEM partners grid (ACER, HP, RDP, PRODOT) with hover color reveal
- Three-column footer with contact details

### `app/client/dashboard/page.tsx` — Client Dashboard
- Stats bar: Open / In-Progress / Resolved ticket counts
- Tickets table with status badges, priority and HelpWire "Join Session" link
- **`NewTicketModal.tsx`** — Modal to raise a new ticket (Title, Description, Priority)

### `app/admin/dashboard/page.tsx` — Admin Dashboard
- Aggregated ticket view across all clients
- Stats row + full tickets table

### `app/admin/organizations/` — Organization Management
- **`page.tsx`** — Server component, fetches all orgs
- **`OrgList.tsx`** — Client component: Add Organization modal + per-row Activate/Restrict toggle

### `app/admin/clients/` — Client User Management
- **`page.tsx`** — Server component with searchable client listing
- **`ClientList.tsx`** — Client component: Search bar, Onboard New Client modal (Name, Email, Org dropdown, Active toggle) + per-row login enable/restrict

---

## Server Actions & Business Logic

### `src/actions/ticketActions.ts`
- **`createTicketAction`**: Creates a new ticket. Blocks creation if the user's organization **or** their own account is inactive.

### `src/actions/adminActions.ts`
- `createOrganizationAction` — Create a new org
- `updateOrgStatusAction` — Toggle org active/restricted
- `createClientUserAction` — Onboard a new client user with org assignment
- `updateClientStatusAction` — Toggle individual user login access

---

## UI Design System

### Global (`app/globals.css` + `app/layout.tsx`)
- DaisyUI rounded corner tokens: `--rounded-box: 1.5rem`, `--rounded-btn: 0.75rem`, `--rounded-badge: 1.9rem`
- Subtle body gradient: `bg-gradient-to-br from-base-100 via-base-200 to-base-100`
- Global input focus: Single thin border highlight, no double ring

### Layout Standard (all pages)
```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8
```

### Components
| Component | Style |
|-----------|-------|
| Cards | `shadow-xl`, `border border-base-200`, `rounded-2xl` |
| Tables | `overflow-hidden rounded-2xl`, padded cells, zebra striping |
| CTA Buttons | `bg-gradient-to-r from-blue-600 to-indigo-600` + `shadow-indigo-500/20` |
| Inputs | `rounded-xl`, single thin focus ring |

### Floating Glass Navbar (`app/admin/layout.tsx`, `app/client/layout.tsx`)
```
sticky top-4 z-50 w-[95%] max-w-7xl
bg-base-100/70 backdrop-blur-lg backdrop-saturate-150
rounded-3xl shadow-lg border border-base-200/50
```
- Nav links: `hover:text-indigo-600` with scale transition (no background box on hover)
- Logout: Text-only with `hover:text-error` transition

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
