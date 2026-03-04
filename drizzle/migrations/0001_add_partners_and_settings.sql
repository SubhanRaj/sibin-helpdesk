-- Add missing columns to users table if they don't exist
-- ALTER TABLE `users` ADD COLUMN `organization_id` text;
-- ALTER TABLE `users` ADD COLUMN `is_active` integer DEFAULT 1;

-- Add missing columns to organizations table if they don't exist
-- ALTER TABLE `organizations` ADD COLUMN `logo_url` text;

CREATE TABLE IF NOT EXISTS `partners` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`logo_url` text NOT NULL,
	`hover_color` text DEFAULT 'hover:text-blue-600' NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `homepage_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`header_title` text DEFAULT 'Your Trusted Partner in' NOT NULL,
	`header_highlight` text DEFAULT 'IT Infrastructure' NOT NULL,
	`header_subtitle` text DEFAULT 'Official partners for Acer, HP, RDP, and Prodot. Providing seamless, scalable support for government and corporate sectors.' NOT NULL,
	`footer_text` text DEFAULT '© 2025 Sibin Tech Solutions. All rights reserved.' NOT NULL,
	`primary_logo_url` text,
	`favicon_url` text,
	`is_active` integer DEFAULT 1 NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
