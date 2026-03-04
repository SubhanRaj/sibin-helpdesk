/**
 * Global Application Constants
 * Similar to Laravel's .env variables
 */

export const APP_CONFIG = {
	// App info
	APP_NAME: "Sibin Tech Solutions",
	APP_DESCRIPTION: "Official partners for Acer, HP, RDP, and Prodot. Providing seamless, scalable support for government and corporate sectors.",
	
	// Branding
	SUPPORT_TEAM_NAME: "Support Team",
	ADMIN_PANEL_NAME: "Admin",
	CLIENT_PORTAL_NAME: "Client Portal",
	
	// Footer
	DEFAULT_FOOTER_TEXT: "© 2025 Sibin Tech Solutions. All rights reserved.",
	
	// Homepage defaults
	DEFAULT_HEADER_TITLE: "Your Trusted Partner in",
	DEFAULT_HEADER_HIGHLIGHT: "IT Infrastructure",
	DEFAULT_HEADER_SUBTITLE: "Official partners for Acer, HP, RDP, and Prodot. Providing seamless, scalable support for government and corporate sectors.",
	
	// Pagination
	ITEMS_PER_PAGE: 20,
	
	// Status types
	TICKET_STATUS: {
		OPEN: "open",
		IN_PROGRESS: "in-progress",
		RESOLVED: "resolved",
	} as const,
	
	TICKET_PRIORITY: {
		LOW: "low",
		MEDIUM: "medium",
		HIGH: "high",
	} as const,
	
	USER_ROLE: {
		ADMIN: "admin",
		CLIENT: "client",
	} as const,
} as const;

export type AppConfig = typeof APP_CONFIG;
