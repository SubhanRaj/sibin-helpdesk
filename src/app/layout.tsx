import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FaviconUpdater from "./FaviconUpdater";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Sibin Tech Solutions - Support Portal",
		template: "%s | Sibin Tech Solutions"
	},
	description: "Official partners for Acer, HP, RDP, and Prodot. Providing seamless, scalable support for government and corporate sectors.",
	icons: {
		icon: "/favicon.svg",
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-base-100 via-base-200 to-base-100 min-h-screen`}>
				<FaviconUpdater />
				{children}
			</body>
		</html>
	);
}
