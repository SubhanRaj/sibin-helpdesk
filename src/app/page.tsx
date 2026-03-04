import Link from "next/link";

export default function Home() {
	return (
		<div className="min-h-screen bg-base-100 flex flex-col">
			{/* Hero Section */}
			<div className="hero bg-base-200 py-16 lg:py-24">
				<div className="hero-content text-center">
					<div className="max-w-3xl">
						<h1 className="text-4xl lg:text-5xl font-bold">Your Trusted Partner in IT Infrastructure</h1>
						<p className="py-6 text-lg lg:text-xl text-base-content/80 max-w-2xl mx-auto">
							Official partners for Acer, HP, RDP, and Prodot. Providing seamless support for government and corporate sectors.
						</p>
					</div>
				</div>
			</div>

			{/* Main Content - Navigation Cards */}
			<main className="flex-grow container mx-auto px-4 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{/* Client Card */}
					<div className="card bg-base-100 shadow-2xl border border-base-200 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1">
						<div className="card-body items-center text-center">
							<h2 className="card-title text-2xl mb-2">Client Support Portal</h2>
							<p className="text-base-content/70 mb-6">
								Report IT issues, track complaint status, and join remote sessions.
							</p>
							<div className="card-actions mt-auto w-full justify-center">
								<Link href="/client/dashboard" className="btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none btn-wide transition-transform hover:scale-105 shadow-md">
									Client Login
								</Link>
							</div>
						</div>
					</div>

					{/* Admin Card */}
					<div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
						<div className="card-body items-center text-center">
							<h2 className="card-title text-2xl mb-2">Admin Dashboard</h2>
							<p className="text-base-content/70 mb-6">
								Internal management for Sibin Tech engineers.
							</p>
							<div className="card-actions mt-auto w-full justify-center">
								<Link href="/admin/dashboard" className="btn btn-outline btn-wide transition-transform hover:scale-105">
									Staff Access
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Partners Section */}
				<div className="mt-24 text-center">
					<h3 className="text-2xl font-semibold mb-8 text-base-content/80">Our Key OEM Partners</h3>
					<div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16 opacity-70">
						<span className="text-3xl font-black tracking-widest text-base-content">ACER</span>
						<span className="text-3xl font-black tracking-widest text-base-content">HP</span>
						<span className="text-3xl font-black tracking-widest text-base-content">RDP</span>
						<span className="text-3xl font-black tracking-widest text-base-content">PRODOT</span>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="footer footer-center p-10 bg-neutral text-neutral-content mt-auto">
				<aside>
					<p className="font-bold text-xl mb-2">Sibin Tech Solutions</p>
					<p className="opacity-80">
						102, Riz Building, 5 Park Road<br />
						Hazratganj, Lucknow- 226001
					</p>
					<p className="mt-6 text-sm opacity-60">Copyright © {new Date().getFullYear()} - All rights reserved by Sibin Tech Solutions</p>
				</aside>
			</footer>
		</div>
	);
}
