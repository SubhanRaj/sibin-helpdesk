'use client';

import { useEffect } from 'react';

export default function FaviconUpdater() {
	useEffect(() => {
		// Fetch the favicon URL from the API
		fetch('/api/favicon')
			.then((res) => res.json())
			.then((data) => {
				// Update or create the favicon link
				let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
				
				if (!faviconLink) {
					faviconLink = document.createElement('link') as HTMLLinkElement;
					faviconLink.rel = 'icon';
					document.head.appendChild(faviconLink);
				}
				
				faviconLink.href = data.faviconUrl;
				faviconLink.type = 'image/svg+xml';
			})
			.catch((err) => console.error('Error updating favicon:', err));
	}, []);

	return null;
}
