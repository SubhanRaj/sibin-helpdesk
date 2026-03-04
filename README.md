# Sibin Support Desk

## Project Overview
A lightweight, high-performance IT support ticket tracking system for Sibin Tech Solutions. This platform allows our government and corporate clients to easily raise service requests for their IT needs, track complaint statuses, and enables our team to manage issues efficiently. It also lays the groundwork for initiating remote support sessions (e.g., via Helpwire).

## Architecture & Tech Stack
* **Framework:** Next.js 14+ (App Router)
* **Styling:** Tailwind CSS + daisyUI 
* **Database:** Cloudflare D1 (Serverless SQLite)
* **ORM:** Drizzle ORM
* **Deployment:** Cloudflare Workers (via `@opennextjs/cloudflare`)

## Core Features (MVP)
### 1. Client Portal
* **Ticket Creation:** Streamlined form to raise a new IT support ticket (Fields: Client Name, Organization/Department, Issue Title, Detailed Description, Priority Level).
* **Status Tracking:** Dashboard to view the status of previously submitted tickets (Open, In Progress, Resolved).

### 2. Admin Dashboard
* **Centralized Management:** Secure view for Sibin Tech Solutions administrators to view and filter all incoming complaints.
* **Workflow:** Ability to update ticket statuses and add internal notes.
* **Remote Support Integration:** Dedicated input field to attach a "Helpwire Remote Session Link" so clients can join a remote support session directly from their ticket view.

## Local Development Setup

1. **Install Dependencies:**
   ```bash
   npm install