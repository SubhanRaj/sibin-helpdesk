import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-base-100 flex flex-col font-sans overflow-hidden">
			{/* Hero Section */}
			<div className="relative hero py-24 lg:py-32 overflow-hidden bg-base-200">
				{/* Background animated gradient orbs */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
					<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
					<div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px] animation-delay-2000 animate-pulse"></div>
				</div>

				<div className="hero-content text-center z-10 relative">
					<div className="max-w-4xl">
						<div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-base-100 border border-base-300 shadow-sm text-sm font-medium text-base-content/80">
							<span className="text-primary font-bold mr-2">New</span> Client Support Portal is Live
						</div>
						<h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/60">Your Trusted Partner in</span>
							<br />
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">IT Infrastructure</span>
						</h1>
						<p className="py-6 text-xl lg:text-2xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
							Official partners for Acer, HP, RDP, and Prodot. Providing seamless, scalable support for government and corporate sectors.
						</p>
						<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
							<Link href="/client/dashboard" className="btn btn-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 rounded-full px-8 flex items-center">
								Get Support Now
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 ml-1">
									<path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
								</svg>
							</Link>
							<a href="#services" className="btn btn-lg btn-ghost rounded-full px-8 hover:bg-base-200">
								View Partners
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content - Navigation Cards */}
			<main className="flex-grow container mx-auto px-4 py-24 relative z-10 -mt-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
					{/* Client Card */}
					<div className="card bg-base-100/80 backdrop-blur-xl shadow-2xl border border-white/20 hover:border-indigo-500/30 hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)] transition-all duration-500 hover:-translate-y-2 group">
						<div className="card-body p-10 lg:p-12 items-start text-left relative overflow-hidden">
							<div className="absolute top-0 right-0 p-8 opacity-5 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32">
									<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
								</svg>
							</div>
							<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:bg-indigo-500/10 transition-colors">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
									<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
								</svg>
							</div>
							<h2 className="card-title text-3xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">Client Portal</h2>
							<p className="text-base-content/70 text-lg mb-8 leading-relaxed max-w-sm">
								Report IT issues, track complaint status securely, and join remote diagnostic sessions with our engineers.
							</p>
							<div className="card-actions mt-auto w-full">
								<Link href="/client/dashboard" className="btn btn-outline hover:bg-indigo-600 hover:text-white hover:border-indigo-600 w-full rounded-xl group-hover:shadow-lg transition-all">
									Access Portal
								</Link>
							</div>
						</div>
					</div>

					{/* Admin Card */}
					<div className="card bg-base-100/80 backdrop-blur-xl shadow-xl border border-base-200 hover:border-base-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
						<div className="card-body p-10 lg:p-12 items-start text-left relative overflow-hidden">
							<div className="absolute top-0 right-0 p-8 opacity-5 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32">
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
								</svg>
							</div>
							<div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center mb-6 border border-base-300 group-hover:bg-base-300 transition-colors">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-base-content/80">
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
								</svg>
							</div>
							<h2 className="card-title text-3xl font-bold mb-3 group-hover:text-base-content transition-colors">Staff Admin</h2>
							<p className="text-base-content/70 text-lg mb-8 leading-relaxed max-w-sm">
								Secure internal management system for Sibin Tech engineers to triage, assign, and resolve client tickets.
							</p>
							<div className="card-actions mt-auto w-full">
								<Link href="/admin/dashboard" className="btn btn-ghost bg-base-200 hover:bg-base-300 w-full rounded-xl transition-all">
									Staff Login
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Partners/Services Section */}
				<div id="services" className="mt-32 text-center max-w-4xl mx-auto">
					<div className="flex items-center justify-center gap-2 mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-500">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
						</svg>
						<span className="text-sm font-bold uppercase tracking-wider text-indigo-500">Enterprise Hardware</span>
					</div>
					<h3 className="text-3xl lg:text-4xl font-bold mb-12">Authorized OEM Partners</h3>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
						<div className="p-6 grayscale hover:grayscale-0 transition-all hover:scale-110 cursor-pointer">
							<span className="text-4xl font-black tracking-tighter">ACER</span>
						</div>
						<div className="p-6 grayscale hover:grayscale-0 transition-all hover:scale-110 cursor-pointer">
							<span className="text-4xl font-black italic tracking-widest text-[#0096D6]">hp</span>
						</div>
						<div className="p-6 grayscale hover:grayscale-0 transition-all hover:scale-110 cursor-pointer">
							<span className="text-4xl font-black tracking-widest text-red-600">RDP</span>
						</div>
						<div className="p-6 grayscale hover:grayscale-0 transition-all hover:scale-110 cursor-pointer">
							<span className="text-4xl font-black tracking-tight text-blue-800">PRODOT</span>
						</div>
					</div>
				</div>
			</main>

			{/* Modern Footer */}
			<footer className="bg-neutral text-neutral-content mt-auto border-t border-neutral-focus">
				<div className="container mx-auto px-6 py-12">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
						<div>
							<h4 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-400">
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
								</svg>
								Sibin Tech
							</h4>
							<p className="opacity-70 text-sm">Empowering government & corporate sectors with reliable IT infrastructure.</p>
						</div>
						<div className="flex flex-col items-center">
							<div className="flex items-center gap-2 mb-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
									<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.54-4.24-7.136-7.136l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
								</svg>
								<span>Support: +91 123 456 7890</span>
							</div>
							<p className="opacity-70 text-sm">
								102, Riz Building, 5 Park Road<br />
								Hazratganj, Lucknow- 226001
							</p>
						</div>
						<div className="md:text-right">
							<p className="text-sm opacity-60 mb-2">© {new Date().getFullYear()} Sibin Tech Solutions.</p>
							<p className="text-sm opacity-40">All rights reserved.</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

