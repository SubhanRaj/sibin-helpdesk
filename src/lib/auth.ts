import { auth, currentUser } from '@clerk/nextjs/server';
import { drizzle } from 'drizzle-orm/d1';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export type AppUser = typeof users.$inferSelect;

export const ROLES = {
  SIBIN_ADMIN: 'sibin_admin',
  SIBIN_STAFF: 'sibin_staff',
  ORG_ADMIN: 'org_admin',
  ORG_USER: 'org_user',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const SIBIN_ROLES: string[] = ['sibin_admin', 'sibin_staff'];
export const ORG_ROLES: string[] = ['org_admin', 'org_user'];

/**
 * Get the current app user from D1 by Clerk userId.
 * If not found by Clerk ID, tries linking by email (for pre-added Sibin staff).
 * Returns null if the user hasn't completed onboarding yet.
 */
export async function getCurrentAppUser(): Promise<AppUser | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const { env } = await getCloudflareContext({ async: true });
  const db = drizzle(env.sibin_helpdesk_db);

  // 1. Try to find by Clerk userId (fast path — already onboarded)
  const byClerkId = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, userId))
    .limit(1);

  if (byClerkId[0]) return byClerkId[0];

  // 2. Try linking by email (for Sibin-pre-added staff who just signed up)
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const primaryEmail = clerkUser.emailAddresses.find(
    (e) => e.id === clerkUser.primaryEmailAddressId
  )?.emailAddress;

  if (!primaryEmail) return null;

  const byEmail = await db
    .select()
    .from(users)
    .where(eq(users.email, primaryEmail))
    .limit(1);

  if (byEmail[0] && !byEmail[0].clerkUserId) {
    // Link the Clerk userId to this pre-created record
    await db
      .update(users)
      .set({ clerkUserId: userId })
      .where(eq(users.id, byEmail[0].id));
    return { ...byEmail[0], clerkUserId: userId };
  }

  // 3. No record found — user needs to complete onboarding
  return null;
}

export function isSibinRole(role: string): boolean {
  return SIBIN_ROLES.includes(role);
}

export function isOrgRole(role: string): boolean {
  return ORG_ROLES.includes(role);
}

export function getRoleBadgeClass(role: string): string {
  switch (role) {
    case 'sibin_admin': return 'badge-error';
    case 'sibin_staff': return 'badge-warning';
    case 'org_admin': return 'badge-info';
    case 'org_user': return 'badge-ghost';
    default: return 'badge-ghost';
  }
}

export function getRoleLabel(role: string): string {
  switch (role) {
    case 'sibin_admin': return 'Sibin Admin';
    case 'sibin_staff': return 'Sibin Staff';
    case 'org_admin': return 'Org Admin';
    case 'org_user': return 'User';
    default: return role;
  }
}
