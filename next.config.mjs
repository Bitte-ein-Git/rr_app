/** @type {import('next').NextConfig} */
const nextConfig = {
	// configure static export
	output: 'export',

	// disable image optimization for static export if no compatible loader is used
	images: {
	  unoptimized: true,
	},

	// redirects need to be handled by the hosting platform (e.g., Cloudflare Pages _redirects)
	// or client-side, this section is ineffective for `output: 'export'`
	// async redirects() {
	// 	return [
	// 		{
	// 			source: "/",
	// 			destination: "/rooms",
	// 			permanent: false, // Use false for client-side/temporary redirects if needed
	// 		},
	// 	];
	// },
};

export default nextConfig;
