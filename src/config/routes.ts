/**
 * Named Routes Configuration - Similar to Laravel's routes.php
 * Define all routes here and use route() helper to reference them
 */

export const ROUTES = {
	// Public routes
	HOME: "/",

	// Auth routes
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	ONBOARDING: "/onboarding",
	AUTH_REDIRECT: "/auth/redirect",
	
	// Admin routes
	ADMIN: {
		ROOT: "/admin",
		DASHBOARD: "/admin/dashboard",
		ORGANIZATIONS: "/admin/organizations",
		CLIENTS: "/admin/clients",
		PARTNERS: "/admin/partners",
		HOMEPAGE_SETTINGS: "/admin/homepage-settings",
	},
	
	// Client routes
	CLIENT: {
		ROOT: "/client",
		DASHBOARD: "/client/dashboard",
	},
	
	// API routes
	API: {
		MIGRATE: "/api/migrate",
		FAVICON: "/api/favicon",
	},
} as const;

/**
 * Helper function to get route path - similar to Laravel's route()
 * @param routePath - Path to the route (using dot notation like 'ADMIN.DASHBOARD')
 * @returns The route path
 * 
 * Usage:
 * route('ADMIN.DASHBOARD') // Returns '/admin/dashboard'
 * route('HOME') // Returns '/'
 */
export function route(routePath: string): string {
	const parts = routePath.split(".");
	let current: any = ROUTES;
	
	for (const part of parts) {
		current = current[part];
		if (current === undefined) {
			console.warn(`Route not found: ${routePath}`);
			return "#";
		}
	}
	
	return current;
}

// Export individual route objects for convenience
export default ROUTES;
